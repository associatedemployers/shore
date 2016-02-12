var optionsDirectory = process.env.environment === 'test' ? './tests/test-options.json' : './config/options.json';

var winston   = require('winston'),
    Scheduler = require('./lib/scheduler'),
    task      = require('./tasks/task'),
    options   = require(optionsDirectory),
    logLevel  = process.env.environment === 'development' || process.env.environment === 'dev' ? 'debug' : 'info';

winston.level = logLevel;
process.title = 'Shore';

var runningTasks = [];

options.backups.forEach(definition => {
  runningTasks.push(new Scheduler({
    name: task.name + ' ' + definition.name,
    startHook: task.startHook.bind(definition),
    autoInit: true,
    runOnInit: true,
    pattern: definition.pattern
  }));
});

exports.runningTasks = runningTasks;
