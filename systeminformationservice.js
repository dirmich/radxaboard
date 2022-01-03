const bleno = require('bleno')

const LoadAverageCharacteristic = require('./characteristics/loadaverage')
const UptimeCharacteristic = require('./characteristics/uptime')
const MemoryCharacteristic = require('./characteristics/memory')

class SystemInformationService extends bleno.PrimaryService {
  constructor() {
    super({
      uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb07',
      characteristics: [
        new LoadAverageCharacteristic(),
        new UptimeCharacteristic(),
        new MemoryCharacteristic(),
      ],
    })
  }
}

// function SystemInformationService() {

//   bleno.PrimaryService.call(this, {
//     uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb07',
//     characteristics: [
//       new LoadAverageCharacteristic(),
//       new UptimeCharacteristic(),
//       new MemoryCharacteristic()
//     ]
//   });
// };

// util.inherits(SystemInformationService, bleno.PrimaryService);
module.exports = SystemInformationService
