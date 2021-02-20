#!/usr/bin/env python
import time
import ctypes
import os 
import sys
import select
import json
import math

print("proc started!")
import socket
TCP_IP = '79.143.25.41'
#TCP_IP = '127.0.0.1'
#TCP_PORT = 8080
TCP_PORT = 8081
MESSAGE = 'payload'
#MESSAGE = b'hi\n'
 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((TCP_IP, TCP_PORT))
print("sock connected")
jj = 0


dev_id="20A-0005\n"
#var = sys.argv[1]
#dev_id=var+"\n"

time.sleep( 0.1 ) # delay
s.send(dev_id.encode())
time_offset = 0

while True:
    #generate some data
    data_list1 = []
    data_list2 = []
    data_list3 = []

    for ii in range(5):
        data_list1.append( [time_offset + float(ii)/5, math.sin( (ii+jj*5)/20) ] )

    for ii in range(30):
        data_list2.append( [time_offset + float(ii)/30 , math.sin( (ii + jj*30)/5)] )

    for ii in range(300):
        data_list3.append( [time_offset + float(ii)/300, math.sin( (ii + jj*300)/10) ])

    jj = jj + 1
    if jj > 10000:
        jj = 0

    data_dict = {'sensor1':data_list1, 'sensor2':data_list2, 'sensor3':data_list3, 'message':MESSAGE}
    msg = json.dumps( data_dict ) #conver to JSON
    msg += "\n"
    s.send(msg) #send to server
    if select.select([s],[],[],0.1)[0]: # wait 0.1 second for answer, if got - print the answer
        print( mysocket.recv( 4096 ) )

    print("cycle ", jj, time_offset)
    time_offset += 1
    time.sleep( 1 ) # delay

print("sock to close")
s.close()
 
print("proc stop!")
