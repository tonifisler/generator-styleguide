'use strict';
var util = require('util');
var generatorUtil = require('../util.js');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var DrupalGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    this.log("This will generate the basic files you need to deploy your Drupal site with Capistrano. Keep in mind you still have to edit deploy.rb and the files located in deploy/* before being completely set.");

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: "What is the name of your project repo?",
      default: "example_project"
    },
    {
      type: 'input',
      name: 'styleguide_name',
      message: "What is the name of your styleguide repo?",
      default: "example_styleguide"
    },
    {
      type: 'input',
      name: 'theme_name',
      message: "What is the name of your drupal theme",
      default: "example_styleguide"
    },
    {
      type: 'input',
      name: 'github_user',
      message: "What is your github username?",
      default: "username"
    }];

    this.prompt(prompts, function (props) {
      this.styleguide_name = props.styleguide_name;
      this.project_name = props.project_name;
      this.github_user = props.github_user;
      this.theme_name = props.theme_name;

      done();
    }.bind(this));
  },

  app: function () {
    this.copy('config/deploy', 'config/deploy');
    this.template('gulpfile.js', 'gulpfile.js');
  }
});

module.exports = DrupalGenerator;
