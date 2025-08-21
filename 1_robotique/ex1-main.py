from microbit import *
import music

music.play(['g4:2', 'e4:1', 'c4:1', 'd4:2', 'g3:2', 'g3:1', 'b3:1', 'd4:1',
    'f4:1', 'e4:2', 'c4:2', 'e3:4', 'g4', 'a4', 'b4', 'c5'])

while True:
    if button_a.is_pressed() or button_b.is_pressed():
        display.scroll(temperature())


    # if accelerometer.was_gesture('shake'):
    if pin_logo.is_touched():
        display.show('ayo', 300)
