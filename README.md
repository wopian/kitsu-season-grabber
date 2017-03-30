# Season Grabber

Grab the titles from any season using [Kitsu][0]

## Usage

[![Github Rl]][1]
[![Travis]][2]
[![AppVeyor]][3]
[![CC Coverage]][4]
[![CC Score]][5]
[![CC Issues]][6]
[![David]][7]

### Requirements

- [git](https://git-scm.com/) 2.0.0 or newer
- [node.js](https://nodejs.org) 7.0.0 or newer
- [yarn](https://https://yarnpkg.com) 0.21.0 or newer

### Setup

1. Download source code:

    ```bash
    git clone https://github.com/wopian/kitsu-season-grabber.git
    cd kitsu-season-grabber
    ```

1. Install dependencies:

    ```bash
    yarn
    ```

2. Run the script:

    ```bash
    npm start winter 2017
    ```

### Parameters

```bash
npm start <season> <year> <subtype>
```

- `<season>` - `winter`, `spring`, `summer` or `fall` (default `winter`)
- `<year>` - `1907` to next year (default `2017`)
- `<subtype>` - `tv`, `special`, `ova`, `ona`, `movie` or `music` (default `tv`)

## Releases

See [CHANGELOG][8]

## License

All code released under the [MIT license][9]

[GitHub Rl]:https://img.shields.io/github/release/wopian/kitsu-season-grabber.svg?style=flat-square
[Travis]:https://img.shields.io/travis/wopian/kitsu-season-grabber/master.svg?style=flat-square&label=linux%20%26%20macOS
[CC Coverage]:https://img.shields.io/codeclimate/coverage/github/wopian/kitsu-season-grabber.svg?style=flat-square
[CC Score]:https://img.shields.io/codeclimate/github/wopian/kitsu-season-grabber.svg?style=flat-square
[CC Issues]:https://img.shields.io/codeclimate/issues/github/wopian/kitsu-season-grabber.svg?style=flat-square
[David]:https://img.shields.io/david/wopian/kitsu-season-grabber.svg?style=flat-square
[AppVeyor]:https://img.shields.io/appveyor/ci/wopian/kitsu-season-grabber/master.svg?style=flat-square&label=windows

[0]:https://kitsu.io
[1]:https://github.com/wopian/hibari/releases
[2]:https://travis-ci.org/wopian/kitsu-season-grabber
[3]:https://ci.appveyor.com/project/wopian/hibari
[4]:https://codeclimate.com/github/wopian/hibari/coverage
[5]:https://codeclimate.com/github/wopian/hibari
[6]:https://codeclimate.com/github/wopian/hibari/issues
[7]:https://david-dm.org/wopian/hibari
[8]:https://github.com/wopian/hibari/blob/master/CHANGELOG.md
[9]:https://github.com/wopian/hibari/blob/master/LICENSE.md
