---
title: Introduction
tags: ['NPM', 'NPM Audit', 'NPM Audit Commands']
---

1. The audit command sends a description of your project's dependencies to your default registry to request a report on known vulnerabilities. It also calculates the impact and potential remedies if any vulnerabilities are found.

2. The command exits with a 0 exit code if no vulnerabilities are detected, indicating a successful execution without issues.

3. Some vulnerabilities may require manual intervention or review as they cannot be fixed automatically. The npm audit fix command runs a complete npm install process, therefore, any configurations applicable to the installer also apply here.

4. The audit command, by default, will exit with a non-zero code if it detects any vulnerability. This exit code is useful in identifying that an issue exists.

5. The --audit-level parameter can be used in Continuous Integration (CI) environments to set the minimum vulnerability level that causes the command to fail. This option does not alter the report output, but modifies the command's failure threshold.

## Project Scenario
In this tutorial, we will walk through how to use NPM Audit, a built-in command-line tool that comes with NPM (Node Package Manager) to identify and fix potential security vulnerabilities in your JavaScript projects.

## Prerequisites
- Basic understanding of JavaScript and Node.js.
- Node.js and NPM installed on your machine.
