# Tauri + React + Typescript

## Dev Setup Guide:

1. Install the latest versions of `Rust` and `pnpm`.
2. Using your preferred terminal application, navigate to where you'd like to store your Wrangle dev environment and `git clone` this repo.
3. Navigate from the root of the newly cloned repo to `src-tauri`.
4. Run the command `cargo prisma generate` to have Prisma generate the necessary binaries from the Prisma schema located in `src-tauri/prisma`.
5. Run the command `cargo prisma migrate dev` to initialize your database by running the necessary migrations.
6. Use the command `pnpm run tauri dev` from the _root_ of the repo to run the application. Any changes you make will cause the app to reload on save.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
