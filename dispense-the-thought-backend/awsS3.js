const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

const upload = (file) => {
  const params = {
    Bucket: bucketName,
    Body: file,
    Key: file.filename,
  };

  return s3.upload(params).promise();
};

exports.upload = upload;
