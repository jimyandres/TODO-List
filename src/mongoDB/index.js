let appId = "<your-app-id>"; // The appId from the stitch app Clients tab

if (process.env.REACT_APP_ID) {
  appId = process.env.REACT_APP_ID;
}

let mongodbService = "mongodb-atlas";
if (process.env.REACT_APP_MONGODB_SERVICE) {
  mongodbService = process.env.REACT_APP_MONGODB_SERVICE;
}

let options = {};
if (process.env.STITCH_URL) {
  options.baseUrl = process.env.EACT_APP_STITCH_URL;
}

export {
  appId,
  mongodbService,
  options,
};
