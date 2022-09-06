const basePath = process.cwd();
const { exportMetadatas, addImageURI} = require(`${basePath}/src/main.js`);

(async () => {
   await addImageURI();
   await exportMetadatas();
})();