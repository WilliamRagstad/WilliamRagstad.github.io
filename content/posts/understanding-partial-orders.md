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

This article is part of a series on understanding mathematical concepts.
In this post, we will explore the concept of partial orders and their properties.
The reason I started investigating this topic is because I watched a talk by **Emily Riehl** on [A categorical view of computational effects](https://www.youtube.com/watch?v=Ssx2_JKpB3U&t=1030s), where she mentioned that *"omega complete partial orders are a category relevant to computer science"*. This intrigued me, and I wanted to understand more about partial orders and their properties.

## Introduction

Partial orders are a fundamental concept in mathematics and computer science.
They are used to model relationships between elements of a set.
Understanding partial orders is essential for understanding more advanced topics in mathematics and computer science.
Partial orders are used in various fields, such as order theory, set theory, and category theory.
They are also used in computer science to model data structures, algorithms and computational effects in programming languages.

A **partially ordered set** (or **poset** for short) is an ordered pair \\(P = (X, \leq)\\) consisting of a **set \\(X\\)** (called the ground set of \\(P\\)) and a partial order **relation \\(\leq\\) on \\(X\\)**.
The names \\(X\\) and \\(P\\) where arbitrarily chosen, and the symbol \\(\leq\\) is commonly used to denote the partial order relation.

## Partial Order

In a **weak**, **reflexive**, **non-strict partial order**, or simply a *regular* **partial order**, the relation \\(\leq\\) is a binary relation on \\(X\\) that satisfies the following properties:[^PartiallyOrderedSet][^PartialOrder_Wolfram]

\\(\forall a \in X\\):

- **Reflexivity**: \\(a \leq a\\)
- **Antisymmetry**: if \\(a \leq b\\) and \\(b \leq a\\) then \\(a = b\\)
- **Transitivity**: if \\(a \leq b\\) and \\(b \leq c\\) then \\(a \leq c\\)

Often there also exist **a minimum element** \\(\exists m \in X\\) such that \\(\forall a \in X\\), \\(m \leq a\\).

<!----------------------------------------------------------------->

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
