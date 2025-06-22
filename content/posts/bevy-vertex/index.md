+++
title = "Vertex Shaders with Extended Materials"
date = 2025-06-22
description = "A Bevy vertex shader that simulates a fish wobbling in the water."
tags = ["bevy", "vertex", "shaders", "graphics"]
categories = ["game dev", "programming"]
showHero = true
draft = true
+++

## Background

I recently started learning the Bevy game engine to build a [*2.5D perspective*](https://en.wikipedia.org/wiki/2.5D) game with similar aesthetics to [The Last Night](https://store.steampowered.com/app/612400/The_Last_Night/) and [Delver](https://store.steampowered.com/app/249630/Delver/).

![example](imgs/the_last_night.gif)

I envision a simple **underwater [shoot 'em up](https://sv.wikipedia.org/wiki/Shoot_%27em_up)** game with lots of fish swimming around.
\
To add a bit of **visual flair**, I decided to write a **vertex shader** that makes **fish sprites wobble as if they were swimming in water**.
The effect is achieved by manipulating the vertex positions based on a **sine wave** function, which gives the appearance of movement.
\
Being my first attempt at writing vertex shaders, I was struggling and had a hard time finding good examples and relevant resources.
I hope this post will help others who are new to Bevy and vertex shaders to get started with creating interesting visual effects.

Let's *dive in*!

## Terminology

Before we get started, let's clarify some technical details that are important to understand when working with Bevy and shaders.

| Word            | Definition                                                                                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vertex          | A point in 3D space used to define object models and shapes.                                                                                                                                  |
| Shader          | A small program that runs **in parallel** on the GPU written in a language like [**GLSL**](https://sv.wikipedia.org/wiki/OpenGL_Shading_Language) or [**WGSL**](https://www.w3.org/TR/WGSL/). |
| Vertex Shader   | Process vertex data and transform vertex positions.                                                                                                                                           |
| Fragment Shader | Calculate the color of each pixel (fragment) on the screen.                                                                                                                                   |
| Compute Shader  | Perform general-purpose computations on the GPU.                                                                                                                                              |
