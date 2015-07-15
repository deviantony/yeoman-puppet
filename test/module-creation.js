var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');
var _ = require('lodash');

describe('Puppet module generator', function () {
  beforeEach(function (done) {
    this.answers = {
      "author": "testAuthor",
      "companyName": "testCompany"
    };
    helpers.run(path.join(__dirname, '../app'))
    .withArguments(['testModule'])
    .withPrompts(this.answers)
    .on('end', done);
    this.moduleName = _.snakeCase('testModule');
    this.author = "testAuthor";
    this.companyName = _.snakeCase('testCompany');
  });

  it('creates default module files', function () {
    assert.file([
      'metadata.json',
      'Rakefile',
      'README.md',
      'manifests/init.pp',
      'spec/spec.opts',
      'spec/spec_helper.rb',
      'tests/init.pp'
    ]);
  });

  it('fills manifests/init.pp with correct information', function () {
    assert.fileContent('manifests/init.pp', new RegExp('class ' + this.moduleName + '\(\)'));
  });

  it('fills tests/init.pp with correct information', function () {
    assert.fileContent('tests/init.pp', new RegExp('class \{ \'' + this.moduleName + '\'\:'));
  });

  it('fills metadata.json with correct information', function () {
    var content = [
      ['metadata.json', new RegExp('"author": "' + this.author + '"')],
      ['metadata.json', new RegExp('"name": "' + this.companyName + '-' + this.moduleName + '"')]
    ];
    assert.fileContent(content);
  });

  it('fills README.md with correct information', function () {
    assert.fileContent('README.md', new RegExp('# ' + this.moduleName + ' Puppet module'));
  });
});
