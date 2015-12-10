import requests
import random
import time


while True:
	waterCount=random.randint(40, 50)
	payload={'sensorId':'566673b8d50bb9400063fb96','data':waterCount}
	request_server=requests.post("http://smartwaterwatch.mybluemix.net/sensor/data",data=payload)
	print(request_server.text)
	time.sleep(5)




#http://smartwaterwatch.mybluemix.net/sensor/data