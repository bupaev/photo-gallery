const name = 'home-gallery/database'
const major = 1
const minor = 1

const isDatabaseTypeCompatible = type => type && type.startsWith(`${name}@${major}.`)

const HeaderType = `${name}@${major}.${minor}`

module.exports = {
  isDatabaseTypeCompatible,
  HeaderType
}