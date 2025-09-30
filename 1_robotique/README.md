# oc25_dubois

## About me

Je suis un étudiant au gymnase du Bugnon [mdlgb.ch], et j'ai choisi cet OC car j'aime bien la programmation et je pense faire ca comme études plus tard.

Ce code permet de dire bonjour à quelqu'un.

```python
def bonjour(nom):
  return "Bonjour", + str(nom)

print(bonjour(Olivier))
```

## Projet Robotique

Ce projet possède une parite obligatoire, mais aussi une partie libre.

## Partie obligatoire

Dans ce mini-projet le robot doit :

- Commencer le parcours à une position A
- Suivre une ligne
- Être capable de détecter un objet avec le capteur ultrason (position B variable)
- Pouvoir tourner par la suite de 180 degrès
- Être capable d'attraper l'objet avec la pince
- Aller ramener l'objet à la position A

### Programmation

Voici le code de cette partie du projet, qui comporte tous les précédents élements cités :

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

def follow(v): # suivre ligne
    left = pin1.read_analog()
    right = pin2.read_analog()
    d = (left - right)
    d = d // 10
    robot.move(v - d, v + d)

while True:
    trigger.write_digital(1)
    trigger.write_digital(0)
    distance = time_pulse_us(echo, 1)/2e6*340
    robot.goToPosition(2, 180)
    if (distance*100) <= 14:
        robot.move(60, -60, 1175) # tourner 180 degrés
        robot.move(-50, -50, 600)
        robot.goToPosition(2, 10) # ferme la pince
    else : follow(20)

```

!['Photo de notre robot'](robot.png)

## Partie libre

Cette partie du projet est divisée en plusieurs programmes.

Programme (0..n)

1. Le robot est télécommandé
2. Une musique se joue

## Program global

Voici le code des différents programmes pour cete partie du projet.

```python
from microbit import *
import KitronikMOVEMotor
import music
import radio


robot = KitronikMOVEMotor.MOVEMotor()
robot.move(0, 0)
robot.goToPosition(1, 90)

# le group doit correspondre au kit (1..15)
g = 6
display.scroll(g)
radio.on()
radio.config(group=g)

prog = 0 # programme actuel (0..n)**
display.show(prog)

while True:
    # le bouton A incrémente les programmes (0..n)**
    if button_a.was_pressed():
        robot.move(0, 0)
        prog = (prog + 1) % 10
        display.show(prog)
        music.pitch(440, 20)

    if prog == 0:
        msg = radio.receive()
        if msg:
            display.show(msg)
            if msg == '0':
                robot.move(0, 0)
            elif msg == 'u':
                robot.move(-80, -80)
            elif msg == 'r':
                robot.move(80, -80)
            elif msg == 'l':
                robot.move(-80, 80)
            elif msg == 'd':
                robot.move(80, 80)
            elif msg == '2':
                robot.goToPosition(1, 20)
            elif msg == '1':
                robot.goToPosition(1, 160)


```

## Musique

Musique [Lava Chicken](https://musescore.com/user/35262893/scores/24663382)

```python
music.set_tempo(bpm=79)
lavachicken = ('d4:1', 'd4:1', 'd4:1', 'f:1', 'd4:3', 'r:1',
               'd4:1', 'd4:1', 'd4:1', 'f:1', 'd4:3', 'r:3',
               'g4:3', 'g4:1', 'f4:1', 'g4:1', 'f4:1', 'd4:1', 'c4:1',
               'd4:1', 'd4:1', 'c4:1', 'd4:3', 'r:2', 'g4:3',
               'g4:1', 'f4:1', 'g4:1', 'f4:1', 'd4:1', 'c4:1', 'd4:1', 'd4:1',
               'f4:1', 'd4:3', 'r:2', 'g4:3', 'g4:1', 'f4:1', 'g4:1', 'f4:1',
               'd4:1', 'c4:1', 'd4:1', 'd4:1', 'c4:1', 'f4:3', 'r:2',
               'g4:3', 'g4:1', 'f4:1', 'g4:1', 'f4:1', 'd4:1', 'c4:1',
               'd5:1', 'd5:1', 'd5:1', 'd5:6')

music.play(lavachicken)

```

## Documentation

Toute la documentation se trouve dans un fichier README.md.

- 3 niveau de titres
- liste avec puces et numéroté
- des examples de code
- des formules mathématiques
- des images
- des hyperliens
