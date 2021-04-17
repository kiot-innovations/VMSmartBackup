const VMConfig = {
    vmbackupBinary: process.env.VM_BACKUP_BINARY,
    credsFilePath:process.env.CREDS_FILE_PATH,
    vmDataStoragePath:process.env.VM_DATA_STORAGE_PATH,
    backupFullDestinationPath: process.env.VM_FULL_DESTINATION_PATH,
    backupLatestDestinationPath:process.env.VM_LATEST_DESTINATION_PATH,
    host: process.env.VM_HOST,
    username: process.env.VM_USERNAME,
    password: process.env.VM_PASSWORD,
    snapshotUrl: process.env.SNPASHOT_URL,
    snapshotDeleteUrl: process.env.SNAPSHOT_DELETE_URL,
    bucketName: process.env.VM_BACKUP_BUCKET_NAME,
    backupPrefix: process.env.VM_BACKUP_PREFIX
}

module.exports = { VMConfig };