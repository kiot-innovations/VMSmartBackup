require('dotenv').config();
const config = require('./config');
const logger = require('pino')({
    prettyPrint: true
});
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * 
 * @param {*} snapshotname 
 * @param {*} backupType - 1 (Latest)/ 2(Daily Full) 
 */
async function restoreBackup() {
    let command;
        command = `${config.VMConfig.vmrestoreBinary} -src=${config.VMConfig.backupLatestDestinationPath} -storageDataPath=${config.VMConfig.vmDataStoragePath} -credsFilePath=${config.VMConfig.credsFilePath}`

    const { stdout, stderr } = await exec(command);
    if (stderr) {
        logger.error(stderr);
        logger.info(stdout);
    }
}

restoreBackup();
