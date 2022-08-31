const basePath = process.cwd();
const { exportMetadatas } = require(`${basePath}/src/main.js`);

(async () => {
  await exportMetadatas();
})();