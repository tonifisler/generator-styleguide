'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var ComponentGenerator = yeoman.generators.NamedBase.extend({
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
      choices: ['layout', 'component', 'javascript']
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

    this.prompt(prompts, function () {
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
    var fileBase = this._.underscored(component_name);
    var scssFile  = "assets/sass/" + component_type + "/" + fileBase + ".scss";

    this.template("_component.scss", scssFile);
  },

  addToProject: function(){
      var menu = this.read("assets/sass/main.scss");
      var t = '@import <%= component_type %><%= component_name %>;\n';
      var line = this.engine(t, context);

      menu = this.append(menu, "div.menu", line);

      // this.write("app/menu.html");

  }
});

module.exports = ComponentGenerator;
