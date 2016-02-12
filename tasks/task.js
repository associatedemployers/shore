var Zipped = require('zip-zip-top'),
    option = require('../config/options.json'),
    moment = require('moment'),
    exec   = require('child_process').exec,
    fs     = require('fs-extra');

var zippy = new Zipped();

var task = function ( done ) {
  var directory = process.env.environment === 'test' ? process.cwd() + '/tests/_temp' : this.directory;

  exec('mongodump -d ' + this.db + ' -o ' + __dirname + '/_temp', (error, stdout, stderr) => {
    //console.log('stdout: ${stdout}');
    //console.log('stderr: ${stderr}');
    if (error !== null) {
      //console.log('exec error: ${error}');
    }
    zippy.zipFolder(__dirname + '/_temp/' + this.db, (err) => {
      if(err) {
        //console.log(err);
      }

      var now = moment().format('MMMM Do YYYY, h:mm:ss a');

      fs.ensureDirSync(directory);

      zippy.writeToFile(directory + '/' + this.name + '-' + now + '.zip', (err) => {
        if(err) {
          return; //console.log(err);
        }
        //console.log(this.name + ' is zipped');
        done();
      });
    });
  });
};

module.exports = {
  name:      'Zip and ship',
  startHook: task
};
