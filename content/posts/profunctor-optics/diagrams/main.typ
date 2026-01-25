#import "@preview/fletcher:0.5.8": *

#set page(fill: none, margin: 3mm, width: auto, height: auto)
#set text(size: 16pt)

#let member(..args) = edge(..args, " ", label: $in$, label-side: center, label-angle: right)
#let tint(c) = (stroke: c, fill: rgb(..c.components().slice(0, 3), 5%), inset: 8pt)

// #math.scr($C$)
// #math.mono($C$)
// #math.cal($C$)
// #math.bold($C$)
// #math.script($C$)
// #math.frak($C$)
// #math.bb($C$)
// #math.serif($C$)

// Image of a morphism and its kernel
#diagram(
  cell-size: 2cm,
  spacing: 8mm,
  $
    & G edge(f, ->) edge("d", pi, ->>)               & im(f) \
    & G slash ker(f) edge("ur", tilde(f), "hook-->") \
  $,
)

// Simple commutative diagram of morphisms
#pagebreak()
#diagram(
  cell-size: 2cm,
  spacing: 8mm,
  $
    & A edge("rr", g compose f, "->") edge("rd", f, "->") &                       & C \
    &                                                     & B edge("tr", g, "->") &
  $,
)

// Functor diagram
#pagebreak()
#v(-6pt)
#diagram(
  cell-size: 2cm,
  spacing: 8mm,
  $
    & A edge("rr", g compose f, "->") edge("rd", f, "->") edge("ddd", F, "-->") & & C edge("ddd", F, "-->") \
    & & B edge("rt", g, "->") edge("b", F, "-->") & \
    & & F(B) edge("rb", F_g, "->") & \
    & F(A) edge("rr", F_(g compose f), "->") edge("rt", F_f, "->") & & F(C) \
  $,
)

// Int -> String morphism + functor diagram
#pagebreak()
#v(-6pt)
#diagram(
  cell-size: 2cm,
  spacing: 16mm,
  $
    & italic("i32") edge("rr", text("to_string"), "->") edge("d", italic("Option"), "-->") & & italic("String") edge("d", italic("Option"), "-->") \
    & italic("Option(i32)") edge("rr", text("fmap(to_string)"), "->") & & italic("Option(String)") \
  $,
)

// Profunctor diagram
#pagebreak()
#diagram(
  spacing: 12mm,
  node-inset: 7pt,
  node-corner-radius: 10pt,
  // Nodes
  node((0, 0), $A times B$, name: <AB>),
  node((0, 2), $A' times B'$, name: <ApBp>),
  node((2, 0), $P(A, B)$, name: <PAB>),
  node((2, 2), $P(A', B')$, name: <PApBp>),
  // Cross edges
  edge(<AB>, <PAB>, $P$, "-->"),
  edge(<ApBp>, <PApBp>, $P$, "-->"),
  // Inner edges
  edge((-0.25, 2), "tt", $f$, label-side: left, "->"),
  edge((0.25, 0), "dd", $g$, label-side: left, "->"),
  edge((2, 0), "dd", $P_(f, g)$, label-side: right, "->"),
  // Enclosures
  node((0, -0.6), $cal(C)^italic("op") times cal(C)$),
  node(enclose: ((0, 0), (0, 2)), ..tint(teal), name: <Cop_C>),
  node((2, -0.6), $bold("Set")$),
  node(enclose: ((2, 0), (2, 2)), ..tint(purple), name: <Set>),
)


#pagebreak()
#diagram(
  node-corner-radius: 4pt,
  node-inset: 5pt,
  spacing: 20mm,
  node((0, 0), $S a$),
  node((1, 0), $T b$),
  node((0, 1), $S a'$),
  node((1, 1), $T b'$),
  edge((0, 0), (1, 0), "->", $f$),
  edge((0, 1), (1, 1), "->", $f'$),
  edge((0, 0), (0, 1), "->", $alpha$),
  edge((1, 0), (1, 1), "->", $beta$),

  node((2, 0), $(a, b, f)$),
  edge("->", text(0.8em, $(alpha, beta)$)),
  node((2, 1), $(a', b', f')$),

  node((0, 2), $S a$),
  edge("->", $f$),
  node((1, 2), $T b$),

  node((2, 2), $(a, b, f)$),

  {
    node(enclose: ((0, 0), (1, 1)), ..tint(teal), name: <big>)
    node(enclose: ((2, 0), (2, 1)), ..tint(teal), name: <tall>)
    node(enclose: ((0, 2), (1, 2)), ..tint(green), name: <wide>)
    node(enclose: ((2, 2),), ..tint(green), name: <small>)
  },

  edge(<big>, <tall>, "<==>", stroke: teal + .75pt),
  edge(<wide>, <small>, "<==>", stroke: green + .75pt),
  edge(<big>, <wide>, "<=>", stroke: .75pt),
  edge(<tall>, <small>, "<=>", stroke: .75pt),
)


// Yoneda lemma diagram
#pagebreak()
#diagram(
  spacing: 8mm,
  node-inset: 7pt,
  $
    id_S member() edge("d", |->) &
    "Hom"_cal(C)(S, S) edge(->, script(phi.alt_S)) edge("d", ->, script(f^*), #right) &
    A(S) edge("d", ->, script(A(f)), #left) &
    u_S member("l") edge("d", |->)
    \
    f member() &
    "Hom"_cal(C)(T, S)) edge(->, script(phi.alt_T), #right) &
    A(T) &
    phi.alt_T (f) member("l") \
  $,
)

// Quiver diagram
#pagebreak()
#diagram(
  mark-scale: 130%,
  $
    edge("rdr", overline(q), "-<|-")
    edge(#(4, 0), #(3.5, 0.5), b, "-<|-")
    edge(#(4, 1), #(3.5, 0.5), overline(b), "-<|-", label-side: #left) \
    & & edge("d", "-<|-") & & edge(#(3.5, 0.5), #(2, 1), Z', "wave") \
    & & edge(#(3.5, 2.5), #(2, 2), gamma, "wave") \
    edge("rru", q, "-|>-") & \
  $,
)
