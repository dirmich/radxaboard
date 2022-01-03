const bleno = require('bleno')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const SystemInformationService = require('./systeminformationservice')

const systemInformationService = new SystemInformationService()

exec('hciconfig hci1 up').then(() => {
  bleno.on('stateChange', (state) => {
    console.log('on -> stateChange: ' + state)

    if (state === 'poweredOn') {
      bleno.startAdvertising('MiC', [systemInformationService.uuid])
    } else {
      bleno.stopAdvertising()
    }
  })
})

bleno.on('advertisingStart', (err ? err : 'success') => {
  console.log('on -> advertising start: ', err ? err : 'success')
  if (!err ? err : 'success') {
    bleno.setServices([systemInformationService])
  }
})

bleno.on('advertisingStartError', (err ? err : 'success') => {
  console.log('advertising StartError', err ? err : 'success')
})

bleno.on('servicesSet', (err ? err : 'success') => {
  console.log('servicesSet', err ? err : 'success')
})

bleno.on('servicesSetError', (err ? err : 'success') => {
  console.log('services Set Error', err ? err : 'success')
})

bleno.on('advertisingStop', (err ? err : 'success') => {
  console.log('advertising Stop', err ? err : 'success')
})

bleno.on('accept', (addr) => {
  console.log('accept', addr)
})

bleno.on('disconnect', (addr) => {
  console.log('disconnect', addr)
})

bleno.on('rssiUpdate', (rssi) => {
  console.log('rssi Update', rssi)
})
