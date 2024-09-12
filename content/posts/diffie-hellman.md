+++
title = 'Diffie-Hellman'
date = 2024-09-12T20:54:08+02:00
draft = true
+++
{{< katex >}}

## Introduction

In secure communication and cryptography, the **Diffie-Hellman**[^DH] (DH) key exchange is a method of securely exchanging cryptographic keys over a public channel.
It is named after **Whitfield Diffie** and **Martin Hellman**.
The protocol allow **two parties to share a secret key over an insecure channel**, without sending the secret key directly.
Instead messages are exchanged in such a way that the secret key can be derived.

## Mathematical Background

Before we dive into the algorithm, let's cover some mathematical concepts first.

### Modular Arithmetic

Initially we need to understand the basics of **modular arithmetic**[^ModArith].
It is a system of arithmetic for integers, where numbers "wrap around" upon reaching a certain value (the modulus) and start over from zero.
This is often taught in **discrete mathematics** and **number theory courses**.
It is a **fundamental concept in cryptography**.

{{< figure src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Clock_group.svg/1200px-Clock_group.svg.png" width="400" caption="Adding 4 in mod 12 visualized on a clock." >}}

### Modular Exponentiation

The algorithm in the DH protocol uses **modular exponentiation**[^ModExp] to compute its keys.
It is a type of *exponentiation performed over a modulus*, meaning that the result is always in the range \\([0, p-1]\\) for a prime number \\(p\\).
Exponentiation in modular arithmetic involves computing the remainder when a number is raised to a power and divided by a modulus:

\\[a^b \mod p\\]

For example,&nbsp; \\(3^4 \mod 5\\),&nbsp; because \\(3^4 = 81\\), we get the remainder \\(81 \mod 5 \equiv 1\\).

Now, if I were to ask you which power \\(b\\) I started with to get to 1 using \\(a = 3\\) and \\(p = 5\\)? \
**You would have to randomly test all powers** until you find the correct one.
This is the essence of the **discrete logarithm problem**.

### Discrete Logarithm Problem

The **discrete logarithm problem**[^DiscLog] is the basis for the security of the Diffie-Hellman key exchange.
Finding the exponent \\(x\\) in the equation \\(g^x = A \mod p\\) is computationally infeasible for large numbers.
No efficient classical algorithm is known for computing discrete logarithms in general. In fact, it is an exponential-time algorithm.[^DiscLog]

## Algorithm

The algorithm is based on the **discrete logarithm problem**.
As it is very hard to solve for large numbers, the algorithm is considered cryptographically secure if the parameters are chosen correctly.

{{< mermaid >}}
sequenceDiagram
    actor Alice
    participant Internet
    actor Bob

    Alice->>Bob: p and g
    Note over Internet: p = prime number &nbsp;and &nbsp; g = generator
    Note right of Alice: a = random()<br/>A = g^a mod p
    Alice->>Bob: A
    Note left of Bob: b = random()<br/>B = g^b mod p
    Bob->>Alice: B
    Note over Alice, Bob: K = B^a mod p &nbsp; and &nbsp; K = A^b mod p
{{< /mermaid >}}

1. **Setup**: Alice and Bob agree on a **prime number \\(p\\)** and a **generator \\(g\\)**.
2. **Alice**: Alice randomly chooses a **secret number \\(a\\)** and computes \\(A = g^a \mod p\\).
3. **Bob**: Bob randomly chooses a **secret number \\(b\\)** and computes \\(B = g^b \mod p\\).
4. **Exchange**: Alice sends \\(A\\) to Bob and Bob sends \\(B\\) to Alice.
5. **Key**: Alice computes \\([K = B^a \mod p]\\) and Bob computes \\([K = A^b \mod p]\\).

**Now both Alice and Bob now share the same secret key \\(K\\)**.
The initial numbers **\\(p\\) and \\(g\\)**, and the generated **\\(A\\) and \\(B\\)** are **public** and can be shared over an insecure channel **without compromising the key \\(K\\)**.

> **Naming**\
> \\(p\\) and \\(g\\) are **public parameters**.
> Both \\(a\\) and \\(b\\) are kept secret, and are therefore called **private keys**.
> The numbers \\(A\\) and \\(B\\) are called **public keys**, as they gets sent over the public channel `Internet`.

[^DH]: [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) by Whitfield Diffie and Martin Hellman.
[^ModExp]: [Modular exponentiation](https://en.wikipedia.org/wiki/Modular_exponentiation) is a type of exponentiation performed over a modulus.
[^ModArith]: [Modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic) is a system of arithmetic for integers, where numbers "wrap around" upon reaching a certain value.
[^DiscLog]: The [discrete logarithm problem](https://en.wikipedia.org/wiki/Discrete_logarithm) is the problem of finding the exponent \\(x\\) in the equation \\(g^x = A \mod p\\).
