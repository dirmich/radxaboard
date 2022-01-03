const bleno = require('bleno')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const SystemInformationService = require('./systeminformationservice')

const systemInformationService = new SystemInformationService()

exec('hciconfig hci1 up').then(() => {
  bleno.on('stateChange', function (state) {
    console.log('on -> stateChange: ' + state)

    if (state === 'poweredOn') {
      bleno.startAdvertising(bleno.name, [systemInformationService.uuid])
    } else {
      bleno.stopAdvertising()
    }
  })
})

bleno.on('advertisingStart', function (error) {
  console.log(
    'on -> advertisingStart: ' + (error ? 'error ' + error : 'success')
  )

  if (!error) {
    bleno.setServices([systemInformationService])
  }
})
