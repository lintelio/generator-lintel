Lintel Module Generator
=======================

> Yeoman generator for lintel modules — lets your quickly scaffold a lintel module.

[![npm](https://img.shields.io/npm/v/generator-lintel.svg)](https://github.com/lintelio/generator-lintel)

## Usage
Install `generator-lintel`

```bash
npm install -g generator-lintel
```

Make a directory and `cd` into it:
```bash
mkdir lintel-bacon && cd $_
```

Run the generator:
```bash
yo lintel
```

Run `grunt` for building and `grunt test` for testing. Your code can be previewed at [localhost:4554](http://localhost:4554).


## Testing
Running `grunt test` will run the unit tests with nodeunit.

## Prompts

#### name
Default: dasherized current folder name  

Module name to be shown in bower, npm, and [lintel.io](http://lintel.io/modules). A dashed slug name will be generated if spaces are included.

Example:  
`lintel-bacon`

#### languages
Options: `[CSS, JS]`  
Default: `[CSS]`  

Determines which technologies to use. CSS is checked by default.

#### description
Short description to be shown on bower, npm, and [lintel.io](http://lintel.io/modules).

Example:  
`Baconize your app.`

#### version
Initial version of your module.

#### repository
URL to your repository:

Example:  
`git@github.com:lintelio/generator-lintel.git`

#### homepage
URL to module homepage.

Example:  
`https://github.com/lintelio/generator-lintel`

#### license
License for your module. If `MIT`, license will be included for you. Otherwise it will only be listed in `package.json`, `bower.json`, and `README.md`.

#### authorName
Your name.

Example:  
`Bender Rodriguez`

#### authorEmail
Optional.

Example:  
`bitemyshinymetal@ss.com`

#### authorUrl
Optional.

Example:  
`https://www.youtube.com/watch?v=dQw4w9WgXcQ`

#### lintelVersion
Which lintel version does your module depend on? Use [semantic versioning](http://semver.org/) notation.

Example:   
`~0.1.0`


## License
MIT
