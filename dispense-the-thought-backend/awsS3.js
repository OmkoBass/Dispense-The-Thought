const aws = require("aws-sdk");
const { createReadStream } = require("fs");

require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

const maxKeys = 100;

aws.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
});

const getAllFiles = async (skipPage) => {
  const s3 = new aws.S3();

  let elements = [];
  let isTruncated = true;
  let marker = null;

  for (let i = 0; i < 1; i++) {}

  // For now we will get ALL the objects,
  // So if we have 10 000 objects it might get slow
  // I'll try to improve this later on
  while (isTruncated) {
    let params = { Bucket: bucketName, MaxKeys: maxKeys };
    if (marker) params.Marker = marker;
    try {
      const response = await s3.listObjects(params).promise();
      response.Contents.forEach((item) => {
        elements.push(
          `https://distributed-systems.s3.eu-central-1.amazonaws.com/${item.Key}`
        );
      });
      isTruncated = response.IsTruncated;
      if (isTruncated) {
        marker = response.Contents.slice(-1)[0].Key;
      }
    } catch (e) {
      throw e;
    }
  }

  return elements;
};

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
exports.getAllFiles = getAllFiles;
