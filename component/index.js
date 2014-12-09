'use strict';
var util = require('util');
var generatorUtil = require('../util.js');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var ComponentGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'component_name',
      message: "What's the name of your new  shiny component?",
      default: "Great Component"
    },
    {
      type: 'list',
      name: 'component_type',
      message: "Which type of component is it?",
      choices: ['layout', 'components', 'javascript']
    },
    {
      type: 'input',
      name: 'styleguide_main_category',
      message: "What is the main styleguide category?",
      default: "Main Category"
    },
    {
      type: 'input',
      name: 'styleguide_category',
      message: "What is the styleguide category?",
      default: "Category"
    },];

    this.prompt(prompts, function (props) {
      this.component_name = props.component_name;
      this.component_type = props.component_type;
      this.styleguide_main_category = props.styleguide_main_category;
      this.styleguide_category = props.styleguide_category;

      done();
    }.bind(this));
  },

  app: function () {
  },

  addComponent: function(props) {
    this.fileBase = this._.underscored(this.component_name);
    var scssFile  = "assets/sass/" + this.component_type + "/" + this.fileBase + ".scss";

    this.template("_component.scss", scssFile);
  },

  addToProject: function(){
      // var menu = this.read("assets/sass/main.scss");
      // var t = '@import <%= component_type %>/<%= component_name %>;';
      // var line = this.engine(t, context);

      // menu = this.append(menu, "div.menu", line);

      generatorUtil.rewriteFile({
        file: 'assets/sass/main.scss',
        needle: '// <here> $ yo styleguide:component will add new components right here. Do not remove this line.',
        splicable: [
          '@import \''+this.component_type+'/'+this.fileBase+'\';'
        ]
      });

      // this.write("app/menu.html");

  }
});

module.exports = ComponentGenerator;
