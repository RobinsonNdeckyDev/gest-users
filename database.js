const { app } = require("electron");
const Database = require("better-sqlite3");
const path = require("path");

// Chemin vers la base de données du user
const dbPath = path.join(app.getPath("userData"), "database-test.db");
const db = new Database(dbPath);

// Fonction pour créer la table si elle n'existe pas
const createTable = () => {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS table_test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    adresse TEXT,
    profession TEXT
  )`
  ).run();
};

// Fonction pour ajouter un utilisateur
const addUser = (prenom, nom, email, adresse, profession) => {
  const stmt = db.prepare(
    `INSERT INTO table_test (prenom, nom, email, adresse, profession) VALUES (?, ?, ?, ?, ?)`
  );
  const result = stmt.run(prenom, nom, email, adresse, profession);
  return result.lastInsertRowid; // Retourne l'ID du nouvel enregistrement
};

// Fonction pour récupérer tous les utilisateurs
const getUsers = () => {
  const stmt = db.prepare(`SELECT * FROM table_test`);
  return stmt.all(); // Retourne les lignes de la table
};

// Fonction pour modifier un utilisateur
const updateUser = (id, prenom, nom, email, adresse, profession) => {
  const stmt = db.prepare(
    `UPDATE table_test SET prenom = ?, nom = ?, email = ?, adresse = ?, profession = ? WHERE id = ?`
  );
  const result = stmt.run(prenom, nom, email, adresse, profession, id);

  // Nombre de lignes modifiées
  return result.changes;
};

// Fonction pour supprimer un utilisateur
const deleteUser = (id) => {
  const stmt = db.prepare(`DELETE FROM table_test WHERE id = ?`);
  const result = stmt.run(id);

  // Nombre de lignes supprimées
  return result.changes;
};

// Appeler la fonction pour créer la table au démarrage
createTable();

module.exports = { addUser, getUsers, updateUser, deleteUser };
