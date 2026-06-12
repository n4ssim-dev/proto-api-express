const sqlite3 = require("sqlite3")
const path = require("path")

exports.connectDb = () => {
    return new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Connection avec succès à la base de données SQLite.");
        }
    });
}