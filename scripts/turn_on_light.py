import RPi.GPIO as GPIO

relOnePin = 23
relTwoPin = 24

GPIO.setmode(GPIO.BCM)
GPIO.setup(relOnePin, GPIO.OUT)
GPIO.setup(relTwoPin, GPIO.OUT)

# Turn on light
#GPIO.output(relOnePin, 0)
GPIO.output(relTwoPin, 0)

# Wait for input until cleaning up
raw_input("Press Enter to exit")

GPIO.cleanup()
