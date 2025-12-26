+++
title = "Custom Syntaxes and Themes"
date = 2025-11-14
description = "A tutorial on how to create custom syntax themes for Typst's code blocks."
tags = [ "syntax highlighting", "themes", "customization", "languages"]
categories = ["typst"]
showHero = true
draft = true
+++

## Background

**I love Typst**, it's an *awesome alternative to LaTeX* for creating typeset documents!
However, I recently ran into issues when writing a programming-language paper, because **the default language syntax support and highlighting themes weren't sufficient**.
While Typst supply primitive tools for loading custom syntax themes for `raw` code blocks, these are **neither well-documented nor sufficiently flexible**.
In this post, I'll show you how to create custom Typst code syntax themes for new languages in a scalable and extensible way.

## Raw Code

In Typst, we can create code blocks using either ` ``` ` or the `raw()` text element, specifying the language as parameters.

```hs
raw(
    lang: nonestr,           -- e.g., "cpp", "python", "javascript"
    syntaxes: strbytesarray, -- e.g., "python.sublime-syntax"
    theme: noneautostrbytes, -- e.g., "halcyon.tmTheme"
    ...
) -> content
```

> The syntax definitions should be in the `.sublime-syntax` file format. Themes should be in the `.tmTheme` file format. [^TypstRaw][^SublimeSyntax][^SublimeThemes]

In `main.typ`, we can then import and use our custom language syntax and theme:

````typ
#show raw.where(lang: "lento"): set raw(syntaxes: "lento.sublime-syntax", theme: "lento.tmTheme")
#show raw.where(lang: "lt"): set raw(syntaxes: "lento.sublime-syntax", theme: "lento.tmTheme")
````

Now code blocks with `lang: "lento"` or `lang: "lt"` will use our custom syntax and theme!

````typ
```lento
// Example of user-defined types
type Age = uint
type Point = { x: float, y: float }
main = print "Hello, Lento!"
```

And even inline ```lt int x = 42;``` works too!
````

---
{{< support >}}

<!-------------------------------------------------------------------->

[^DaxSyntax]: [cAttte/dax.sublime-syntax](https://gist.github.com/cAttte/40a8123c714ced3a2c15568e95ab83d6) DAX syntax highlighting definitions.

[^SublimeSyntax]: [Sublime Text Syntax Definitions](https://www.sublimetext.com/docs/syntax.html) Documentation on creating syntax definitions for Sublime Text.

[^SublimeThemes]: [Sublime Text Color Schemes](https://www.sublimetext.com/docs/color_schemes_tmtheme.html) Documentation on creating color schemes for Sublime Text.

[^HalcyonTheme]: [Halcyon Theme for Sublime Text](https://github.com/bchiang7/Halcyon/blob/master/halcyon.sublime-theme) A popular Sublime Text theme.

[^HalcyonTmTheme]: [Halcyon Color Scheme](https://github.com/bchiang7/Halcyon/blob/master/halcyon.tmTheme) A popular Sublime Text color scheme.

[^TypstShowRule]: [Typst Show Rule Discussion](https://forum.typst.app/t/is-it-possible-to-have-a-function-in-set-rule-that-are-inside-a-show-rule/3859/6) Forum discussion on having a function in set rule that are inside a show rule.

[^TypstRaw]: [Typst Raw Text Reference](https://typst.app/docs/reference/text/raw) Documentation on Typst's raw text parameters.

[^CodlyPackage]: [Codly Package for Typst](https://typst.app/universe/package/codly/) A Typst package for code syntax highlighting.

[^TypstRawThemeSource]: [Typst Raw Theme Source Code](https://github.com/typst/typst/blob/main/crates/typst-library/src/text/raw.rs#L932) Source code for Typst's raw text theme handling. See [permalink](https://github.com/typst/typst/blob/a87f4b15ca86a0b2f98948d8f393608070ed731e/crates/typst-library/src/text/raw.rs#L932).
