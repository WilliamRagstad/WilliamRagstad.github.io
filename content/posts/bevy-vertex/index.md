+++
title = "Vertex Shaders in Bevy"
date = 2025-06-22
description = "A Bevy vertex shader that simulates a fish wobbling in the water."
tags = ["bevy", "vertex", "shaders", "graphics"]
categories = ["game dev", "programming"]
showHero = true
draft = false
+++

## Background

I recently started learning the [Bevy](https://bevy.org/) game engine to build a [*2.5D perspective*](https://en.wikipedia.org/wiki/2.5D) game with similar aesthetics to [The Last Night](https://store.steampowered.com/app/612400/The_Last_Night/) and [Delver](https://store.steampowered.com/app/249630/Delver/).

![example](images/the_last_night.gif)

I envision a simple **underwater [shoot 'em up](https://sv.wikipedia.org/wiki/Shoot_%27em_up)** game with lots of fish swimming around.
\
To add a bit of **visual flair**, I decided to write a **vertex shader** that makes **fish sprites wobble as if they were swimming in water**.
\
Being my first attempt at writing vertex shaders, I was struggling and had a hard time finding good examples and relevant resources.
I hope this post will help others who are new to Bevy and vertex shaders to get started with creating interesting visual effects.

Let's *dive in*!
