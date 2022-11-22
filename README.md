# Full Stack Open 2022 - Part 3

It was recommended to do this part in a separate repo to make web deployment easier. The repo is deployed on Fly.io, at https://restless-fire-7612.fly.dev/

Contrary to the FullStack instructions, it seems that Fly.io doesn't define their port with process.env.PORT, and instead I needed to adjust the fly.toml settings manually to fix the port issue.