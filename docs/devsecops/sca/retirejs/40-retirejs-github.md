---
title: Retire.js with GitHub Actions
tags: ['Retire.js', 'Retire.js Commands', 'Retire.js GitHub Actions']
---

This tutorial will guide you through setting up a GitHub Actions workflow to scan your Node.js application for vulnerabilities using Retire.js.

### Step 1: Define the job

Define a job named `SAST-Frontend-Job-NodeJS-RetireJS` to run on `ubuntu-latest`. 

```yaml
oast-frontend-retirejs:
  name: SAST-Frontend-Job-NodeJS-RetireJS
  runs-on: ubuntu-latest
  steps:
```

### Step 2: Checkout the Code

Checkout your code using the actions/checkout@v3 action.

```yaml
- name: Checkout the Code
  uses: actions/checkout@v3
```

### Step 3: Setup Node.js

Set up Node.js version 18 using the actions/setup-node@v3 action.

```yaml
- name: Setup Node.js 18
  uses: actions/setup-node@v3
  with:
    node-version: '18'
```
### Step 4: Install the Libraries or Node Modules

Install your project's dependencies with npm install.

```yaml
- name: Install the Libraries or Node Modules
  run: npm install
```

### Step 5: Run RetireJS using docker image

Run the Retire.js scan by executing the Retire.js Docker image. Output is directed to retirejs-report.json and only vulnerabilities of high severity are included.

```yaml
- name: Run RetireJS using docker image
  run: docker run --rm -v $(pwd):/src -w /src hysnsec/retire --outputformat json --outputpath retirejs-report.json --severity high
  continue-on-error: true
```

### Step 6: List the files available

Display the files in the current directory with ls command.

```yaml
- name: List the files available
  run: ls
```
### Step 7: Upload the Output as an artifact

Finally, upload the scan output as a GitHub artifact using the actions/upload-artifact@v3.1.1 action. This step will always execute regardless of previous steps' success or failure.

```yaml
- name: Upload the Output as an artifact
  uses: actions/upload-artifact@v3.1.1
  with:
    name: RetireJS Output
    path: retirejs-report.json
  if: always()
```

Once you've completed these steps, commit and push the .github/workflows/retirejs.yml file to your repository to set up the workflow.

### Full Code

```yaml
  oast-frontend-retirejs:
    name: SAST-Frontend-Job-NodeJS-RetireJS
    runs-on: ubuntu-latest
    steps:
      - name: Checkout the Code
        uses: actions/checkout@v3

      - name: Setup Node.js 18
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install the Libraries or Node Modules
        run: npm install

      - name: Run RetireJS using docker image
        run: docker run --rm -v $(pwd):/src -w /src hysnsec/retire --outputformat json --outputpath retirejs-report.json --severity high
        continue-on-error: true

      - name: List the files available
        run: ls

      - name: Upload the Output as an artifact
        uses: actions/upload-artifact@v3.1.1
        with:
          name: RetireJS Output
          path: retirejs-report.json
        if: always()
```