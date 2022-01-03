const bleno = require('bleno')
const os = require('os')
const util = require('util')

class UptimeCharacteristic extends bleno.Characteristic {
  constructor() {
    super({
      uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb09',
      properties: ['read'],
    })
    this._value = Buffer.alloc(0)
  }
  onReadRequest(offset, callback) {
    if (!offset) {
      this._value = new Buffer(
        JSON.stringify({
          uptime: os.uptime(),
        })
      )
    }

    console.log(
      'UptimeCharacteristic - onReadRequest: value = ' +
        this._value.slice(offset, offset + bleno.mtu).toString()
    )

    callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length))
  }
}

// const BlenoCharacteristic = bleno.Characteristic

// const UptimeCharacteristic = function () {
//   UptimeCharacteristic.super_.call(this, {
//     uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb09',
//     properties: ['read'],
//   })

//   this._value = new Buffer(0)
// }

// UptimeCharacteristic.prototype.onReadRequest = function (offset, callback) {
//   if (!offset) {
//     this._value = new Buffer(
//       JSON.stringify({
//         uptime: os.uptime(),
//       })
//     )
//   }

//   console.log(
//     'UptimeCharacteristic - onReadRequest: value = ' +
//       this._value.slice(offset, offset + bleno.mtu).toString()
//   )

//   callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length))
// }

// util.inherits(UptimeCharacteristic, BlenoCharacteristic)
module.exports = UptimeCharacteristic
