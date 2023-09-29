---
title: OWASP ZAP Usage
tags: ['OWASP ZAP','Zed Attack Proxy','DAST','DevSecOps']
---

### ZAP Quick Scan

```bash
zap-cli quick-scan -s xss,sqli --spider -r -e "some_regex_pattern" http://127.0.0.1/
```

### ZAP with a custom API key

```bash
zap-cli start --start-options '-config api.key=12345'
```

### ZAP with API key disabled

```bash
zap-cli quick-scan -sc -o '-config api.disablekey=true' -s xss http://127.0.0.1/
```

### Scan Authenticated Users

```bash
zap-cli context export --name DevTest --file-path /home/user/DevTest.context
```

To import the saved context for use with ZAP CLI later, you could run:

```bash
zap-cli context import /home/user/DevTest.context
```