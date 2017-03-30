import JsonApi from 'devour-client'
import { version } from '../package'
import { arg, checkArg, log, err, pe } from './util'

const baseArg = {
  season: 'winter',
  year: 2017,
  subtype: 'TV'
}
const baseUrl = 'https://kitsu.io/api/edge'
const Kitsu = new JsonApi({
  apiUrl: baseUrl,
  logger: false,
  pluralize: false
})
let ANIME = []

Kitsu.headers['User-Agent'] = `SeasonGrabber/${version} (wopian)`

Kitsu.define('anime', {
  slug: '',
  canonicalTitle: '',
  titles: '',
  startDate: ''
})

// Get response from API
async function getSeason (offset) {
  return await Kitsu.findAll('anime', {
    fields: {
      anime: 'slug,canonicalTitle,titles,startDate'
    },
    filter: {
      season: arg[0] || baseArg.season,
      season_year: arg[1] || baseArg.year,
      subtype: arg[2] || baseArg.subtype
    },
    page: {
      limit: 20,
      offset
    }
  })
}

async function listSeason (offset) {
  await getSeason(offset)
  .then(response => {
    response.forEach((anime) => {
      if (anime.startDate !== '2017-01-01') {
        ANIME.push(anime)
      }
    })
    if (response.links.next) {
      // Get the next page
      listSeason(offset += 20)
    } else {
      // Last page, display the output
      displaySeason()
    }
  })
  .catch(error => err(pe.render(error)))
}

async function displaySeason () {
  const sortCanonical = ANIME.sort((a, b) => {
    return a.canonicalTitle.localeCompare(b.canonicalTitle)
  })
  const sortEnglish = ANIME.sort((a, b) => {
    if (!a.titles.en) a.titles.en = a.canonicalTitle
    if (!b.titles.en) b.titles.en = b.canonicalTitle
    return a.titles.en.localeCompare(b.titles.en)
  })
  const sortRomanised = ANIME.sort((a, b) => {
    if (!a.titles.en_jp) a.titles.en_jp = a.canonicalTitle
    if (!b.titles.en_jp) b.titles.en_jp = b.canonicalTitle
    return a.titles.en_jp.localeCompare(b.titles.en_jp)
  })

  log('Canonical Titles:\n')

  sortCanonical.forEach((anime) => {
    log(anime.canonicalTitle)
  })

  log('\nEnglish Titles:\n')

  sortEnglish.forEach((anime) => {
    log(anime.titles.en)
  })

  log('\nRomanised Titles:\n')

  sortRomanised.forEach((anime) => {
    log(anime.titles.en_jp)
  })
}

Promise.resolve(checkArg())
.then(valid => {
  if (valid) listSeason(0)
})
