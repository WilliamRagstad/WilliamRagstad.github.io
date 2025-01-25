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

## Terminology

- **Bound Variable**: A variable $v$ is said to be **bound** in a term $T$ if it is ***bound by an abstraction*** $\lambda v. \ T$, aka a parameter of the function.

- **Free Variable**: A variable $v$ is said to be **free** in a term $T$ if it is ***not bound by an abstraction*** $\lambda v. \ T$, that is, **not a parameter** of the function. Denoted by $FV(T)$.

- **Evaluation**: The process of simplifying lambda expressions by applying reduction rules to produce a normal form.

- **Redex**: A **redex** *(redexes)* is a reducible expression in lambda calculus **that can be simplified** by applying a reduction rule.

- **Normal Form**: A term $T$ is said to be in **normal form** if it cannot be reduced further by any reduction rule.

- **Termination**: A lambda expression is said to **terminate** if it can be reduced to a normal form in a finite number of steps.

- **Fixed Point**: A value $x$ is said to be a **fixed point** of a function $f$ if $f(x) = x$.

- **$\alpha$-equivalence**: Two lambda terms $T$ and $U$ are said to be **$\alpha$-equivalent** if they can be transformed into each other by renaming bound variables using **$\alpha$-conversion**.

> **Example** \
> In the lambda term $\lambda x. \ x \ y$, we say that $x$ is a <u>bound variable</u> and $y$ is a <u>free variable</u>.
> It is also in <u>normal form</u> as no further reduction rule can be applied.

## Substitution

In lambda calculus, **substitution** is the process of replacing all free occurrences of a variable in a lambda term $T$ with another term $U$.
It is defined formally as follows.[^LC]

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

$T[x := U]$ denotes the **substitution** of all free occurrences of $x$ in $T$ with $U$.
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

### $\alpha$-conversion

This *non-reduction* rule defines **renaming** of **bound variables** to avoid accidental **variable captures** during $\beta$-reduction *(mainly)*.
This is called **capture-avoiding substitution**.[^LC]
Remember, $\alpha$-conversion does not change the structure or meaning of any lambda term. It's defined as:

$$
\lambda x. \ T \implies \lambda y. \ T[x := y]
$$

Where $y$ is a new *fresh variable* that does not appear in $T$.
This way we can ensure expressions have unique variables that will remain free even after substitution via $\beta$-reduction.

> **Example** \
> A substitution that ignores the freshness condition could lead to errors: $(\lambda x.y)[y:=x]=\lambda x.(y[y:=x])=\lambda x.x$. This erroneous substitution would turn the constant function $\lambda x.y$ into the identity $\lambda x.x$.

## Reduction

**Evaluation** in lambda calculus is based on a **rewriting system** of expressions using a set of **reduction rules**.
If an expression can be reduced to a simpler form, it is called a **redex** (reducible expression).
If you are interested in learning more about the rewriting systems, I have a post on that topic:

{{< article link="/posts/rw-systems/" >}}

In the process of simplifying lambda expressions, we match the redex with one of these rules and produce a new expression.
This chapter will cover the most common reduction rules used in lambda calculus, and also a few more advanced ones used in extended versions.

### $\beta$-reduction

This is the most fundamental reduction rule, driving the core evaluation logic in lambda calculus.
It is used to apply a function to an argument (**function application**) by replacing the formal parameter with the actual argument,
essentially **removing one layer of abstraction**.

$$
(\lambda x. \ T) \ U \implies T[x := U]
$$

In the case of a valid abstraction application, we take the right-hand side term $U$ and substitute it for the formal parameter $x$ in the abstraction body $T$.
Thus removing one layer of abstraction and an application, simplifying the expression towards a **normal form**.

> **Example** \
> Let's suppose we reduce the **self-application** function $\lambda x. \ (x \ x)$ applied to *itself*:
>
> $$
> \begin{align*}
> & (\lambda x. \ (x \ x)) \ (\lambda x. \ (x \ x)) \newline
> & \implies (\cancel{\lambda x.}\ (x \ x)[x := (\lambda x. \ (x \ x))]) & \text{∵ $\beta_1$} \newline
> & \implies (\lambda x. \ (x \ x)) \ (\lambda x. \ (x \ x)) & \text{∵ $\beta_2$} \newline
> & \implies (\cancel{\lambda x.}\ (x \ x)[x := (\lambda x. \ (x \ x))]) & \text{∵ $\beta_1$} \newline
> & \implies \dots & \text{∵ $\beta_2$}
> \end{align*}
> $$
>
> I've kept the otherwise removed lambda symbols ( $\cancel{\lambda x}$ ) to show the recursive nature of the function.
> As you can see, the expression does **not** reduce to a simpler form, and it is **non-terminating**.
> This is not useful for anything particularly interesting, but other combinators based on recursion have more practical applications.[^CL]
>
> This fact is crucial for understanding its **computational power** via **recursion** which is necessary for **Turing completeness**,
> meaning it can compute any computable function.[^TC]

### Other

So we've covered the essential reduction rules, but there are a few more that are not strictly necessary, only used in extended versions of lambda calculus, or explicit rules for otherwise implicit reduction operations like **$\xi$-reduction** (abstraction body), **$\nu$-reduction** (application function) and **$\mu$-reduction** (application argument) that define the exact reduction rules more precisely.[^RS]

#### $\eta$-reduction

The eta reduction rule is used to simplify expressions by removing **redundant** abstractions.
But mostly it is an optimization rule and not strictly necessary.

$$
\lambda x. \ T \ x \implies T \quad \text{if} \ x \notin FV(T)
$$

Where $x$ is not a free variable in $T$. This rule is also known as **function extensionality**.
In simple terms, if $\forall x, f \ x = g \ x$, then $f = g$. Allowing us to simplify e.g $\lambda x. (f \ x)$ to $f$.[^LC]

> **Example** \
> Now let's reduce a more complex expression:
>
> $$
> \begin{align*}
> & (\lambda y. \ \lambda x. \ y) \ (\lambda z. \ \lambda x. \ z \ x) \newline
> & \implies \lambda x. \ y[y := (\lambda z. \ \lambda x. \ z \ x)] & \text{∵ $\beta$} \newline
> & \implies \lambda x_1. \ (\lambda z. \ \lambda x_2. \ z \ x_2) & \text{∵ $\alpha$} \newline
> & \implies \lambda x_1. \ (\lambda z. \ z) & \text{∵ $\eta$} \newline
> & \implies \lambda x. \ \lambda z. \ z & \text{∵ $\alpha$}
> \end{align*}
> $$
>
> The step "∵ $\eta$" could have been skipped and the expression would still be correct. But I really wanted to show that **expressions with no redexes can sometimes still be simplified**!

#### $\delta$-reduction

The delta rule allows for **builtin functions** to be **evaluated** to their **values** in extended versions of lambda calculus.
These functions are predefined as external rules collected under the $\delta$-rule.

$$
\delta = \begin{cases}
+ \ x \ y & \implies \text{eval\_add}(x, y) \newline
- \ x \ y & \implies \text{eval\_sub}(x, y) \newline
\times \ x \ y & \implies \text{eval\_mul}(x, y) \newline
\div \ x \ y & \implies \text{eval\_div}(x, y) \newline
\end{cases}
$$

These example rules are used to **evaluate** the **arithmetic operations** to their **numeric values**. The `eval_` functions are **external**, running in the **host environment**, meaning we leave the lambda calculus to perform these operations for a moment.

> **Example** \
> Let's say we have a lambda term that uses the $\delta$-rule:
>
> $$
> \begin{align*}
> & (\lambda x. \ \lambda y. \ + \ x \ y) \ 1 \ 2 \newline
> & \implies (\lambda y. \ + \ 1 \ y) \ 2 & \text{∵ $\beta$} \newline
> & \implies + \ 1 \ 2 & \text{∵ $\beta$} \newline
> & \implies 3 & \text{∵ $\delta$}
> \end{align*}
> $$
>
> The expression $+ \ 1 \ 2$ is evaluated to $3$ using the $\delta$-rule.

#### $\Gamma$-reduction

I wasn't sure if this rule already had a name or an existing definition, but I wanted to include it.
Hence, I chose to call it the $\Gamma$-reduction rule in this post, as soon it will be clear why.
I use it in my own lambda calculus implementations and **many** other programming languages build on top of this concept.

In this extended variant of lambda calculus, we introduce **bindings** to **name** intermediate results.
This allow us to **store** and **reuse** expressions in an **environment** called $\Gamma$.
Reduction is then performed by **substituting** the **free variables** in the **expression** $T$ with the **values** in the **environment** $\Gamma$ by rule $2$.
But first we need to **extend** the environment with new **let-bindings** via rule $1$. Assuming an extended [notational grammar](#notation) of $T ::= \dots \mid \text{let} \ v = T \ \text{in} \ T$.

$$
\begin{align*}
& 1. & \Gamma, \ \text{let} \ v = M \ \text{in} \ T \implies \Gamma \cup \{ v \mapsto M \}, \ T \newline
& 2. & \Gamma, \ T
\implies T[\Gamma] \quad \text{if} \ T \ \text{is not a let-binding}
\end{align*}
$$

Where $T[\Gamma]$ denotes the **substitution** of all free variables in $T$ with their corresponding values in the environment $\Gamma$ if any.

$$
T[\Gamma] = \forall v_i \in \text{dom}(\Gamma) \cap FV(T) \ : \ T[v_i := \Gamma(v_i)]
$$

The **domain** of $\Gamma$ is denoted by $\text{dom}(\Gamma)$ and means the set of all keys $\{k_1, k_2, \dots\}$ in the environment $\Gamma = \\{k_1 \mapsto v_1, k_2 \mapsto v_2, \dots\\}$.

> **Example** \
> Let's say we have the following expression:
>
> $$
> \begin{align*}
> & \\{ 1 \mapsto \cdots, 2 \mapsto \cdots, + \mapsto \cdots \\}, \newline
> & \text{let} \ x = 1 \ \text{in} \ \lambda y. + x \ y \newline
> & \implies \lambda y. + 1 \ y & \text{∵ $\Gamma$} \newline
> & \implies + \ 1 \ 2 & \text{∵ $\beta$} \newline
> & \implies 3 & \text{∵ $\delta$}
> \end{align*}
> $$
>
> The environment $\Gamma$ is omitted in the reduction steps as it is easy to infer from the context.

Environments are ubiquitous in programming languages, and this rule is used in many programming languages to **store** variables in scopes and reference them later.

> **Note** \
> In contrast to [$\delta$-reduction](#delta-reduction), the $\Gamma$-reduction rule is **purely** **functional** and **does not** rely on **external** **functions** to **evaluate** **expressions**.

---

## Combinators

A **combinator** is a lambda function with no free variables, and is said to be "closed".[^LC]
They are equivalent to the terms in **combinatory logic** which is a notation to eliminate the need for variables in mathematical logic and lambda calculus introduced by **Moses Schönfinkel** in 1920.[^CL][^MS]
That is, an abstraction which only depends on its own arguments.
They can be used to build more complex functions, and are the foundational practical tools of the lambda calculus. Let's discuss the most popular sets of combinators from both the SKI basis and fixed-point combinators.

### SKI Basis

The **SKI basis** is a calculus of **three combinators** $S$, $K$, and $I$, that can be used to represent any computable function in lambda calculus.[^SKI]
Let's begin with the simplest combinator of them all.

#### 1. Identity

$$
I = \lambda x. \ x
$$

Look how perfect it is, it just returns its argument completely *unchanged*.
It doesn't get any simpler than that.
However, doing essentially nothing is surprisingly useful in some cases.
One could also say that the identity combinator is a **fixed-point combinator**.

> **Example**
> $$
> I \ I \ I \ 42 \implies I \ I \ 42 \implies I \ 42 \implies 42
> $$
>
> As you can see, not that much happened really.

#### 2. Constant

$$
K = \lambda x. \ \lambda y. \ x
$$

This combinator takes two arguments and returns the first one, or simply eliminating the second one.
It's not that different from the identity combinator as it doesn't modify any values.

> **Example**
> $$
> \begin{align*}
> & K \ 1 \ 2 \newline
> & \implies (\lambda x. \ \lambda y. \ x) \ 1 \ 2 \newline
> & \implies (\lambda y. \ 1) \ 2 & \text{∵ $\beta$} \newline
> & \implies 1 & \text{∵ $\beta$}
> \end{align*}
> $$
>
> We discarded the value $2$ and returned $1$.

#### 3. Application

$$
S = \lambda x. \ \lambda y. \ \lambda z. \ x \ z \ (y \ z)
$$

This combinator is a bit more complex, but it's used to apply one function to another via substitution.[^SKI]
In combinatory logic, there are no lambdas arguments. Therefore, instead of using $\lambda$-abstraction, we require a combinator that can perform a similar substitution operation on its arguments.[^S_expl]

> **Example**
> $$
> \begin{align*}
> & S \ K \ K \ 1 \newline
> & \implies (\lambda x. \ \lambda y. \ \lambda z. \ x \ z \ (y \ z)) \ K \ K \ 1 \newline
> & \implies (\lambda y. \ \lambda z. \ K \ z \ (y \ z)) \ K \ 1 & \text{∵ $\beta$} \newline
> & \implies \lambda z. \ K \ z \ (K \ z) \ 1 & \text{∵ $\beta$} \newline
> & \implies K \ 1 \ (K \ 1) & \text{∵ $\beta$} \newline
> & \implies (\lambda x. \ \lambda y. \ x) \ 1 \ (K \ 1) \newline
> & \implies (\lambda y. \ 1) \ (K \ 1) & \text{∵ $\beta$} \newline
> & \implies 1 & \text{∵ $\beta$}
> \end{align*}
> $$
>
> We applied the constant combinator $K$ to the value $1$ and returned $1$.
> Because we used the $K$ combinator, the expression $K \ 1 \ (K \ 1)$ is equivalent to $1$, as the second argument is discarded as shown previously.

### Fixed-Point Combinators

A **fixed-point combinator** is a combinator that when applied to a function, returns a fixed point of that function (the same function again).
This is useful for creating recursive functions in lambda calculus, as it allows for self-application of functions.

#### 1. Y Combinator

This is the most famous fixed-point combinator, and is used to create recursive functions:

$$
Y = \lambda f. \ (\lambda x. \ f \ (x \ x)) \ (\lambda x. \ f \ (x \ x))
$$

> **Example**
> $$
> \begin{align*}
> & Y \ (\lambda f. \ \lambda n. \ \text{if} \ n = 0 \ \text{then} \ 1 \ \text{else} \ n \times f \ (n - 1)) \ 5 \newline
> & \implies (\lambda x. \ f \ (x \ x)) \ (\lambda x. \ f \ (x \ x)) \ (\lambda n. \ \text{if} \ n = 0 \ \text{then} \ 1 \ \text{else} \ n \times f \ (n - 1)) \ 5 \newline
> & \implies f \ ((\lambda x. \ f \ (x \ x)) \ (\lambda x. \ f \ (x \ x))) \ 5 \newline
> & \implies f \ (Y \ f) \ 5 \newline
> & \implies f \ (Y \ f) \ 5 \newline
> & \implies \dots
> \end{align*}
> $$
>
> This combinator is used to create recursive functions in lambda calculus, as it allows for self-application of functions.

---
{{< support >}}

<!----------------------------------------------------------------->

[^LC]: The [Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus) is a formal system in mathematical logic for expressing computation based on function abstraction and application using lambda terms.
[^AC]: [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church) was an American mathematician and logician who made significant contributions to mathematical logic and theoretical computer science.
[^AT]: [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) was a British mathematician and computer scientist who formalized the concepts of algorithm and computation with the Turing machine.
[^TM]: [Turing Machine](https://en.wikipedia.org/wiki/Turing_machine) is a mathematical model of computation that defines an abstract machine that manipulates symbols on a strip of tape according to a table of rules.
[^TC]: [Turing Completeness](https://en.wikipedia.org/wiki/Turing_completeness) is a property of a system of rules that can simulate a Turing machine.
[^CL]: [Combinatory Logic](https://en.wikipedia.org/wiki/Combinatory_logic) is a notation to eliminate the need for variables in mathematical logic and lambda calculus.
[^MS]: [Moses Schönfinkel](https://en.wikipedia.org/wiki/Moses_Sch%C3%B6nfinkel) was a Russian mathematician and logician who introduced combinatory logic in 1920.
[^SKI]: The [SKI combinator calculus](https://en.wikipedia.org/wiki/SKI_combinator_calculus) is a combinatory logic system of functions that can be composed to form any computable function.
[^S_expl]: https://math.stackexchange.com/questions/889608/in-what-sense-is-the-s-combinator-substitution
[^RS]: [Reduction Strategies for Lambda Calculus](https://www.cs.tufts.edu/comp/105-2019f/reduction.pdf) by Norman Ramsey.
