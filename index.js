var express  = require('express'),
    winston  = require('winston'),
    chalk    = require('chalk'),
    fs       = require('fs-extra'),
    exec     = require('child_process').exec;
    logLevel = process.env.environment === 'development' || process.env.environment === 'dev' ? 'debug' : 'info';
    app      = express();
winston.level = logLevel;

var port = process.env.port || 3000;

process.title = 'Deploy It - Node.js';

const child = exec('mongodump -d slate -o /Users/JScottChapman/projects/shore',
  (error, stdout, stderr) => {
    console.log('stdout: ${stdout}');
    console.log('stderr: ${stderr}');
    if (error !== null) {
      console.log('exec error: ${error}');
    }
  }
)
