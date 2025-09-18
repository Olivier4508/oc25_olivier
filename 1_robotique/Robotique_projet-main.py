#https://commonmark.org/help/tutorial/10-nestedLists.html

#ce que doit contenir le projet - suivre lgne -
#detecter objet avec capteur et ramner objet à l'origine et pour le reste c'est libre

# doit tout apparaître sur le readme

from microbit import *
from machine import time_pulse_us

trigger = pin13
echo = pin14

trigger.write_digital(0)
echo.read_digital()



while True:
    trigger.write_digital(1)
    trigger.write_digital(0)
    distance =time_pulse_us(echo, 1)/2e6*340*100  #d = T/2 * 340 m/s
    print(round(distance)) # round : arrondie la valeur
    
    display.scroll(str(round(distance)),50)
