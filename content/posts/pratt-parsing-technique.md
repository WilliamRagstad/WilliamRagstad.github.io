+++
title = 'Pratt Parsing Technique'
date = 2024-07-13T17:32:10+02:00
draft = false
series = ['Parsing Techniques']
series_order = 1
tags = ["pratt parsing", "recursive descent parsing", "top-down parsing", "operator precedence parsing"]
categories = ["computer science", "compilers", "parsing", "algorithms"]
+++
{{< katex >}}

One of my many hobbies is learning about language design and implementation, including the many parsing techniques[^Parsing] still used to parse expressions in modern programming languages.
The **Pratt parsing technique** is one such method that I like.

This article will discuss the Pratt parsing methodology and how to use it, provide an example of the algorithm implemented in Rust, go through lightweight meta-programming and extensibility, and compare it with similar approaches like **precedence climbing** and **recursive descent**.

## Introduction

Pratt parsing is a **top-down operator precedence parsing technique**[^OperatorPrecedenceParsing] used to parse complex expressions with operators in **context-free**[^ContextFreeLanguage] **formal grammars**[^FormalGrammar], such as programming languages.
This technique offers a different approach to parsing expressions with specific operator precedence compared to the related **recursive descent parsing** and **precedence climbing**[^OperatorPrecedenceParsing] techniques.
It efficiently manages to parse expressions with different operator **precedence**[^OperatorPrecedence] and **associativity**[^Associativity], allowing for both prefix, infix, and postfix positions of operators in language expressions.
**Vaughan Pratt**[^Pratt] introduced the enhanced technique in his paper *"Top down operator precedence"* from 1973.[^TDOP]

The main advantages of Pratt parsing include:

- **Simplicity**: The Pratt parsing technique simplifies handling operators with different precedence levels and associativity rules and is also easy to understand and implement in practice.
- **Efficiency**: The Pratt parsing technique can handle complex expressions in a single pass using recursive calls and loops, making it a good choice for many programming languages.

There are also certain drawbacks to consider. While other parsing techniques, such as precedence climbing, are designed to parse binary operator expressions efficiently, Pratt parsing can handle more complex expressions involving unary operators and other edge cases through recursion.

In some instances, this reliance on recursion may impact performance, particularly when parsing expressions with numerous unary operators or deeply nested structures, which can increase the call stack size and **potentially lead to a stack overflow**[^StackOverflow]. However, this is generally not a significant risk or issue in practice. The penalties associated with multiple function calls are often negligible compared to the advantages of the Pratt parsing technique, which typically outweigh the drawbacks.

### Expressions

An expression is a sequence of operands and operators.
For example, the arithmetic expression `3 + 4 * 5`, equivalent to `(3 + (4 * 5))` in infix notation[^InfixNotation], and `(+ 3 (* 4 5))` in prefix notation (also known as **Polish notation**[^PolishNotation]).
Expressions can be simple or complex, and they can involve different types of operators, such as arithmetic operators (`+`, `-`, `*`, `/`), logical operators (`&&`, `||`, `!`), comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`), and others.

### Humans vs. Computers

As **humans**, we are used to reading and writing mathematical expressions in infix notation and often omit parentheses as ***we intuitively know the order of operations***.
However, ***a computer must explicitly know the order of operations*** to evaluate a mathematical expression in text format.
Therefore, parsing algorithms are essential for computers to understand how to parse expressions, and this is where techniques like Pratt parsing come into play.

## Algorithm

The Pratt parsing algorithm is related to **precedence climbing** but uses an operator precedence table to determine the evaluation order.
Pratt parsing is based on the concept of **top-down operator precedence**[^TDOP], separating it from other distinct techniques.
In contrast to **recursive descent parsing** that relies on grammar rules, Pratt parsers offer a different approach to handling operator precedence via **functions or data structures** instead of grammar rules and recursive program flow.

> For the sake of simplicity, let's suppose we already have a tokenized expression returned by a lexer in the form of a list of **tokens**. This step is usually done in the **lexical analysis** phase of a compiler or interpreter.
> **The implementation for the lexer is not shown here**, but it is assumed that the lexer provides a list of tokens that represent the input expression.

Let's consider the following parser implementation in Rust:

```rust
struct Parser {
    pub lexer: Lexer, // Omited for simplicity
    pub operators: HashMap<Symbol, Operator>,
}
type Symbol = String;
```

The `Parser` struct contains a mapping of operator **symbols** to `Operator` structs.
Each `Operator` contains information, such as its **precedence**, **position**, and **associativity**.

```rust
struct Operator {
    precedence: Precedence,
    position: Position,
    associativity: Associativity,
}
type Precedence = u16;
enum Position {
    Prefix,
    Infix,
    Postfix,
}
enum Associativity {
    Left,
    Right,
}
```

The `Parser` methods parse expressions and construct an **abstract syntax tree**[^AST] *(AST)*, representing the intrinsic expression's structure as a tree-like data structure.

```rust
enum Ast {
    Number(f64),
    Identifier(String),
    Binary(Box<Ast>, Symbol, Box<Ast>),
}
```

Top-level expressions are all accepted compound expressions that can be parsed directly from the input without any previous context.
The `parse_top_expr` method is the **entry point** for parsing a new expression in this example implementation.

```rust
fn parse_top_expr(&mut self) -> ParseResult {
    let lhs = self.parse_primary()?;
    self.parse_expr(lhs, 0)
}
```

The `parse_top_expr` method first parses the **primary** expression, the starting point of any expression.
It then calls the `parse_expr` method to parse the rest of the expression with a precedence level `0`.

```rust
fn parse_primary(&mut self) -> Result<Ast, ParseError> {
    match self.lexer.next_token()? {
        Token::Number(n) => Ok(Ast::Number(n)),
        Token::Identifier(id) => Ok(Ast::Identifier(id)),
        _ => Err(ParseError::UnexpectedToken),
    }
}
```

The `parse_expr` method is a **recursive method** that uses precedence climbing using a **while loop** to parse the expression with operators of increasing precedence.
It checks the next token in the input and compares its precedence with the minimum precedence level required to parse the following expression, initially `min_prec` and then `curr_op.precedence`.

```rust
fn parse_expr(&mut self, mut lhs: Ast, min_prec: Precedence)
    -> ParseResult {
    while let Some((curr_sym, curr_op)) = self.check_op(
        self.lexer.peek_token(), min_prec) {
        self.lexer.next_token()?; // Consume op token
        let mut rhs = self.parse_primary()?;
        while let Some((_, next_op)) = self.check_op(
            self.lexer.peek_token(), curr_op.precedence) {
            let next_prec = curr_op.precedence +
                (next_op.precedence > curr_op.precedence)
                as OperatorPrecedence; 
            rhs = self.parse_expr(rhs, next_prec)?;
        }
        lhs = Ast::Binary(
            Box::new(lhs),
            curr_sym, // Operator symbol
            Box::new(rhs)
        );
    }
    Ok(lhs)
}
```

The `parse_expr` method uses the `check_op` method to determine if the next token is an operator used in a binary expression.
The function `check_op` helps to determine the order of evaluation in `parse_expr` by checking the precedence of the **next operator** token against the current operator as the minimum precedence based on the following conditions:

$$
\begin{align*}
\hspace{.5pc} & \ Position = Infix \\\
\text{and} \hspace{.5pc} & (Precedence \gt min\_{prec} \\\
\text{or} \hspace{.5pc} & \hspace{1pc} (Associativity = Right \\\
\text{and} \hspace{.5pc} & \hspace{2pc} Precedence = min\_{prec})) \\\
\implies \hspace{.2pc} & Some(op)
\end{align*}
$$

Suggested implementation for the `check_op` method:

```rust
fn check_op(&self, token: Token, min_prec: Precedence)
    -> Option<(Symbol, Operator)> {
    if let Token::Operator(symbol) = token {
        if let Some(op) = self.operators.get(&symbol) {
            if op.position == Position::Infix &&
                (op.precedence > min_prec ||
                (op.associativity == Associativity::Right &&
                op.precedence == min_prec)) {
                return Some((symbol, op.clone()));
            }
        }
    }
    None
}
```

Now, the input is parsed using the `Parser` struct:

```rust
let input = "3 + 4 * 5";
let lexer = Lexer::new(input);
let mut parser = Parser::new(lexer);
add_op(&mut parser, "+", 10, Position::Infix, Associativity::Left);
add_op(&mut parser, "*", 20, Position::Infix, Associativity::Left);
let ast = parser.parse_top_expr();
```

The `add_op` function initializes the operator table with the operators and their precedence levels:

```rust
fn add_op(parser: &mut Parser, sym: &str, prec: Precedence,
    pos: Position, assoc: Associativity) {
    parser.operators.insert(sym.to_string(), Operator {
        precedence: prec,
        position: pos,
        associativity: assoc,
    });
}
```

> Of course, we have omitted the implementation of the `Lexer` struct and the `Token` enum for brevity. The `Lexer` must also be able to identify the operators and produce the corresponding `Token::Operator` tokens. A good approach is to give the `Lexer` a field:
>
> ```rust
> operators: HashSet<String>,
> ```
>
> And then check for operators when producing tokens.

### Example

Let's consider the expression `3 + 4 * 5` and parse it using the Pratt parsing technique manually:

1. `parse_top_expr`: Parse the primary expression `3` as `Ast::Number(3)`.
2. `parse_top_expr`: Parse an expression with a left-hand side `Ast::Number(3)` and a minimum precedence level of `0`.
    1. `parse_expr(3, 0)`: Look ahead and check the next token `+` as an operator with precedence `10` (larger than `0`).
    2. `parse_expr(3, 0)`: Parse the primary expression `4` as `Ast::Number(4)`.
    3. `parse_expr(3, 0)`: Look ahead and check the next token `*` as an operator with precedence `20` (larger than `10`).
    4. `parse_expr(3, 0)`: Recursively call `parse_expr(4, 20)`.
        1. `parse_expr(4, 20)`: Parse the primary expression `5` as `Ast::Number(5)`.
        2. `parse_expr(4, 20)`: No more operators to parse. *(End of input)*
        3. `parse_expr(4, 20)`: Build and return the multiplication binary expression `Ast::Binary(Ast::Number(4), Operator::Mul, Ast::Number(5))`.
    5. `parse_expr(3, 0)`: Build and return the addition binary expression.
3. The final AST is:

```rust
Ast::Binary(
    Ast::Number(3),
    Operator::Add,
    Ast::Binary(
        Ast::Number(4),
        Operator::Mul,
        Ast::Number(5)
    )
)
```

## Meta-Programming and Extensibility

Starting from the implementation previously described, we can also allow our language users to extend the set of operators via meta-programming, which is an unusual additional mechanism beyond the basic Pratt parsing method.

The language should first and foremost have **support for defining functions** and referencing them in the expression by name.
In interpreters, functions and variables are stored in an **environment** during runtime: a **hash map** or a **symbol table**.

```rust
struct Environment {
    functions: HashMap<Identifier, Function>,
    variables: HashMap<Identifier, Value>,
    operators: HashMap<Symbol, Identifier>,
}
type Identifier = String;
enum Value {
    Number(f64),
    Unit,
}
struct UserFunction {
    params: Vec<String>,
    body: Ast,
}
enum Function {
    User(UserFunction),
    BuiltIn(fn(Vec<Ast>, &mut Parser, &mut Environment) -> Value),
}
```

For example, a unique built-in meta-function can dynamically add new operators to the parser in an interpreted language.
The fictional scenario below demonstrates how the built-in `add_op` function can be used to add a new operator `^` for exponentiation:

```bash
> 5 ^ 2
# Error: Operator ^ is not defined
> fn pow(x, y) {
    let res = 1
    while y > 0 { res *= x; y -= 1 }
    return res
}
# pow function added
> add_op("^", pow, 30, "infix", "left")
# Operator ^ added
> 5 ^ 2
25
```

The native `add_op` function (`Function::BuiltIn`) can be implemented quite easily by updating both the `operators` field in the `Parser` struct and the `operators` field in the `Environment` struct so that the new operator can be used when parsing new expression and also during evaluation in the interpreter.

```rust
let mut env = Environment::new();
env.functions.insert("add_op".to_string(), Function::BuiltIn(
    |args, parser, env| {
        if let [
            Ast::String(sym),
            Ast::Identifier(func),
            Ast::Number(prec),
            Ast::String(pos),
            Ast::String(assoc)
        ] = args.as_slice() {
            add_op(parser, sym, prec, pos, assoc);
            env.operators.insert(sym.clone(), func.clone());
        } else {
            eprintln!("Invalid arguments for add_op");
        }
        Value::Unit
    }
));
```

The code above demonstrates how the Pratt parsing technique can be used in an interactive application environment to dynamically extend the language's operators at runtime via lightweight meta-programming.
This feature is particularly useful in interactive environments, such as REPLs, where users can define new operators and functions on the fly.

> **Note**: The implementation above is a simplified example and does not cover all aspects of a real-world interpreter. It is intended to demonstrate the flexibility of the Pratt parsing technique in an interactive environment.
>
> A full interpreter would require additional features, and is therefore also **omitted** for brevity.

## Comparison

The Pratt technique is one of many parsing methods to parse expressions in context-free grammars.
Research in the field of parsing has led to various parsing methods, each with its strengths and weaknesses.
This section briefly compares Pratt parsing with the previous methods mentioned.

### Recursive Descent Parsing

It is one of the most straightforward parsing techniques commonly used in practice, as it is easy to implement and understand.
[^RecursiveDescent]
Recursive descent is a more general parsing technique that can handle a broader range of grammars, including \\(LL(k)\\).
The **top-down parsing** technique can use recursive procedures to parse input.
[^LLParsing]
Each non-terminal in the grammar has a corresponding function in the parser.

Benefits:

- **Simplicity**: Directly mapping to the grammar rules, making it highly readable and maintainable.

Drawbacks:

- **Left Recursion**: Recursive descent parsing cannot handle ambiguous or left-recursive grammars.
- **Recursive Calls**: Excessive recursive calls might affect performance and lead to stack overflow.

### Precedence Climbing

Precedence climbing is ***also*** a **operator-precedence parsing** technique that efficiently handles operator precedence and associativity.
[^OperatorPrecedenceParsing]
It is closely related to Pratt parsing but is specialized for parsing expressions with infix operators and their precedence, making it ideal for arithmetic and logical expressions.
It is **not suitable for general \\(LL(k)\\) grammars** as its primary focus is on binary operators and their precedence.
Though Pratt parsing predates precedence climbing, Pratt can be viewed as a generalization.
[^TDOP]

Benefits:

- **Efficiency**: Highly efficient for binary operations.
- **Simplicity**: Implemented with a loop and a stack.

Drawbacks:

- **Complexity**: Handling unary operators and other edge cases can be more complex.
- **Maintenance**: Difficult to extend and maintain for variations of the algorithm.

## Conclusion

The Pratt parsing technique is powerful and flexible, and it can parse complex expressions and handle operator precedence and associativity straightforwardly, as shown in the example above.
It is a popular choice for parsing in programming languages and is widely used and adopted by compilers and interpreters today.

I hope you found this post informative and helpful in understanding the Pratt parsing technique and that you are interested in learning more about parsing techniques and algorithms.

## Related Work

- [wikipedia.org](https://en.wikipedia.org/wiki/Operator-precedence_parser) - Operator-precedence parser on Wikipedia.
- [matklad.github.io](https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html) - Simple but powerful Pratt parsing.
- [eli.thegreenplace.net](https://eli.thegreenplace.net/2012/08/02/parsing-expressions-by-precedence-climbing) - Parsing expressions by precedence climbing.
- [engr.mun.ca/~theo](https://www.engr.mun.ca/~theo/Misc/exp_parsing.htm) - Expression parsing explained.
- [crockford.com](https://crockford.com/javascript/tdop/tdop.html) - Top-down operator precedence by Douglas Crockford.

<!----------------------------------------------------------------->

[^PolishNotation]: [Polish notation](https://en.wikipedia.org/wiki/Polish_notation) is a notation in which every operator follows all of its operands. It is also known as  [**prefix notation**](https://simple.wikipedia.org/wiki/Prefix_notation). The notation was introduced by the Polish mathematician **Jan Łukasiewicz** in the 1920s.

[^InfixNotation]: [Infix notation](https://en.wikipedia.org/wiki/Infix_notation) is a mathematical notation in which every operator is placed between its operands. It is the notation that we are most familiar with. For example, `(3 + (4 * 5))` is an infix notation expression. Parentheses surrounding groups of operands and operators are necessary to indicate the intended order in which operations are to be performed.

[^Pratt]: [Vaughan Pratt](https://en.wikipedia.org/wiki/Vaughan_Pratt) is a computer scientist and professor at Stanford University. He is known for his work on parsing techniques, including the **Pratt parsing technique** and **precedence climbing**. He has also made significant contributions to the theory of formal languages and automata.

[^OperatorPrecedenceParsing]: [Operator-precedence parsing](https://en.wikipedia.org/wiki/Operator-precedence_parser) is a parsing technique that uses a table of operator precedence levels to parse expressions. It is a type of **top-down parsing** that can handle operator precedence and associativity efficiently. The technique was introduced by **Joseph Weizenbaum** in 1961 and later extended by **Vaughan Pratt** in 1973 in the 1st annual ACM SIGPLAN Symposium on Proceedings of the Principles of Programming Languages. pp41-51.

[^RecursiveDescent]: [Recursive descent parsing](https://en.wikipedia.org/wiki/Recursive_descent_parser) is a type of **top-down parsing** that uses a set of recursive procedures to parse input according to a given formal grammar.

[^Parsing]: [Parsing](https://en.wikipedia.org/wiki/Parsing) is the process of analyzing a sequence of symbols to determine its grammatical structure with respect to a given formal grammar. It is an essential step in the compilation process of programming languages. Parsing is used to transform source code into an abstract syntax tree[^AST] that can be further processed by a compiler or interpreter.

[^OperatorPrecedence]: [Operator precedence](https://en.wikipedia.org/wiki/Operator_precedence) is a rule that defines the order in which operators are evaluated in an expression. Operators with higher precedence are evaluated before operators with lower precedence. For example, in the expression `3 + 4 * 5`, the `*` operator has higher precedence than the `+` operator, so it is evaluated first.

[^Associativity]: [Associativity](https://en.wikipedia.org/wiki/Associative_property) is a property of some binary operations that determines how the operations are grouped when there are multiple occurrences of the same operator in an expression. Operators can be left-associative, right-associative, or non-associative. For example, the `+` operator is left-associative, so `3 + 4 + 5` is evaluated as `(3 + 4) + 5`.

[^ContextFreeLanguage]: [Context-free language](https://en.wikipedia.org/wiki/Context-free_language) is a formal language that can be generated by a context-free grammar. Context-free languages are used to describe the syntax of programming languages and other formal languages. The syntax of a context-free language is defined by a set of production rules that specify how symbols can be combined to form valid sentences in the language.

[^FormalGrammar]: [Formal grammar](https://en.wikipedia.org/wiki/Formal_grammar) is a set of rules that describe the syntax of a formal language. Formal grammars are used to define the structure of programming languages, natural languages, and other formal languages. There are different types of formal grammars, such as **context-free grammars**, **regular grammars**, and **context-sensitive grammars**.

[^AST]: [Abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) is a tree representation of the abstract syntactic structure of source code written in a programming language. ASTs are used in compilers and interpreters to represent the structure of the source code in a form that is easier to analyze and manipulate. ASTs are typically generated by the parsing phase of a compiler or interpreter.

[^LLParsing]: [LL parsing](https://en.wikipedia.org/wiki/LL_parser) is a type of **top-down parsing** that uses left-to-right scanning and leftmost derivation to parse input. The LL parsing technique is used in parsers that can predict the next production rule based on the current input symbol. LL parsers are commonly used in compilers and interpreters for programming languages.

[^TDOP]: Pratt, Vaughan. ["Top down operator precedence."](https://web.archive.org/web/20151223215421/http://hall.org.ua/halls/wizzard/pdf/Vaughan.Pratt.TDOP.pdf) Proceedings of the 1st Annual ACM SIGACT-SIGPLAN Symposium on Principles of Programming Languages (1973).

[^StackOverflow]: In computer science, a [stack overflow](https://en.wikipedia.org/wiki/Stack_overflow) occurs when a program's call stack exceeds its memory limits, causing the program to crash. Stack overflows can occur when a program makes too many recursive function calls or uses too much memory on the stack. In the context of parsing, a stack overflow can occur if the parsing algorithm uses excessive recursion or consumes too much memory on the stack.

<!-- 

[^LRParsing]: [LR parsing](https://en.wikipedia.org/wiki/LR_parser) is a type of **bottom-up parsing** that uses left-to-right scanning and rightmost derivation to parse input. The LR parsing technique is used in parsers that can predict the next production rule based on the current input symbol and the symbols on the parsing stack. LR parsers are commonly used in compilers and interpreters for programming languages.

[^ShiftReduceParsing]: [Shift-reduce parsing](https://en.wikipedia.org/wiki/Shift-reduce_parser) is a type of **bottom-up parsing** that uses a shift operation to add input symbols to the parsing stack and a reduce operation to replace a sequence of symbols on the stack with a non-terminal symbol. Shift-reduce parsing is used in parsers that can predict the next action based on the current input symbol and the symbols on the parsing stack.

[^ParsingTable]: [Parsing table](https://en.wikipedia.org/wiki/Parsing_table) is a data structure used in parsing algorithms to determine the next action to take based on the current input symbol and the symbols on the parsing stack. Parsing tables are used in **LL parsing**, **LR parsing**, and **shift-reduce parsing** to guide the parsing process and ensure that the input is parsed correctly. -->
