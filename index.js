const https = require('https');
const axios = require('axios');

/*
* Error [ERR_TLS_CERT_ALTNAME_INVALID]: Hostname/IP does not match certificate's altnames: 
* Host: api.B.com. is not in the cert's altnames: DNS:*.A.com, DNS:A.com
* export NODE_TLS_REJECT_UNAUTHORIZED=0
* */
const agent = new https.Agent({  
    rejectUnauthorized: false
});
 
const lat = 37.293255;
const lon = 127.0704607;

axios({
    url: 'https://api.B.com/graphql',
    method: 'post',
    headers: {'Content-Type': 'application/graphql'},
    httpAgent: agent,
    data:
        `
        query {
            get(location: { latitude: ${lat}, longitude: ${lon}}) {
                venue {
                    name
                }
            }
        }
        `
}).then((result) => {
    console.log(JSON.stringify(result.data, null, 2));
}).catch((err) => {
    console.log(JSON.stringify(err.response.data, 2, null));
});