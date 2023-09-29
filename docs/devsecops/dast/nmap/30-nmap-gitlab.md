---
title: Nmap with GitLab
tags: ['Nmap','DAST' ]
---


This tutorial will guide you on how to setup Dynamic Application Security Testing (DAST) scan for a web application using Nmap in a GitLab CI/CD pipeline.

### Step 0: Create a GitLab CI/CD Pipeline

Start by creating a `.gitlab-ci.yml` configuration file in the root of your GitLab repository. This file will define the pipeline for your project.

### Step 1: Download the Source Code

For the DAST scan, we need the Nmap Docker image. We will specify this in our GitLab CI configuration.

### Step 2: Perform the Nmap Scan

Here's an example of how you can setup the Nmap DAST scan in the `.gitlab-ci.yml` configuration file:

```yaml
stages:
  - integration

nmap:
  stage: integration
  script:
    - docker pull hysnsec/nmap
    - docker run --rm -v $(pwd):/tmp hysnsec/nmap https://vulnhub.com -oX /tmp/nmap-output.xml
  artifacts:
    paths: [nmap-output.xml]
    when: always
```

In the script section of the configuration file, we first pull the Nmap Docker image, then we run the Nmap scan against the specified target (replace 'https://vulnhub.com' with your target), saving the output in XML format to 'nmap-output.xml'.


### Step 3: Upload the Scan Output

The artifacts section in the configuration specifies that 'nmap-output.xml' should be preserved as an artifact of the pipeline run. This means that it can be downloaded from GitLab after the pipeline finishes running.

Once the .gitlab-ci.yml file is ready, commit the changes and push them to your GitLab repository.