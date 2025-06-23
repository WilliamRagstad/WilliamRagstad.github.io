# My personal website

[![Deploy Hugo site to Pages](https://github.com/WilliamRagstad/WilliamRagstad.github.io/actions/workflows/hugo.yml/badge.svg)](https://github.com/WilliamRagstad/WilliamRagstad.github.io/actions/workflows/hugo.yml)

This is my personal website. It is built using [Hugo](https://gohugo.io/) and my fork of the [Blowfish](https://github.com/WilliamRagstad/blowfish) theme.
Here I will post about my projects and other things I find interesting among other things such as:

- Personal blog
- Project portfolio and showcase
- About me
- Resume (CV)
- Links to my social media

## Configuration

- https://blowfish.page/docs/installation/
- https://blowfish.page/docs/configuration/

Comments
- https://disqus.com/

## Run locally

```bash
> hugo serve -D
```

## IMPORTANT

- Images should be placed in the `static` folder and referenced using `![alt](/images/my_image.png)` in markdown.
  - Otherwise `hugo` will randomly fail to build in CICD...???
