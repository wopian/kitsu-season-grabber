import PrettyError from 'pretty-error'

export const log = console.log
export const err = console.error
export const pe = new PrettyError()

export let arg = process.argv.slice(2)

export async function checkArg () {
  if (arg.length > 0) {
    // 0 = season
    // 1 = year
    // 2 = subtype
    if (arg[0]) {
      // Replace autumn with fall
      arg[0].replace(/^autumn$/i, 'fall')
      // Check if valid season
      if (arg[0].search(/^(winter|spring|summer|fall)$/i)) {
        err(pe.render(`'${arg[0]}' is not a valid season. Valid: winter, spring, summer or fall`))
        return false
      }
    }
    // Check if valid year
    if (arg[1] < 1907 || arg[1] > new Date().getFullYear() + 1) {
      err(pe.render(`'${arg[1]}' is not a valid year. Valid: 1907-${new Date().getFullYear() + 1}`))
      return false
    }
    if (arg[2]) {
      // Check if valid subtype
      if (arg[0].search(/^(tv|special|ova|ona|movie|music)/i)) {
        err(pe.render(`'${arg[2]}' is not a valid subtype. Valid: tv, special, ova, ona, movie or music`))
        return false
      }
    }
  }
  return true
}

pe.skipNodeFiles()
pe.appendStyle({
  'pretty-error > header > title > kind': {
    color: 'grey',
    background: 'black'
  },
  'pretty-error > header > colon': {
  },
  'pretty-error > header > message': {
    color: 'red',
    background: 'black',
    padding: '0 0'
  },
  'pretty-error > trace > item': {
    marginLeft: 2
  },
  'pretty-error > trace > item > header > pointer > file': {
    color: 'cyan'
  },
  'pretty-error > trace > item > header > pointer > colon': {
    color: 'grey'
  },
  'pretty-error > trace > item > header > pointer > line': {
    color: 'grey'
  },
  'pretty-error > trace > item > header > what': {
    color: 'white'
  }
})
