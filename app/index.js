var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('moduleName', { type: String, required: true });
    this.moduleName = _.camelCase(this.moduleName);
  },

  prompting: function () {
    var done = this.async();

    prompts = [
      {
        type    : 'input',
        name    : 'author',
        message : 'Module author',
        store   : true
      },
      {
        type    : 'input',
        name    : 'companyName',
        message : 'Company name',
        store   : true
      }
    ]

    this.prompt(prompts, function (answers) {
      this.author = answers.author;
      this.companyName = answers.companyName;
      done();
    }.bind(this));
  },

  writing: function () {

    context = {
      moduleName: this.moduleName,
      author: this.author,
      companyName: this.companyName
    }

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('metadata.json'),
      this.destinationPath('metadata.json'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('manifests/init.pp'),
      this.destinationPath('manifests/init.pp'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('tests/init.pp'),
      this.destinationPath('tests/init.pp'),
      context
    );

    this.fs.copy(
      this.templatePath('Rakefile'),
      this.destinationPath('Rakefile')
    );

    this.fs.copy(
      this.templatePath('spec/spec.opts'),
      this.destinationPath('spec/spec.opts')
    );

    this.fs.copy(
      this.templatePath('spec/spec_helper.rb'),
      this.destinationPath('spec/spec_helper.rb')
    );
  }
});
