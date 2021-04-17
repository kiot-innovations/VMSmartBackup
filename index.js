require('dotenv').config();
const logger = require('pino')({
    prettyPrint: true
});

const { createAnduploadBackup } = require('./utils');
const { deleteOlderVMBackupFiles } = require('./s3util')
let cron = require('node-cron');
const conf = require("./conf.json");

function loadCronJobs(){
    if(!cron.validate(conf.intervals.daily_backup)){
        logger.error("Invalid cronstring: "+ conf.intervals.daily_backup);
    }
    if(!cron.validate(conf.intervals.latest_backups)){
        logger.error("Invalid cronstring: "+ conf.intervals.latest_backups);
    }

    // Daily Backups
    cron.schedule(conf.intervals.daily_backup, ()=>{
        createAnduploadBackup(2);
    });
    // Latest Backups
    cron.schedule(conf.intervals.daily_backup, ()=>{
        createAnduploadBackup(1);
    });
    
}

loadCronJobs();
console.log("Process Started");

// TODO: 
// Delete older updates

// deleteOlderVMBackupFiles();
