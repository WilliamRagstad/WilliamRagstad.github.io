#import "@preview/fletcher:0.5.8": *

#set page(fill: none, margin: 5mm, width: auto, height: auto)
#set text(size: 16pt)

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

// Yoneda lemma diagram
#pagebreak()
#let member(..args) = edge(..args, " ", label: $in$, label-side: center, label-angle: right)
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
