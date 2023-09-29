---
title: HTTP Server in Python
---

In this tutorial, we will guide you through the steps of implementing your own HTTP server in Python using the client/server approach with the TCP protocol.

## Step 1: Set Up the Server

We will use the `bind()` and `listen()` methods from Python's socket module. The `bind()` method accepts the IP address and port as parameters, and the `listen()` method allows you to queue up to a maximum number of requests. Here's an example of how you can set up your server:

```python
import socket
mySocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
mySocket.bind(('localhost', 8080))
mySocket.listen(5)
```

### Step 2: Handle Incoming Requests

We establish the logic of our server to handle every request it receives from a client. We use the accept() method to accept connections, read incoming data with the recv() method, and respond to an HTML page to the client with the send() method. Here's how you can implement this logic:

```python
while True:
    print('Waiting for connections')
    (recvSocket, address) = mySocket.accept()
    print('HTTP request received:')
    print(recvSocket.recv(1024))
    recvSocket.send(bytes("HTTP/1.1 200 OK\r\n\r\n <html><body><h1>Hello World!</h1></body></html> \r\n",'utf-8'))
    recvSocket.close()
```

### Full Code

```python title="http_server.py"
import socket
mySocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
mySocket.bind(('localhost', 8080))
mySocket.listen(5)
while True:
    print('Waiting for connections')
    (recvSocket, address) = mySocket.accept()
    print('HTTP request received:')
    print(recvSocket.recv(1024))
    recvSocket.send(bytes("HTTP/1.1 200 OK\r\n\r\n <html><body><h1>Hello World!</h1></body></html> \r\n",'utf-8'))
    recvSocket.close()
```

### Step 3: Test the HTTP Server

To test the server, we create another script to get the response sent by the server. This script sends a GET request to the server and prints out the server's response. Here's how you can implement it:

```python title="http_client.py"
import socket
webhost = 'localhost'
webport = 8080
print("Contacting %s on port %d ..." % (webhost, webport))
webclient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
webclient.connect((webhost, webport))
webclient.send(bytes("GET / HTTP/1.1\r\nHost: localhost\r\n\r\n".encode('utf-8')))
reply = webclient.recv(4096)
print("Response from %s:" % webhost)
print(reply.decode())
```

After running this script, you should receive the following output:

```bash
Contacting localhost on port 8080 ...
Response from localhost:
HTTP/1.1 200 OK
 <html><body><h1>Hello World!</h1></body></html>
```

This output shows that the server is successfully implemented as it returns the HTTP/1.1 200 OK response to the client.