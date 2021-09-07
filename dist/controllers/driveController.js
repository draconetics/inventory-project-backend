"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.existFile = exports.uploadFile = void 0;
const HttpException_1 = require("../common/HttpException");
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const stream = require("stream"); // Added
const CLIENT_ID = '483550590360-in9jc01t4l6nmgbd2pcrtl1rku8ep8h4.apps.googleusercontent.com';
const CLIENT_SECRET = 'r3r87dxTRI7CcCMvlSa8140p';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//046OBdnSc7os_CgYIARAAGAQSNwF-L9IrFhn2p212fD9cznlPalTm1PXgXlWDXkZi_q8Qc2FsxGaIFz5-NtROa9AqmBbkXbOH_Qg';
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});
function uploadFile(img, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadImg = img.split(/,(.+)/)[1];
        const buf = new Buffer(uploadImg, 'base64'); // Added
        const bs = new stream.PassThrough(); // Added
        bs.end(buf); // Added
        try {
            const response = yield drive.files.create({
                requestBody: {
                    parents: ['1l2ZFlMK8pL32Yt6MJrmzYUdwq_6DX692'],
                    name: id,
                    mimeType: 'image/jpg'
                },
                media: {
                    mimeType: 'image/jpg',
                    //body: fs.createReadStream(filePath)
                    body: bs
                },
            });
            const fileId = yield response.data.id;
            yield drive.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            });
            return fileId;
        }
        catch (error) {
            throw new HttpException_1.HttpException(500, error.message);
        }
    });
}
exports.uploadFile = uploadFile;
function existFile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("enter function existFile()");
            const list = yield drive.files.list({
                q: "mimeType='image/jpeg' and name = '" + id + "' and '1l2ZFlMK8pL32Yt6MJrmzYUdwq_6DX692' in parents",
                fields: 'nextPageToken, files(id, name)',
                spaces: 'drive',
                pageToken: null
            });
            console.log(list);
            /*
           if(list.length > 0){
               throw new HttpException(500,'name of image exist');
           } */
            return list;
        }
        catch (e) {
            console.log('Error on function existFile()');
            throw new HttpException_1.HttpException(500, e);
        }
    });
}
exports.existFile = existFile;
//existFile();
//uploadFile(img);
function deleteFile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield drive.files.delete({
                fileId: id,
            });
            return response.status;
        }
        catch (error) {
            console.log(500, 'google drive: error deleting file, ' + error.message);
        }
    });
}
exports.deleteFile = deleteFile;
//deleteFile();
