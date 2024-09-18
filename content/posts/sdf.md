+++
title = 'Signed Distance Functions'
date = 2024-04-20T22:06:23+02:00
series = ['Understanding']
series_order = 3
tags = ["signed distance functions", "distance fields", "level sets", "3D graphics", "ray marching", "GLSL shaders"]
categories = ["mathematics", "geometry", "computer graphics"]
draft = true
+++
{{< katex >}}

Signed distance functions are a powerful tool in computer graphics and computational geometry.
They are used to represent shapes and surfaces in a way that is both efficient and flexible.
In this post, we will explore the concept of signed distance functions and how they can be used to create complex shapes and surfaces.
Also rendering them in real-time using ray marching using GLSL shaders.

## Introduction

Signed distance functions are a way to represent shapes and surfaces in a mathematical form.
They are defined as functions that return the distance from a point in space to the nearest point on the surface of the shape.
The key idea behind signed distance functions is that they return not only the distance to the surface but also the sign of the distance.
This sign indicates whether the point is inside or outside the shape.
This property makes signed distance functions very useful for rendering shapes and surfaces in computer graphics.

## Definition

A signed distance function is a function that takes a point in space as input and returns the distance from that point to the nearest point on the surface of a shape.
The sign of the distance indicates whether the point is inside or outside the shape.
If the point is inside the shape, the distance is negative.
If the point is outside the shape, the distance is positive.
If the point is on the surface of the shape, the distance is zero.

Mathematically, a signed distance function can be defined as follows:

$$
f(\mathbf{p}) = \text{min}_{\mathbf{q} \in S} ||\mathbf{p} - \mathbf{q}||
$$

where:

- $f(\mathbf{p})$ is the signed distance function.
- $\mathbf{p}$ is the point in space.
- $S$ is the surface of the shape.
- $\mathbf{q}$ is a point on the surface of the shape.
- $||\mathbf{p} - \mathbf{q}||$ is the Euclidean distance between the point $\mathbf{p}$ and the point $\mathbf{q}$.
- $\text{min}_{\mathbf{q} \in S}$ denotes the minimum distance over all points $\mathbf{q}$ on the surface $S$.

## Properties

Signed distance functions have several useful properties that make them ideal for representing shapes and surfaces in computer graphics:

- **Efficiency**: Signed distance functions are computationally efficient to evaluate.
- **Flexibility**: Signed distance functions can represent complex shapes and surfaces with a high degree of detail.
- **Smoothness**: Signed distance functions produce smooth surfaces that are easy to render.
- **Interpolation**: Signed distance functions can be used to interpolate between shapes and surfaces.
- **Boolean operations**: Signed distance functions can be combined using boolean operations to create complex shapes.
- **Ray marching**: Signed distance functions can be used with ray marching to render shapes and surfaces in real-time.

## Applications

Signed distance functions are widely used in computer graphics and computational geometry.
Some common applications of signed distance functions include:

- **Rendering**: Signed distance functions are used to render shapes and surfaces in real-time.
- **Modeling**: Signed distance functions are used to model complex shapes and surfaces.
- **Animation**: Signed distance functions are used to animate shapes and surfaces.
- **Simulation**: Signed distance functions are used to simulate physical phenomena.
- **Visualization**: Signed distance functions are used to visualize data in 3D space.
- **Game development**: Signed distance functions are used to create 3D graphics in games.
- **Virtual reality**: Signed distance functions are used to create immersive virtual reality experiences.

## Conclusion

Signed distance functions are a powerful tool in computer graphics and computational geometry.
They provide an efficient and flexible way to represent shapes and surfaces in a mathematical form.
By using signed distance functions, it is possible to create complex shapes and surfaces with a high degree of detail.
Also rendering them in real-time using ray marching using GLSL shaders.

In future posts, we will explore more advanced topics related to signed distance functions and their applications in computer graphics and computational geometry.
