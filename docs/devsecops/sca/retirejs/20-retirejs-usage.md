---
title: Retire.js Usage
tags: ['Retire.js', 'Retire.js Commands']
---

Retire.js is a scanner that identifies the use of JavaScript libraries with known vulnerabilities in your applications. This tutorial will guide you through some basic usage of Retire.js commands.

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

First, you'll need to install Retire.js globally on your machine. To do this, run the following command:

```bash
npm install -g retire
```

### Scanning a Specific File
To scan a specific JavaScript file, use the following command:

```bash
retire /path/to/your/file.js
```

### Scanning a Directory

To scan an entire directory, use the following command:

```bash
retire /path/to/your/directory
```

### Scanning a URL

To scan a URL, use the following command:

```bash
retire -u https://your-url.com
```

### Scanning a URL with a User-Agent

To scan a URL with a specific User-Agent, use the following command:

```bash
retire -u https://your-url.com -a "Your User-Agent"
```