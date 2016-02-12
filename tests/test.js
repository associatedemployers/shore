var chai = require('chai'),
    expect = chai.expect,
    fs = require('fs-extra'),
    path = require('path'),
    options = require('./test-options.json'),
    rimraf = require('rimraf');

describe('Shore Backup Operations', () => {
  after(done => {
    rimraf(path.join(__dirname, '_temp'), done);
  });

  it('should create a zip file with db contents', function ( done ) {
    this.timeout(61 * 1000);

    var server = require('../index.js');

    expect(server.runningTasks).to.have.length(1);

    var checker = setInterval(() => {
      fs.readdir(path.join(__dirname, '_temp'), ( err, files ) => {
        if ( !files || !files.length ) {
          return;
        } else {
          expect(files).to.have.length(1);
          expect(files[0]).to.contain(options.backups[0].name);

          clearInterval(checker);
          done();
        }
      });
    }, 1000);
  });
});
