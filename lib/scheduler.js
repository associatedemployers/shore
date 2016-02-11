/*
  Core Task Scheduler
*/

var winston = require('winston'),
    chalk   = require('chalk'),
    task    = require('cron').CronJob;

module.exports = Scheduler;

/**
 * Scheduler Constructor
 * @param  {Object} options
 * @return {Object} this
 */
function Scheduler ( options ) {
  this.options = {
    pattern:        options.pattern || '* * * * *',                                          // Default: * * * * *
    runOnInit:      ( options.runOnInit !== undefined ) ? options.runOnInit : true,          // Default: true
    preventOverlap: ( options.preventOverlap !== undefined ) ? options.preventOverlap : true // Default: true
  };

  this.hooks = {
    _task: options.startHook,
    _stop: options.stopHook
  };

  this.name = options.name || 'Unnamed';

  this._doneBinding = this._done.bind( this );

  if ( !this.hooks._task ) {
    throw new Error({
      message: 'Need task hook to schedule task'
    });
  }

  this._register();

  if ( this.options.defer ) {
    this.stop();
  }

  return this;
}

Scheduler.prototype.constructor = Scheduler;

/**
 * Start Task
 */
Scheduler.prototype.start = function () {
  if ( this.task ) {
    this.task.start();
  }
};

/**
 * Stop Task
 */
Scheduler.prototype.stop = function () {
  if ( this.task ) {
    this.task.stop();
  }
};

/**
 * Task Registration
 * @private
 * @return {Object} task
 */
Scheduler.prototype._register = function () {
  var fn = {
    _execute: this._execute.bind( this ),
    _stop:    this._stop.bind( this )
  };

  this.task = new task(
    this.options.pattern,  // Cron Pattern
    fn._execute,           // Execution Hook
    fn._stop,              // Task Stop Hook
    this.options.runOnInit // Run this task immediately?
  );

  return this.task;
};

/**
 * Task Execution Handler - Fired on task execution
 * @private
 */
Scheduler.prototype._execute = function () {
  winston.log( 'info', chalk.bgBlue( 'Running scheduled task,', this.name + '.' ) );

  if ( this.options.preventOverlap && this.running ) {
    return;
  }

  if ( this.options.preventOverlap ) {
    this.running = true;
  }

  var hook = this.hooks._task;

  if ( hook && typeof hook === 'function' ) {
    hook.call( this, this._doneBinding );
  }
};

/**
 * Task Stop Handler - Fired on task stop
 * @private
 */
Scheduler.prototype._stop = function () {
  winston.log( 'info', chalk.bgYellow( 'Stopped schedule task,', this.name + '.' ) );

  if ( this.options.preventOverlap ) {
    this.running = false;
  }

  var hook = this.hooks._stop;

  if ( hook && typeof hook === 'function' ) {
    hook.call( this, this._doneBinding );
  }
};

/**
 * Task Done Handler
 * @return {object} this
 */
Scheduler.prototype._done = function () {
  this.running = false;

  return this;
};
