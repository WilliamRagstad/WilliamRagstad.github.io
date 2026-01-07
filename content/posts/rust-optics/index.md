+++
title = 'Profunctor Optics in Rust'
date = 2025-12-04T21:00:59+02:00
series = ["Understanding"]
series_order = 4
tags = ["rust", "optics", "functional programming"]
categories = ["computer science", "programming languages", "category theory"]
showHero = true
draft = true
+++
{{< katex >}}

## Introduction

For some time now, I've had an interest in learning more about category theory and its applications in functional programming.
Recently, I came across the concept of **profunctor optics**, which I found out to be super powerful abstractions for **manipulating data structures in a composable way**.
I'll admit that understanding profunctor optics was quite the challenge for me, especially when trying to grasp the underlying category theory concepts behind them and decode the dense academic notation used to explain them.
So that's why I decided to write this post, to share my journey of understanding profunctor optics, why they are useful and how to implement them in Rust.

In order to understand the following concepts, we first need to cover some basic category theory notation, terminology, and fundamental ideas.

### Morphisms

Briefly put, the **morphisms** $f$ and $g$ are structure-preserving mappings between two objects in the categories $A$ to $B$ and $B$ to $C$ respectively. Together, they can be composed to form a new morphism $g \circ f$ that maps directly from $A$ to $C$ as shown in the diagram below:

{{< figure src="./diagrams/2.svg" alt="Morphisms" class="math-diagram" >}}

A morphism can be seen as a **function** in a program that **map values of one type to another**.
For example, consider the function `to_string` method taking an $i32$ and returning it as a $String$.

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;">

```rust
let x: i32 = 42;
let s: String = x.to_string();
```

$$
i32 \xrightarrow{\quad\text{to\\\_string}\quad} String
$$

</div>

### Functors

A **functor** $F$ is a **mapping between categories** that preserves the structure of the categories, meaning it maps *objects to objects* and *morphisms to morphisms* in a way that respects **composition** and **identity**.
This means that for any two morphisms $f: A \rarr B$ and $g: B \rarr C$, the functor $F$ obey the following rules:

1. **Composition Preservation**: $F(g \circ f) = F(g) \circ F(f)$
1. **Identity Preservation**: $F(id_A) = id_{F(A)}$

There are also two properties of functors regarding how they map objects and morphisms between the source and target categories:

- **Object Mapping**: For every object $A$ there is a corresponding object $F(A)$.
- **Morphism Mapping**: For every morphism $f: A \rarr B$ there is a corresponding morphism $F_f = F(f) = \text{fmap}_F(f)$, or the `map` method in Rust.

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
Going back to our Rust example, the `Option` type can be seen as a functor that **maps** a type $A$ to $Option(A)$, and a function $f: A \rarr B$ to a function $\text{fmap}(f)$, or `map` in Rust, defining functor morphisms:

$$
\text{fmap}_{Option}(f) \ : \ Option(A) \rarr Option(B)
$$

```rust
let x: Option<i32> = Some(42);
let s: Option<String> = x.map(i32::to_string);
```

As seen in the code above, the `.map(f)` method applies the function `i32::to_string` to the value inside the `Option` without changing the structure of the `Option` itself.
A `map` method exists for all functor types such as `Option`, `Result`, `Vec`, etc.
The `Option` operations we did above can be visualized as a functor in the following commutative diagram which represents how a functor $Option$ preserves the structure of morphism/function $\text{to\\\_string}$:

{{< figure src="./diagrams/4.svg" alt="Option Functor" class="math-diagram" >}}

### Profunctors

You might have seen some attempts to summarize the whole idea of profunctors in a single sentence similar to:

> "A **profunctor** *just* a bifunctor that is contravariant in its first argument and covariant in its second."

Which frankly **doesn't help much** if you don't already know what a *bifunctor* is, or what *covariance* and *contravariance* mean.
So, let me instead examine what it can do for us by looking at its functional mapping properties more closely.
For functors, we saw how they map a single morphism $f: A \rarr B$ to another $F(f): F(A) \rarr F(B)$, otherwise known as $\text{fmap}_F(f)$.

A **Profunctor** $P$, on the other hand, is a bit more complex as it deal with **two morphisms** simultaneously, performing mappings using $f$ and $g$ at once via $\text{dimap}_P(f, g)$. The Greek prefix **di-** is a shortened form of dis meaning "two, double, twice, twofold".


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

### Lenses

### Prisms

### Traversals

## Profunctor Optics

### Why Use Them?

## Profunctor Optics in Rust

So, how would we go about implementing profunctor optics in idiomatic Rust?
We have discussed the theoretical background, benefits, and motivations, but now it's time to see how we can bring these concepts to life in code.

## Conclusion

---
{{< support >}}

<!----------------------------------------------------------------->
