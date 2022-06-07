const VMConfig = {
    vmbackupBinary: process.env.VM_BACKUP_BINARY,
    vmrestoreBinary: process.env.VM_RESTORE_BINARY,
    credsFilePath:process.env.CREDS_FILE_PATH,
    vmDataStoragePath:process.env.VM_DATA_STORAGE_PATH,
    backupFullDestinationPath: process.env.VM_FULL_DESTINATION_PATH,
    backupFullDestinationPrefix: process.env.VM_FULL_DESTINATION_PREFIX,
    backupLatestDestinationPath:process.env.VM_LATEST_DESTINATION_PATH,
    backupLatestDestinationPrefix: process.env.VM_LATEST_DESTINATION_PREFIX,
    host: process.env.VM_HOST,
    username: process.env.VM_USERNAME,
    password: process.env.VM_PASSWORD,
    snapshotUrl: process.env.SNPASHOT_URL,
    snapshotDeleteUrl: process.env.SNAPSHOT_DELETE_URL,
    bucketName: process.env.VM_BACKUP_BUCKET_NAME
}

module.exports = { VMConfig };
