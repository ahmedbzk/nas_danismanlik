const ftp = require("basic-ftp");
require("dotenv").config();
const path = require("path");
const fs   = require("fs");

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {

        // ── 1. db.php — Veritabanı şifrelerini .env'den enjekte et ────────────
        console.log("Injecting DB credentials into db.php...");
        const dbPath = path.join(__dirname, "dist", "browser", "assets", "api", "db.php");
        let dbContent = fs.readFileSync(dbPath, "utf8");
        dbContent = dbContent.replace('$db_user = "root";',   `$db_user = "${process.env.PROD_DB_USER}";`);
        dbContent = dbContent.replace('$db_pass = "";',        `$db_pass = "${process.env.PROD_DB_PASS}";`);
        dbContent = dbContent.replace('$db_name = "nas_db";', `$db_name = "${process.env.PROD_DB_NAME}";`);
        fs.writeFileSync(dbPath, dbContent);
        console.log("  ✔ db.php updated.");

        // ── 2. contact.php — SMTP & mail adreslerini .env'den enjekte et ──────
        console.log("Injecting SMTP credentials into contact.php...");
        const contactPath = path.join(__dirname, "dist", "browser", "assets", "api", "contact.php");
        let contactContent = fs.readFileSync(contactPath, "utf8");
        contactContent = contactContent.replace(/\*\*SMTP_USER\*\*/g,     process.env.SMTP_USER);
        contactContent = contactContent.replace(/\*\*SMTP_PASSWORD\*\*/g, process.env.SMTP_PASSWORD);
        contactContent = contactContent.replace(/\*\*MAIL_FROM\*\*/g,     process.env.MAIL_FROM);
        contactContent = contactContent.replace(/\*\*MAIL_TO\*\*/g,       process.env.MAIL_TO);
        fs.writeFileSync(contactPath, contactContent);
        console.log("  ✔ contact.php updated.");

        // ── 3. FTP'ye yükle ───────────────────────────────────────────────────
        console.log("Connecting to FTP...");
        await client.access({
            host:     process.env.FTP_HOST,
            user:     process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            port:     parseInt(process.env.FTP_PORT || "21")
        });
        console.log("Connected successfully.");

        console.log("Uploading files to " + process.env.FTP_REMOTE_DIR);
        await client.ensureDir(process.env.FTP_REMOTE_DIR);
        await client.uploadFromDir(path.join(__dirname, "dist", "browser"));

        console.log("Deployment finished successfully!");
    } catch(err) {
        console.error("Deploy Error: ", err);
        process.exit(1);
    }
    client.close();
}

deploy();
