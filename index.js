require('dotenv').config();
const logger = require('pino')({
    prettyPrint: true
});

const { createAnduploadBackup } = require('./utils');
const { deleteOlderVMBackupFiles } = require('./s3util')
let cron = require('node-cron');
const cronConf = require("./cron-conf.json");
const config = require('./config');

// TODO: Handle Errors emitted by cron handler functions. 

function loadCronJobs(){
    if(!cron.validate(cronConf.intervals.daily_backup)){
        logger.error("Invalid cronstring: "+ cronConf.intervals.daily_backup);
    }
    if(!cron.validate(cronConf.intervals.latest_backups)){
        logger.error("Invalid cronstring: "+ cronConf.intervals.latest_backups);
    }
    if(!cron.validate(cronConf.intervals.delete_old_backups)){
        logger.error("Invalid cronstring: "+ cronConf.intervals.delete_old_backups);
    }

    // Daily Backups
    cron.schedule(cronConf.intervals.daily_backup, ()=>{
        createAnduploadBackup(2);
    });
    // Latest Backups
    cron.schedule(cronConf.intervals.latest_backups, ()=>{
        createAnduploadBackup(1);
    });

    cron.schedule(cronConf.intervals.delete_old_backups, ()=>{
        deleteOlderVMBackupFiles({
            bucket: config.VMConfig.bucketName,
            backupPath: config.VMConfig.backupFullDestinationPrefix,
            duration: cronConf.oldbackups.days * 24* 3600
        });
    });
    
}
loadCronJobs();
