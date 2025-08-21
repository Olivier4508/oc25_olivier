"""
Olivier Dubois-Ferrière
21 août 2025
Introduction au microbit

Peppa pig theme
music.play(['g4:2', 'e4:1', 'c4:1', 'd4:2', 'g3:2', 'g3:1', 'b3:1', 'd4:1','f4:1', 'e4:2', 'c4:2', 'e3:4'])

Code démonstrateur avec 10 programs.
bouton a : incrémenter le programme
bouton b : executer

0 - afficher un coeur
1 - défiler 'hello'
2 - dit 'wsg brodie'
3 - affiche la temperature
4 - joue Peppa Pig
5 - change p à un chiffre aléatoire entre 0 et 9
6 - affiche la luminosité
7 - affiche la sonorité
8 - dit hello
9 - eteint l'ecran

"""

from microbit import *
import music
import speech
import random

# on commence avec le programme 0
p = 0

while True:
    # choix du programme avec bouton a
    display.show(p)
    if button_a.was_pressed():
        p += 1
        if p == 10:
            p = 0

    # le bouton b execute le programme actuuel (0..9)
    if button_b.is_pressed():
        if p == 0:
            display.show(Image.HEART)
            sleep(500)
        elif p == 1:
            display.scroll('hello')
        elif p == 2:
            speech.say('whats good brodie')
        elif p == 3:
            display.show(temperature())
        elif p == 4:
            music.play(['g4:2', 'e4:1', 'c4:1', 'd4:2', 'g3:2', 'g3:1', 'b3:1', 'd4:1','f4:1', 'e4:2', 'c4:2'])
        elif p == 5:
            p = random.randrange(0,9)
            display.show(p)
            sleep(200)
        elif p == 6:
            display.scroll(display.read_light_level())
        elif p == 7:
            display.scroll(microphone.sound_level())
        elif p == 8:
            audio.play(Sound.HELLO)         
        elif p == 9:
            display.off()
            









