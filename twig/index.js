'use strict';
var util = require('util');
var path = require('path');
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var TwigGenerator = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.option('name');
  },

  askFor: function () {
    var done = this.async();

    if (!this.options.name) {
      var prompts = [{
        type: 'input',
        name: 'name',
        message: "What's the name of the new Twig file?",
        default: 'new-file'
      }];
      this.prompt(prompts, function (props) {
        this.name = props.name;

        done();
      }.bind(this));
    } else {
      this.name = this.options.name;
      done();
    }
  },

  app: function(){
    this.template("_new.twig", "assets/pages/"+this._.slugify(this.name)+".twig");
  }
});

module.exports = TwigGenerator;
