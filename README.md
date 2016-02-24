# grunt-pixar

> Grunt plugin for rendering arrays.

## Getting Started
This plugin was made with Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pixar --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pixar');
```

## The "pixar" task

### Overview
In your project's Gruntfile, add a section named `pixar` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pixar: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.pixies
Type: `Object`
Default value: `{}`

A map from `pixie` to `String`

#### options.json
Type: `Boolean`
Default value: `true`

By default, `src` files must be in JSON format (see below for example).
Setting it to `false` allows using plain text files to represent pixars.

#### options.*
Type: `String`

Pixies may be defined either in `options.pixies` or right in `options`.
The first way is provided to not clash with Grunt's properties (and maybe with your own), but those pixies cannot be used for overriding a single pixie.
The second manner has opposite pros and cons, obviously.

### Pixies
A pixie (like pixel) is a `String` of one-char length at least, so they can be matched to `String` pixars only. If a pixie defined with a multi-char key, it, for now, can be matched to a whole-string-pixar only. Example:
```js
pixies: {
  "foo": "bar"
},
pixar: [
  "foo",  // match
  "foooz" // nope
]
```

#### Example pixies
```js
pixies: {
  "*": "■", // single-char pixie
  "~": ".wave", // pixar-to-jade use case
  "~~": ".wave2" // multi-char pixie
}
```

### Pixars
Pixar stands for PIXel ARray, where "array" means an object having a `length` property along with elements accessible via `object[index]` notation, i.e. `Array` or `String`. So, pixar may be either a `String`, `Array`, `Array` of `Array`s or even `Array` of pixars (resursively). While `String` is actually translated (using pixies), `Array` is for readability only.

#### JSON example
Pixar JSON file must define an object of at least one property. The property is `pixar`:

```js
{
  pixar: [ // pixar represented by an array of pixars
    "figure", // pixar represented by a string
    [ // letter i, pixar represented by an array of strings
    
      " * ", // again, pixar represented by string
      "   ",
      " * ",
      " * ",
      " * ",
      " * ",
      " * "
    ]
  ]
}
```
that's the idea. A JSON pixar file can be treated as some kind of a package, since it can include overridable pixies as well:
```js
{
  pixar: [], // from the previous example
  pixies: {
    " ":   ".pixel\n",  // mapping to jade
    "*":   ".pixel.red  // or ".pixel: .red",
    "   ": ".empty-row" // if you're really gonna eat that shit
  }
}
```

#### Plain text example
```
***  * *   *  **  ***
*  * *  * *  *  * *  *
***  *   *   **** ***
*    *  * *  *  * *  *
*    * *   * *  * *  *
```

### Usage Examples
Examples can also be found in the package's `example` directory.

#### Plain text
`input.txt` - from the previous example.
`Grunfile.js`:
```js
...
pixar: {
  textExample: {
    options: {
      json: false,
      pixies: {
        "*": "■"
      }
    },
    src: 'input.txt',
    dest: 'ouput.txt'
  }
}
...
```
`output.txt` after `grunt pixar:textExample`:
```
■■■  ■ ■   ■  ■■  ■■■
■  ■ ■  ■ ■  ■  ■ ■  ■
■■■  ■   ■   ■■■■ ■■■
■    ■  ■ ■  ■  ■ ■  ■
■    ■ ■   ■ ■  ■ ■  ■
```
Squares are for clarity.

#### JSON
`input.json`:
```js
{
  pixies: {
    "letter": "span\n",
    " ": "\t.pixie.white\n",
    "*": "\t.pixie.black\n"
  },
  pixar: [
    "letter",
    [ // P
      "*** ",
      "*  *",
      "*** ",
      "*   ",
      "*   "
    ],
  ]
}
```
`Gruntfile.js`:
```js
pixar: {
  jsonExample: {
    src: 'input.json',
    dest: 'output.jade'
  }
}
```
`output.jade` after `grunt pixar:jsonExample`:
```jade
.span
  .pixie.black
  .pixie.black
  .pixie.black
  .pixie.white
  .pixie.black
  .pixie.white
  .pixie.white
  .pixie.black
  ...
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
