const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

module.exports = {
  configureDb: () => {
    const adapter = new FileSync("./data/db.json");
    const db = low(adapter);
    db.defaults({ ingredients: [], orders: [] }).write();
    return db;
  },
};
