# static-site-seed
This is a static site seed. It is meant as a starting point for creating simple marketing sites. By default, it uses some fancy Front End only features to make life a bit easier. For example:
* gulp
* sass
* jquery
* handlebars
* fileinclude
* slick carousel

## local development
This site is strictly client side. There is no server side code in this repo. 

### install environment
* This site was build using node 10.15.1. Newer versions of node may cause errors when installing dependencies and running gulp with sass. Particularily gulp-ruby-sass. Using NVM to install node version 10.15.1 will cause far less headaches then trying to fix dependency errors with newer node versions, but it is ultimately up to you.
* Make sure you have sass installed. The gem method works the best for this project due to the gulp implementation.
```
gem install sass
```
* Install gulp globally
```
npm install gulp -g
```
* Clone this repo to your local machine
* Navigate to the root of the repo
* To install dependencies:
```
npm install
```
* To build files for deployment:
```
gulp
```
* To watch files when coding:
```
gulp watch
```
* To run the hotreload devserver, open a new terminal window and run:
```
gulp server
```

### directory breakdown
Gulp watch will watch all the following directories for changes:

* /src/html/includes - common includes like contact form, header, topnav, footer, etc
* /src/html/site - html pages
* /src/html/templates - moustache templates for rendering loops like press clippings, testimonials, etc.
* /src/js/vendors - 3rd party js libraries and plugins
* /src/js/app - marketing site specific JavaScript files. 
* /src/sass - raw sass/css files

Assets like images, videos, fonts, etc are stored in the compiled site static directory.
* /site/static - compiled css, js, and static images and video files

The files you want to deploy will be built and stored here:
* /site/*

## deploying

### staging
TODO: add documentation

### production
TODO: add documentation




