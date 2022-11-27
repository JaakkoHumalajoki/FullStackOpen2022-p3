# Full Stack Open 2022 - Part 3

It was recommended to do this part in a separate repo to make web deployment easier. The repo is deployed on Fly.io, at https://restless-fire-7612.fly.dev/

I was unsure if I was supposed to keep Part 2 untouched after completing that section, so any Frontend changes required for P3 were made into a [separate branch](https://github.com/JaakkoHumalajoki/FullStackOpen2022/tree/part3changes). Switch to that branch before attempting to npm run build:ui.

Contrary to the FullStack instructions, it seems that Fly.io doesn't define their port with process.env.PORT, and instead I needed to adjust the fly.toml settings manually to fix the port issue.
