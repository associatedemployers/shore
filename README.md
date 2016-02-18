# Shore! [![Build Status](https://travis-ci.org/associatedemployers/shore.svg?branch=master)](https://travis-ci.org/associatedemployers/shore)
A minimal node backup server for mongoDB.  It takes your database, zips it,  and saves it locally or on Amazon Web Services.  

## Installation ##
      $ git clone https://github.com/associatedemployers/shore.git
    $ npm install
    $ node index.js

## Usage ##

1. In shore/config/options.json enter what you would like the backup named, the name of the database, where it is located, and the cronjob pattern for when you want the task ran.  
      >Check out the pattern for setting your date [here](https://www.npmjs.com/package/cron#usage-basic-cron-usage).
2. In shore/tasks/task.js we have it configured to name the file whatever name you specified in options.json plus a MomentJS formatted date plus .zip.  If you would like the name to be different, here is where you would change it.  


## Contributors ##
-[James Collins](https://github.com/James1x0)  
-[J Scott Chapman](https://github.com/jscottchapman)

## License ##
MIT
