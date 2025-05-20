const { JSONFile, Low } = require('lowdb');
const path = require('path');

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Inicializa o banco
async function initDB() {
  await db.read();
  db.data ||= { animes: [] };
  await db.write();
}

initDB();

module.exports = db;
