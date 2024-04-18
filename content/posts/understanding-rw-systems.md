+++
title = 'Understanding Rewriting Systems'
date = 2024-04-12T21:00:59+02:00
series = ["Understanding"]
series_order = 1
tags = ["rewriting systems", "notes", "research", "understanding"]
categories = ["computer science", "mathematics", "logic"]
draft = true
+++
{{< katex >}}

As I have not *yet* studied advanced theoretical computer science courses in subjects like type theory, logic, abstract algebra, category theory, and so on. \
I have recently been trying to learn the basics on my own.
Previous research attempts has time and time again led me back to the fundamentals of **rewriting systems**,[^RW]
and I have decided to take a deeper dive into the basics to prepare myself for more advanced topics in the future.

> #### :exclamation: **Disclaimer**
>
> I am not an expert in the field in any way, this article is merely a collection of my notes and thoughts on the subject, and exists to help me understand the topic of rewriting systems better.
> This work will in no way be exhaustive, but rather a short personal exploration and self-study.

I will be using various resources, including books, papers and online articles to help me understand the topic better, and I hope you find this article helpful in your own learning journey as well.
A great book I have found on the subject is ***Term Rewriting and All That*** by *Franz Baader* and *Tobias Nipkow*.[^TRaAT]
I will use the terms abstract rewriting systems (ARS) and rewriting systems interchangeably,[^ARS] as I am not focusing on any specific type of rewriting system (Frankly, I am not sure if there is a difference between the two).

<!----------------------------------------------------------------->

## What are Rewriting Systems?

A rewriting system is a formal system that consists of a set of rules that describe how to rewrite terms and are a fundamental concept in computer science, mathematics, and logic.[^Logic]
They are used to model a wide range of *computational processes* and *reasoning* in for example *lambda calculus*.[^LamCalc]
Rewriting systems are used in many areas of computer science, including programming languages, compilers, and automated theorem proving.

An abstract rewriting system *(ARS)* consists of a **set of elements \\( A \\)**, the set of **terms \\(T\\)**[^T] made up from elements, and **binary relations \\(R\\)**[^BinRel] on **terms**[^T] (rewrite rules).
The set of symbolic terms  can *sometimes* be a combination of elements (\\(A \subseteq T\\)), indeterminate variable symbols (\\(V \subseteq T\\)), operator symbols (\\(O \subseteq T\\)), etc.
This depends on the model domain of the system.
A relation between two terms is denoted by \\( \rarr \\) and is called the **reduction**, **rewrite relation** or **rule**.[^ARS][^RW][^BinRel]
Though the relation is not actually performing any *"reducing" action* or *computation*, it is merely a description of how one term can be *rewritten* into another term.
The system is thus defined by a **set of rules** that describe how terms can be rewritten (transformed), and these rules are applied to terms to produce new terms.
Formally, **\\( (A, R) \\) is an abstract rewriting system** where **\\( A \\) is a set of elements** and **\\( R \\) is a set of rewrite relations** from one term to another \\( R \subseteq A \times A \\).
Again, where terms \\( t \in T \\) are made up of elements \\( A \\), like \\( t ::= A \mid \ldots \\), and potentially more constructs depending on domain (shown by \\( \ldots \\)).

Alternative notations for rewriting systems might use \\( (A, \rarr) \\) where \\( \rarr \\) denotes the rewrite relation set.
Others might use multiple relation sets to define a system, denoted as \\( (A, \rarr_1, \rarr_2, \ldots, \rarr_n) \\), which together define the relation set \\( R = \rarr_1 \cup \rarr_2 \cup \ldots \cup \rarr_n \\) in \\( (A, R) \\).

### Example (A, B, C)

Consider the following rewriting system with the set of *ground and linear*[^GLT] elements \\( \lbrace a, b, c \rbrace \\) and the rules:

$$
\begin{align*}
a & \rarr b \\\
b & \rarr c \\\
\end{align*}
$$

The system can be represented as a directed graph where the nodes are the elements and the edges are the rules.
The graph is shown below:

{{< mermaid >}}
graph LR;
 a --> b
 b --> c
{{< /mermaid >}}

In this system, the element and term \\( a \\) can be rewritten to \\( b \\) and \\( b \\) can be rewritten to \\( c \\).
The term \\( a \\) can be rewritten to \\( c \\) by applying the rules \\( a \rarr b \\) and \\( b \rarr c \\) in sequence.
This is an example of a simple rewriting system.

### Example (Logic)

Let's consider a more complex example, a rewriting system that models **logic**[^Logic] and basics of **boolean algebra**.[^BoolAlg]
The set of **elements** is \\( \lbrace \top, \bot \rbrace \\) where \\( \top \\) represents *true* and \\( \bot \\) represents *false*.
A **Term** \\( t \\) can be made up of literal elements and *propositional variables*[^PropVar] \\( p, q, r, \ldots \in V \\), formalized as \\( t ::= \top \mid \bot \mid V \mid \lnot t \mid t \land t \mid t \lor t \\).
The **rules**[^RW] represent **logical axioms**,[^Logic] **logical equivalences**[^Eq] *and* **boolean algebra identities**,[^BoolAlg] defined as:

$$
\begin{align*}
\lnot \lnot p &\rarr p \\\
p \land q &\rarr q \land p \\\
p \lor q &\rarr q \lor p \\\
\lnot (p \land q) &\rarr \lnot p \lor \lnot q \\\
\lnot (p \lor q) &\rarr \lnot p \land \lnot q \\\
p \land (q \land r) &\rarr (p \land q) \land r \\\
p \lor (q \lor r) &\rarr (p \lor q) \lor r \\\
(p \land q) \lor r &\rarr (p \lor r) \land (q \lor r) \\\
\\\
p \land \top &\rarr p \\\
p \lor \bot &\rarr p \\\
p \land \bot &\rarr \bot \\\
p \lor \top &\rarr \top \\\
p \land \neg p &\rarr \bot \\\
p \lor \neg p &\rarr \top \\\
\end{align*}
$$

These rewrite relations often have a more complex term on the left-hand side and a simpler term on the right-hand side.
This is a common pattern and hints at the **normalization**[^NF] properties of the system, discussed in the next section.

Below is an example of how the rewrite system can be used to simplify a logical formula: \\( \lnot((p \land q) \lor \lnot q)\\) to \\(\lnot(p \land q) \\).

{{< mermaid >}}
graph TD;

s1("¬((p ∧ q) ∨ ¬q)") -->|DeMorgan| s2("¬(p ∧ q) ∧ ¬¬q")
s2 -->|Involution| s3("¬(p ∧ q) ∧ q")
s3 -->|DeMorgan| s4("(¬p ∨ ¬q) ∧ q")
s4 -->|Distribution| s5("¬p ∧ q ∨ ¬q ∧ q")
s5 -->|Inverse| s6("¬p ∧ q")
{{< /mermaid >}}

This system models logical reasoning and can be used to prove theorems and derive new logical formulas, and is an example of how rewriting systems can be used in practice.

<!----------------------------------------------------------------->

## More Notation

Before reading any academic papers using rewriting systems,
we'll need to understand some extended denotation used to describe the rules and properties of rewriting systems.
Note, I'm trying to be as comprehensive as possible, but there are lots of different notations used in the literature.
Also, I'm not an expert, so take this with a grain of salt.

### Direct Reduction

> Denotations include: \\( R \\), \\( \xrightarrow{} \\) and \\( \rarr \\).

A **regular relation** that represents **a single step** in a rewriting process where one term is **directly transformed** into another based on a *specific* rewrite rule.

### What are Closures?

Before we go into detail on the different type of notations, let's first understand what **closures** are <u>**in the context of rewriting systems**</u>.
It's easy to get confused with the term, as it may have a different meaning in other subjects.

> #### Mathematical definition
>
> A subset of a given set is closed under an operation of the larger set if performing that operation on members of the subset always produces a member of that subset.
> For example, the natural numbers are closed under addition, but not under subtraction: \\(1 − 2\\) is not a natural number, although both \\(1\\) and \\(2\\) are.
> Similarly, a subset is said to be closed under a collection of operations if it is closed under each of the operations individually.
> The closure of a subset is the result of a closure operator applied to the subset. The closure of a subset under some operations is the smallest superset that is closed under these operations. It is often called the span (for example linear span) or the generated set.[^Closure]

I interpret this as a **closure** being a **set of elements** that when some **operation** is applied to them, the result **is always a member of the same set**.
Thus the operation is **closed** under the set of elements, meaning no elements are *lost or gained* after the operation, coming from any other set elsewhere, somehow.

The classical example here is of course the **natural numbers** being **closed under addition** but **not under subtraction**.
Because adding two natural numbers always results in another natural number, and subtracting two natural numbers may result in a negative number, which is not a natural number.

$$
\begin{align*}
& \forall a, b \in \mathbb{N} \iff a + b \in \mathbb{N} \hspace{1cm} \text{OK} & \\\
& \not \forall a, b \in \mathbb{N} \not \Rarr a - b \in \mathbb{N} \hspace{1cm} \text{Not OK} & \\\
\end{align*}
$$

So, what does this mean in the context of rewriting systems?
Simply put, a **closure**-relation is just like **a regular relation**, but **with additional properties**.[^Closure]
This is done by extending a basic relation \\( R \\) or \\( \rarr \\) to **expand the set of allowable transformations between terms**.
Closures are fundamental in understanding how terms can evolve in a system beyond simple direct transformations, incorporating **sequences**, **reversals**, and **self-referential** transformations, among others.

{{< figure src="/img/math/binary-relations.png" alt="Closures of a relation" caption="Closures of a relation by [Joel David Hamkins](https://jdh.hamkins.org/) on [Infinitely More](https://www.infinitelymore.xyz/p/closures-of-a-relation)." >}}

Above is a diagram showing the different types of closures of a relation.

### Transitive Closure

> Denotations include: \\( \xrightarrow{+} \\) and \\( \rarr^+ \\).

The first closure we'll look at is the **transitive closure** of a relation.

> #### Mathematical definition
>
> A binary relation \\(R\\) on a set \\(X\\) is transitive if, for all elements \\(a, b, c \in X\\), whenever \\(R\\) relates \\(a\\) to \\(b\\) and \\(b\\) to \\(c\\), then \\(R\\) also relates \\(a\\) to \\(c\\).

The transitive closure of a relation extends the original relation \\( \rarr \\) so that it includes **direct** and **sequences of transformations** between terms.
For example, if term \\( a \rarr b \\) and term \\( b \rarr c \\),
then in the transitive closure, term \\( a \\) is considered to directly reach term \\( c \\), notated \\( a \rarr^+ c \\).
The example below generalize to any number of intermediate terms \\( b_1, b_2, \ldots, b_N \\).

{{< mermaid >}}
graph LR;
 a --> c
 a --> b1 --> b2 -.-> bN --> c
{{< /mermaid >}}

Simply put, \\( a \rarr^+ c \\) means that *there is* some sequence of rewrites transforming the term \\( a \\) to \\( c \\) *(including one or more rewrites)*.
This is the **smallest** relation that contains the original relation \\( \rarr \\) *and* is the **transitive** property of terms.[^TransitiveRelation][^TransitiveClosure]

### Reflexive Transitive Closure

> Denotations include: \\( \xrightarrow{\*} \\) and \\( \rarr^* \\).

A **reflexive** relation \\( R^* \\) is a relation where every element in \\(A\\) is **related to itself**.
This *can* be formally defined as:[^ReflectiveRelation]

{{< mermaid >}}
graph LR;
 a --> a
 a --> b
 b --> b
{{< /mermaid >}}

$$
\begin{align*}
& \text{Relation } R \text{ is reflexive } \iff & \forall x \in A, & \ x R x \\\
& & \text{or} \hspace{4mm} & \ x \rarr x \\\
& & \text{or} \hspace{4mm} & \ (x, x) \in R
\end{align*}
$$

As every intersection of reflexive relations is reflexive, this defines a closure.
A **reflexive-transitive closure** is a closing relation that is both **reflexive** and **transitive**.[^ReflectiveClosure][^TransitiveRelation][^TransitiveClosure]
That is having the properties of both the **transitive** and **reflexive** closures, meaning that it includes **direct**, **sequence** and **self-referential** transformations between terms.

### Symmetric Closure

> Denotations include: \\( \xleftrightarrow{} \\) and \\( \lrarr \\).

This is a relation that is **symmetric** if, for all elements \\(a, b \in X\\), whenever \\(R\\) relates \\(a\\) to \\(b\\), then \\(R\\) also relates \\(b\\) to \\(a\\).
This is a closure that includes **bi-directional** transformations between terms.
Formally, a relation \\( R \\) *is symmetric if* \\( a \rarr b \implies b \rarr a \\), where \\( \lrarr \ = (\rarr \cup \rarr^{-1}) \\) and \\( \rarr^{-1} \ = \lbrace (b, a) \mid (a, b) \in \rarr \rbrace \\).[^ARS][^BinRel]

{{< mermaid >}}
graph LR;
 a --> b
 b --> a
{{< /mermaid >}}

### Reflexive Transitive Symmetric Closure

> Denotations include: \\( \xleftrightarrow{\*} \\) and \\( \lrarr^* \\).

This is a relation that is both **reflexive**, **transitive** and **symmetric**.
That is having the properties of the **transitive** and **reflexive** closures, and the **symmetric** property, meaning that it includes **direct**, **sequence**, **self-referential** and **bi-directional** transformations between terms.[^ReflectiveRelation][^TransitiveRelation][^TransitiveClosure][^ReflectiveClosure][^SymmetricClosure]

Similarly, the **reflexive transitive symmetric closure** *or* **equivalence closure** of a relation is the smallest equivalence relation.[^Closure]

### Joinability

> Denotation: \\( \downarrow \\).

A less formal term of normal forms are **joinable** terms, where two terms are joinable if they can be rewritten to the same term.
\\( x \downarrow y \\) denotes that there exists a term \\( z \in A \\) such that \\( x \rarr^* z \land y \rarr^* z \\), alternatively written as \\( x \xrightarrow{\*} z \xleftarrow{\*} y \\).

{{< mermaid >}}
graph TD;
 x -->|∗| z
 y -->|∗| z
{{< /mermaid >}}

### Composition

> Denotation: \\( \circ \\).

Composition is a binary operation that combines two relations to form a new relation.
For example, using the denotation of a reflexive transitive closure relations, \\( \xrightarrow{\*} \\), the composition of two relations \\( R^* \circ S^* \\) is defined as \\( \lbrace (a, c) \mid \exists b \in A, a \xrightarrow{\*}_R b \land b \xrightarrow{\*}_S c \rbrace \\), and can be expressed by the operator \\( \xrightarrow{\*}_R \circ \xrightarrow{\*}_S \\).

<!----------------------------------------------------------------->

## Properties

Some properties of abstract term rewriting systems are **termination**,[^SimpleTerm][^TermRW] **confluence**,[^Conf] **normalization**,[^NF] **completion**[^Comp][^TRaAT] and **equivalence**.[^Eq]
A confluent and terminating ARS is called **convergent** or **canonical**.[^RW]

### Termination

Termination describes whether a rewriting system has a finite number of rewrites for any term in the system.
An ARS is said to be terminating if there is **no infinite chain** \\( x_{0} \rightarrow x_{1} \rightarrow x_{2} \rightarrow \cdots \\) of rewrites.[^Termination]

$$
\begin{align*}
& \text{ARS is terminating} \iff \forall x_i \in A \\\
% & \text{there is no infinite chain of rewrites } x_{0} \rightarrow x_{1} \rightarrow x_{2} \rightarrow \cdots \\\
& \nexists x_{0}, x_{1}, x_{2}, \ldots \text{ such that } x_{0} \rightarrow x_{1} \rightarrow x_{2} \rightarrow \cdots \\\
\end{align*}
$$

### Confluence

*"Confluence describes which terms in such a system can be rewritten in more than one way, to yield the same result"*.[^Conf]
A rewriting system is said to be **confluent** if,
for any terms \\( t, s, u \\) such that \\( t \rarr^* s \land t \rarr^* u \\),
there exists a term \\( v \\) such that \\( s \rarr^* v \land u \rarr^* v \\).[^Conf]
In a confluent system, the (TODO) relation is called the **confluence relation**.

{{< mermaid >}}
graph LR;
 t -->|∗| s
 t -->|∗| u
 s -->|∗| v
 u -->|∗| v
{{< /mermaid >}}

Confluence is a property that implies that if a term can be rewritten in more than one way (leading to multiple possible outcomes),
all these paths will eventually converge to a common rewrite outcome, regardless of the choices made during rewriting.
Formally, denoting that any term \\(a\\) can reach any term \\(b\\) (and vice versa) through a sequence of forward and backward steps, is instrumental in analyzing confluence.
If this closure holds between any two rewrite results of the same term, the system is confluent.
The symmetric closure \\( \xleftrightarrow{\*} \\) is used to define confluence.

An ARS possess the **Church-Rosser property** if and only if \\( x \xleftrightarrow{\*} y \\) implies \\( x \downarrow y \\) for all terms \\( x, y \\) in the system.[^Conf][^ARS]

$$
\begin{align*}
& \text{Church-Rosser property} \iff \\\
& \forall x, y \in A, x \xleftrightarrow{\*} y \implies x \downarrow y \\\
\end{align*}
$$

### Normal Forms

A term in **normal form**[^NF] (NF) is an irreducible, canonical representation of a term in a rewriting system.
That is, **no rewrite rules can be applied to the term to produce a new term**. Formally, if \\( (A, \rarr) \\) is an ARS, a **term \\( t \\)**, \\( t \in A \\) **is in normal form** if there is exists no other term \\( s \in A \\) such that \\( t \rarr s \\).

$$
\begin{align*}
t \text{ is in normal form} &\iff \nexists s \in A \text{ such that } t \rarr s \\\
\end{align*}
$$

#### Strong Normalization

A term is said to be **strongly normalizing (SN)** if all possible rewrites eventually terminate and reach some normal form.
An ARS is **strongly normalizing** if all terms in the system are strongly normalizing (terminating).[^NF][^Termination]

$$
\begin{align*}
& t \text{ is strongly normalizing} \iff \forall s \in A \\\
& \text{ such that } t \rarr^* s \text{, } s \text{ is in normal form} \\\
\end{align*}
$$

#### Weak Normalization

To illustrate the distinction between strong and **weak normalization (WN)**, consider the following ARS:

$$
\begin{align*}
A &\rarr B \\\
A &\rarr (AA) \\\
\end{align*}
$$

The term \\(A\\) is **weakly normalizing** because it *can* be rewritten to \\(B\\), a normal form.
However, it's **not strongly normalizing** since an infinite sequence of expansions can occur (see below).
This highlights that while ***weak normalization** ensures that a result **can be found***, ***strong normalization** guarantees that the process of finding that result **is always finite***.

{{< mermaid >}}
graph LR;
 A --> B
 A --> AA
 AA -->|+| BB
 AA -->|∗| AAAA
 AAAA -->|+| BBBB
 AAAA -->|∗| AAAAA(...)
{{< /mermaid >}}

#### Conclusion Normalization

Normal forms are important because they provide a unique term used to compare for equivalence[^Eq] and to prove properties of the system.
In some systems, not all terms have a normal form, and the system is said to be **non-terminating**[^SimpleTerm][^TermRW][^Termination] and is the reason some rewriting systems are **non-deterministic** and **undecidable**.[^RW]


<!----------------------------------------------------------------->

<!----------------------------------------------------------------->

[^RW]: "Rewriting Systems", https://en.wikipedia.org/wiki/Rewriting.
[^ARS]: “Abstract Rewriting System”, https://en.wikipedia.org/wiki/Abstract_rewriting_system.
[^Conf]: “Confluence”, https://en.wikipedia.org/wiki/Confluence_(abstract_rewriting).
[^Comp]: “Completion (logic)”, https://en.wikipedia.org/wiki/Completeness_(logic).
[^Eq]: “Equivalence (logic), https://en.wikipedia.org/wiki/Logical_equivalence.
[^NF]: “Normal form”, https://en.wikipedia.org/wiki/Normal_form_(abstract_rewriting).
[^TRaAT]: "Term Rewriting and All That" by *Franz Baader* and *Tobias Nipkow*. Find the book on [Cambridge Core](https://www.cambridge.org/core/books/term-rewriting-and-all-that/71768055278D0DEF4FFC74722DE0D707) or [Cambridge University Press](https://www.cambridge.org/9780521779203).
[^LamCalc]: "Lambda calculus", https://en.wikipedia.org/wiki/Lambda_calculus.
[^Termination]: "Termination", https://en.wikipedia.org/wiki/Rewriting#Termination.
[^SimpleTerm]: Aart Middeldorp and Hans Zantema, “Simple Termination of Rewrite Systems,” Theoretical Computer Science 175, no. 1 (March 1997): 127–58, https://doi.org/10.1016/S0304-3975(96)00172-7.
[^TermRW]: Nachum Dershowitz, “Termination of Rewriting,” Journal of Symbolic Computation 3, no. 1–2 (February 1987): 69–115, https://doi.org/10.1016/S0747-7171(87)80022-6.
[^BinRel]: "Binary relation", https://en.wikipedia.org/wiki/Binary_relation.
[^BoolAlg]: "Boolean algebra", https://en.wikipedia.org/wiki/Boolean_algebra.
[^Logic]: "Logic", https://en.wikipedia.org/wiki/Logic.
[^GLT]: "Ground and Linear Terms", https://en.wikipedia.org/wiki/Term_(logic)#Ground_and_linear_terms.
[^T]: "Term (logic)", https://en.wikipedia.org/wiki/Term_(logic).
[^PropVar]: "Propositional variable", https://en.wikipedia.org/wiki/Propositional_variable.
[^Closure]: "Closure (mathematics)", https://en.wikipedia.org/wiki/Closure_(mathematics).
[^TransitiveClosure]: "Transitive closure", https://en.wikipedia.org/wiki/Transitive_closure.
[^TransitiveRelation]: "Transitive relation", https://en.wikipedia.org/wiki/Transitive_relation.
[^ReflectiveClosure]: "Reflective closure", https://en.wikipedia.org/wiki/Reflexive_closure.
[^ReflectiveRelation]: "Reflexive relation", https://en.wikipedia.org/wiki/Reflexive_relation.
[^SymmetricClosure]: "Symmetric closure", https://en.wikipedia.org/wiki/Symmetric_closure.
