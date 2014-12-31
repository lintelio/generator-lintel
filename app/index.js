var generators = require('yeoman-generator');
var chalk      = require('chalk');
var npmName    = require('npm-name');
var bowerName  = require('bower-name');

module.exports = generators.Base.extend({
  install: function() {
    this.installDependencies();
  },
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.appname = this._.dasherize(this.appname);
  },
  prompting: function() {
    var done = this.async();
    var log = this.log;
    var prompts = [{
      name: 'name',
      message: 'Module Name',
      default: this._.dasherize(this.appname),
      filter: function (value) {
        var done = this.async();
        var contribRegex = /^lintel-contrib/;
        if (contribRegex.test(value)) {
          log.error(
            'Removing "contrib" from your project\'s name.' +
            '\n  The lintel-contrib-* namespace is reserved for modules by the lintel team.'
          );
          value = value.replace(contribRegex, 'lintel');
        }
        // TODO: flatten
        npmName(value, function (err, npmAvailable) {
          if (!npmAvailable) {
            log.info(chalk.yellow(value) + ' already exists on npm. You might want to use another name.');
          }
          bowerName(value, function(err, bowerAvailable) {
            if (!bowerAvailable) {
              log.info(chalk.yellow(value) + ' already exists on bower. You might want to use another name.');
            }
            done(value);
          });
        });
      }
    }, {
      name: 'languages',
      message: 'Languages',
      type: 'checkbox',
      choices: [{
        name: 'CSS',
        checked: true
      }, {
        name: 'JS'
      }]
    }, {
      name: 'description',
      message: 'Description',
      default: 'Sexy lintel module.'
    }, {
      name: 'version',
      message: 'Version',
      default: '0.1.0'
    }, {
      name: 'repository',
      message: 'Project git repository'
    }, {
      name: 'homepage',
      message: 'Project homepage'
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'authorName',
      message: 'Author name'
    }, {
      name: 'authorEmail',
      message: 'Author email'
    }, {
      name: 'authorUrl',
      message: 'Author url'
    }, {
      name: 'lintelVersion',
      message: 'What version of lintel does it need?',
      default: '~0.1.0'
    }];
    this.prompt(prompts, function (answers) {
      if (!answers.homepage && this.repoUrl) {
        answers.homepage = this.repoUrl;
      }

      this.props = this._.merge(answers, {
        slugName : this._.slugify(answers.name),
        shortName: answers.name.replace(/^lintel[\-_]?/, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1'),
        authorOriginalName: answers.authorName,
        authorName: answers.authorName.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0'),
        homepage: answers.homepage,
        languages: {
          css: answers.languages.indexOf('CSS') !== -1,
          js: answers.languages.indexOf('JS') !== -1
        },
        currentYear: (new Date()).getFullYear()
      });
      this.log(this.props);
      done();
    }.bind(this));
  },
  writing: {
    deps: function() {
      // NPM
      var pkgFile = {
        name: this.props.slugName,
        version: this.props.version,
        description: this.props.description,
        homepage: this.props.homepage,
        repository: this.props.repository,
        author: {
          name: this.props.authorOriginalName,
          email: this.props.authorEmail,
          url: this.props.authorUrl
        },
        keywords: [
          'lintelmodule',
          'lintel'
        ],
        main: [
          'sass/' + this.props.shortName + '.sass',
          'dist/' + this.props.shortName + '.css'
        ],
        license: this.props.license,
        dependencies: {
          'lintel': this.props.lintelVersion
        },
        devDependencies: {
          'gm': '^1.17.0',
          'grunt': '^0.4.5',
          'grunt-autoprefixer': '^2.0.0',
          'grunt-contrib-clean': '^0.6.0',
          'grunt-contrib-connect': '^0.9.0',
          'grunt-contrib-csslint': '^0.3.1',
          'grunt-contrib-cssmin': '^0.10.0',
          "grunt-contrib-jshint": "^0.10.0",
          'grunt-contrib-nodeunit': '^0.4.1',
          "grunt-contrib-uglify": "^0.7.0",
          'grunt-contrib-watch': '^0.6.1',
          'grunt-sass': '^0.17.0',
          'grunt-webshot': '^0.3.0',
          'load-grunt-tasks': '^1.0.0'
        },
        ignore: [
          "/.*",
          "sass/lintel-core-loader.scss"
        ],
        scripts: {
          test: "grunt test"
        },
      };
      if (this.props.authorUrl) {
        pkgFile.author.url = this.props.authorUrl;
      }
      if (this.props.languages.js) {
        pkgFile.main.push('dist/' + this.props.shortName + '.min.js');
      }

      this.writeFileFromString(JSON.stringify(pkgFile, null, 2), 'package.json');

      // Bower
      var bowerFile = this._.clone(pkgFile);
      bowerFile.devDependencies = {};
      bowerFile.authors = [pkgFile.author];
      delete bowerFile.scripts;
      delete bowerFile.author;
      this.writeFileFromString(JSON.stringify(bowerFile, null, 2), 'bower.json');
    },
    tests: function() {
      this.copy('csslintrc', '.csslintrc');
      this.copy('jshintrc', '.jshintrc');
      this.directory('test/expected');
      this.template('test/fixtures/name.html', 'test/fixtures/' + this.props.shortName + '.html');
      this.template('test/name_test.js', 'test/' + this.props.shortName + '_test.js');
    },
    sass: function() {
      if (this.props.languages.css) {
        this.template('sass/lintel-core-loader.scss', 'sass/lintel-core-loader.scss');
        this.template('sass/name.scss', 'sass/' + this.props.shortName + '.scss');
        this.template('sass/name-vars.scss', 'sass/' + this.props.shortName + '-vars.scss');
        this.template('sass/name-functions.scss', 'sass/' + this.props.shortName + '-functions.scss');
        this.template('sass/name-mixins.scss', 'sass/' + this.props.shortName + '-mixins.scss');
      }
    },
    grunt: function() {
      this.template('_Gruntfile.js', 'Gruntfile.js');
    },
    js: function() {
      if (this.props.languages.js) {
        this.template('js/name.js', 'js/' + this.props.shortName + '.js');
      }
    },
    other: function() {
      this.copy('editorconfig', '.editorconfig');
      this.copy('gitignore', '.gitignore');
      this.copy('yo-rc.json', '.yo-rc.json');
      this.copy('CONTRIBUTING.md');
      this.copy('README.md');
      if (this.props.license === 'MIT') {
        this.template('LICENSE');
      }
    }
  }
});
