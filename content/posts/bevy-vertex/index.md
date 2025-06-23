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

## Terminology

Before we get started, let's clarify some technical details that are important to understand when working with Bevy and shaders.

| Word            | Definition                                                                                                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vertex          | **Point in 3D space** *(+normal and UV info)* used to define object models and shapes.                                                                                             |
| Mesh            | **Collection of vertices** that define an object.                                                                                                                                  |
| Shader          | Code that runs **in parallel** on the GPU written in a language like [**GLSL**](https://sv.wikipedia.org/wiki/OpenGL_Shading_Language) or [**WGSL**](https://www.w3.org/TR/WGSL/). |
| Vertex Shader   | Process vertex data and **transform vertex positions**.                                                                                                                            |
| Fragment Shader | **Calculate the color of a pixel** (≈ fragment) on the screen.                                                                                                                     |
| Compute Shader  | Perform **general-purpose computations** on the GPU.                                                                                                                               |
| Pipeline        | **Sequence of processes** to render a scene, e.g., `vertex shader` → `fragment shader`.                                                                                            |

## Game Setup

Let's begin by defining the main function that initializes the Bevy app and sets up the necessary plugins and resources.

`src/main.rs`:

```rust
use crate::fish_wobble::{FishWobbleExt, WobbleParams, stripe_quads};
use bevy::prelude::*;
use bevy::pbr::ExtendedMaterial;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins.set(ImagePlugin::default_nearest()))
        .insert_resource(ClearColor(Color::srgb(0.15, 0.2, 0.5)))
        .add_systems(Startup, setup)
        .run();
}

fn setup(
    assets: Res<TextureAssets>,
    mut commands: Commands,
    mut meshes: ResMut<Assets<Mesh3d>>,
    mut materials: ResMut<Assets<StandardMaterial>>,
) {
    // Setup the camera
    commands.spawn((
        Name::new("Main Camera"),
        Camera3d::default(),
        Transform::from_xyz(0.0, 1.75, 1.75).looking_at(Vec3::ZERO, Vec3::Y)
    ))

    // Spawn multiple fish at different positions
    let N = assets.fish.len();
    for i in 0..N {
        let x = (i as f32 - N as f32 / 2.0) * 0.2;
        commands.spawn((
            Name::new(format!("Fish {}", i)),
            Mesh3d(meshes.add(RectangleMeshBuilder::new(w, h).build())),
            MeshMaterial3d(materials.add(StandardMaterial {
                base_color_texture: Some(assets.fish[i].clone()),
                unlit: true,
                alpha_mode: AlphaMode::Blend,
                ..default()
            })),
            Transform::from_xyz(x, 0.0, 0.0)
        ));
    }
}
```

> Asset loading, mesh building and unrelated code is redacted for brevity.\
> You can find the complete code on [GitHub](https://github.com/WilliamRagstad/bevy_coralbeef).

This refers to a `setup` function that will be called when the app starts, and a `shader_fish_wobble` function that will update the fish wobble `time` parameter every frame.
We will come back to these functions later.
\
Before using any custom shaders, simply loading all assets and rendering them using `StandardMaterial` and `RectangleMeshBuilder`, our game looks like this:
![initial game setup](featured.png)
