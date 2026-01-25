+++
title = 'An Introduction to Profunctor Optics'
date = 2025-12-04T21:00:59+02:00
series = ["Understanding"]
series_order = 4
tags = ["optics", "functional", "profunctors"]
categories = ["computer science", "programming", "category theory"]
showHero = true
draft = false
+++
{{< katex >}}

## Introduction

For some time now, I've had an interest in learning more about category theory and its applications in functional programming.
Recently, I came across the concept of **profunctor optics**, which I found out to be super powerful abstractions for **manipulating data structures in a composable way**.
I'll admit that understanding profunctor optics was quite the challenge for me, especially when trying to grasp the underlying category theory concepts behind them and decode the dense academic notation used to explain them.
So that's why I decided to write this post, to share my journey of understanding profunctor optics and why they are useful.
<!-- A separate follow-up post will cover concrete implementations. -->

In order to understand the following concepts, we first need to cover some basic category theory notation, terminology, and fundamental ideas.

### Morphisms

Briefly put, the **morphisms** $f$ and $g$ are structure-preserving mappings between two objects in the categories $A$ to $B$ and $B$ to $C$ respectively. Together, they can be composed to form a new morphism $g \circ f$ that maps directly from $A$ to $C$ as shown in the diagram below:

{{< figure src="./diagrams/2.svg" alt="Morphisms" class="math-diagram" >}}

A morphism can be seen as a **function** in a program that **map values of one type to another**.
For example, consider a function `to_string` taking an $Int$ and returning a $String$.

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">

```rust
let x: Int = 42;
let s: String = to_string(x);
```

$$
Int \xrightarrow{\quad\text{to\\_string}\quad} String
$$

</div>

### Functors

A **functor** $F$ is a **mapping between categories** that preserves the structure of the categories, meaning it maps *objects to objects* and *morphisms to morphisms* in a way that respects **composition** and **identity**.
This means that for any two morphisms $f: A \rarr B$ and $g: B \rarr C$, the functor $F$ obey the following rules:

1. **Composition Preservation**: $F(g \circ f) = F(g) \circ F(f)$
1. **Identity Preservation**: $F(id_A) = id_{F(A)}$

There are also two properties of functors regarding how they map objects and morphisms between the source and target categories:

- **Object Mapping**: For every object $A$ there is a corresponding object $F(A)$.
- **Morphism Mapping**: For every morphism $f: A \rarr B$ there is a corresponding morphism $F_f = F(f) = \text{fmap}_F(f)$, often called `map`.

$$
\begin{align*}
& f: A \rarr B \\\
& \Downarrow \\\
\text{fmap}_{F}(f) = \ & F(f) \ : \ F(A) \rarr F(B)
\end{align*}
$$

These can be visualized by the following diagram:

{{< figure src="./diagrams/3.svg" alt="Abstract Functors" class="math-diagram" >}}

Notice how every object and morphism is mapped to a corresponding object and morphism in the target category, while preserving the composition of morphisms.
As a concrete example, an *optional* type `Maybe`/`Option` can be seen as a functor that **maps** a type $A$ to $Option(A)$, and a function $f: A \rarr B$ to a function $\text{fmap}(f)$ (or `map`), defining functor morphisms:

$$
\text{fmap}_{Option}(f) \ : \ Option(A) \rarr Option(B)
$$

```rust
let x: Option<Int> = Some(42);
let s: Option<String> = x.map(to_string);
```

As seen in the code above, `.map(f)` applies the function `to_string` to the value inside `Option` without changing the container structure.
A `map`/`fmap` method must exist for all functor types such as `Maybe`/`Option`, `Result`/`Either`, `List`/`Vec`/`Array`, etc.
The mapping we did above can be visualized as a functor in the following commutative diagram which represents how a functor $Option$ preserves the structure of the morphism/function $\text{to\\\_string}$:

{{< figure src="./diagrams/4.svg" alt="Option Functor" class="math-diagram" >}}

### Profunctors

You might have seen some attempts to summarize the whole idea of profunctors in a single sentence similar to:

> "A **profunctor** *just* a bifunctor that is contravariant in its first argument and covariant in its second."

Which frankly **doesn't help much** if you don't already know what a *bifunctor* is, or what *covariance* and *contravariance* mean.
So, let me instead examine what it can do for us instead, by looking at its mapping properties more closely.
For functors, we saw how they map a single morphism $f: A \rarr B$ to another $F(f): F(A) \rarr F(B)$, otherwise known as $\text{fmap}_F(f)$. \
A **Profunctor** $P$ on the other hand is slightly more complex as it deals with **two morphisms** simultaneously, usually performing mappings using both $f$ and $g$ at once via $\text{dimap}_P(f, g)$. The Greek prefix **di-** is a shortened form of dis meaning "two, double, twice, twofold".

$$
\begin{align*}
& f: A \rarr B \\\
& g: A' \rarr B' \\\
& \Downarrow \\\
\text{dimap}_{P}(f, g) = \ & P(f, g) \ : \ P(A, B) \rarr P(A', B')
\end{align*}
$$

{{< figure src="./diagrams/5.svg" alt="Profunctor" class="math-diagram" >}}

## What Does Optics Mean?

In everyday programming, we constantly do some variation of reading a value from inside a larger structure, updating that value while keeping the rest of the structure intact, and composing such transformations to build bigger ones.

An **optic** is a small, reusable abstraction that packages this idea of *focusing* on some part(s) of a structure.
Concretely, an optic describes a relationship between a **whole** structure $S$ (and possibly an updated structure $T$) and a **focus** inside it $A$ (and possibly an updated focus $B$).

You will often see this written as $Optic\ S\ T\ A\ B$, which you can read as:

> “An optic lets me find an $A$ inside an $S$, and if I can turn that $A$ into a $B$, then I can turn the whole $S$ into a $T$.”

Different optics correspond to different shapes of data:
**Lenses** focus on *exactly one* part of a *product-like* structure (structs/tuples), **prisms** focus on *at most one* part of a *sum-like* structure (enums/variants), and **traversals** focus on *zero or more* parts inside containers (lists, trees, nested structures).

### Lenses

A **lens** is the optic you want when the focus is *always present*.
Think “field access”: a struct always has its fields.

At the level of operations, a lens gives you two things:

- a **getter**: $view : S \to A$
- a **setter**: $set : S \to B \to T$

It’s also common to talk about modifying the focus:

$$
over : (A \to B) \to (S \to T)
$$

where $over\ f$ means “apply $f$ to the focused part and rebuild the whole”.

For example, if $S$ is a `User` record and $A$ is the `email` field, then a lens for `email` lets you read the email and also update it without caring about the rest of the fields.

Lenses are usually expected to satisfy three laws (these are what make lenses feel *predictable*):

1. **Get-Put**: setting back what you just viewed changes nothing.
	$$ set\ s\ (view\ s) = s $$
2. **Put-Get**: if you set a value and then view, you get the value you set.
	$$ view\ (set\ s\ b) = b $$
3. **Put-Put**: setting twice is the same as only keeping the last set.
	$$ set\ (set\ s\ b_1)\ b_2 = set\ s\ b_2 $$

These laws are not about category theory for its own sake; they are simply the reason you can trust a lens-based update pipeline to behave like “normal field update”.

### Prisms

A **prism** is the optic you want when the focus is *optional* because the structure is a *choice*.
Think “enum variant”: a value is *one* of several constructors.

Operationally, prisms are described by:

- a **matcher** (sometimes called `preview`): $match : S \to Option\ A$
- a **builder** (often called `review`): $build : B \to T$

Intuitively:

- `match` tries to zoom in on the desired variant and extract its payload.
- `build` injects a payload back into the sum type.

For example, in an enum `Result<A, E>`, a prism for the `Ok` case can extract the `A` if it is present, and can also build a new `Ok` from a value.

Prisms also have laws. One clean way to state them is:

1. **Build-Match**: if you build and then match, you succeed and get back what you built.
	$$ match\ (build\ b) = Some\ b $$
2. **Match-Build**: if matching succeeds, rebuilding the extracted value gives you back the same structure.
	$$ match\ s = Some\ a \implies build\ a = s $$

This second law encodes the idea that the prism targets a *specific* variant in a lossless way: if you successfully recognized the variant, rebuilding it should reproduce the original value.

### Traversals

A **traversal** is the optic you want when there may be **many** focuses.
Think “all elements in a list”, “all leaves in a tree”, or “all `Some` values inside nested options”.

Traversals generalize the idea of “map, but through a structure you don’t want to manually recurse through”.
Instead of focusing on exactly one part (lens) or maybe one part (prism), a traversal focuses on **zero or more** parts.

The core operation is “apply an effectful transformation to every focus and rebuild the whole”.
In functional programming this is often expressed using an *applicative* functor; conceptually:

$$
traverse : (A \to F\ B) \to (S \to F\ T)
$$

If you choose $F$ to be the identity functor, this reduces to a pure mapping over the focuses.
If you choose $F$ to collect logs, short-circuit, or accumulate errors, the same traversal can do all of those things while still rebuilding the final structure.

Traversals come with laws too; the most important ones are “do nothing does nothing” and “composition behaves like composition”. In practice, the laws are what justify treating traversals as a principled abstraction rather than a fancy loop.

## Profunctor Optics

So far, we have described lenses, prisms, and traversals in terms of the operations they support.
That is useful, but it has a downside: each optic *kind* tends to have its own representation and its own composition story.

**Profunctor optics** solve this by giving a *single* representation for many optic kinds.
Instead of saying “a lens is a getter + setter”, we say:

> “An optic is something that transforms one profunctor into another.”

The standard profunctor optic encoding looks like this (often shown in Haskell-like notation):

$$
Optic\ S\ T\ A\ B \;\cong\; \forall p.\; C\ p \Rightarrow p\ A\ B \to p\ S\ T
$$

Read it as:
pick a profunctor $p$ (that supports some capability $C$), assume you can transform $A$ to $B$ inside $p$ (that is $p\ A\ B$), and then the optic tells you how to get a transformation from $S$ to $T$ inside the same $p$.

This is where the earlier `dimap` becomes relevant: the optic is essentially a structured way of pre- and post-processing a transformation.
It “routes” the transformation through the larger structure.

Different optic kinds correspond to different additional capabilities on $p$:
A **lens** corresponds to profunctors that can move through *products* (pairs/structs), which is usually called `Strong`. A **prism** corresponds to profunctors that can move through *sums* (either/enums), which is usually called `Choice`. A **traversal** corresponds to profunctors that can move through *many* elements in a structure, which is often packaged as `Wander`.

You do not need to memorize those names to get the intuition:
`Strong` means “I can apply a transformation to one part of a pair and keep the other part untouched.” `Choice` means “I can apply a transformation to one branch of an either, and leave the other branch alone.” `Wander` means “I can apply a transformation to every focus inside some traversable shape and rebuild it.”

Once you have this encoding, an optic becomes a *single* function that works for any profunctor with the right structure.
That is what gives profunctor optics their power: the optic is independent of how you later interpret it.

### Why Use Them?

Profunctor optics can look abstract, but the payoff is significant!

| Optic kind | Encoding              | Capability on $p$ | Intuition                     |
| ---------- | --------------------- | :---------------: | ----------------------------- |
| Lens       | $p\ A\ B \to p\ S\ T$ |     `Strong`      | act on one part of a product  |
| Prism      | $p\ A\ B \to p\ S\ T$ |     `Choice`      | act on one branch of a sum    |
| Traversal  | $p\ A\ B \to p\ S\ T$ |     `Wander`      | act on all focuses in a shape |

From that one encoding you get:

1. **Uniform representation**: Lenses, prisms, and traversals can all be represented in one shape $p\ A\ B \to p\ S\ T$, only different profunctor *capabilities* are required.
2. **Type-directed composition**: Optics become function transforming profunctors, then composing optics is just ordinary function composition. Their enclosed types ensure only compatible optics are composable.
3. **Multiple interpretations**: **Different $p$ give different behavior** (*get/set update* vs *query/fold* vs *effectful traversal*) **without rewriting the same optic**.

## Conclusion

Without optics, a lot of code ends up reimplementing the same shape of “dig in, modify, rebuild” for many different structures.
Optics let you name these focuses once and reuse them everywhere.
In a follow-up post, we’ll translate this idea into a concrete implementation and see what an idiomatic design looks like.
**Stay tuned!**

---
{{< support >}}

<!----------------------------------------------------------------->
