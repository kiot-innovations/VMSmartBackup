# Victoria Metrics smart backup manager
A tool for automatically taking backup of victoria metrics. The tool create snapshot and push daily backup to prefered destination(S3 or Google Cloud Storage). It also takes regular snapshots throught out the day and push only new data incrementally to a separate destination. Saving bandwidth and charges.
It will also automatically delete backups which are older than a set duration(15 days by default)

## How to run
put `.env` and `conf.json` in the root directory. You can start with conf.default.json and .default.env

### cron-conf.json
Copy cron-conf.default.json to cron-conf.json
- `daily_backup` - cron string for when to trigger daily backups. example 2 o clk at night. 
- `latest_backup` - cron string for when to take frequent backups. example every even hour. `0 2,4,6,8,10,12,14,16,18,20,22 * * *` 
- `delete_old_backups` - cron strgin for when to delete backups older than a certain period. (useful for cleaning and saving space in S3)

### .env
- VM_BACKUP_BINARY=/path/to/vmbackup/binary
    - Download VMUtils from [Release Page](https://github.com/VictoriaMetrics/VictoriaMetrics/releases) and unzip. It has vmbackup util.
- CREDS_FILE_PATH=/path/to/shared/accesskey
    - File with S3 creadentials in this format
    ```
    [default]
    aws_access_key_id=theaccesskey
    aws_secret_access_key=thesecretaccesskeyvalue
    ```

- VM_DATA_STORAGE_PATH=/path/to/victoria/metrics/data/directory
- VM_BACKUP_BUCKET_NAME=bucket-name
- VM_FULL_DESTINATION_PATH=s3://bucket-name/path/to/daily/backup
- VM_FULL_DESTINATION_PREFIX=path/to/daily/backup
- VM_LATEST_DESTINATION_PATH=s3://bicket-name/path/to/latest/backup
- VM_LATEST_DESTINATION_PREFIX=path/to/latest/backup
- VM_HOST=http://127.0.0.1:8428
- VM_USERNAME=""
- VM_PASSWORD=""
- SNPASHOT_URL=http://127.0.0.1:8428/snapshot/create
- SNAPSHOT_DELETE_URL=http://127.0.0.1:8428/snapshot/delete

### Start process
```
npm install pm2 -g // if pm2 not installed. 
pm2 start process.json
pm2 save // the process will auto load after reboot of machine also. 
```
