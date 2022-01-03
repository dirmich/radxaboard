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

bleno.on('advertisingStart', (err) => {
  console.log('on -> advertising start: ', err ? err : 'success')
  if (!err) {
    bleno.setServices([systemInformationService])
  }
})

bleno.on('advertisingStartError', (err) => {
  console.log('advertising StartError', err ? err : 'success')
})

bleno.on('servicesSet', (err) => {
  console.log('servicesSet', err ? err : 'success')
})

bleno.on('servicesSetError', (err) => {
  console.log('services Set Error', err ? err : 'success')
})

bleno.on('advertisingStop', (err) => {
  console.log('advertising Stop', err ? err : 'success')
})

bleno.on('accept', (addr) => {
  console.log('accept', addr)
  bleno.stopAdvertising()
})

bleno.on('disconnect', (addr) => {
  console.log('disconnect', addr)
  bleno.startAdvertising('MiC', [systemInformationService.uuid])
})

bleno.on('rssiUpdate', (rssi) => {
  console.log('rssi Update', rssi)
})
