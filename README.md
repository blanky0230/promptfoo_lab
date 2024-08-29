# Automated Testing and Quality Assurance for features leveraging LLMs and implementing Agentic Software Systems

## Promptfoo

[Promptfoo's](https://www.promptfoo.dev/) proclaimed features for "Evaluations, Security & Red Teaming, and CI/CD Testing" in the context of LLM-Apps, sound like something that I dearly missed to have some guidance on. Mabye, this is a tool I, and others, may choose in order to gain back some confidence when building and mainting applications, especially when working with LLMs and integrating them in critical, real-world applications.

Let's see whether this tool can support us to be able to improve our applications and increase value to the costumers and users relying on our implementations.

## Technologies

Using [Storybook](https://storybook.js.org/) to enable us to provide visually appealing, interactive, and suitable visual documentation of our approaches.

Loving [bun](https://bun.sh/), for its simplicity, streamlined apis and cli, without compromising (too much) on the vast ecosystem of JavaScript and TypeScript.

React, Vite, and TypeScript - for battle-tested, modern, and efficient development. Having accompanied me, and many others, when building applications, I feel confident about, am comfortable with, and trust others to be able to adopt in order to maintain whatever legacy I application I may build today.

Nix - for it's reproducibility and it's explicit and functional expressions. Supporting me to be able to provide runnable examples to share with anyone and allows modernization of my applications with more confidence of not breaking value-delivering features.

LangChain as a popular choice of a framework to leverage the usage of LLMs from chatting to building applications where we try to use the emerging behavior of LLMs to our advantage.

Vercel's AI SDK - for an easy integration of AI models in order to build features with them. As a comparison for __some__ of LangChain's UseCases as well as a more general possible alternative, considering it's promise to be easily integrated with React and Next.


## Setting up and running the project

### Nix

#### Interactive Shell

```bash
nix develop
```

#### Building and running locally

```bash
nix build
nix run
```


### bun | pnpm | npm | yarn

This guide may give some pointers, if you'd like to replicate something similar: https://linkb.hashnode.dev/bunsh-with-react-typescript-tailwindcss-and-storybook#heading-getting-started

```bash
bun install
```

#### Starting Storybook in development mode

```bash
bun --filter storybook dev
```

#### Running the storybook subproject with Vite only

```bash
bun --filter storybook dev:vite
```

#### Building the storybook subproject

```bash
bun --filter storybook build
```

For more commands, check the `scripts` section in the `package.json` file of the package you're interested in (e.g. `storybook/package.json`).

#### Running tests in all packages

These convieniently run all tests in all packages. using the `--parallel` flag so we save some keystrokes.

Simple run:

```bash
bun test
```

You may also run tests in a specific package by using the `--filter` flag.
```bash
bun --filter storybook test
```

You can then append whatever cli arguments you'd like to pass to the test runner, e.g. `--watch` or `--coverage`.
```bash
bun --filter storybook test --coverage
```

This also works when running tests in all packages.
```bash
bun test --watch
```
