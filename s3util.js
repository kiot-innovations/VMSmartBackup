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

/**
 * 
 * @param {*} param0 
 */
async function deleteOlderVMBackupFiles({bucket,duration, backupPath}) {
    if(!duration) duration = 15*24*3600 // Default duration 15 Days. 
    let moreFiles = true;
    let count = 0;
    
    let today = new Date();
    let threshold = today.getTime() - duration*1000;
    
    while (moreFiles) {
        let promise = new Promise((resolve, reject) => {
            S3.listObjectsV2({
                Bucket: bucket,
                Prefix: backupPath,
            }, async (err, data) => {
                if (err) {
                    logger.error('Error in fetching Objects : err: ' + err.message);
                    return reject(err);
                }
                let deleteObjectsList = [];
                for(let obj of data.Contents){
                    if(new Date(obj.LastModified).getTime() <= threshold){
                        deleteObjectsList.push({Key: obj.Key});
                    }
                }
                if(deleteObjectsList.length){
                    try{
                        const deleted = await deleteObjects(bucket,deleteObjectsList);
                        count += deleted.Deleted.length;
                    }catch(err){
                        logger.error("Error in deleting objects ");
                        logger.error(err);
                        return reject(err);
                    }
                }else{
                    // No more files to delete now.
                    moreFiles = false;
                }
                return resolve();
            })
        });
        await promise;
        logger.info("Deleted Files - " + count);
        if(moreFiles) logger.info("Continuing...");
    }
    logger.info("Finished. Total Deleted Files " + count);
}

async function deleteObjects(bucket, objects){
    return new Promise((resolve,reject)=>{
        S3.deleteObjects({
            Bucket: bucket,
            Delete: {
                Objects: objects
            }
        }, (err, data)=>{
            if(err) return reject(err);
            return resolve(data);
        })
    });
} 

module.exports = { deleteOlderVMBackupFiles }