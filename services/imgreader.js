import fs from 'fs'
function readdirAsync(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    });
}
export default {
    readdirAsync
}