---
title: Port Scanner Advanced
---

```python title="port_scanner_advanced.py"
import optparse
from socket import *
from threading import *
def socketScan(host, port):
	try:
		socket_connect = socket(AF_INET, SOCK_STREAM)
		socket_connect.settimeout(5)
		result = socket_connect.connect((host, port))
		print('[+] %d/tcp open' % port)
	except Exception as exception:
		print('[-] %d/tcp closed' % port)
		print('[-] Reason:%s' % str(exception))
	finally:
		socket_connect.close()	
def portScanning(host, ports):
	try:
		ip = gethostbyname(host)
		print('[+] Scan Results for: ' + ip)
	except:
		print("[-] Cannot resolve '%s': Unknown host" %host)
		return
	for port in ports:
		t = Thread(target=socketScan,args=(ip,int(port)))
		t.start()
```

### Test

```bash
python port_scanner_advanced.py -H localhost -p 21,22,80,8080,443
```

```bash
[+] Scan Results for: