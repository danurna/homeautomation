import RPi.GPIO as GPIO

relOnePin = 23
relTwoPin = 24

GPIO.setmode(GPIO.BCM)
GPIO.setup(relOnePin, GPIO.OUT)
GPIO.setup(relTwoPin, GPIO.OUT)

# Turn on light
#GPIO.output(relOnePin, 1)
GPIO.output(relTwoPin, 1)

# Wait 
raw_input("Press Enter to exit");

GPIO.cleanup()
