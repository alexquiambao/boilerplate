boilerplate: angularjs
======================

A project boilerplate using AngularJS library. boilerplate: angular can run on
Apache or NodeJS servers. This project is for noobs like me who are just getting
started on AngularJS. :)

This boilerplate uses:

- Angular 1.2.21,
- jQuery 2.1.1
- Bootstrap 3.2.0
- Font-Awesome 4.1.0

I know [Angular UI Bootstrap](http://angular-ui.github.io/bootstrap/) but I
haven't really got the time to study it and since these were the main frontend
packages in my boilerplate then I'll leave them here for now.


### Table of Contents

1. [Usage](#usage): how to use this boilerplate
2. [Directory Structure](#directory-structure)
3. [Grunt Tasks](#grunt-tasks)

Usage
-----

1. Install Node packages:
   `$ npm install`
2. Install Bower packages:
  `$ bower install`
3. (a) If you decide to go full Javascript and run your application on NodeJS server
       we got you covered, just run: `$ npm start`
4. (b) If there's nowhere to place your app and apache is available, that's
       okay too, we have included an `.htaccess` file with HTML5 mode on so you
       can take over your application's routing needs.

Directory Structure
-------------------

``` shell
boilerplate: angularjs   # root directory
├── app
|   └── scripts
|   |   ├── app
|   |   └── lib
│   ├── module
|   |   └── module_name
|   |       ├── views
|   |       ├── module.js
|   |       ├── module.config.js
|   |       └── module.controller.js
│   ├── assets
│   │   ├── css
│   │   ├── fonts
|   │   ├── img
|   ├── .htaccess
|   └── index.html
├── server
├── source
├── bower.json
├── Gruntfile.js
├── package.json
└── README.md
```


Grunt Tasks
-----------

These are the default tasks that Gruntfile executes, you may add necessary tasks
to build your application. You may run `$ grunt` to perform default tasks.

**copy**

it copies all packages downloaded inside `bower_components` which are also
listed in `bower.json` you may add additional package anytime just make sure

```shell
$ grunt updatepkg
```

**less**

compiles the default Less stylesheet and outputs it to `application/assets/css`
with a full and minified version.

watch:

you may run this while working on your less stylesheets, it watches `source/less/`
directory for file changes and automatically executes the less task that compiles
less stylesheets to css, outputs go to `application/assets/css`.

```shell
$ grunt watchless # or
$ grunt buildless
```

**imagemin**

optimises image files `*.{gif,jpg,png}` and compresses
these up to 20% less of the the original file size.

```shell
$ grunt buildimg
```

**jshint**

watch folders changes and automatically jshint to lint the `.js` filez you're
currently working on just run

```shell
$ grunt watchjs #or
$ grunt lint
```