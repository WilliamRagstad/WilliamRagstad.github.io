+++
title = 'Understanding Rewriting Systems'
date = 2024-04-12T21:00:59+02:00
draft = true
+++
{{< katex >}}

As I have not *yet* studied advanced theoretical computer science courses in subjects like type theory, logic, abstract algebra, category theory, and so on. \
I have recently been trying to learn the basics on my own.
Previous research attempts has time and time again led me back to the fundamentals of **rewriting systems**[^RW],
and I have decided to take a deeper dive into the basics to prepare myself for more advanced topics in the future.

> #### :exclamation: **Disclaimer**
>
> I am not an expert in the field in any way, this article is merely a collection of my notes and thoughts on the subject, and exists to help me understand the topic of rewriting systems better.
> This work will in no way be exhaustive, but rather a short personal exploration and self-study.

I will be using various resources, including books, papers and online articles to help me understand the topic better, and I hope you find this article helpful in your own learning journey as well.
A great book I have found on the subject is ***Term Rewriting and All That*** [^TRaAT] by *Franz Baader* and *Tobias Nipkow*.
I will use the terms abstract rewriting systems[^ARS] (ARS) and rewriting systems interchangeably, as I am not focusing on any specific type of rewriting system (Frankly, I am not sure if there is a difference between the two).

## What are Rewriting Systems?

A rewriting system is a formal system that consists of a set of rules that describe how to rewrite terms and are a fundamental concept in computer science, mathematics, and logic[^Logic].
They are used to model a wide range of *computational processes* and *reasoning* in for example *lambda calculus*[^LamCalc].
Rewriting systems are used in many areas of computer science, including programming languages, compilers, and automated theorem proving.
Some properties of abstract term rewriting systems are **termination**[^SimpleTerm][^TermRW], **confluence**[^Conf], **normalization**[^NF], **completion**[^Comp][^TRaAT] and **equivalence**[^Eq].

An abstract rewriting system *(ARS)* consists of a **set of elements**, **terms**[^T] made up from elements, and **binary relations**[^BinRel] on **terms**[^T] (rewrite rules).
The relation is denoted by \\( \rarr \\) and is called the **reduction** or **rewrite relation**[^ARS][^RW][^BinRel].
Though the relation is not performing any "reducing" action or computation in the traditional sense, it is merely a relation that describes how one term can be rewritten to another term.
The system is defined by a **set of rules** that describe how terms can be rewritten (transformed), and these rules are applied to terms to produce new terms.
Formally, **\\( (A, R) \\) is an abstract rewriting system** where **\\( A \\) is a set of elements** and **\\( R \\) is a set of rewrite relations** (rules) \\( R \subseteq A \times A \\).
Alternative notations for the system are \\( (A, \rarr) \\) where \\( \rarr \\) is the rewrite relation.

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

Let's consider a more complex example, a rewriting system that models **logic**[^Logic] and basics of **boolean algebra**[^BoolAlg].
The set of **elements** is \\( \lbrace \top, \bot \rbrace \\) where \\( \top \\) represents *true* and \\( \bot \\) represents *false*.
A **Term** \\( t \\) can be made up of literal elements and *propositional variables*[^PropVar] \\( p, q, r, \ldots \in V \\), formalized as \\( t ::= \top \mid \bot \mid V \mid \lnot t \mid t \land t \mid t \lor t \\).
The **rules**[^RW] represent **logical axioms**[^Logic], **logical equivalences**[^Eq] *and* **boolean algebra identities**[^BoolAlg], defined as:

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

This system models logical reasoning and can be used to prove theorems and derive new logical formulas, and is an example of how rewriting systems can be used in practice.

## Normal Forms

A term in **normal form**[^NF] (NF) is an irreducible, canonical representation of a term in a rewriting system.
That is, **no rewrite rules can be applied to the term to produce a new term**. Formally, if \\( (A, \rarr) \\) is an ARS, a **term \\( t \\)**, \\( t \in A \\) **is in normal form** if there is exists no other term \\( s \in A \\) such that \\( t \rarr s \\).

$$
\begin{align*}
t \text{ is in normal form} &\iff \nexists s \in A \text{ such that } t \rarr s \\\
\end{align*}
$$

A term is said to be **strongly normalizing** (SN) if all possible rewrites eventually terminate and reach some normal form.
An ARS is **strongly normalizing** if all terms in the system are strongly normalizing (terminating)[^NF][^Termination].

$$
\begin{align*}
& t \text{ is strongly normalizing} \iff \forall s \in A \\\
& \text{ such that } t \rarr^* s \text{, } s \text{ is in normal form} \\\
\end{align*}
$$

The denotation \\( t \rarr^* s \\) means that *there is* some sequence of rewrites transforming the term \\( t \\) to \\( s \\) *(including zero rewrites)*,
\\( t_0 \rarr t_1 \rarr \ldots \rarr t_n = s \\) where \\( n \geq 0 \\).

Normal forms are important because they provide a unique term used to compare for equivalence[^Eq] and to prove properties of the system.
In some systems, not all terms have a normal form, and the system is said to be **non-terminating**[^SimpleTerm][^TermRW][^Termination] and is the reason some rewriting systems are **non-deterministic** and **undecidable**[^RW].

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
