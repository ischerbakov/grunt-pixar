module.exports = function(grunt) {
  grunt.initConfig({
    pixar: {
      example: {
        src: 'src/example.json',
        dest: 'dest/example.jade'
      },
      inverse: {
        options: {
          " ": ".star\n",
          "*": ".stub\n",
          "a": "c",
          "c": "a"
        },
        src: 'src/example.json',
        dest: 'dest/inverse.jade'
      },
      text2text: {
        options: {
          pixies: {
            "*": "■",
          },
          json: false
        },
        src: 'src/example.txt',
        dest: 'dest/pixar.txt'
      },
      text2jade: {
        options: {
          pixies: {
            "*": ".brick.black\n",
            " ": ".brick.white\n",
            "\n": "br\n"
          },
          json: false
        },
        src: 'src/example.txt',
        dest: 'dest/pixar.jade'
      }
    }
  })
  
  grunt.registerTask('example',   ['pixar:example'])
  grunt.registerTask('inverse',   ['pixar:inverse'])
  grunt.registerTask('text2text', ['pixar:text2text'])
  grunt.registerTask('text2jade', ['pixar:text2jade'])
  
  grunt.registerTask('default', ['example', 'inverse', 'text2text', 'text2jade'])
  
  grunt.loadNpmTasks('grunt-pixar')
}