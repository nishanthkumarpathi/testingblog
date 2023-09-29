---
title: NPM Audit Usage
tags: ['NPM', 'NPM Audit', 'NPM Audit Commands']
---

Using npm audit to scan your project for vulnerabilities

### Automatically install updates to vulnerable dependencies

To scan your project for vulnerabilities and automatically install any compatible updates, run:

```bash
npm audit fix
```


### Modify package-lock.json without altering node_modules

If you wish to run audit fix without modifying node_modules but still updating the package-lock.json, use:

```bash
npm audit fix --package-lock-only
```

### Exclude devDependencies from update

To skip updating devDependencies while running audit fix, use:

```bash
npm audit fix --only=prod
```


### Force update of toplevel dependencies

To have audit fix install SemVer-major updates to toplevel dependencies, not just SemVer-compatible ones, use:

```bash
npm audit fix --force
```

### Dry run and output install information

If you want to do a dry run to get an idea of what audit fix will do and also output install information in JSON format, run:

```bash
npm audit fix --dry-run --json
```

### Scan for vulnerabilities without automatic fixing

To simply scan your project for vulnerabilities and show the details without fixing anything, use:

```bash
npm audit
```

### Get detailed audit report in JSON format

If you wish to get the detailed audit report in JSON format, run:

```bash
npm audit --json
```

### Fail audit for specific vulnerability level

To make an audit fail only if the results include a vulnerability with a level of 'moderate' or higher, use:

```bash
npm audit --audit-level=moderate
```