---
title: Nikto with Gitlab
tags: ['Nikto','DAST','DevSecOps', 'Nikto with Gitlab']
---

This tutorial will demonstrate how to setup a Dynamic Application Security Testing (DAST) scan for a web application using Nikto in a GitLab CI/CD pipeline.

### Step 1: Creating the GitLab CI/CD Pipeline Configuration File

Start by creating a `.gitlab-ci.yml` configuration file in the root of your GitLab repository. This file will define the pipeline for your project.

```yaml
stages:
  - integration

nikto:
  stage: integration
  script:
    - docker pull hysnsec/nikto
    - docker run --rm -v $(pwd):/tmp hysnsec/nikto -h http://vulnhub.com -o /tmp/nikto-output.xml
  artifacts:
    paths: [nikto-output.xml]
    when: always
```

### Step 2: Understanding the Configuration

In this configuration file, we defined a single stage named integration, which runs a Nikto DAST scan.

The script section consists of commands that pull the Nikto Docker image and runs a Nikto scan against the specified URL, outputting the results to nikto-output.xml in the pipeline's current working directory.

The artifacts section specifies that nikto-output.xml should be kept as an artifact of the pipeline run, which means it can be downloaded from GitLab after the pipeline finishes running.

### Step 3: Commit and Push Changes

Once the .gitlab-ci.yml file has been created, commit the file and push it to your GitLab repository:

```bash
git add .gitlab-ci.yml
git commit -m "Add Nikto DAST scan to GitLab CI/CD pipeline"
git push origin master
```

### Step 4: Run the Pipeline

The pipeline should automatically run after the push to the repository. You can check the status of the pipeline by going to CI/CD > Pipelines in your GitLab repository.