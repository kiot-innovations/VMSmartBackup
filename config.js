// const VMConfig = {
//     vmbackupBinary: "/home/arihant/Documents/Dev/Apps/victoria-metrics/vmbackup-prod",
//     credsFilePath:"/etc/kiot-s3backups.user.accesskey",
//     vmDataStoragePath:"/home/arihant/Documents/Dev/Apps/victoria-metrics/victoria-metrics-data",
//     backupDestinationPath: "s3://kiot-backups/VictoriaMetrics/SmartBackups/",
//     host: "http://127.0.0.1:8428",
//     username: "",
//     password: "",
//     snapshotUrl: "http://127.0.0.1:8428/snapshot/create",
//     snapshotDeleteUrl: "http://127.0.0.1:8428/snapshot/delete"
// }

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

const S3Config = {
   

}


module.exports = { VMConfig };