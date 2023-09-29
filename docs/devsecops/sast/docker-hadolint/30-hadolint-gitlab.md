---
title: Hadolint with Gitlab
tags: ['Docker', 'Hadolint', 'Gitlab Hadolint']
---

### Hadolint with Gitlab

```yml
stages:
  - docker-scan

hadolint-job:
  stage: docker-scan
  image: registry.gitlab.com/pipeline-components/hadolint:latest
  script:
    - hadolint --no-fail -f json Dockerfile > hadolint-results.json
  only:
    - main
  artifacts:
    paths:
        - hadolint-results.json
    when: always

```

