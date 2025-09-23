# oc25_dubois

## About me
Je suis un étudiant au gymnase du Bugnon [mdlgb.ch], et j'ai choisi cet OC car j'aime bien la programmation et je pense faire ca comme études plus tard.

Ce code permet de dire bonjour à quelqu'un.

```python
def bonjour(nom):
  return "Bonjour", + str(nom)

print(bonjour(Olivier))
```


## Partie obligatoire

Dans ce mini-projet le robot :
- commence le parcours à une position A
- va suive une ligne
- va détecter un objet avec le capteur ultrason (position B variable)
- va tourner de 180 degrès
- va attraper l'objet avec la pince
- va ramener l'onjet à la position A

```python
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
        robot.move(-50, -50, 600)
        robot.goToPosition(2, 10) # ferme la pince
    else : follow()

```


## Partie libre

Vous êtes complètement libre de faire quelque chose avec le robot
- une danse
- n light-show
- parler, faire de la musique
- être télécommandé

## Documentation

Toute la documentation se trouve dans un fichier README.md.

- 3 niveau de titres
- liste avec puces et numéroté
- des examples de code
- des formules mathématiques
- des images
- des hyperliens
