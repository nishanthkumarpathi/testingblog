---
title: Introduction
tags: ['Docker', 'Hadolint']
---

A smarter Dockerfile linter that helps you build best practice Docker images. The linter is parsing the Dockerfile into an AST and performs rules on top of the AST. It additionally is using the famous Shellcheck to lint the Bash code inside RUN instructions. Please help me improve the linter with your suggestions.

Here is an [Online Playground](https://hadolint.github.io/hadolint/)