const aws = require("aws-sdk");
const { createReadStream } = require("fs");

require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

aws.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
});

const uploadFile = async (file) => {
  const s3 = new aws.S3();

  const params = {
    ACL: "public-read",
    Bucket: bucketName,
    Body: createReadStream(file.path),
    Key: file.filename,
  };

  return await s3.upload(params).promise();
};

exports.uploadFile = uploadFile;
