const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const User = require("./models/UserModel");

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "ecommerce";

if (!MONGO_URI) {
  console.error(
    "MONGO_URI is not set. Create a .env file with MONGO_URI or set the environment variable."
  );
  process.exit(1);
}

console.log("Seed script connecting to DB:", DB_NAME);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME,
  })
  .then(async () => {
    try {
      const adminEmail = "admin@example.com";
      const existing = await User.findOne({ email: adminEmail });
      if (existing) {
        console.log("Admin user already exists:", adminEmail);
        process.exit(0);
      }

      const passwordHash = bcrypt.hashSync("123456", 10);

      const admin = await User.create({
        name: "Admin",
        email: adminEmail,
        password: passwordHash,
        phone: "1234567890",
        isAdmin: true,
      });

      console.log("Admin user created:", admin.email);
      process.exit(0);
    } catch (err) {
      console.error("Error creating admin user:", err);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
