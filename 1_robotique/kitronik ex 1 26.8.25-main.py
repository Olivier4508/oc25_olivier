from microbit import *
import neopixel

# challenge 1: faire trois pixels rgb 123

#np = neopixel.NeoPixel(pin8, 60)
#np[0] = (25, 0, 0)
#np[2] = (0, 0, 25)
#np[1] = (0, 25, 0)
#np.show()

# challenge 2: faire allumer un led après l'autre

np = neopixel.NeoPixel(pin8, 60)
while True:
    for i in range(len(np)):
        np[i] = (200, 0, 0)
        np[i-1] = (0, 0, 0)
        np.show()