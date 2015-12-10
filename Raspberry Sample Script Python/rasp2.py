import requests
import random
import time

while True:
	waterCount=random.randint(8, 18)
	payload={'sensorId':'566673dcd50bb9400063fb97','data':waterCount}
	request_server=requests.post("http://smartwaterwatch.mybluemix.net/sensor/data",data=payload)
	print(request_server.text)
	time.sleep(5)

#http://smartwaterwatch.mybluemix.net/sensor/data