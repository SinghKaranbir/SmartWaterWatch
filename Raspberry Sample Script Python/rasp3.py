import requests
import random
import time

while True:
	waterCount=random.randint(8, 18)
	payload={'sensorId':'566673ffd50bb9400063fb98','data':waterCount}
	request_server=requests.post("http://smartwaterwatch.mybluemix.net/sensor/data",data=payload)
	print(request_server.text)
	time.sleep(5)


#http://smartwaterwatch.mybluemix.net/sensor/data