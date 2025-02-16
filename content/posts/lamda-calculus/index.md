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
<command- for-all="span.katex-mathml" remove-element defer>

## Introduction

When learning **computer science**, you will at some point come across the term **lambda calculus**.[^LC]
I remember hearing about it and being utterly confused by what it is and why it works.
So today, I will describe exactly what lambda calculus is and how important it is in CS.
Without further ado, let's get into the nitty-gritty of lambda calculus.

## Background

The mathematician **Alonzo Church** introduced Lambda calculus in the 1930s as part of his research into the foundations of mathematics.[^AC]
He created a universal model and formal system in mathematical logic for expressing **computation**.
Later Alonzo proved that it simulate any **Turing machine**, invented by his doctoral student **Alan Turing**.[^TM][^AT]
Alonzo is known as one of the pioneers of theoretical computer science, and his work significantly impacted the field in general.

Lambda calculus heavily influenced many historical functional programming languages, including **Lisp**, **Scheme**, and **Haskell**.
Because they are purely expressive, they allow for reasoning and creating complex logical building blocks.
Lambda calculus comes in handy in designing and analyzing programming languages, type theory, and formal verification.

## Notation

Lambda calculus is a formal system that uses a specific notation to represent **functions** and **function application**.

The fundamental *syntactical* building block of lambda calculus is the **lambda term** ($\lambda$-term) defined as $T ::= v \mid \lambda v. \ T \mid T \ T$.

- **Variable**: A variable $v$ represents the smallest data unit in lambda calculus, used as an argument to functions and bound by abstractions.
  Commonly denoted by alphanumeric characters or symbols like $x$, $x_i$, $x'$, $y$, $z$, $a$, $b$, $c$, etc.
  Sometimes, in examples of extended lambda calculi, values such as $1$, $2$, $3$, etc, are used in place of variables.

- **Abstraction**: An abstraction $\lambda v. \ T$ represents a function that takes an argument $v$ and returns a $\lambda$-term $T$.
  In some other programming languages, this would be a regular function such as `f(x) = x + 1`.

- **Application**: An application $M \ N$ represents the application of a function $M$ to an argument $N$. Both $M$ and $N$ can be any lambda $\lambda$-term $T$.
  Similar to function calls in other languages like `f(42)`.

Optionally **parentheses** are used to group $\lambda$-terms when otherwise ambiguous.
These $\lambda$-terms can be combined via application to create complex **lambda expressions**.

## Terminology

- **Bound Variable**: A variable $v$ is said to be **bound** in a $\lambda$-term $T$ if it is ***bound by an abstraction*** $\lambda v. \ T$, aka a parameter of the function.

- **Free Variable**: A variable $v$ is said to be **free** in a $\lambda$-term $T$ if it is ***not bound by an abstraction*** $\lambda v. \ T$, that is, **not a parameter** of the function. Denoted by $FV(T)$.

- **Evaluation**: Simplifying lambda expressions by applying reduction rules to produce a normal form.

- **Redex**: A **redex** *(redexes)* is a reducible expression in lambda calculus **that can be simplified** by applying a reduction rule.

- **Normal Form**: A $\lambda$-term $T$ is said to be in **normal form** if it cannot be reduced further by any reduction rule.

- **Termination**: A lambda expression is said to **terminate** if it can be reduced to a normal form in a finite number of steps.

- **Fixed Point**: A value $x$ is said to be a **fixed point** of a function $f$ if $f(x) = x$.

- **$\alpha$-equivalence**: Two $\lambda$-terms $T$ and $U$ are said to be **$\alpha$-equivalent** if they can be transformed into each other by renaming bound variables using **$\alpha$-conversion**.

> **Example** \
> In the lambda term $\lambda x. \ x \ y$, we say that $x$ is a <u>bound variable</u> and $y$ is a <u>free variable</u>.
> It is also in <u>normal form</u> as no further reduction rule can be applied.

---

## Substitution

In lambda calculus, **substitution** replaces all free occurrences of a variable in a lambda term $T$ with another term $U$.
It is defined as follows.[^LC]

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
$FV(U)$ denotes the set of free variables in $U$.
This definition is recursive and applies to all subterms of $T$.

> **Example** \
> Let's say we want to replace all occurrences of $x$ in the $\lambda$-term below with $z$:
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
> The only occurrence of $x$ that got replaced was in the second $\lambda$-term.
> This is because the $\lambda x. \ y \ x$ "shadows" a new $x$ variable local to that abstraction, and thus, substitution cannot occur without ruining that abstraction that so happens to use the same variable name $x$.

### $\alpha$-conversion

This *non-reduction* rule defines **renaming** of **bound variables** to avoid accidental **variable captures** during $\beta$-reduction *(mainly)*.
This is called **capture-avoiding substitution**.[^LC]
Remember, $\alpha$-conversion does not change the structure or meaning of any lambda term.

$$
\lambda x. \ T \implies \lambda y. \ T[x := y]
$$

$y$ is a new *fresh variable* that does not appear in $T$.
This way, we can ensure expressions have unique variables that will remain free even after substitution via $\beta$-reduction.

> **Example** \
> A substitution that ignores the freshness condition could lead to errors: $(\lambda x.y)[y:=x]=\lambda x.(y[y:=x])=\lambda x.x$. This erroneous substitution would turn the constant function $\lambda x.y$ into the identity $\lambda x.x$.

---

## Reduction

**Evaluation** in lambda calculus is based on a **rewriting system** of expressions using a set of **reduction rules**.
If a reduction rule can be applied to an expression, it is called a **redex** (reducible expression).
If you are interested in learning more about the rewriting systems, I have a post on that topic:

{{< article link="/posts/rw-systems/" >}}

In simplifying lambda expressions, we match the redex with one of these rules and produce a new expression.
This chapter covers the most typical reduction rules in lambda calculus and a few more advanced ones used in extended versions.

### $\beta$-reduction

Beta reduction is the most fundamental reduction rule, driving the core evaluation logic in lambda calculus.
It applies a function to an argument (**function application**) by replacing the formal parameter with the actual argument,
essentially **removing one layer of abstraction**.

$$
(\lambda x. \ T) \ U \implies T[x := U]
$$

In the case of a valid abstraction application, we take the right-hand side $\lambda$-term $U$ and substitute it for the formal parameter $x$ in the abstraction body $T$.
Thus simplifying the expression towards a **normal form** by removing one layer of abstraction and application.

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
> This is not useful for anything exciting, but other combinators based on recursion have more practical applications.[^CL]
>
> This fact is crucial for understanding its **computational power** via **recursion** which is necessary for **Turing completeness**,
> meaning it can compute any computable function.[^TC]

### $\eta$-reduction

The eta reduction rule simplifies expressions by removing **redundant** abstractions.
But mostly, it is an optimization rule and is not strictly necessary.

$$
\lambda x. \ T \ x \implies T \quad \text{if} \ x \notin FV(T)
$$

Where $x$ is not a free variable in $T$, this rule is known as **function extensionality**.
In simple terms, if $\forall x, f \ x = g \ x$, then $f = g$. Allowing us to simplify, e.g., $\lambda x. (f \ x)$ to $f$.[^LC]

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
> The step "∵ $\eta$" could have been skipped, and the expression would still be correct. But I wanted to show that **expressions with no apparent redexes may still be simplified**!

### Optimizing

As mentioned earlier, the $\eta$-reduction rule is an **optimization** rule removing redundant abstractions, but there are more explicit optimizing rules![^RS]

| Name | Target | Rule | Condition |
| --- | --- | --- | --- | --- |
| $\eta$-reduction $\text{(Eta)}$ | Redundant abstractions | $$\lambda x. \ T \ x \implies T$$ | $x \notin FV(T)$ |
| $\xi$-reduction $\text{(Xi)}$ | Abstraction bodies | $$\lambda x. M \implies \lambda x. M'$$ | $M \rarr M'$ |
| $\nu$-reduction $\text{(Nu)}$ | Application functions | $$M \ N \implies M' \ N$$ | $M \rarr M'$ |
| $\mu$-reduction $\text{(Mu)}$ | Application arguments | $$M \ N \implies M \ N'$$ | $N \rarr N'$ |

## $let$-Bindings

So up till this point, we have talked about the **pure** lambda calculus in its most basic form and covered the essential $\beta$-reduction rule.
However, I feel like we must briefly talk about other extensions to lambda calculus that make it more practical and useful in real-world computation before moving on.
So, in this extra chapter on bindings, I will cover a few interesting and advanced reduction extensions of lambda calculi.
There are multiple variants of this such as [$\delta$-reduction](#delta-reduction), $\text{let}$-reduction, [$\zeta$-reduction](#zeta-reduction)[^CCR] and [$\Gamma$-reduction](#gamma-reduction) with slight semantic differences.[^DR]

### $\delta$-reduction

The delta rule allows evaluating **built-in functions** and their **values** in extended versions of lambda calculus.
These predefined functions are external rules collected under the $\delta$-rule.

$$
\delta \begin{cases}
\+ \ x \ y & \implies \text{eval\\_add}(x, y) \newline
\- \ x \ y & \implies \text{eval\\_sub}(x, y) \newline
\times \ x \ y & \implies \text{eval\\_mul}(x, y) \newline
\div \ x \ y & \implies \text{eval\\_div}(x, y) \newline
\end{cases}
$$

This example rules **evaluate** the **arithmetic operations** to their **numeric values**. The `eval_` functions are **external** and run in the **host environment**, meaning we temporarily leave the lambda calculus to perform these operations.

> **Example** \
> Let's say we have a lambda term that uses the $\delta$-rules defined in the previous example:
>
> $$
> \begin{align*}
> & (\lambda y. \ + \ 1 \ y) \ 2 \newline
> & \implies + \ 1 \ 2 & \text{∵ $\beta$} \newline
> & \implies 3 & \text{∵ $\delta$}
> \end{align*}
> $$
>
> The expression $+ \ 1 \ 2$ is evaluated to $3$ using the $\delta$-rule.

### $\Gamma$-reduction

I wondered if this rule had a name or an existing definition, but I wanted to include it.
Hence, I chose to call it the $\Gamma$-reduction rule in this post as soon it will be clear why.
I use it in my lambda calculus implementations, and **many** other programming languages build on top of this concept.

In this extended variant of lambda calculus, we introduce **bindings** to **name** intermediate results, **storing** and **reusing** expressions in an **environment** called $\Gamma$.
Reduction is then performed by **substituting** the **free variables** in the **expression** $T$ with the **values** in the **environment** $\Gamma$ by rule $2$.
But first, we need to **extend** the environment with new **let-bindings** via rule $1$.
Rule $3$ looks for lambda terms in $\Gamma$
Assuming an extended [notational grammar](#notation) of $T ::= \dots \mid \text{let} \ v = T \ \text{in} \ T$.

$$
\begin{align*}
& 1. & \Gamma, \ \text{let} \ v = M \ \text{in} \ T \implies \Gamma \cup \\{ v \mapsto M \\}, \ T \newline
& 2. & \Gamma, \ T
\implies T[\Gamma] \quad \text{if} \ T \ \text{is not a let-binding} \newline
& 3. & \Gamma, T \implies T[\Gamma^{-1}] \quad \text{if} \ T \ \text{is in normal form} \newline
\end{align*}
$$

Where $T[\Gamma]$ denotes the **substitution** of all free variables in $T$ with their corresponding values in the environment $\Gamma$ (if any).

$$
T[\Gamma] = \forall v_i \in \text{dom}(\Gamma) \cap FV(T) \ : \ T[v_i := \Gamma(v_i)]
$$

> **Domain and Equality** \
> The **domain** of $\Gamma$, $\text{dom}(\Gamma)=\\{k_1, k_2, \dots\\}$ where $\Gamma = \\{k_1 \mapsto v_1, k_2 \mapsto v_2, \dots\\}$.
> The **inverse** $\Gamma^{-1} = \\{v_1 \mapsto k_1, v_2 \mapsto k_2, \dots\\}$ by rule $1$, overwriting existing bindings.
> Then we get $\text{dom}(\Gamma^{-1}) = \\{v_1, v_2, \dots\\} = \text{co-dom}(\Gamma)$.
> Structural $\alpha$-equality is thus enforced, meaning:
> $$
> a, b \in \text{dom}(\Gamma) \implies \Gamma(a) = \Gamma(b) \implies a = b
> $$
> Therefore $\Gamma$ is a **bijective** mapping *(function)* between **variables** and **values**.
> Making rule $3$ sound, reversing the substitution process.

In a **non dependently typed** lambda calculi, $\Gamma$ is no longer needed and the reduction rule $1.$ can be changed into the simpler definition:[^DR]

$$
\text{let} \ v = M \ \text{in} \ T \implies (\lambda v. \ T) \ M
$$

This way $v$ is bound to $M$ in $T$ and can be substituted via $\beta$-reduction.

> **Example** \
> Let's say we have the following expression:
>
> $$
> \begin{align*}
> & \Gamma = \\{ 1 \mapsto \cdots, 2 \mapsto \cdots, + \mapsto \cdots \\}, \ \text{let} \ x = 1 \ \text{in} \ \lambda y. + x \ y \newline
> & \implies \Gamma \cup \\{  x \mapsto 1 \\}, \lambda y. + x \ y & \text{∵ $\Gamma_1$} \newline
> & \implies \Gamma, \ \lambda y. + 1 \ y & \text{∵ $\Gamma_2$} \newline
> & \implies \Gamma, \ + \ 1 \ 2 & \text{∵ $\beta$} \newline
> & \cdots \newline
> & \implies \Gamma, \ 3 & \text{∵ $\beta$}
> \end{align*}
> $$
>
> Sadly we have not yet covered [numeral encoding](#encoding) or the arithmetic operations, so all that is redacted via "$\cdots$".
> But you get the idea.

Environments are ubiquitous in programming languages, and this rule is used in many programming languages to **store** variables in scopes and reference them later.

> **Note** \
> In contrast to [$\delta$-reduction](#delta-reduction), the $\Gamma$-reduction rule is **purely** **functional** and **does not** rely on **external** **functions** to **evaluate** **expressions**.

### $\zeta$-reduction

The zeta rule is formalized by the Coq conversion rules[^CCR] and extends the **non dependently typed** lambda calculi with support for **let-bindings** via pure **substitution** similar to $\text{let}$-reduction and [$\Gamma$-reduction](#gamma-reduction).
In contrast to $\Gamma$-reduction, $\zeta$-reduction does not require an environment to store intermediate results.
This has both benefits and limitations.

$$
\text{let} \ v = M \ \text{in} \ T \implies T[v := M]
$$

The $\zeta$-reduction rule is a **pure** **substitution** rule that **replaces** all **free occurrences** of a **variable** $v$ in a **term** $T$ with the **value** $M$.
This differs from [δ-reduction](#delta-reduction) as the **declaration is removed** from the term entirely.[^CCR]

---

## Combinators

A **combinator** is a lambda function with no free variables and is said to be "closed".[^LC]
They are equivalent to the terms in **combinatory logic**, a notation to eliminate the need for variables in mathematical logic and lambda calculus introduced by **Moses Schönfinkel** in 1920.[^CL][^MS]
That is an abstraction that only depends on its arguments.
Combinators can be composed into more complex functions and are the foundational, practical tools of lambda calculus. Let's discuss the most popular sets of combinators: the SKI basis and fixed-point combinators.

### SKI Basis

The **SKI basis** is a calculus of **three combinators** $S$, $K$, and $I$. Together, they can represent any computable function in lambda calculus.[^SKI]
Let's begin with the simplest combinator of them all.

#### 1. Identity

$$
I = \lambda x. \ x
$$

Look how perfect it is; it returns its argument completely *unchanged*.
It doesn't get any simpler than that.
However, doing nothing is surprisingly helpful in some cases.
The identity combinator is also a **fixed-point combinator**.
Some use the definition notation with $\equiv$ instead of $=$, but I prefer the latter.

> **Example**
> $$
> I \ I \ I \ 42 \implies I \ I \ 42 \implies I \ 42 \implies 42
> $$
>
> As you can see, not that much happened.

#### 2. Constant

$$
K = \lambda x. \ \lambda y. \ x
$$

This combinator takes two arguments and returns the first or eliminates the second one.
It's not different from the identity combinator as it doesn't modify any values.

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

This combinator is more complex, applying one function to another via substitution.[^SKI]
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

A **fixed-point combinator** is a combinator that returns a fixed point of that function (the same function again) when applied to a function.
It helps create recursive functions in lambda calculus via self-application.

#### 1. Y Combinator

This combinator is the most famous fixed-point combinator and is used to create recursive functions:

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

## Encoding

Lambda calculus is a **universal model of computation**, meaning it can simulate any Turing machine.
However, its simplicity and lack of built-in data types make it impractical for real-world computation.
Until now, we have only discussed **pure** lambda calculus, which is not helpful for practical computation.
But by **encoding** data types and operations, we obtain the expressive power seen in regular programming languages!

> **Notation** \
> For all encoding definitions, I'll be using an extension with **let-bindings** and **substitution** via the [$\Gamma$-reduction](#gamma-reduction) rule and an implicit $\Gamma$ environment and **no** $\text{let}$ keyword, on the form $x = M \implies \Gamma \cup \\{  x \mapsto M \\}$.

### Booleans

We can encode **boolean values** in lambda calculus using **Church encoding**.
This encoding represents `true` as a function that takes two arguments and returns the first one and `false` as a function that takes two and returns the second.[^CE][^LCT][^LCS]

$$
\begin{align*}
\text{true} & = \lambda x. \ \lambda y. \ x \newline
\text{false} & = \lambda x. \ \lambda y. \ y
\end{align*}
$$

Currently this is just a notation, but we can use these functions later to easier perform logical operations based on decision trees.

### Numerals

We also encode **natural numbers** in lambda calculus using **Church encoding**.
However this is based on **recursion** and **successor functions**, much like the **Peano axioms**.
The **numeral** $n$ is represented as a function that takes two arguments and applies the first argument $n$ times to the second argument.[^LCT][^LCS]

$$
\begin{align*}
0 & = \lambda f. \ \lambda x. \ x \newline
1 & = \lambda f. \ \lambda x. \ f \ x \newline
2 & = \lambda f. \ \lambda x. \ f \ (f \ x) \newline
3 & = \lambda f. \ \lambda x. \ f \ (f \ (f \ x)) \newline
\end{align*}
$$

Here I think about $f$ as the `1+` function, and $x$ as the starting value `0`.
So `2 = 1+ 1+ 0` for example.

### Arithmetic

We can define **arithmetic operations** on these numerals using **lambda functions**.
For example, **addition** can be defined as a function that takes two numerals and a function $f$ and applies $f$ to the second numeral $n$ times to the first numeral $m$.[^LCT][^LCS]

$$
\text{+} = \lambda m. \ \lambda n. \ \lambda f. \ \lambda x. \ m \ f \ (n \ f \ x)
$$

Here we utilize the notation for numbers, taking advantage of the **successor** function $f$ to **increment** the numbers.

> **Example**
> $$
> \begin{align*}
> & \text{+} \ 2 \ 3 \newline
> & \implies (\lambda m. \ \lambda n. \ \lambda f. \ \lambda x. \ m \ f \ (n \ f \ x)) \ 2 \ 3 & \text{∵ $\Gamma_+$} \newline
> & \implies \lambda f. \ \lambda x. \ 2 \ f \ (3 \ f \ x) & \text{∵ $\beta$} \newline
> & \implies \lambda f. \ \lambda x. \ (\lambda f. \ \lambda x. \ f \ (f \ x)) \ f \ (3 \ f \ x) & \text{∵ $\Gamma_2$} \newline
> & \implies \lambda f. \ \lambda x. \ f \ (f \ (3 \ f \ x)) & \text{∵ $\beta$} \newline
> & \implies \lambda f. \ \lambda x. \ f \ (f \ ((\lambda f. \ \lambda x. \ f \ (f \ (f \ x))) \ f \ x)) & \text{∵ $\Gamma_3$} \newline
> & \implies \lambda f. \ \lambda x. \ f \ (f \ (f \ (f \ x))) & \text{∵ $\beta$} \newline
> & \implies 5 & \text{∵ $\Gamma^{-1}$}
> \end{align*}
> $$

This is a simple definition of addition, but it can be extended to **multiplication**, **exponentiation**, and other operations.

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
[^RS]: [Reduction Strategies for Lambda Calculus](https://www.cs.tufts.edu/comp/105-2019f/reduction.pdf) by Norman Ramsey, and [Notes on the Lambda-Calculus COMP 598 Winter 2015](https://www.cs.tufts.edu/comp/105-2019f/prakash.pdf) by Prakash Panangaden.
[^CE]: [Church encoding](https://en.wikipedia.org/wiki/Church_encoding) is a way to represent data and operators in lambda calculus using only functions.
[^LCT]: [A Tutorial Introduction to the Lambda Calculus](https://www.inf.fu-berlin.de/lehre/WS03/alpi/lambda.pdf) by Raúl Rojas.
[^LCS]: Slides on [Lambda Calculus](https://www.cs.tufts.edu/comp/105-2019s/slide-cache/slides-707fb5cfff5de434b95e8adbf2646986.pdf).
[^DR]: [What exactly is delta reduction?](https://cs.stackexchange.com/a/161742) answered by [cody](https://cs.stackexchange.com/users/988/cody).
[^CCR]: [Coq Conversion Rules](https://coq.inria.fr/doc/V8.17.0/refman/language/core/conversion.html#id7) and [Reference Manual](https://www.cs.yale.edu/flint/cs428/coq/doc/Reference-Manual006.html).
