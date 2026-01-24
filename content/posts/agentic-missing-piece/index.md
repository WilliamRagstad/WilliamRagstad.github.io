+++
title = 'The Missing Piece of Agentic Development'
date = 2026-01-24T19:00:59+01:00
tags = ["LLMs", "agentic", "productivity"]
categories = ["artificial intelligence", "software development", "tools"]
showHero = true
draft = true
+++

Agentic development makes software engineering feel like an optimization problem. Define your goal, let AI suggest solutions, and refine until it works. In demos, agents add features, refactor code, and close tickets while you sit back and relax.
But in large-scale projects, the challenges become clear.

The tough part isn't making code. It's getting the right results quickly and safely as things change and security matters, without overloading people with reviews and debugging.

Most programming tools were built for a world where people write code and computers run it. With agentic workflows, computers suggest code and people check direction. This shift exposes limits in our languages, compilers, and tools.[^TDFlow]

## The Verification Bottleneck

With agents, producing another implementation is almost free. While AI supports software engineering activities, it also influences scarce resources like reviewer attention, architectural coherence, integration stability, security assurance, and evidence of correctness.[^CIonSWE]

When output is abundant, you don't need more creativity in code generation. You need high-bandwidth, low-latency signals showing whether the agent is moving in the right direction.

Today's workflows still rely on delayed signals: integration tests that run later, runtime crashes discovered in staging, flaky CI that confuses cause and effect, and security issues found after the fact.

In an agentic loop, delayed signals are poison. Feedback must be immediate, localized, and deterministic, or the loop becomes an expensive random walk.

## A Role Shift

Developers are becoming reviewers and directors rather than manual constructors. Informal "vibe coding" is acceptable, but "vibe reviewing" is catastrophic.

But most orgs aren't prepared for that shift.

If an agent writes 80% of the diff, a human reviewer must answer critical questions. Does this align with product requirements? Is the design sound? Are the security boundaries correct? Is the behavior actually what we intended? Are there hidden side effects or policy violations?[^OverReliance]

Traditional reviewing assumes implementation is the primary artifact. Agentic reviewing requires the opposite. Interface and intent must be the artifact, and implementation treated as refinement.

That demands a deeper understanding of fundamentals like type systems, logic, semantics, threat modeling, and protocol reasoning. Not because we're becoming academics, but because verification literacy is the job.[^VerifyUnderstand] Education should reflect this paradigm shift, relying less on pragmatic details and more on a big-picture understanding of good systems design.[^AgenticRefactoring]

## Compilers for Agentic Loops

Most compilers still "speak human." They produce free-form text errors, cascading diagnostics, inconsistent error ordering, little or no structured causality, and weak, non-actionable suggestions.[^ChameleonIDE]

For agents, that's a low-quality signal. For reviewers, it creates cognitive overload.

What agentic workflows need are compilers and interpreters that behave like verification oracles. These include structured diagnostics (machine-readable), stable error IDs and deterministic ordering, precise provenance ("this constraint came from this rule and this span"), reduced/minimal unsatisfiable cores (the smallest inconsistency witness), and actionable "fix-its" (edits with rationale).[^ClangExpressiveDiagnostics][^GCCDiagnosticsGuidelines]

Why unsat cores matter is simple. An LLM is essentially a fuzzy translator of intent into code.[^LLMsTranslators] To help it converge, you must provide sharp counterexamples, not a thousand symptoms. A minimal unsat core is the densest possible feedback: "You got this specific promise wrong."

## Intent Versus Implementation

Most languages don't separate intent from implementation.

We bury intent across comments, ticket descriptions, Slack threads, unit tests written after the fact, and implicit conventions.

Humans must infer intent from implementation while agents infer it from loosely specified prompts.

That's why agentic coding feels unstable. The agent optimizes for "passes CI" or "looks plausible" rather than "provably satisfies the requirement."

Without formal intent encoding, reviewers must reconstruct semantics. Every PR becomes a detective story.

## Ecosystem Entropy

Agentic coding is hypersensitive to entropy. Our ecosystems offer countless ways to accomplish the same task.[^SoftwareEntropy][^IntertwiningEcosystems]

When there are several ways to represent errors, serialization, data modeling, async I/O, input validation, or authorization, agents may generate a wide range of styles and patterns. Review, maintenance, and security become harder as consistency breaks down.

Worse, the default behavior in many ecosystems is to import another package. This is manageable when humans choose dependencies carefully. With agents, it becomes a supply-chain hazard generator, introducing risks such as abandonware, typosquatting, malware packages, vulnerable transitive dependencies, and subtle behavioral differences across libraries.[^PackageHallucinations][^AISupplyChainDumpsterFire][^AInvestSupplyChainSabotage]

Agentic coding amplifies productivity and creativity, but also expands the attack surface.

## Static Typing for Convergence

There's a misconception that types are about developer preference.

In agentic workflows, strong static typing becomes something else entirely. It serves as a dense reward signal for iterative synthesis, a persistent executable specification in the codebase, a refactoring safety net under extreme churn, a boundary enforcer for architecture and effects, and a way to push correctness earlier than tests can.[^DirectPathDependableSoftware][^EmergentMindAgenticRefactoring][^SimpleModelingExecutableSpecification]

Many teams gravitate toward stronger types as AI writes more code. Without them, you're navigating fog with runtime errors as your compass.

But mainstream static types often stop short of what agentic workflows demand. They don't encode behavioral promises, constrain effects precisely, prove protocol adherence, expose minimal counterexamples, or turn intent into a first-class review artifact.[^NVLang][^LinearPromises][^TypestatesBeyond]

## Readability as throughput

When humans mostly review, source code targets future reviewers, security auditors, incident responders, and the agent itself, all of which benefit from consistent structure.

Human-readable expressiveness becomes a practical necessity, not a philosophical preference.

Language becomes a review UI.

If syntax encourages cleverness, deeply nested abstractions, or implicit control flow, agentic iteration produces diffs humans can't confidently approve. Adversaries can compromise AI agents by embedding hard-to-detect backdoors during data collection, leading agents to perform unsafe or malicious actions when triggered. Once humans lose confidence, the agent becomes a liability rather than a productivity tool.[^ReflectionDrivenControl][^HiddenQualityCostsAIGeneratedCode][^LiabilityAuditRiskAIGeneratedCode]

## Making intent checkable

Agentic development works best when intent is expressed formally and readably, verified at compile time, constraining agent behavior while humans review intent first, then skim implementation for hazards, with the compiler emitting machine-actionable counterexamples when encoding fails.[^SpecGen]
Related work includes runtime verification for agents,[^AgentGuard] improved LLM-assisted specification generation for complex loop functions,[^SLDSpec] and hybrid generative + verification workflows.[^Genefication]

This isn't about more tests. Tests are still essential. This is about moving from post-hoc validation to specification-driven construction.

We need languages where what the program must do becomes an explicit, checkable artifact, not just a vibe.[^IntentDrivenProgramming]
Adjacent directions include agentic graph compilation,[^Agint] and context-oriented toolchain integration.[^JavaCtx]

## A Proposed Direction

These requirements point toward a language designed for the agentic era from first principles.

* Separation of intent and implementation means developers encode behavioral promises (contracts, invariants) and admissible side effects (capabilities/effects) directly in the source.
* Static verification as the inner loop means type checking doesn't just catch mismatches. It validates intent constraints, refinement obligations, and protocol/session compliance.
* Diagnostics built for agents and reviewers include structured errors, deterministic output, provenance, reduced/minimal unsat cores, and repair-oriented suggestions.
* A large, opinionated standard library provides "one right way" patterns that reduce entropy, improve readability, and minimize supply-chain risk through reduced dependency sprawl.
* Optimization informed by specification means richer intent enables more aggressive, safe compilation, such as bounds-check elimination, specialization, and effect-aware reordering.

This defines Lento, a readable language in which flexible formal specification is the primary product, implementations are refinements, and the compiler is an active participant in the iterative synthesis workflow. Read more at https://lento-lang.org/.

Agentic development demands more than better models. It requires a verification-native foundation. Without that, the loop won't scale beyond toy demos, and humans remain the bottleneck.

This is the missing piece. The path forward lies in toolchains and languages that prioritize verification, clear formal intent, and immediate feedback for scalable agent-human collaboration systems.

---
{{< support >}}

<!----------------------------------------------------------------->

[^TDFlow]: Han, K., Maddikayala, S., Knappe, T., Patel, O., Liao, A. & Farimani, A. B. (2025). TDFlow: Agentic Workflows for Test Driven Software Engineering. arXiv preprint. https://doi.org/10.48550/arXiv.2510.23761
[^CIonSWE]: Soares, E., Sizilio, G., Santos, J., Alencar, D. & Kulesza, U. (2021). The Effects of Continuous Integration on Software Development: a Systematic Literature Review. arXiv preprint arXiv:2103.05451. https://doi.org/10.48550/arXiv.2103.05451
[^FlakyTests]: Hashemi, N., Tahir, A. & Rasheed, S. (2022). An Empirical Study of Flaky Tests in JavaScript. arXiv preprint arXiv:2207.01047. https://doi.org/10.48550/arXiv.2207.01047
[^AgenticRefactoring]: Horikawa, K., Li, H., Kashiwa, Y., Adams, B., Iida, H. & Hassan, A. E. (2025). Agentic Refactoring: An Empirical Study of AI Coding Agents. arXiv preprint arXiv:2511.04824. https://doi.org/10.48550/arXiv.2511.04824
[^VerifyUnderstand]: Feldman, K., Kellogg, M. & Chaparro, O. (2023). On the Relationship between Code Verifiability and Understandability. arXiv preprint arXiv:2310.20160. https://doi.org/10.48550/arXiv.2310.20160
[^ChameleonIDE]: Fu, S., Dwyer, T., Stuckey, P. J., Wain, J. & Linossier, J. (2023). ChameleonIDE: Untangling Type Errors Through Interactive Visualization and Exploration. arXiv preprint. https://doi.org/10.48550/arXiv.2303.09791
[^OverReliance]: O'Brien, G., Parker, A., Eisty, N. & Carver, J. (2025). More code, less validation: Risk factors for over-reliance on AI coding tools among scientists. arXiv preprint arXiv:2512.19644. https://doi.org/10.48550/arXiv.2512.19644
[^ClangExpressiveDiagnostics]: (2022). Clang - Expressive Diagnostics. Clang Documentation. https://clang.llvm.org/diagnostics
[^GCCDiagnosticsGuidelines]: (2022). Guidelines for Diagnostics. GCC Internals Documentation. https://gcc.gnu.org/onlinedocs/gcc-11.2.0/gccint/Guidelines-for-Diagnostics.html
[^LLMsTranslators]: Babu, V. (December 24, 2023). LLMs excel at coding as language translators. LinkedIn. https://www.linkedin.com/posts/vivek-babu_why-llms-are-naturally-good-at-coding-activity-7408166500848599040-C7C-
[^SoftwareEntropy]: Mannan, U. A., Ahmed, I., Jensen, C. & Sarma, A. (2020). The Evolution of Software Entropy in Open Source Projects: An Empirical Study. Proceedings of the ACM on Software and Systems 1(1), pp. 1-7. https://doi.org/10.1145/3401280
[^IntertwiningEcosystems]: Kannee, K., Wattanakriengkrai, S., Rojpaisarnkit, R., Kula, R. G. & Matsumoto, K. (n.d.). Intertwining Ecosystems: A Large Scale Empirical Study of Libraries that Cross Software Ecosystems. https://arxiv.org/abs/2208.06655
[^PackageHallucinations]: Spracklen, J., Wijewickrama, R., Sakib, A. H., Maiti, A., Viswanath, B. & Jadliwala, M. (2024). We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs. arXiv preprint arXiv:2406.10279. https://doi.org/10.48550/arXiv.2406.10279
[^AISupplyChainDumpsterFire]: Council, F. T. (December 19, 2024). The AI Software Supply Chain Is A Dumpster Fire: Here's What Companies Can Do About It. Forbes. https://www.forbes.com/councils/forbestechcouncil/2024/12/19/the-ai-software-supply-chain-is-a-dumpster-fire-heres-what-companies-can-do-about-it/
[^AInvestSupplyChainSabotage]: (December 19, 2024). AI code suggestions sabotage software supply chain. AInvest. https://www.ainvest.com/chat/share/ai-code-suggestions-sabotage-software-supply-chain-2c0ddf/
[^DirectPathDependableSoftware]: (2025). A Direct Path to Dependable Software. Communications of the ACM. https://doi.org/10.1145/3454123
[^EmergentMindAgenticRefactoring]: (2025). Agentic Refactoring. Emergent Mind. https://www.emergentmind.com/topics/agentic-refactoring
[^SimpleModelingExecutableSpecification]: (2025). AI-Era Executable Specification. SimpleModeling. https://simplemodeling.org/en/component-based-development/executable-specification.html
[^NVLang]: Guerreiro, M. d. (2025). NVLang: Unified Static Typing for Actor-Based Concurrency on the BEAM. arXiv preprint. https://doi.org/10.48550/arXiv.2512.05224
[^LinearPromises]: Rau, O., Voss, C. & Sarkar, V. (n.d.). Linear Promises: Towards Safer Concurrent Programming. https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ECOOP.2021.13
[^TypestatesBeyond]: (n.d.). Typestates and Beyond: Verifying Rich Behavioral Properties in Concurrent Programs. https://aegis-iisc.github.io/assets/pdf/phd_thesis.pdf
[^ReflectionDrivenControl]: Wang, B., Quan, J., Yu, X., Hu, H., Yuhao & Tsang, I. (2025). Reflection-Driven Control for Trustworthy Code Agents. arXiv preprint arXiv:2512.21354. https://doi.org/10.48550/arXiv.2512.21354
[^HiddenQualityCostsAIGeneratedCode]: (December 15, 2025). The Hidden Quality Costs of AI Generated Code and How to Manage Them. SoftwareSeni. https://www.softwareseni.com/the-hidden-quality-costs-of-ai-generated-code-and-how-to-manage-them/
[^LiabilityAuditRiskAIGeneratedCode]: (November 24, 2025). The Liability & Audit Risk of AI-Generated Code in DevOps Pipelines. Netizen. https://www.netizen.net/news/post/7267/the-liability-audit-risk-of-ai-generated-code-in-devops-pipelines
[^SpecGen]: Ma, L., Liu, S., Li, Y., Xie, X. & Bu, L. (2024). SpecGen: Automated Generation of Formal Program Specifications via Large Language Models. arXiv preprint. https://doi.org/10.48550/arXiv.2401.08807
[^AgentGuard]: Koohestani, R. (2025). AgentGuard: Runtime Verification of AI Agents. arXiv preprint. https://doi.org/10.48550/arXiv.2509.23864
[^SLDSpec]: Chen, Z., Zhang, L., Zhang, Z., Zhang, J., Zhou, R., Shen, Y., Ma, J. & Yang, L. (2025). SLD-Spec: Enhancement LLM-assisted Specification Generation for Complex Loop Functions via Program Slicing and Logical Deletion. arXiv preprint. https://doi.org/10.48550/arXiv.2509.09917
[^Genefication]: (2025). Genefication: Generative AI + Formal Verification. My Distributed Systems. https://www.mydistributed.systems/2025/01/genefication.html
[^IntentDrivenProgramming]: Yang, Y., Duracz, A., Bartha, F. A., Sai, R., Pervaiz, A., Barati, S., Nguyen, D., Cartwright, R., Hoffmann, H. & Palem, K. V. (2019). Language Support for Adaptation: Intent-Driven Programming in FAST. arXiv preprint arXiv:1907.08695. https://doi.org/10.48550/arXiv.1907.08695
[^Agint]: Chivukula, A., Somasundaram, J. & Somasundaram, V. (2025). Agint: Agentic Graph Compilation for Software Engineering Agents. arXiv preprint arXiv:2511.19635. https://doi.org/10.48550/arXiv.2511.19635
[^JavaCtx]: Salvaneschi, G., Ghezzi, C. & Pradella, M. (2011). JavaCtx: Seamless Toolchain Integration for Context-Oriented Programming. arXiv preprint arXiv:1104.1351. https://doi.org/10.48550/arXiv.1104.1351
