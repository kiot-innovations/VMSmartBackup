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
    // console.log("Hello");
    S3.listObjectsV2({
        Bucket: 'kiot-backups',
        Prefix: 'VictoriaMetrics/SmartBackups/daily/'
    }, (err, data)=>{
        if(err){
            logger.error('Error in fetching Objects : err: '+ err.message);
        }
        console.log(data);

        // { IsTruncated: false,
        //     Contents:
        //      [ { Key: 'VictoriaMetrics/SmartBackups/daily/',
        //          LastModified: 2021-04-15T15:53:07.000Z,
        //          ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
        //          Size: 0,
        //          StorageClass: 'STANDARD' },
        //        { Key: 'VictoriaMetrics/SmartBackups/daily/something/',
        //          LastModified: 2021-04-15T15:53:14.000Z,
        //          ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
        //          Size: 0,
        //          StorageClass: 'STANDARD' },
        //        { Key: 'VictoriaMetrics/SmartBackups/daily/something/anything/',
        //          LastModified: 2021-04-15T15:53:24.000Z,
        //          ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
        //          Size: 0,
        //          StorageClass: 'STANDARD' } ],
        //     Name: 'kiot-backups',
        //     Prefix: 'VictoriaMetrics/SmartBackups/daily/',
        //     MaxKeys: 1000,
        //     CommonPrefixes: [],
        //     KeyCount: 3 }
    })

}

module.exports = {deleteOlderVMBackupFiles}