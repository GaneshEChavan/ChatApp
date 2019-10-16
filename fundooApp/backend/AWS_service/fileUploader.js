const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// console.log(process.env.AWS_SECRET_ACCESS_KEY);
// console.log(process.env.AWS_ACCESS_KEY_ID);



aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'ap-south-1'
});

var s3 = new aws.S3()

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true)
    } else {
        callback(new Error("invalid MimeType, only jpeg or jpg"), false)
    }
}

var upload = multer({
    fileFilter : fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'profile-pictures-2',
        // acl: 'public-read',
        key: function (req, file, callback) {
            callback(null,file.originalname)
        }
    })
})

module.exports = upload;