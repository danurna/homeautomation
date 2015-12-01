var gpio = require('rpi-gpio');

var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-outlet", "Outlet", SwitchAccessory);
};

function SwitchAccessory(log, config) {
  this.log = log;
  this.name = config.name;
  this.pin = config.pin;

  if (this.name  === undefined) {
    return log("Name missing from configuration.");
  }

  this.pin = 24;
  var self = this;

  // Setup layout
  gpio.setMode(gpio.MODE_BCM);
  
  // Setup pin that controlles switch
  // turnOff is the callback function
  gpio.setup(this.pin, gpio.DIR_OUT, this.turnOff);

  var informationService = new Service.AccessoryInformation();

  informationService
    .setCharacteristic(Characteristic.Name, "Switch")
    .setCharacteristic(Characteristic.Manufacturer, "dna")
    .setCharacteristic(Characteristic.Model, "v0.1")
    .setCharacteristic(Characteristic.SerialNumber, "0000000001");

  var switchService = new Service.Switch(config.name);
  var state = false;

  switchService
  .getCharacteristic(Characteristic.On)
  .on('set', function(value, callback) {
    state = value;
    if (state) {
      self.turnOn();
    } else {
      self.turnOff();
    }
    callback();
  });

  switchService
  .getCharacteristic(Characteristic.On)
  .on('get', function(callback){
    callback(null, state);
  });

  this.services = [ informationService, switchService ];
}

SwitchAccessory.prototype.turnOn = function(){
  // this.write(false);
  gpio.setup(this.pin, gpio.DIR_OUT);
  gpio.write(this.pin, false, function(err) {
      if (err) throw err;
      console.log('Written to pin');
  });
};

SwitchAccessory.prototype.turnOff = function(){
  // this.write(true);
  gpio.write(this.pin, true, function(err) {
      if (err) throw err;
      console.log('Written to pin');
  });
};

SwitchAccessory.prototype.write = function(value){
  gpio.write(this.pin, value, function(err) {
      if (err) throw err;
      console.log('Written to pin');
  });
};

SwitchAccessory.prototype.getServices = function(){
    return this.services;
};
