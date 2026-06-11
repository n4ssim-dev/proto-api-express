const sqlite3 = require("sqlite3")
const pah = require("path")

exports.connectDb = (req,res) => {
    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });
    
}