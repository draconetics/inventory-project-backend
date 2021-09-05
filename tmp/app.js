const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const stream = require("stream"); // Added

const CLIENT_ID = '483550590360-in9jc01t4l6nmgbd2pcrtl1rku8ep8h4.apps.googleusercontent.com';
const CLIENT_SECRET = 'r3r87dxTRI7CcCMvlSa8140p';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04PcOIcf43y3qCgYIARAAGAQSNwF-L9IrvdpY5POJpQtavgu4Mc1H_vJJIUrwO5URY4wNiy6MP8esVsDDW8xRTaQsi4tzt_Fch5c';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const filePath = path.join(__dirname, 'oracion.jpg');

async function uploadFile(img) {

    const uploadImg = img.split(/,(.+)/)[1];
    const buf = new Buffer.from(uploadImg, "base64"); // Added
    const bs = new stream.PassThrough(); // Added
    bs.end(buf); // Added


    try{
        const response = await drive.files.create({
            requestBody: {
                parents:['1l2ZFlMK8pL32Yt6MJrmzYUdwq_6DX692'],
                name: 'oracion_file',
                mimeType: 'image/jpg'
            },
            media: {
                mimeType: 'image/jpg',
                //body: fs.createReadStream(filePath)
                body: bs
            },
        });
        console.log(response.data)
    }catch(error){
        console.log(error.message);
    }

}

async function existFile() {
    return drive.files.list({
        /* kind: 'drive#file',
        name: 'xxxx',
        trashed: false,
        incompleteSearch: false,
        parents: [
            '1l2ZFlMK8pL32Yt6MJrmzYUdwq_6DX692'
          ], */
        q: "mimeType='image/jpeg' and name = 'oracion_files' and '1l2ZFlMK8pL32Yt6MJrmzYUdwq_6DX692' in parents",
        fields: 'nextPageToken, files(id, name)',
        spaces: 'drive',
        pageToken: null
      })
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response.data);
            /* response.files.forEach(function (file) {
                console.log('Found file: ', file.name, file.id);
              });  */

        },
        function(err) { console.error("Execute error", err); });
}

//existFile();

const img = `data:image/jpeg;base64,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zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAEqnXneF3zt6Aded4XfO3oCKsASqded4XfO3oB153hd87egIqwBKp153hd87egHXneF3zt6AirAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//2Q==
`;
//uploadFile(img);

async function deleteFile() {
    try{
        const response = await drive.files.delete({
            fileId: '1tbzNQKbcs-0Z_39Z_Cy3hqhaEVWTeM-m',
        });
        console.log(response.data);
        console.log('***************')
        console.log(response.status);
    }catch(error){
        console.log(error.message);
    }
}

//deleteFile();

async function generateUrl() {
    try{
        const fileId = '18jEFMXuWhAXxzMouOkCK5O8R6EgDqUTd';
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type:'anyone'
            }
        });
        const result = await drive.files.get({
            fileId,
            fields: 'webViewLink, webContentLink'
        });
        console.log(result.data)
    }catch(error){
        console.log(error.message);
    }
}

//generateUrl();
let url = 'https://drive.google.com/uc?export=view&id=1A3ooXzEvbuknDS2WuGGkZ294dB12Q__L';
function changeUrl() {
    console.log('changing');
    let init = url.split('=');
    console.log(init);
}
changeUrl();