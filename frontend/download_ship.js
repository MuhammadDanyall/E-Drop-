const https = require('https');
const fs = require('fs');

// Real, beautiful cargo ship on the ocean from Unsplash
const url = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
const file = fs.createWriteStream("d:/E Drooop - Copy/pictures/sea_ship.jpg");

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
  if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      // follow redirect
      https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(res2) {
          res2.pipe(file);
          file.on("finish", () => { file.close(); console.log("Downloaded successfully (redirect)."); });
      });
  } else {
      response.pipe(file);
      file.on("finish", () => {
          file.close();
          console.log("Downloaded successfully.");
      });
  }
}).on('error', (err) => {
  fs.unlink("d:/E Drooop - Copy/pictures/sea_ship.jpg", () => {});
  console.error("Error: ", err.message);
});
