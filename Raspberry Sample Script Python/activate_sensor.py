import requests

payload={'serialNo':'3'}
request_server=requests.post("http://smartwaterwatch.mybluemix.net/sensor/activate",data=payload)
print(request_server.text)
#http://smartwaterwatch.mybluemix.net/sensor/activate