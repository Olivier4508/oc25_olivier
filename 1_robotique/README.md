# oc25_dubois

## About me

Je suis un étudiant au gymnase du Bugnon [mdlgb.ch], et j'ai choisi cet OC car j'aime bien la programmation et je pense faire ca comme études plus tard.

Ce code permet de dire bonjour à quelqu'un.

```python
def bonjour(nom): 
  return "Bonjour", + str(nom)

print(bonjour(Olivier))
```

# Projet Robotique

Ce projet possède une parite obligatoire, mais aussi une partie libre.

## Partie obligatoire (Prog 1)

Dans ce mini-projet le robot doit :

- Commencer le parcours à une position A
- Suivre une ligne
- Être capable de détecter un objet avec le capteur ultrason (position B variable)
- Pouvoir tourner par la suite de 180 degrès
- Être capable d'attraper l'objet avec la pince
- Aller ramener l'objet à la position A

## Partie libre (Prog 0 et 2)

Cette partie du projet est divisée en deux programmes.

1. Le robot est télécommandé
2. Une musique se joue

## Program global (Prog 0, 1 et 2)

Voici le code des différents programmes pour ce projet robotique.

```python
from microbit import *
import KitronikMOVEMotor
from machine import time_pulse_us 
import music
import radio
import time

robot = KitronikMOVEMotor.MOVEMotor()
robot.move(0, 0)
robot.goToPosition(1, 90)

# le group doit correspondre au kit (1..15)
g = 5
display.scroll(g)
radio.on()
radio.config(group=g)

prog = 0 # programme actuel (0..n)**
display.show(prog)

def follow(v): # suivre ligne
    left = pin1.read_analog()
    right = pin2.read_analog()
    d = (left - right)
    d = d // 10
    robot.move(v - d, v + d)

trigger = pin13
echo = pin14

while True:
    # le bouton A incrémente les programmes (0..n)**
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

    if prog == 1:
        init_time = running_time() # mesure le temps depuis que le microbit est allumé / temps 0
        robot.goToPosition(1, 160)
        while True:
            if button_a.was_pressed():
                robot.move(0, 0)
                prog = (prog + 1) % 10
                display.show(prog)
                music.pitch(440, 20)
                break
            elif prog == 2:
                robot.move(0, 0)
                display.show(prog)
                music.pitch(440, 20)
                break
            trigger.write_digital(1)
            trigger.write_digital(0)
            distance = time_pulse_us(echo, 1)/2e6*340
            if (distance*100) <= 14:
                robot.move(60, -60, 1325) # tourner 180 degrés
                robot.move(-60, -60, 1000)
                robot.goToPosition(1, 20) # ferme la pince
                time_elapsed = running_time() - init_time # temps depuis que le prog 1 à commencé / temps pour aller à l'objet
                while True:
                    new_time = running_time() - time_elapsed - init_time # temps depuis qu'on a mesuré time_elapsed (chrono qui commence après qu'il a ramassé l'objet)
                    if time_elapsed <= new_time: # si le temps de puis qu'on a pris l'objet = temps pour aller à l'objet
                        robot.move(0, 0) # arrête le robot
                        robot.goToPosition(1, 160) # relache l'objet
                        while True:
                            if button_a.was_pressed(): # pour avancer au prochain programme (musique)
                                prog = 2
                                break
                        break
                    else:
                        follow(10)
            else : follow(20)

    if prog == 2:
        while True:
            if button_a.was_pressed():
                prog = (prog + 1) % 10
                display.show(prog)
                music.pitch(440, 20)
                break
            elif button_b.was_pressed():
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

## Prog 0 (télécommandé)

Voici le code qui permet au robot d'être télécommandé :

```python
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

## Prog 1 (Partie Obligatoire)

Voici le code qui permet au robot de suivre une ligne, attraper un objet et le ramener :

```python
if prog == 1:
        init_time = running_time() # mesure le temps depuis que le microbit est allumé / temps 0
        robot.goToPosition(1, 160)
        while True:
            if button_a.was_pressed():
                robot.move(0, 0)
                prog = (prog + 1) % 10
                display.show(prog)
                music.pitch(440, 20)
                break
            elif prog == 2:
                robot.move(0, 0)
                display.show(prog)
                music.pitch(440, 20)
                break
            trigger.write_digital(1)
            trigger.write_digital(0)
            distance = time_pulse_us(echo, 1)/2e6*340
            if (distance*100) <= 14:
                robot.move(60, -60, 1325) # tourner 180 degrés
                robot.move(-60, -60, 1000)
                robot.goToPosition(1, 20) # ferme la pince
                time_elapsed = running_time() - init_time # temps depuis que le prog 1 à commencé / temps pour aller à l'objet
                while True:
                    new_time = running_time() - time_elapsed - init_time # temps depuis qu'on a mesuré time_elapsed (chrono qui commence après qu'il a ramassé l'objet)
                    if time_elapsed <= new_time: # si le temps de puis qu'on a pris l'objet = temps pour aller à l'objet
                        robot.move(0, 0) # arrête le robot
                        robot.goToPosition(1, 160) # relache l'objet
                        while True:
                            if button_a.was_pressed(): # pour avancer au prochain programme (musique)
                                prog = 2
                                break
                        break
                    else:
                        follow(10)
            else : follow(20)

```

!['Photo de notre robot'](robot.png)

## Prog 2 (Musique)

Voici le code qui permet au robot de jouer une musique :

Musique [Lava Chicken](https://musescore.com/user/35262893/scores/24663382)

```python
    if prog == 2:
        while True:
            if button_a.was_pressed():
                prog = (prog + 1) % 10
                display.show(prog)
                music.pitch(440, 20)
                break
            elif button_b.was_pressed():
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
