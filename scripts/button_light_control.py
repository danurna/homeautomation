import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

# Setup Relais
relOnePin = 23
relTwoPin = 24

GPIO.setup(relOnePin, GPIO.OUT)
GPIO.setup(relTwoPin, GPIO.OUT)

# Setup button
buttonPin = 4

GPIO.setup(buttonPin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

lightState = 0
prev_input = 0

try:
	while True:
		# Read input from button pin
		input = GPIO.input(buttonPin)

		if ((not prev_input) and input):		
			print("Button pressed")
			if (lightState == 0):
				# Turn light on
				GPIO.output(relTwoPin, 0)
				lightState = 1
			else:
				# Turn light off
				GPIO.output(relTwoPin, 1)
				lightState = 0 
		
		# Save input
		prev_input = input
		# Pause 
		time.sleep(0.05)


except KeyboardInterrupt:
	GPIO.cleanup()
