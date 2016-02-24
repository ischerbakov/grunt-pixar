/*
 * grunt-pixar
 * https://github.com/ishcherbakov/grunt-pixar
 *
 * Copyright (c) 2016 Игорь Щербаков
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('pixar', 'Grunt plugin for rendering arrays.', function() {
    var self = this;
    var json = this.options({ json: true }).json;
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var result = ""
        var file = grunt.file['read' + (json ? 'JSON' : '')](filepath)
        var options = self.options(json ? file : {})
        var pixar = json ? options.pixar : file
        var deep = function(pixar, level, render) {
          var r = render(pixar)
          if (r)
            return result += r;
          // go deeper:
          level++;
          for (var i = 0; i < pixar.length; i++) {
            deep(pixar[i], level, render);
          }
        }
        deep(pixar, 0, function render(pixar) {
          // greedy:
          if (typeof(pixar) === 'string') {
            // first, options:
            if (options[pixar])
              return options[pixar];
            // then options.pixies:
            if (options.pixies[pixar])
              return options.pixies[pixar];
            // prevent infinite recursion on strings:
            if (pixar.length == 1)
              return pixar;
          }
          // ...
          if (pixar.length < 1)
            return pixar;
          // to go deeper:
          return false
        })
        return result
      }).join();

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
