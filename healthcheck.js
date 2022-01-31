var axios = require('axios');

function ReportHealthCheckStatus(key, status , message ) {
	let healthCheckUrl = process.env["HEALTH_CHECK_URL_"+key];

	if (healthCheckUrl && healthCheckUrl.length) {
		ReportStatus(healthCheckUrl, status, message)
	}
}
// Never throws
async function ReportStatus(joburl, status, message){
    if(message && message.length){
        try{
            await axios.post(`${joburl}/${status}`, {
                message: message
            })
        } catch (err){
            console.log("Error reporting health check status: ", err);
        }
    }else{
        try{
            await axios.get(`${joburl}/${status}`)
        } catch(err){
            console.log("Error reporting health check status: ", err);
        }
    }
}

module.exports = {
    ReportHealthCheckStatus
}