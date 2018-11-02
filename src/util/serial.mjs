import raspi from 'raspi'
import raspi_serial from 'raspi-serial'

const { Serial } = raspi_serial

class SerialInterface {
  constructor(config = {}) {
    this.serial = new Serial(config)
    this.buffer = ''
  }

  async open() {
    await new Promise(resolve => {
      raspi.init(() => {
        this.serial.open(() => {
          this.serial.on('data', data => {
            this.buffer += data.toString()
          })
          resolve()
        })
      })
    })
  }

  async close() {
    await new Promise((resolve, reject) => {
      this.serial.close((err) => err === null ? resolve : reject(err));
    })
  }

  async write(data) {
    await new Promise(resolve => {
      this.serial.write(data, resolve)
    })
  }

  available() {
    return this.buffer.length > 0;
  }

  read() {
    let c = this.buffer.charAt(0)
    this.buffer = this.buffer.substr(1)
    return c
  }

  readLine() {
    let firstindex = this.buffer.indexOf('\n')
    let str = firstindex < 0 ? this.buffer : this.buffer.substring(0, firstindex + 1)
    firstindex < 0 ? this.buffer = '' : this.buffer = this.buffer.substr(firstindex + 1)
    return str
  }
}

export default SerialInterface
