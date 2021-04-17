require('dotenv').config();
const { createAnduploadBackup } = require('./utils');
const { deleteOlderVMBackupFiles } = require('./s3util')
let cron = require('node-cron');


// At 01:20.
cron.schedule('20 1 * * *', () => {
    // Daily update once.
    createAnduploadBackup(2);
});

// Run At minute 0 past hour 2, 6, 10, 14, 18, and 22
cron.schedule('0 2,6,10,14,18,22 * * *', () => {
    // Latest Updates
    createAnduploadBackup(1);
});

console.log("Process Started");

// TODO: 
// Delete older updates

// deleteOlderVMBackupFiles();
