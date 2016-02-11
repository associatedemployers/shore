var    winston   = require('winston'),
    Scheduler = require('./lib/scheduler'),
    task      = require('./tasks/task'),
    options   = require('./config/options.json'),
    logLevel  = process.env.environment === 'development' || process.env.environment === 'dev' ? 'debug' : 'info';
winston.level = logLevel;

var runningTasks = [];
process.title = 'Shore';
options.backups.forEach(definition => {
  runningTasks.push(new Scheduler({
    name: task.name + ' ' + definition.name,
    startHook: task.startHook.bind(definition),
    autoInit: true,
    runOnInit: true,
    pattern: definition.pattern
  }));
});
