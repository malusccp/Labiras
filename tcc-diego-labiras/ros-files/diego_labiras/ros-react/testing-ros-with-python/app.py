from __future__ import print_function
import roslibpy

client = roslibpy.Ros(host='localhost', port=9090)
client.run()

listener = roslibpy.Topic(client, '/topic', 'tutorial_interfaces/Num')

listener.subscribe(lambda message: print('Heard talking: ' + message['num']))

try:
    while True:
        pass
except KeyboardInterrupt:
    client.terminate()