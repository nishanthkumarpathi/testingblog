---
title: NPM Audit with Gitlab
tags: ['NPM', 'NPM Audit', 'NPM Audit Commands', 'Gitlab', 'Gitlab CI/CD', 'Gitlab CI/CD Pipeline']
---

This tutorial will guide you on how to configure GitLab CI/CD to perform an NPM audit scan for vulnerabilities using SonarCloud.

### Step 1: Define the stages and variables

Start by defining the stages of your pipeline and any necessary variables. In this case, we only have one stage, `securitytesting`, and we define two variables: `SONAR_USER_HOME` and `GIT_DEPTH`.

```yaml
stages:
  - securitytesting

variables:
  SONAR_USER_HOME: "${CI_PROJECT_DIR}/.sonar"  # Defines the location of the analysis task cache
  GIT_DEPTH: "0"  # Tells git to fetch all the branches of the project, required by the analysis task
```

### Step 2: Define the sonarcloud-check job

Next, define a job for the securitytesting stage. We'll name this job sonarcloud-check. This job uses the sonarsource/sonar-scanner-cli:latest Docker image, and it has caching configured for the SonarCloud cache.

```yml
sonarcloud-check:
  stage: securitytesting
  image:
    name: sonarsource/sonar-scanner-cli:latest
    entrypoint: [""]
  cache:
    key: "${CI_JOB_NAME}"
    paths:
      - .sonar/cache
```

### Step 3: Define the script for the sonarcloud-check job
The script for the sonarcloud-check job should call the sonar-scanner command with the necessary arguments for your project and organization.

```yml
  script:
    - sonar-scanner -Dsonar.projectKey=nishanthkp_employee-frontend-gitlab-demo-track3 -Dsonar.organization=nishanthkp
```

### Step 4: Set the job to run only on the main branch

Lastly, we want the sonarcloud-check job to run only for the main branch.

```yml
  only:
    - main
```

Once you've completed these steps, commit and push the .gitlab-ci.yml file to your repository to set up the pipeline.