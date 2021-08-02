"use strict";

let instance;

const hasFirstArgNumber = inputArgs => inputArgs.length >= 2 && typeof inputArgs[0] == 'number'

const createInstance = options => {
  options = options || {}
  const pino = require('pino')
  const pinoms = require('pino-multi-stream')

  const ms = pinoms.multistream([])
  const logger = pino({
    level: 'trace',
    hooks: {
      logMethod (inputArgs, method) {
        if (hasFirstArgNumber(inputArgs)) {
          const startTime = inputArgs.shift()
          return method.apply(this, [{duration: Date.now() - startTime}, ...inputArgs])
        }
        return method.apply(this, inputArgs)
      }
    }
  }, ms)

  logger.add = stream => ms.add(stream)

  return logger
}

const createPrettyStream = level => {
  if (!instance) {
    console.log(`No logging instance exists`)
  }
  const createStream = require('./pretty-stream')
  instance.add({level: level || 'info', stream: createStream()})
}

const createFileStream = (filename, level, cb) => {
  if (!instance) {
    return cb ? cb(new Error(`No logging instance exists`)) : console.log(`No logging instance exists`)
  }
  const createStream = require('./file-stream')
  createStream(filename, (err, stream) => {
    if (err && cb) {
      cb(err)
    } else if (err) {
      instance.err(`Could not create file logger for ${fileanme}: ${err}`)
    } else {
      instance.add({ level: level || 'info', stream: stream })
      cb && cb()
    }
  })
}

const isString = v => typeof v == 'string'

const toOptions = options => isString(options) ? {module: options} : options

function logger(options) {
  if (!instance) {
    instance = createInstance(toOptions(options))
    return instance
  } else {
    return instance.child(toOptions(options))
  }
}

logger.getInstance = () => instance
logger.add = dest => instance && instance.add(dest)
logger.addPretty = createPrettyStream
logger.addFile = createFileStream

module.exports = logger
