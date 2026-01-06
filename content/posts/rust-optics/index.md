+++
title = 'Profunctor Optics in Rust'
date = 2025-12-04T21:00:59+02:00
series = ["Understanding"]
series_order = 4
tags = ["rust", "optics", "functional programming"]
categories = ["computer science", "programming languages", "category theory"]
showHero = true
draft = false
+++
{{< katex >}}

## Introduction

For some time now, I've had an interest in learning more about category theory and its applications in functional programming.
Recently, I came across the concept of **profunctor optics**, which I found out to be super powerful abstractions for **manipulating data structures in a composable way**.
I'll admit that understanding profunctor optics was quite the challenge for me, especially when trying to grasp the underlying category theory concepts behind them and decode the dense academic notation used to explain them.
So that's why I decided to write this post, to share my journey of understanding profunctor optics, why they are useful and how to implement them in Rust.

In order to understand the following concepts, we first need to cover some basic category theory notation, terminology, and fundamental ideas.

### Morphisms and Functors

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

A **functor** $F$ is a **mapping between categories** that preserves the structure of the categories, meaning it maps *objects to objects* and *morphisms to morphisms* in a way that respects **composition** and **identity**.
This means that for any two morphisms $f: A \rarr B$ and $g: B \rarr C$, the functor $F$ obey the following rules:

1. **Composition Preservation**: $F(g \circ f) = F(g) \circ F(f)$
1. **Identity Preservation**: $F(id_A) = id_{F(A)}$

There are also two properties of functors regarding how they map objects and morphisms:

- **Object Mapping**: For every object $A$ in the source category, there is a corresponding object $F(A)$ in the target category.
- **Morphism Mapping**: For every morphism $f: A \rarr B$ in the source category, there is a corresponding morphism $F(f): F(A) \rarr F(B)$ in the target category. In Rust, functor morphism $F(f)$ is the `map` function.

These can be visualized by the following diagram:

{{< figure src="./diagrams/3.svg" alt="Abstract Functors" class="math-diagram" >}}

Notice how every object and morphism is mapped to a corresponding object and morphism in the target category, while preserving the composition of morphisms.
Going back to our Rust example, the `Option` type can be seen as a functor that **maps** a type $A$ to $Option(A)$, and a function $f: A \rarr B$ to a function `map` defining functor morphisms, as shown below:

$$
\text{map}_{Option}(f) \equiv Option(f) \ : \ Option(A) \rarr Option(B)
$$

```rust
let x: Option<i32> = Some(42);
let s: Option<String> = x.map(i32::to_string);
```

As seen in the code above, the `.map(f)` method applies the function `i32::to_string` to the value inside the `Option` without changing the structure of the `Option` itself.
A `map` method exists for all functor types such as `Option`, `Result`, `Vec`, etc.
The `Option` operations we did above can be visualized as a functor in the following commutative diagram which represents how a functor $Option$ preserves the structure of morphism/function $\text{to\\_string}$:

{{< figure src="./diagrams/4.svg" alt="Option Functor" class="math-diagram" >}}

### What Are Optics?

### What Is a Profunctor?

## Profunctor Optics

### Why Use Them?

### How to Implement Them

So, how would we go about implementing profunctor optics in idiomatic Rust?
We have discussed the theoretical background, benefits, and motivations, but now it's time to see how we can bring these concepts to life in code.

## Conclusion

---
{{< support >}}

<!----------------------------------------------------------------->
