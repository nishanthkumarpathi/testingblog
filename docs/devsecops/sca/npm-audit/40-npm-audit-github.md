---
title: NPM Audit with GitHub Actions
tags: [DevSecOps, NPM Audit, SCA, Software Composition Analysis, GitHub Actions, GitHub,Node.js, JavaScript, NPM]
---

This tutorial will guide you on how to configure GitHub Actions to perform an NPM audit scan for vulnerabilities.

### Step 0: Create a GitHub Actions Workflow and Define the Job

Create a new `.yml` file under your repository's `.github/workflows` directory.

In the workflow file, start defining your job:

```yaml
name: NPM Audit Scan using Github Actions

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  npm-audit-scan-job:
    name: NPM Audit Scan for Vulnerabilities
      runs-on: ubuntu-latest
        steps:
```

### Step 1: Download the Source Code

The first step in our workflow is to checkout the repository. We can do this with the actions/checkout action.

```yml
      - name: Step1 Download the Source Code
        uses: actions/checkout@v3.5.3
```

### Step 2: Install Node.js

Next, we need to set up our Node.js environment. We can do this with the actions/setup-node action.

```yml
      - name: Step2 Install Node.js
        uses: actions/setup-node@v3.7.0
        with:
          node-version: '18.16.1'
```

### Step 3: Install Dependencies

We will use npm install to download and install the project dependencies.

```yml
      - name: Step3 Install Dependencies
        run: npm install
```

### Step 4: NPM Audit Scan and Generate Report in JSON Format
Next, we perform an NPM audit scan and direct the output in JSON format to a file. We use continue-on-error: true to ensure that our workflow continues even if vulnerabilities are found.

```yml
      - name: Step4 NPM Audit Scan and Generate Report in JSON Format
        run: npm audit --json > npm-audit-results.json
        continue-on-error: true
```

### Step 6: Upload NPM Audit Scan Report to GitHub

Finally, we upload the generated audit report to GitHub as an artifact.

```yml
      - name: Step5 Upload NPM Audit Scan Report to GitHub
        uses: actions/upload-artifact@v3
        with:
          name: npm-audit-results
          path: npm-audit-results.json
```

Once you have completed these steps, commit and push the .yml file to your repository to set up the workflow.

### Full Code

```yml
name: NPM Audit Scan using Github Actions

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  npm-audit-scan-job:
    name: NPM Audit Scan for Vulnerabilities
    runs-on: ubuntu-latest
    steps:
      - name: Step1 Download the Source Code
        uses: actions/checkout@v3.5.3

      - name: Step2 Install Node.js
        uses: actions/setup-node@v3.7.0
        with:
          node-version: '18.16.1'

      - name: Step3 Install Dependencies
        run: npm install

      - name: Step4 NPM Audit Scan and Generate Report in JSON Format
        run: npm audit --json > npm-audit-results.json
        continue-on-error: true

      - name: Step5 Upload NPM Audit Scan Report to GitHub
        uses: actions/upload-artifact@v3
        with:
          name: npm-audit-results
          path: npm-audit-results.json
```