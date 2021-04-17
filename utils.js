const axios = require('axios');
const config = require('./config');
const logger = require('pino')({
    prettyPrint: true
});
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function createSnapshot() {
    const { data } = await axios({
        method: 'get',
        url: config.VMConfig.snapshotUrl,
        auth: {
            username: config.VMConfig.username,
            password: config.VMConfig.password
        }
    });
    if (data.status == "ok" && data.snapshot) {
        return data.snapshot;
    }
}

async function deleteSnapshot(name) {
    const { data } = await axios({
        method: 'get',
        url: config.VMConfig.snapshotDeleteUrl,
        params: {
            snapshot: name
        },
        auth: {
            username: config.VMConfig.username,
            password: config.VMConfig.password
        }
    });
    if (data.status == "ok") {
        return 1;
    }
}

/**
 * 
 * @param {*} backupType - 1 (Latest)/ 2(Daily Full) 
 * @returns 
 */
async function createAnduploadBackup(backupType=1) {
    logger.info("Starting Backup Process. BackupType : "+ (backupType == 1? 'Latest': 'Daily'));
    try {
        let snapShotName;
        try {
            snapShotName = await createSnapshot();
            if (!snapShotName) {
                // Log error. 
                logger.error('Snapshot could not be created, Snapshotname empty');
            }
            logger.info("Snapshot created: " + snapShotName);
        } catch (err) {
            logger.error('Snapshot could not be created, err: ' + err.message);
            return;
        }
        try {
            await uploadBackup(snapShotName, backupType);
        } catch (err) {
            logger.error("Error in uploading Backup, err: " + err.message);
        }

        try {
            let res = await deleteSnapshot(snapShotName);
            if (!res) {
                // Log error. 
                logger.error('Snapshot could not be deleted');
            }
            logger.info("Snapshot deleted: " + snapShotName);
        } catch (err) {
            logger.error('Snapshot could not be deleted, err: ' + err.message);
            return;
        }
        logger.info("Finish");
    } catch (err) {
        logger.error('Uncaught exception: err: ' + err.message);
    }
}
/**
 * 
 * @param {*} snapshotname 
 * @param {*} backupType - 1 (Latest)/ 2(Daily Full) 
 */
async function uploadBackup(snapshotname, backupType) {
    let command;
    if(backupType == 1){
        command = `${config.VMConfig.vmbackupBinary} -storageDataPath=${config.VMConfig.vmDataStoragePath} -snapshotName=${snapshotname} -dst=${config.VMConfig.backupLatestDestinationPath} -credsFilePath=${config.VMConfig.credsFilePath}`
    }else{
        dailyBackupDestination = `${config.VMConfig.backupFullDestinationPath}/${_getymdStr()}`;
        command = `${config.VMConfig.vmbackupBinary} -storageDataPath=${config.VMConfig.vmDataStoragePath} -snapshotName=${snapshotname} -dst=${dailyBackupDestination} -credsFilePath=${config.VMConfig.credsFilePath}`    
    }
    
    const { stdout, stderr } = await exec(command);
    if (stderr) {
        logger.error(stderr);
        logger.info(stdout);
    }
}

async function delay(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve();
        }, t);
    })
}

/*
Utilities
*/

function _getymdStr(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy+mm+dd;
    return today;
}

module.exports = { delay, createAnduploadBackup }