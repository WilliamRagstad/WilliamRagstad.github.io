+++
title = 'Understanding Rewriting Systems'
date = 2024-04-12T21:00:59+02:00
draft = true
+++
{{< katex >}}

As I *yet* have not studied advanced theoretical computer science, type theory, logic, etc.
I have recently been trying to learn the basics on my own.
Previous attempts on researching other subjects has time and time again led me back to **rewriting systems**[^RW],
and I have decided to take a deeper dive into the basics to prepare myself for more advanced topics in the future.

> #### :exclamation: **Disclaimer**
>
> - I am not an expert in the field in any way, this article is merely a collection of my notes and thoughts on the subject, and exists to help me understand the topic of rewriting systems better.
> - I will use terms abstract rewriting systems[^ARS] (ARS) and rewriting systems interchangeably, as I am not focusing on any specific type of rewriting system (Frankly, I am not sure if there is a difference between the two terms).
> - This work will in no way be exhaustive, but rather a short personal exploration and self-study.

I will be using various resources, including books, papers and online articles to help me understand the topic better, and I hope you find this article helpful in your own learning journey as well.
A great book I have found on the subject is ***Term Rewriting and All That*** [^TRaAT] by *Franz Baader* and *Tobias Nipkow*, I may refer to it as TRaAT moving forward.

## What are Rewriting Systems?

A rewriting system is a formal system that consists of a set of rules that describe how to rewrite terms and are a fundamental concept in computer science, mathematics, and logic.
They are used to model a wide range of *computational processes* and *reasoning* in for example *lambda calculus*[^LamCalc].
Rewriting systems are used in many areas of computer science, including programming languages, compilers, and automated theorem proving.
Some properties of abstract term rewriting systems are **termination**[^SimpleTerm][^TermRW], **confluence**[^Conf], **normalization**[^NF], **completion**[^Comp][^TRaAT] and **equivalence**[^Eq].

A rewriting system consists of a **set of elements** (terms/objects) and a **binary relation** on these elements.
The relation is denoted by \\( \rarr \\) and is called the **reduction** or **rewrite relation**[^ARS][^RW][^BinRel].
Though the relation is not performing any "reducing" action or computation in the traditional sense, it is merely a relation that describes how one term can be rewritten to another term.
The system is defined by a **set of rules** that describe how terms can be rewritten (transformed), and these rules are applied to terms to produce new terms.

### Example (A, B, C)

Consider the following rewriting system with the set of elements \\( \lbrace a, b, c \rbrace \\) and the rules:

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
 a -.->|Transitive| c
{{< /mermaid >}}

In this system, the term \\( a \\) can be rewritten to \\( b \\) and \\( b \\) can be rewritten to \\( c \\).
The term \\( a \\) can be rewritten to \\( c \\) by applying the rules \\( a \rarr b \\) and \\( b \rarr c \\) in sequence.
This is an example of a simple rewriting system, and more complex systems can be defined with more elements and rules.

### Example (Logic)

Let's consider a more complex example, a rewriting system that models logical reasoning.
The set of elements is \\( \lbrace \top, \bot, p, q, r \rbrace \\) where \\( \top \\) represents *true* and \\( \bot \\) represents *false*, and the rules are[^RW]:

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

This system models logical reasoning and can be used to prove theorems and derive new logical formulas, and is an example of how rewriting systems can be used in practice.

<!--
This article exists to help myself dig into the topic of abstract rewriting systems, normalizations, confluence and termination.
and the normal forms that can be derived from them. I will be using the book "Term Rewriting and All That" by Franz Baader and Tobias Nipkow as a guide.
understand the concept of normal forms in rewriting systems. It is a concept that is often misunderstood, but it is crucial to understand if you want to work with rewriting systems. In this article, we will explain what normal forms are, why they are important, and how they can be used in practice.
-->

[^RW]: "Rewriting Systems", https://en.wikipedia.org/wiki/Rewriting.
[^ARS]: “Abstract Rewriting System”, https://en.wikipedia.org/wiki/Abstract_rewriting_system.
[^Conf]: “Confluence”, https://en.wikipedia.org/wiki/Confluence_(abstract_rewriting).
[^Comp]: “Completion (logic)”, https://en.wikipedia.org/wiki/Completeness_(logic).
[^Eq]: “Equivalence (logic), https://en.wikipedia.org/wiki/Logical_equivalence.
[^NF]: “Normal form”, https://en.wikipedia.org/wiki/Normal_form_(abstract_rewriting).
[^TRaAT]: "Term Rewriting and All That" by *Franz Baader* and *Tobias Nipkow*. Find the book on [Cambridge Core](https://www.cambridge.org/core/books/term-rewriting-and-all-that/71768055278D0DEF4FFC74722DE0D707) or [Cambridge University Press](https://www.cambridge.org/9780521779203).
[^LamCalc]: "Lambda calculus", https://en.wikipedia.org/wiki/Lambda_calculus.
[^SimpleTerm]: Aart Middeldorp and Hans Zantema, “Simple Termination of Rewrite Systems,” Theoretical Computer Science 175, no. 1 (March 1997): 127–58, https://doi.org/10.1016/S0304-3975(96)00172-7.
[^TermRW]: Nachum Dershowitz, “Termination of Rewriting,” Journal of Symbolic Computation 3, no. 1–2 (February 1987): 69–115, https://doi.org/10.1016/S0747-7171(87)80022-6.
[^BinRel]: "Binary relation", https://en.wikipedia.org/wiki/Binary_relation.
