+++
title = 'Formal Verification'
date = 2024-04-20T22:06:23+02:00
series = ['Understanding']
series_order = 3
tags = ["program verification", "formal verification", "software verification", "software correctness", "formal methods", "software engineering"]
categories = ["computer science", "programming"]
draft = true
+++
{{< katex >}}

This article is part of a series on understanding different concepts in computer science and software engineering.
In this post, we will explore the concept of program verification.
The reason I started investigating this topic is because I read a paper by **Tony Hoare** on [An Axiomatic Basis for Computer Programming](https://www.cs.cmu.edu/~crary/819-f09/Hoare69.pdf), where he mentioned that *"the purpose of program verification is to demonstrate the correctness of a program with respect to a specification"*.

- https://en.wikipedia.org/wiki/Formal_verification
- https://en.wikipedia.org/wiki/Software_verification
- https://www.youtube.com/watch?v=j2m5YMnHvQQ
- What difference is there between formal verification and program verification?
- Is testing a form of program verification?
- What are some tools used for program verification?
- What are the limitations of program verification?
- How does program verification relate to formal methods in software engineering?
- What are some examples of successful program verification projects?
- What are some common challenges faced in program verification?
- What are the different approaches to program verification?

## Introduction

Program verification is the process of proving that a program satisfies a specification.
The specification can be a formal description of the program's behavior, such as preconditions, postconditions, and invariants.
The goal of program verification is to ensure that the program behaves correctly under all possible inputs and conditions.
