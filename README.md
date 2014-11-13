# Styleguide generator [![NPM version](https://badge.fury.io/js/generator-styleguide.svg)](http://badge.fury.io/js/generator-styleguide)

> [Yeoman](http://yeoman.io) generator that builds a simple [Hologram](http://trulia.github.io/hologram/) styleguide with bootstrap-sass-official starting files and [Gulp](http://gulpjs.com/) all ready to use.


## Getting Started

To start a styleguide project, you will have to install Yeoman and Hologram globally.

```bash
# install Yeoman
$ npm install -g yo

# Install Hologram
$ gem install hologram
```

You might have to install the Hologram gem with `sudo`, depending on your permissions.

To install generator-styleguide from npm, run:

```bash
$ npm install -g generator-styleguide
```

Finally, initiate the generator:

```bash
$ yo styleguide
```

## On production server

If you build your assets on production server, make sure to run `$ gulp styles` like this to avoid issues with gulp-notify:

```
$ gulp styles --production
```

## Features

* Gulp
* Bootstrap Sass
* Hologram styleguide
* CSS Autoprefixer
* jshint linting
* Browser-sync built-in server

## Credits

- The bootstrap files are based on [Yago](https://github.com/yago)'s [Holostrap](https://github.com/Yago/Holostrap)
- The Hologram theme used is [Yago](https://github.com/yago)'s [Cortana](https://github.com/Yago/Cortana)


## License

MIT
