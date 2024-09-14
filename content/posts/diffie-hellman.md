+++
title = 'Diffie-Hellman'
date = 2024-09-12T20:54:08+02:00
series = ['Understanding']
series_order = 4
tags = ["key exchange", "security", "cryptography", "verification", "digital signatures"]
categories = ["computer science", "mathematics"]
draft = false
+++
{{< katex >}}

## Introduction

In secure communication and cryptography, the **Diffie-Hellman**[^DH] (DH) key exchange is a method of securely exchanging cryptographic keys over a public channel.
It is named after **Whitfield Diffie** and **Martin Hellman**.
The protocol allow **two parties to share a secret key over an insecure channel**, without sending the secret key directly.
Instead messages are exchanged in such a way that the secret key can be derived.

## Background

Let's begin with explaining some fundamental concepts used when calculating keys in the protocol.

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

For example, &nbsp;\\(3^4 \mod 5\\),&nbsp; because \\(3^4 = 81\\), we get the remainder &nbsp;\\(81 \mod 5 \equiv 1\\).

Now, if I were to ask you which power \\(b\\) I started with to get to 1 using \\(a = 3\\) and \\(p = 5\\)? \
**You would have to test a lot of exponents \\(b\\)** until you find the *correct one*.
This is the essence of the **discrete logarithm problem**.

### Discrete Logarithm Problem

The **discrete logarithm problem**[^DiscLog] is the basis for the security of the Diffie-Hellman key exchange.
Finding the exponent \\(x\\) in the equation &nbsp;\\(g^x = A \mod p\\)&nbsp; is **computationally infeasible** for large numbers.
**No efficient classical algorithm is known** for computing discrete logarithms in general. In fact, it is an exponential-time algorithm.[^DiscLog]
Given this, the set of all integers \\( a \\) satisfying \\( A \equiv g^a \mod p \\) can be expressed using the discrete logarithm:

\\[
a \equiv \log_g A \mod \text{ord}_p(g)
\\]

The multiplicative order of \\( g \\) modulo \\( p \\), denoted as \\( \text{ord}_p(g) \\), is the smallest positive integer \\( n \\) such that \\( g^n \equiv 1 \mod p \\). This order \\( n \\) divides \\( p - 1 \\) because the multiplicative group of integers modulo \\( p \\) is cyclic of order \\( p - 1 \\).
Further analysis for **why this problem is hard** can be found in the [Wikipedia article](https://en.wikipedia.org/wiki/Discrete_logarithm).

## Algorithm

The algorithm is based on the **discrete logarithm problem**.
As it is very hard to solve for large numbers, the algorithm is considered cryptographically secure if the parameters are chosen correctly.

{{< mermaid >}}
sequenceDiagram
    actor Alice
    participant Internet
    actor Bob

    Note over Internet: Select a prime number p, and generator g
    Alice->>Bob: p, g
    Note right of Alice: a = random()<br/>A = g^a mod p
    Alice->>Bob: A
    Note left of Bob: b = random()<br/>B = g^b mod p
    Bob->>Alice: B
    Note over Alice, Bob: K = B^a mod p &nbsp; and &nbsp; K = A^b mod p
{{< /mermaid >}}

*Short explanation of the steps above:*

1. **Setup**: Alice and Bob agree on a **prime number \\(p\\)** and a **generator \\(g\\)**.
2. **Alice**: Alice randomly chooses a **secret number \\(a\\)** and computes &nbsp;\\(A = g^a \mod p\\).
3. **Bob**: Bob randomly chooses a **secret number \\(b\\)** and computes &nbsp;\\(B = g^b \mod p\\).
4. **Exchange**: Alice sends \\(A\\) to Bob and Bob sends \\(B\\) to Alice.
5. **Key**: Alice computes &nbsp;\\(K = B^a \mod p\\)&nbsp; and Bob computes &nbsp;\\(K = A^b \mod p\\).

> **Naming**\
> \\(p\\) and \\(g\\) are **public parameters**.
> Both \\(a\\) and \\(b\\) are kept secret, and are therefore called **private keys**.
> The numbers \\(A\\) and \\(B\\) are called **public keys**, as they gets sent over the public channel `Internet`.

**Alice and Bob now share the same secret key \\(K\\) without anyone eavesdropping knowing it!**
The initial numbers **\\(p\\) and \\(g\\)**, and the generated **\\(A\\) and \\(B\\)** are **public** and can be shared over an insecure channel **without compromising the key \\(K\\)**.

## Multi-party

It is possible to extend this protocol to more than two parties where each agrees on the same \\(p\\) and \\(g\\) and each party chooses a secret key and computes a public key.
The same steps are followed as in the two-party case, but the key is computed with the public keys of all the parties involved and **share the same secret key \\( K = g^{a b c} \mod p \\).**[^DH]

## Drawbacks

Everything is fine until **Charles** comes into the picture.
He is **not only eavesdropping** but also **actively manipulating the messages**.
This is called a **Man-in-the-Middle** (MitM) attack.
The Diffie-Hellman protocol is **vulnerable** to this because Charles can **generate his own keys**, and **forward the messages** to each of the other parties separately, without them knowing.
By doing so, he can **decrypt and read the messages**, **alter them**, and **re-encrypt** them before sending them on to the intended recipient, thereby compromising the encryption and the security of the communication.

### Solution

The fundamental issue is that the parties **cannot verify the authenticity** of the public keys they receive.
That is, **Bob cannot be 100% sure** that the public key he receives is actually from Alice.

Both Alice and Bob need to agree to trust some **third party** to verify the authenticity of the public keys.
This is done via a **digital signature** provided by a **certificate authority** (CA).
Before Alice and Bob exchange their public keys, they send them to the CA to be signed.
After receiving the **signed public keys**, Alice and Bob use the CA to verify them, and proceeding with the key exchange if they are authentic.

Alternatively, sharing Alice and Bobs public keys ahead of time through a safe channel (like meeting in real life, face to face) is always the best.
This is called **pre-shared keys**.

## Applications

Diffie-Hellman is vastly used in many cryptographic protocols such as **TLS/SSL**, **SSH**, **IPsec**, and **PGP**.
The main benefit comes from the **forward secrecy** provided by the protocol, as new keys gets generated for each unique session.
This makes it **more difficult** for an attacker to decrypt past sessions if the current key is compromised.
A common solution to MitM attacks is to use **digital signatures** to verify the identity of the parties involved as mentioned previously.

[^DH]: [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) by Whitfield Diffie and Martin Hellman.
[^ModExp]: [Modular exponentiation](https://en.wikipedia.org/wiki/Modular_exponentiation) is a type of exponentiation performed over a modulus.
[^ModArith]: [Modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic) is a system of arithmetic for integers, where numbers "wrap around" upon reaching a certain value.
[^DiscLog]: The [discrete logarithm problem](https://en.wikipedia.org/wiki/Discrete_logarithm) is the problem of finding the exponent \\(x\\) in the equation \\(g^x = A \mod p\\).
