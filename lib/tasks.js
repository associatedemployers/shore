/*
  Initializer - Startup Task Registration
*/

var winston   = require('winston'),
    chalk     = require('chalk'),
    Scheduler = require('scheduler'),
    _         = require('lodash');

var globSync = require('glob').sync,
    tasks    = globSync('../tasks/!(_core)/*.js', { cwd: __dirname }).map(require);

var runningTasks = [];

exports.init = function () {
  console.log(tasks);
  if ( tasks && _.isArray( tasks ) ) {
    tasks.forEach(function ( task ) {
      if ( task.autoInit ) {
        runningTasks.push( new Scheduler( task ) );
      }
    });
  }
};
