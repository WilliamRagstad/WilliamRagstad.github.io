+++
title = 'Understanding Partial Orders'
date = 2024-04-18T20:54:27+02:00
series = ['Understanding']
series_order = 2
tags = ["order theory", "partial orders", "relations", "lattices"]
categories = ["mathematics"]
draft = true
+++
{{< katex >}}
<command- for-all="span.katex-mathml" remove-element defer>

This article is part of a series on understanding mathematical concepts.
In this post, we will explore the concept of partial orders and their properties.
The reason I started investigating this topic is because I watched a talk by **Emily Riehl** on [A categorical view of computational effects](https://youtu.be/Ssx2_JKpB3U?t=601), where she mentioned that *"omega complete partial orders is a category relevant to computer science"*. Also in another talk by **Eugenia Cheng** on [Category Theory in Life](https://youtu.be/ho7oagHeqNc?t=919), she mentioned that the factors of numbers like 30, 42, and 56 can be generalized and *"fit together in the same cube structure which is otherwise known as a partially ordered set, but it's also an example of a category with arrows as morphisms"*.
This intrigued me, and I wanted to understand more about partial orders and their properties.

<!----------------------------------------------------------------->

## Introduction
<!-- Briefly define what partial orders are and their significance in mathematics and computer science. -->

Partial orders are described in a branch of mathematics called **order theory**, and lay the foundation for understanding more advanced topics in mathematics and computer science.[^OrderTheory][^ListOfOrderTheoryTopics]
They are used to **model relationships between elements of a set**.
Partial orders are used in various fields, such as set theory, and category theory.
But also in computer science to model data structures, algorithms, scheduling tasks, and computational effects in programming languages for example.

<!----------------------------------------------------------------->

## Definitions
<!--
    - Define the terms used in the context of partial orders.
    - Explain the defining properties of partial orders: reflexivity, antisymmetry, and transitivity.
    - Discuss the concept of posets (partially ordered sets).
    - Cover Relations
    - Chains
    - Lattices
    - Complete Partial Orders
    - Total Orders
    - Preorders
    - Strict Partial Orders
    - Weak Orders
    - Complete Lattices
-->

A **partially ordered set** (or **poset** for short) described an ordered pair **\\(P = (X, \leq)\\)** consisting of a **set \\(X\\)** (called the ground set of \\(P\\)) and a partial order **relation \\(\leq\\) on \\(X\\)**.[^PartiallyOrderedSet][^PartialOrder_Wolfram]
The names \\(X\\) and \\(P\\) where arbitrarily chosen, and the symbol \\(\leq\\) is *commonly* used to denote a partial order relation.

Often there also exist **a minimum element** \\(\exists m \in X\\) such that: \\(\forall a \in X\\), \\(m \leq a\\).

### Weak Partial Order

In a **weak**, **reflexive**, **non-strict partial order**, or simply a *regular* **partial order**, the relation \\(\leq\\) is a binary relation on \\(X\\) satisfying the properties:[^PartiallyOrderedSet][^PartialOrder_Wolfram] \
\\(\forall a \in X\\):

- **Reflexivity**: \\(a \leq a\\)
- **Antisymmetry**: if \\(a \leq b\\) and \\(b \leq a\\) then \\(a = b\\)
- **Transitivity**: if \\(a \leq b\\) and \\(b \leq c\\) then \\(a \leq c\\)

### Strong Partial Order

In a **strong**, **irreflexive**, or **strict partial order**, the relation \\(<\\) is a binary relation on \\(X\\) that satisfying the properties:[^StrictPartialOrder][^PartialOrder_Wolfram][^PartiallyOrderedSet] \
\\(\forall a \in X\\):

- **Irreflexivity**: \\(a \nless a\\)
- **Asymmetry**: if \\(a < b\\) then \\(b \nless a\\)
- **Transitivity**: if \\(a < b\\) and \\(b < c\\) then \\(a < c\\)

<!----------------------------------------------------------------->

## Notation
<!--
    - Discuss the notation used to represent partial orders.
    - Hasse Diagrams
    - Cover Relations
-->

<!----------------------------------------------------------------->

## Examples
<!--
    - Provide examples of partial orders.
    - Discuss the properties of the examples.
    - Provide common examples of partial orders in daily mathematics and theoretical computer science.
    - Explain how partial orders relate to other mathematical structures like lattices and chains.
-->

<!----------------------------------------------------------------->

## Properties
<!--
    - Discuss the properties of partial orders.
    - Explore important properties such as the existence of least upper bounds and greatest lower bounds.
    - Discuss conditions under which these bounds exist.
    - Explain the significance of the properties in mathematics and computer science.
    - Discuss the relationship between partial orders and other mathematical structures.
    - Discuss the properties of partial orders in relation to lattices, chains, complete partial orders, total orders, preorders, strict partial orders, and weak orders.
-->

<!----------------------------------------------------------------->

## Applications
<!--
    - Discuss the applications and significance of partial orders in mathematics and computer science.
    - Explore how partial orders are used to model relationships between elements of a set.
    - Discuss how partial orders are used in data structures, algorithms, and computational effects in programming languages.
    - Explain how partial orders are used in category theory and set theory.
    - Illustrate how partial orders are used in data structure organization, scheduling tasks, and other computer science applications.
-->

<!----------------------------------------------------------------->

## Advanced Topics
<!--
    - Introduce concepts of complete partial orders and their relevance in theoretical computer science, particularly in domain theory and fixed point theorems.
-->

<!----------------------------------------------------------------->

## Conclusion
<!--
    - Summarize the key points discussed in the article.
    - Discuss the significance of understanding partial orders in mathematics and computer science.
    - Provide references for further reading on the topic.
    - Summarize the importance of understanding partial orders and potential areas of further research or application.
    - Conclude with a call to action for readers to explore the topic further.
    - Provide a list of references and resources for further reading.
    - Acknowledge the contributions of researchers and authors in the field of order theory and partial orders.
    - Thank the readers for their time and interest in the topic.
-->

<!----------------------------------------------------------------->

[^PartiallyOrderedSet]: "Partially Ordered Set", https://en.wikipedia.org/wiki/Partially_ordered_set.
[^ListOfOrderTheoryTopics]: "List of Order Theory Topics", https://en.wikipedia.org/wiki/List_of_order_theory_topics.
[^OrderTheory]: "Order Theory", https://en.wikipedia.org/wiki/Order_theory.
[^Preorder]: "Preorder", https://en.wikipedia.org/wiki/Preorder.
[^TotalOrder]: "Total Order", https://en.wikipedia.org/wiki/Total_order.
[^StrictPartialOrder]: "Strict Partial Order", https://en.wikipedia.org/wiki/Strict_partial_order.
[^WeakOrder]: "Weak Order", https://en.wikipedia.org/wiki/Weak_order.
[^CompleteLattice]: "Complete Lattice", https://en.wikipedia.org/wiki/Complete_lattice.
[^Lattice]: "Lattice", https://en.wikipedia.org/wiki/Lattice_(order).
[^CompletePartialOrder]: "Complete Partial Order", https://en.wikipedia.org/wiki/Complete_partial_order.
[^PartialOrder_Wolfram]: "Partial Order", https://mathworld.wolfram.com/PartialOrder.html
