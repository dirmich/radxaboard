const bleno = require('bleno')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const SystemInformationService = require('./systeminformationservice')

const systemInformationService = new SystemInformationService()

exec('hciconfig hci1 up').then(() => {
  bleno.on('stateChange', function (state) {
    console.log('on -> stateChange: ' + state)

    if (state === 'poweredOn') {
      bleno.startAdvertising('MiC', [systemInformationService.uuid])
    } else {
      bleno.stopAdvertising()
    }
  })
})

bleno.on('advertisingStart', function (err) {
  console.log('on -> advertising start: ', err ? err : 'success')
  if (!err) {
    bleno.setServices([testService])
  }
})

bleno.on('advertisingStartError', function (err) {
  console.log('advertising StartError', err)
})

bleno.on('servicesSet', function (err) {
  console.log('servicesSet', err)
})

bleno.on('servicesSetError', function (err) {
  console.log('services Set Error', err)
})

bleno.on('advertisingStop', function (err) {
  console.log('advertising Stop', err)
})

bleno.on('accept', function (addr) {
  console.log('accept', addr)
})

bleno.on('disconnect', function (addr) {
  console.log('disconnect', addr)
})

bleno.on('rssiUpdate', function (rssi) {
  console.log('rssi Update', rssi)
})
