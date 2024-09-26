+++
title = 'Diffie-Hellman'
date = 2024-09-12T20:54:08+02:00
series = ['Understanding']
series_order = 2
tags = ["key exchange", "security", "verification", "digital signatures"]
categories = ["computer science", "mathematics", "cryptography"]
showHero = true
draft = false
+++
{{< katex >}}

## Introduction

In secure communication and cryptography, the **Diffie-Hellman**[^DH] (DH) key exchange is a method of securely exchanging cryptographic keys over a public channel.
It is named after **Whitfield Diffie** and **Martin Hellman**.
The protocol allows **two parties to share a secret key over an insecure channel**, without sending the secret key directly.
Instead messages are exchanged in such a way that the secret key can be derived.

## Background

Let's begin with explaining some fundamental concepts used when calculating keys in the protocol.

### Modular Arithmetic

Initially we need to understand the basics of **modular arithmetic**[^ModArith].
It is a system of arithmetic for integers, where numbers **"wrap around"** upon reaching a certain value (the modulus) and **start over from zero**.
This is often taught in **discrete mathematics** and **number theory courses**.
It is a **fundamental concept in cryptography**.

{{< figure src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Clock_group.svg/1200px-Clock_group.svg.png" width="400" caption="Adding 4 in mod 12 visualized on a clock." >}}

Thus all values in a modular system are bound to lie within the range $0$ to $p-1$ for a modulus $p$.
This range is denoted as $\mathbb{Z}_p = \\{ 0, 1, \cdots, p-1 \\}$ and called the **residue class modulo $p$**.[^ResidueClass]
However the **multiplicative group of integers modulo[^MulGroupMod] $p$**, $\mathbb{Z}_p^* = \\{ 1, 2, \cdots, p-1 \\}$, **is the one most relevant in the DH protocol**.
$0$ is excluded from $\mathbb{Z}_p^*$ because does not have a multiplicative inverse.

> **Note**\
> $\mathbb{Z}_p^\*$ has an **order** *(aka, total number of elements)* of $|\mathbb{Z}_p^*| = p - 1$.

### Modular Exponentiation

The *algorithm* in the DH protocol uses **modular exponentiation**[^ModExp] to compute its keys.
It is a type of exponentiation performed over a modulus of $p$ with values in $\mathbb{Z}_p$.
Exponentiation in modular arithmetic involves computing the remainder when a number is raised to a power and divided by a modulus:

$$
\begin{align*}
a^b \mod p = & \newline
a \times \cdots \times a \mod p = & \quad\quad (b \text{ times)} \newline
\cdots \times a \mod p) \times a \mod p) \times a \mod p = & \quad\quad (b \text{ times)} \newline
\end{align*}
$$

The last expression display an optimized accumulative method by taking the remainder after each multiplication, to **keep the numbers small during the calculation**.
This results in faster and more memory-efficient computation due to **$O(n^2)$ time complexity** of multiplication[^Mul].

> **Example**\
> We can easily calculate, &nbsp;$5^{23} \mod 97 \equiv 82$,&nbsp; using **repeated modular multiplication** to get the remainder $82$.
> If I were to ask you which power $b$ I started with to get to $82$ only knowing $a=5$, $p=97$, you would have to **brute-force** it by trying different exponents until you find *the correct one* ($b = 23$).

This is the essence of the **discrete logarithm problem**.

### Discrete Logarithm Problem

The **discrete logarithm problem**[^DiscLog] (DLP) is the basis for the security of the DH key exchange.
Finding the exponent $x$ in the equation &nbsp;$g^x = A \mod p$&nbsp; is **computationally infeasible** for large numbers.
**No efficient classical algorithm is known** for computing discrete logarithms in general.
In fact, it is an exponential-time algorithm.[^DiscLog]
Given this, the set of all integers $a$ satisfying $A \equiv g^a \mod p$ can be expressed using the discrete logarithm:

$$ a \equiv \log_g A \mod \text{ord}_p(g) $$

The **multiplicative order** of $g$ modulo $p$, denoted as $\text{ord}_p(g)$, is the smallest positive integer $n$ such that $g^n \mod p \equiv 1$.
The order of $g$ is a divisor of $p - 1$, meaning that $\text{ord}_p(g) \mid |\mathbb{Z}_p^*|$.

> **Note**\
> The **order of the generator $g$**, denoted as $\text{ord}_p(g)$, is a **divisor of $p - 1$** but not necessarily equal.
> This means that $\text{ord}_p(g) \mid |\mathbb{Z}_p^*| \iff \text{ord}_p(g) \mid p - 1$ *for all* $g \in \mathbb{Z}_p^\*$.

Further analysis **why the discrete logarithm problem is hard to solve** can be found in the [Wikipedia article](https://en.wikipedia.org/wiki/Discrete_logarithm).

## Algorithm

The algorithm is based on **DLP**.
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

1. **Setup**: Alice and Bob agree on a **prime number $p$** and a **generator $g$**.
2. **Alice**: Alice randomly chooses a **secret number $a$** and computes &nbsp;$A = g^a \mod p$.
3. **Bob**: Bob randomly chooses a **secret number $b$** and computes &nbsp;$B = g^b \mod p$.
4. **Exchange**: Alice sends $A$ to Bob and Bob sends $B$ to Alice.
5. **Key**: Alice computes &nbsp;$K = B^a \mod p$&nbsp; and Bob computes &nbsp;$K = A^b \mod p$.

> **Naming**\
> $p$ and $g$ are **public parameters**.
> Both $a$ and $b$ are kept secret, and are therefore called **private keys**.
> The numbers $A$ and $B$ are called **public keys**, as they get sent over the public channel `Internet`.

**Alice and Bob now share the same secret key $K$ without anyone eavesdropping knowing it!**
The initial numbers **$p$ and $g$**, and the generated **$A$ and $B$** are **public** and can be shared over an insecure channel **without compromising the key $K$**.

## Multi-party

It is possible to extend this protocol to more than two parties where each agrees on the same $p$ and $g$ and each party chooses a secret key and computes a public key.
Similar steps are followed as in the two-party case, but the **shared secret key** is computed with everyone's public keys using **$ K = g^{a b c} \mod p $**[^DH], where $a$, $b$, and $c$ are the private keys of the parties.

## Drawbacks

As to any technology, there are drawbacks and vulnerabilities to recognize.

### Man-in-the-Middle Attack

Everything is fine until **Charles** comes into the picture.
He is **not only eavesdropping** but also **actively manipulating the messages**.
This is called a **Man-in-the-Middle**[^MitM] (MitM) attack.
The DH protocol is **vulnerable** to this because Charles can **generate his own keys**, and **forward the messages** to each of the other parties separately, without them knowing.
By doing so, he can **decrypt and read the messages**, **alter them**, and **re-encrypt** them before sending them on to the intended recipient, thereby compromising the encryption and the security of the communication.

{{< mermaid >}}
sequenceDiagram
    actor Alice
    actor Charles
    actor Bob

    Alice->>Charles: A
    Charles->>Bob: C
    Bob->>Charles: B
    Charles->>Alice: C
{{< /mermaid >}}

> **Solution**\
> The fundamental issue is that the parties **cannot verify the authenticity** of the public keys they receive.
> That is, **Bob cannot be 100% sure** that the public key he receives is actually from Alice.
>
> Both Alice and Bob need to agree to trust some **third party** to verify the authenticity of the public keys.
> This is done via a **digital signature**[^DigSig] provided by a **certificate authority**[^CA] (CA).
> Before Alice and Bob exchange their public keys, they send them to the CA to be **signed by the CA's private key**.
> After receiving the **signed public keys**, both Alice and Bob can **verify their authenticity** by checking the signature using the **CA's public key** which everyone has access to.
> Only then will they trust each other's public keys, and proceed with the key exchange.

{{< alert "circle-info" >}}

If no CA is available, the parties can use **certificate pinning** or other forms of **authentication** to verify authenticity.

{{< /alert >}}

### Pohlig-Hellman Algorithm

The **Pohlig-Hellman algorithm**[^PohligHellman] is a **discrete logarithm algorithm** that can be used to **efficiently solve DLP $\iff$ *(if and only if)* either** the ***order of the group* $|\mathbb{Z}_p^\*| = p - 1$** or the ***order of the generator* $\text{ord}_p(g)$ factors into small prime numbers**.
Thus the private keys and the shared secret can be computed, **breaking the security** of the DH key exchange.
The algorithm split the problem into smaller **subgroups of order $q_i$**.

$$
n = \prod_{i=1}^k q_i^{e_i} = q_1^{e_1} \times q_2^{e_2} \times \cdots \times q_k^{e_k}
$$

Where, $n = \text{ord}_p(g)$&nbsp; ***or*** &nbsp;$n = p - 1$, and all **$q_i$ are the prime factors of $n$**.
This algorithm can be used to break the DH key exchange if the **prime number $p$** is not chosen carefully.

> **Solution**\
> Because of Pohlig-Hellman algorithm working efficiently when $p-1$ or $\text{ord}_p(g)$ factors into small primes, we can choose a **large prime number $p$** such that **$p - 1$ has at least one large prime factor** to make the DLP **harder to solve**.
> This is why it is recommended to use **2048-bit or 4096-bit prime numbers** in practice.
>
> To select a sufficiently large prime number $p$, we can use **safe primes**[^SSGP] on the form $p = 2q + 1$, where both $p$ and $q$ are prime.
> Additionally, selecting a **generator $g$ with a large order** $q = \text{ord}_p(g)$ ensures computations are performed within this **large prime-order subgroup**, further enhancing security.
> Safe primes ensure that $n$ has a **large** prime factor, **rendering the Pohlig-Hellman algorithm ineffective**!

## Security

Before summing up this post about Diffie-Hellman, let's talk about the **security aspects** and what to think about when choosing the parameters or using the protocol in general.

The security of the DH protocol relies on good choices of the **prime number $p$** and the **generator $g$** to make **DLP** hard to solve, which is crucial for maintaining the confidentiality of the shared secret.
Below is a list of **best practices** to keep in mind when using the DH protocol to ensure secure communications:

| Guideline                                                                                                                                                                 | Risk                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Choose a Large Prime Number $p$**<br>Select a prime $p$ of at least **2048 bits**.                                                                                      | Using a smaller prime makes it **feasible** for attackers to use **brute-force** methods to solve the DLP.                                                                                                                                                               |
| **Use Safe Primes**[^SSGP]<br>Opt for $p = 2q + 1$ where **$p, q$ are prime**, ensuring $p - 1$ has a **large prime factor**.                                             | If $\text{ord}_p(g)$ or $p - 1$ factors into small primes, attackers can use the **Pohlig-Hellman**[^PohligHellman] algorithm to solve the DLP efficiently, compute the private keys and shared secret.                                                                  |
| **Select an Appropriate Generator $g$**<br>Choose $g$ with a **large prime-order subgroup** $\text{ord}_p(g) = q$ of $\mathbb{Z}_p^*$ to operate within.                  | A generator with a small order allows attackers to exploit smaller subgroups where the DLP is easier to solve using **Pohlig-Hellman**[^PohligHellman].                                                                                                                  |
| **Avoid Common Parameters**<br>Use **unique**, "random" **parameters** instead of well-known or predefined ones.                                                          | Using standard parameters may expose you to attacks if those parameters have **known weaknesses** or attacks using precomputed data. Such as [this RFC example](https://www.rfc-editor.org/rfc/rfc5114#section-2.1) with ***small** 160-bit* $\text{ord}_p(g)$, aka $q$. |
| **Verify Public Keys**<br>Use **certificate authorities**[^CA] (CA) and **digital signatures**[^DigSig] or **certificate pinning**[^CertPin] to authenticate public keys. | Without proper verification, attackers can perform **MitM**[^MitM] attacks and **impersonate parties** by **substituting their own public keys**, enabling them to **intercept and decrypt communications**.                                                             |

Careful selection of $p$ and $g$ significantly enhances the security of the DH protocol by maintaining the difficulty of the DLP, thereby safeguarding secure communications in cryptographic systems.

## Conclusion

Diffie-Hellman (DH) is vastly used in many cryptographic protocols such as **TLS/SSL**, **SSH**, **IPsec**, and **PGP**.
The main benefit comes from the **forward secrecy** provided by the protocol, as new keys get generated for each unique session.
This makes it **more difficult** for an attacker to decrypt past sessions if the current key is compromised.
With the **right parameters** and **good practices**, the Diffie-Hellman key exchange is a **secure and efficient** way to establish a shared secret key over an insecure channel.

---
{{< support >}}

[^DH]: [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) by Whitfield Diffie and Martin Hellman.
[^ModExp]: [Modular exponentiation](https://en.wikipedia.org/wiki/Modular_exponentiation) is a type of exponentiation performed over a modulus.
[^ModArith]: [Modular arithmetic](https://en.wikipedia.org/wiki/Modular_arithmetic) is a system of arithmetic for integers, where numbers "wrap around" upon reaching a certain value.
[^DiscLog]: The [discrete logarithm problem](https://en.wikipedia.org/wiki/Discrete_logarithm) (DLP) is the problem of finding the exponent $x$ in the equation $g^x = A \mod p$.
[^DigSig]: [Digital signatures](https://en.wikipedia.org/wiki/Digital_signature) are used to verify the authenticity of a message or document.
[^CA]: A [certificate authority](https://en.wikipedia.org/wiki/Certificate_authority) is an entity that issues digital certificates.
[^PohligHellman]: The [Pohlig-Hellman algorithm](https://en.wikipedia.org/wiki/Pohlig%E2%80%93Hellman_algorithm) is a discrete logarithm algorithm that can be used to solve the discrete logarithm problem in a cyclic group.
[^SSGP]: [Safe and Sophie Germain primes](https://en.wikipedia.org/wiki/Safe_and_Sophie_Germain_primes) are primes on the form $2p + 1$ where $p$ is also a prime.
[^MitM]: A [Man-in-the-Middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) is an attack where the attacker secretly relays and possibly alters the communication between two parties.
[^CertPin]: [Certificate pinning](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) is a security mechanism that associates a host with its expected public key or keys.
[^Mul]: [Multiplication Algorithm](https://en.wikipedia.org/wiki/Multiplication_algorithm) is a method to multiply two numbers using a series of additions and shifts.
[^ResidueClass]: A [residue class](https://mathworld.wolfram.com/ResidueClass.html) is a set of integers that are congruent modulo a given integer.
[^MulGroupMod]: The [multiplicative group modulo $n$](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) is the set of integers relatively prime to $n$ under multiplication modulo $n$.
