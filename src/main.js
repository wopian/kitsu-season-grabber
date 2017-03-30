import JsonApi from 'devour-client'
import { version } from '../package'

const baseUrl = 'https://kitsu.io/api/edge'
const Kitsu = new JsonApi({
  apiUrl: baseUrl,
  logger: false,
  pluralize: false
})

let ANIME = []

Kitsu.headers['User-Agent'] = `SeasonGrabber/${version}`

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
      season: 'winter',
      season_year: '2017',
      subtype: 'TV'
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
        console.log(anime.canonicalTitle)
        // console.log(`https://kitsu.io/anime/${anime.slug}\n`)
        ANIME.push(anime)
      }
    })
    if (response.links.next) {
      // Get the next page
      listSeason(offset += 20)
    } else {
      // Last page, display the output
      console.log('\n\n\n\n\n')
      displaySeason()
    }
  })
  .catch(error => console.error(error))
}

async function displaySeason () {
  const sorted = ANIME.sort((a, b) => {
    if (a.canonicalTitle < b.canonicalTitle) return -1
    if (a.canonicalTitle > b.canonicalTitle) return 1
    return 0
  })

  sorted.forEach((anime) => {
    console.log(anime.canonicalTitle)
  })
}

listSeason(0)

/*
https://kitsu.io/api/edge/anime
?fields[anime]=slug,canonicalTitle,titles
&filter[season]=winter
&filter[season_year]=2017
&filter[subtype]=TV
&page[limit]=20
&page[offset]=0
*/
