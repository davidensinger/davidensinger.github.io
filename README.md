# davidensinger.github.io
**David Ensinger is a Front End Developer from Columbus, OH**

This website runs on [Jekyll](http://jekyllrb.com/), a blog-aware, static site generator, with a lot of help from [Grunt](http://gruntjs.com/).

## The Stack
- [Bower](http://bower.io/): Manage front end dependencies
- [Bundler](http://gembundler.com/): Manage Ruby dependencies
- [GraphicsMagick](http://sourceforge.net/projects/graphicsmagick/): Required for [grunt-responsive-images](https://github.com/andismith/grunt-responsive-images)
- [Grunt](http://gruntjs.com/): Automate Jekyll development and build tasks
- [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/): Required for Grunt
- [Ruby](http://www.ruby-lang.org/): Required for Jekyll.

### Recommended Setup
- Ensure that [Command Line Tools for Xcode](https://developer.apple.com/xcode/) is installed and up-to-date
    - To install: `xcode-select --install`
- Manage your Ruby enviroments with [RVM](https://rvm.io/) or [rbenv](https://github.com/sstephenson/rbenv)
    - To update RVM: `rvm get stable`
- Make sure your installs of [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/) are up-to-date
- Install the command line interface for [Grunt](http://gruntjs.com/)
    - To install: `npm install -g grunt-cli`
- Install [Bower](http://bower.io/)
    - To install: `npm install -g bower`
- Make sure you’ve installed GraphicsMagic, presumably via Homebrew:
    - To install: `brew install GraphicsMagick`

## Install Dependencies
Run the following commands to install the dependencies:
- Bower: `bower install`
- Bundler: `bundle install`
- NPM: `npm cache clean` and then `npm install`

## Grunt Workflow
- `grunt stage`: Copies the loadFont() and loadCSS() functions from Bower to the Jekyll _includes directory
- `grunt serve`: Compiles all files and opens the site in your default browser. A watch task watches for changes to files, recompiles if necessary, and injects the changes into the browser with BrowserSync
- `grunt check`: Checks for outdated dependencies with grunt-dev-update, Javascript code quality with JSHint, Sass code quality with [SCSS-Lint](https://github.com/causes/scss-lint), and Jekyll health with `jekyll doctor`
- `grunt build`: Builds an optimized site to the dist directory
- `grunt deploy`: Runs the perf task, runs the build task, and then deploys it
- `grunt perf`: Checks Google’s PageSpeed Insights and then runs [Phantomas](https://github.com/macbre/phantomas) to return and record site metrics.

## Hat Tip
The site was scaffolded by [Yeoman](http://yeoman.io/) and [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb).
