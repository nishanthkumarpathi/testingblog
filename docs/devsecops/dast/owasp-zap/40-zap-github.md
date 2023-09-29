---
title: OWASP ZAP with Github Actions
tags: ['OWASP ZAP','Zed Attack Proxy','DAST','DevSecOps', 'OWASP ZAP with Github']
---

This tutorial demonstrates how to setup a Dynamic Application Security Testing (DAST) scan for a web application using OWASP ZAP Security Scanner in a GitHub Actions workflow.

### Step 0: Create a GitHub Actions Workflow and Define the Job

In your GitHub repository, navigate to the Actions tab. Click on 'New workflow' to create a new workflow. Set up the workflow file by copying the following code into the editor:

```yaml
name: OWASP ZAP Security Scan

on: [push]

jobs:
  zap_scan:
    runs-on: ubuntu-latest
    name: Run DAST scan on the web application
```

### Step 1: Download the Source Code

Add a step to your workflow to download the source code from your repository:

```yaml
    steps:
      - name: Checkout source code
        uses: actions/checkout@v3
```

### Step 2: Use OWASP ZAP to Scan the Web Application

Add a step to your workflow to run the OWASP ZAP scan:

```yaml
      - name: Run OWASP ZAP scan
        uses: zaproxy/action-baseline@v0.6.1
        with:
          docker_name: 'owasp/zap2docker-stable'
          target: http://localhost:3000
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'
```

### Full Code

```yaml

name: Build code, run unit test, run SAST, SCA, DAST security scans
on: push

jobs:

  zap_scan:
    runs-on: ubuntu-latest
    needs: security
    name: Run DAST scan on the web application
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          ref: master
      - name: ZAP Scan
        uses: zaproxy/action-baseline@v0.6.1
        with:
          docker_name: 'owasp/zap2docker-stable'
          target: 'http://testphp.vulnweb.com/'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'
```