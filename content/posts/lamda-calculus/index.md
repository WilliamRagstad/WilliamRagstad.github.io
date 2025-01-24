+++
title = 'Lambda Calculus'
date = 2024-11-26T20:36:18+01:00
series = ['Computational Theory']
series_order = 1
tags = ['lambda calculus', 'theoretical computer science']
categories = ['computer science', 'mathematics', 'computation']
showHero = true
+++

{{< katex >}}

## Introduction

When learning **computer science**, you will at some point come across the term **lambda calculus**.[^LC]
I remember my first time hearing about it and being utterly confused by what it is and why it works.
So today I'm going to describe exactly what lambda calculus is and its importance in CS.
Without further ado, let's get into the nitty-gritty of lambda calculus.

## Background

Lambda calculus was introduced by the mathematician **Alonzo Church** in the 1930s as part of his research into the foundations of mathematics.[^AC]
He created a universal model and formal system in mathematical logic for expressing **computation**.
Later Alonzo proved that it simulate any **Turing machine**, invented by his doctoral student **Alan Turing**.[^TM][^AT]
Alonzo is known to be one of the pioneers of theoretical computer science due to his work having such a significant impact on the field in general.

Lots of different historical functional programming languages like **Lisp**, **Scheme**, and **Haskell** are heavily influenced by lambda calculus.
This is recognized by the purely expressive nature allowing for complex logical building blocks to be created and reasoned about.
Lambda calculus is therefore used in the design and analysis of programming languages, type theory, and formal verification.

## Notation

Lambda calculus is a formal system that uses a specific notation to represent **functions** and **function application**.

The fundamental *syntactical* building block of lambda calculus is the **lambda term** defined as $T ::= v \mid \lambda v. \ T \mid T \ T$.

- **Variable**: A variable $v$ represents a smallest unit of data in lambda calculus, used as arguments to functions and bound by abstractions.
  Commonly denoted by alphanumeric characters or symbols like $x$, $x_i$, $x'$, $y$, $z$, $a$, $b$, $c$, etc.
  Sometimes in examples of extended variations of lambda calculus, you might see values (in the place of variables) like $1$, $2$, $3$, etc.

- **Abstraction**: An abstraction $\lambda v. \ T$ represents a function that takes an argument $v$ and returns a term $T$.
  In some other programming language this would be a regular function such as `f(x) = x + 1`.

- **Application**: An application $M \ N$ represents the application of a function $M$ to an argument $N$. Both $M$ and $N$ can be any lambda term $T$.
  Similar to function calls in other languages like `f(42)`.

Optionally **parentheses** are used to group terms when otherwise ambiguous.
These terms can in turn be combined via application to create large complex **lambda expressions**.

## Substitution

In lambda calculus, **substitution** is the process of replacing all free occurrences of a variable in a lambda term $T$ with another term $U$.
It is defined formally as follows.[^LC]

<!-- $$
T[x := U] = \begin{cases}
U & \text{if } T = x \newline
T & \text{if } T = v \text{ and } v \neq x \newline
\lambda v. \ T' & \text{if } T = \lambda v. \ T' \text{ and } v \neq x \text{ and } v \notin FV(U) \newline
T_1[x := U] \ T_2[x := U] & \text{if } T = T_1 \ T_2
\end{cases}
$$ -->

$$
T[x := U] = \begin{cases}
\underline{\hspace{3mm} T \hspace{3mm}} \newline
x & \implies U \newline
v & \implies v \newline
\lambda x. \ M & \implies \lambda x. \ M \newline
\lambda v. \ M & \implies \lambda v. \ M[x := U] \text{ if } v \notin FV(U) \newline
M \ N & \implies M[x := U] \ \ N[x := U]
\end{cases}
$$

Where $FV(U)$ denotes the set of free variables in $U$.
This definition is recursive and applies to all subterms of $T$.

> **Example** \
> Let's say we want to replace all occurrences of $x$ in the term below with $z$:
>
> $$
> \begin{align*}
> & ((\lambda y. \ \lambda x. \ y \ x) \ (\lambda y. \ x \ y))[x := z] \newline
> & \implies (\lambda y. \ \lambda x. \ y \ x)[x := z] \ \ (\lambda y. \ x \ y)[x := z] \newline
> & \implies (\lambda y. \ (\lambda x. \ y \ x)[x := z]) \ \ (\lambda y. \ (x \ y)[x := z]) \newline
> & \implies (\lambda y. \ \lambda x. \ y \ x) \ \ (\lambda y. \ z \ y) \newline
> \end{align*}
> $$
>
> **Note** \
> The only occurrence of $x$ that got replaced was in the second term.
> This is because the $\lambda x. \ y \ x$ "shadows" a new $x$ variable local to that abstraction, and thus substitution cannot occur without ruining that abstraction that so happens to use the same variable name $x$.

## Reduction

**Evaluation** in lambda calculus is based on a **rewriting system** of expressions using a set of **reduction rules**.
If an expression can be reduced to a simpler form, it is called a **redex** (reducible expression).
If you are interested in learning more about the rewriting systems, I have a post on that topic:

{{< article link="/posts/rw-systems/" >}}

In the process of simplifying lambda expressions, we match the redex with one of these rules and produce a new expression.
This chapter will cover the most common reduction rules used in lambda calculus, and also a few more advanced ones used in extended versions.

### $\beta$-reduction

This is the most common reduction rule in lambda calculus.
It is used to apply a function to an argument (**function application**) by replacing the formal parameter with the actual argument,
essentially **removing one layer of abstraction**.
The rule is defined as follows:

$$
(\lambda x. \ T) \ U \implies T[x := U]
$$

Where $T[x := U]$ denotes the **substitution** of all free occurrences of $x$ in $T$ with $U$.
So, in words, we replace all occurrences of the formal parameter $x$ in the body $T$ of the function with the argument $U$, and then remove the lambda abstraction $\lambda x$.

### $\alpha$-conversion

This rule is used to **rename bound variables** to avoid **variable capture**.
It is defined as follows:

$$
\lambda x. \ T \implies \lambda y. \ T[x := y]
$$

Where $y$ is a fresh variable that does not appear in $T$.

### $\eta$-conversion

This rule is used to simplify expressions by removing redundant abstractions.
It is defined as follows:

$$
\lambda x. \ (T \ x) \implies T
$$

Where $x$ is not a free variable in $T$. This rule is also known as **function extensionality**.
In simple terms, if $f \ x = g \ x$ for all $x$, then $f = g$. Allowing us to simplify e.g $\lambda x. (f \ x)$ to $f$.

<!-- 4. **$\delta$-reduction**: This rule is used to simplify expressions by evaluating built-in functions. -->

In my opinion, $\eta$-conversion is mostly an optimization rule and not strictly necessary for lambda calculus to be useful.

---

### Example: Recursion

Let's suppose we reduce the **self-application** function $\lambda x. \ (x \ x)$ applied to *itself*:

$$
\begin{align*}
& (\lambda x. \ (x \ x)) \ (\lambda x. \ (x \ x)) \newline
& \implies (\cancel{\lambda x.}\ (x \ x)[x := (\lambda x. \ (x \ x))]) \hspace{6mm} \text{∵ $\beta$} \newline
& \implies (\lambda x. \ (x \ x)) \ (\lambda x. \ (x \ x)) \newline
& \implies (\cancel{\lambda x.}\ (x \ x)[x := (\lambda x. \ (x \ x))]) \hspace{6mm} \text{∵ $\beta$} \newline
& \implies \dots
\end{align*}
$$

I've kept the otherwise removed lambda symbols ( $\cancel{\lambda x}$ ) to show the recursive nature of the function.
As you can see, the expression does **not** reduce to a simpler form, and it is **non-terminating**.
This is not useful for anything particularly interesting, but other combinators based on recursion have more practical applications.[^CL]

Let's try to break down each implicit "sub-step" when performing $\beta$-reduction:

1. **Substitution**: Replace the argument "$x$" with "$(\lambda x. x \ x)$" in the leftmost term $(\lambda x. x \ x)$
    which expands into $\lambda x. \ (\lambda x. x \ x) \ x$ then finally $\lambda x. \ (\lambda x. x \ x) \ (\lambda x. x \ x)$.
2. **Argument Removal**: Remove the argument "$\lambda x.$" from the previous substituted term,
   leaving us with $(\lambda x. x \ x) \ (\lambda x. x \ x)$, which is the exact same expression we started with.

This fact is crucial for understanding its **computational power** via **recursion** which is necessary for **Turing completeness**,
meaning it can compute any computable function.[^TC]

### Example: Complex Expression

Now let's reduce a more complex expression:

$$
\begin{align*}
& (\lambda y. \ \lambda x. \ y) \ (\lambda z. \ \lambda x. \ z \ x) \newline
& \implies \lambda x. \ y[y := (\lambda z. \ \lambda x. \ z \ x)] & \text{∵ $\beta$} \newline
& \implies \lambda x_1. \ (\lambda z. \ \lambda x_2. \ z \ x_2) & \text{∵ $\alpha$} \newline
& \implies \lambda x_1. \ (\lambda z. \ z) & \text{∵ $\eta$} \newline
& \implies \lambda x. \ \lambda z. \ z & \text{∵ $\alpha$}
\end{align*}
$$

---

## Combinators

A **combinator** is a lambda function with no free variables.[^CL]

---
{{< support >}}

<!----------------------------------------------------------------->

[^LC]: The [Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus) is a formal system in mathematical logic for expressing computation based on function abstraction and application using lambda terms.
[^AC]: [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church) was an American mathematician and logician who made significant contributions to mathematical logic and theoretical computer science.
[^AT]: [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) was a British mathematician and computer scientist who formalized the concepts of algorithm and computation with the Turing machine.
[^TM]: [Turing Machine](https://en.wikipedia.org/wiki/Turing_machine) is a mathematical model of computation that defines an abstract machine that manipulates symbols on a strip of tape according to a table of rules.
[^TC]: [Turing Completeness](https://en.wikipedia.org/wiki/Turing_completeness) is a property of a system of rules that can simulate a Turing machine.
[^CL]: [Combinatory Logic](https://en.wikipedia.org/wiki/Combinatory_logic) is a notation to eliminate the need for variables in mathematical logic and lambda calculus.
