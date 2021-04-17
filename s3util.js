const config = require('./config');
var AWS = require("aws-sdk");
const logger = require('pino')({
    prettyPrint: true
});


var credentials = new AWS.SharedIniFileCredentials({
    filename: process.env.CREDS_FILE_PATH
});
AWS.config.credentials = credentials;
var S3 = new AWS.S3();

async function deleteOlderVMBackupFiles(){
    

}

module.exports = {deleteOlderVMBackupFiles}