# davidensinger.github.io
**David Ensinger is a Front End Developer from Columbus, OH**

This website runs on [Jekyll](http://jekyllrb.com/), a blog-aware, static site generator, with some help from [Grunt](http://gruntjs.com/).

## The Stack
- [Node.js](http://nodejs.org/) and [NPM](https://npmjs.org/): Required for Grunt
- [Ruby](http://www.ruby-lang.org/): Required for Jekyll
- [Bundler](http://gembundler.com/): Manage Ruby dependencies
- [Grunt](http://gruntjs.com/): Automate Jekyll development and build tasks.

### Recommended Setup
- Ensure that [Command Line Tools for Xcode](https://developer.apple.com/xcode/) is installed and up-to-date
    - To install: `xcode-select --install`
- Manage your Ruby enviroments with [RVM](https://rvm.io/) or [rbenv](https://github.com/sstephenson/rbenv)
    - To update RVM: `rvm get stable`
- Make sure your install of [Node.js](http://nodejs.org/) is up-to-date
- Install the command line interface for Grunt (please note that Grunt is actually managed by NPM)
    - To install: `npm install -g grunt-cli`

## Install Dependencies
Run the following commands to install the dependencies:
- NPM: `npm cache clean` and then `npm install`
- Bundler: `bundle`

## Grunt Workflow
- `grunt serve`: Compiles all files and opens the site in your default browser. A watch task watches for changes to files, recompiles if necessary, and injects the changes into the browser with BrowserSync
- `grunt check`: Checks for outdated dependencies with grunt-dev-update, Javascript code quality with JSHint, and Jekyll health with `jekyll doctor`
- `grunt build`: Builds an optimized site to the dist directory
- `grunt deploy`: Runs the perf task, runs the build task, and then deploys it
- `grunt perf`: Checks Google’s PageSpeed Insights and then runs grunt-phantomas to return and record site metrics.

## Hat Tip
The site was scaffolded by [Yeoman](http://yeoman.io/) and [generator-jekyllrb](https://github.com/robwierzbowski/generator-jekyllrb), the latter being a project of [@robwierzbowski](https://github.com/robwierzbowski).
