require('dotenv').config();
const logger = require('pino')({
    prettyPrint: true
});

const { createAnduploadBackup } = require('./utils');
const { deleteOlderVMBackupFiles } = require('./s3util')
let cron = require('node-cron');
const conf = require("./conf.json");

function loadCronJobs(){
    if(!cron.validate(conf.intervals.dailybackup)){
        logger.error("Invalid cronstring: "+ conf.intervals.dailybackup);
    }
    if(!cron.validate(conf.intervals.latest_backups)){
        logger.error("Invalid cronstring: "+ conf.intervals.latest_backups);
    }

    // Daily Backups
    cron.schedule(conf.intervals.dailybackup, ()=>{
        createAnduploadBackup(2);
    });
    // Latest Backups
    cron.schedule(conf.intervals.dailybackup, ()=>{
        createAnduploadBackup(1);
    });
    
}

loadCronJobs();
console.log("Process Started");

// TODO: 
// Delete older updates

// deleteOlderVMBackupFiles();
