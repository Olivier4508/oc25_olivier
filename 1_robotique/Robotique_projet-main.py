"""
Projet Robotique

Nom : Olivier et Catia
Classe : 3M2
Date : 18.09.25

"""

from microbit import *
from machine import time_pulse_us
import music
import KitronikMOVEMotor
import radio

robot = KitronikMOVEMotor.MOVEMotor()
robot.move(0, 0)

# suivi de ligne, détection d'objet, ramasser l'objet et le ramener a l'origine
# deuxième partie libre

trigger = pin13
echo = pin14

trigger.write_digital(0)
echo.read_digital()

robot.goToPosition(1, 160)

def follow(): # suivre ligne
    left = pin1.read_analog()
    right = pin2.read_analog()
    d = (left - right)
    d = d // 10
    robot.move(5 - d, 5 + d)

while True:
    trigger.write_digital(1)
    trigger.write_digital(0)
    distance = time_pulse_us(echo, 1)/2e6*340
    # display.scroll(str(round(distance*100)), 50)
    robot.goToPosition(2, 180)
    if (distance*100) <= 14:
        robot.move(60, -60, 1175) # tourner 180 degrés
        robot.move(-50, -50, 400)
        robot.goToPosition(2, 10) # ferme la pince
        break
    else : follow()

while True:
    follow()
