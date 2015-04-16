# tawny

tawny is an open source launcher bookmarklet for [import.io](https://import.io/)'s automatic data extraction product "Magic".

Install the bookmarklet [here](http://odub.github.io/tawny)!

```
  , _ ,
 ( o o )
/'` ' `'\
|'''''''|
|\\'''//|
   """
```

### Development Instructions

#### To set up a local development environment

* Clone this repository to you development directory
* `cd` to the new directory
* Run `npm install` to run install dependencies (you may have to install [Node.js](http://nodejs.org/) if you don't already have it)

#### Working with the build script

The source files for the project reside in the `src` directory. The `gulp` build script `gulpfile.js` is set up to automate a number steps required to deploy the bookmarklet into its production form. The command `gulp` runs the `default` task in the build script, which is set up to:

* Clear the `dist` directory removing previous builds
* Copy the markup directly into `dist`
* Compile any less stylesheets in `src/styles` into CSS and copy into `dist`
* Minify any JavaScript in `src/scripts` and copy into `dist`
* Minify the bookmarklet source JavaScript from `src/bookmarklet` and copy the minified code into `dist`
* Inject the minified bookmarklet into the page for use (the script replaces the placeholder text `###BOOKMARKLET###` in `dist/index.html`)

#### To deploy the `dist` directory to GitHub Pages

* Commit and push the `dist` directory in the state you want to deploy
* Run `git subtree push --prefix dist origin gh-pages` to push `dist` to the root of the `gh-pages` branch
 
**Note:** The latest clean output from the build script is stored in the branch `gh-pages-clean`. The work currently found on the `gh-pages` branch is a heavily customised design of the installation page, contributed by designer and all-round excellent person [andrewburton88](https://github.com/andrewburton88).

The site at [http://odub.github.io/tawny/](http://odub.github.io/tawny/) should now be the same as the last committed version of the `dist` directory.

#### TODO: Update `src` directory on `master` to so that the build script outputs the same installation page as the updated design on `WEB-318`
