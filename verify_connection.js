const mongoose = require('mongoose');

const uri = "mongodb+srv://rajivishal2020_db_user:REALME08@cluster0.dabhror.mongodb.net/production_db?retryWrites=true&w=majority";

console.log("Attempting to connect to MongoDB Atlas...");
console.log("User: rajivishal2020_db_user");
console.log("Cluster: cluster0.dabhror.mongodb.net");

mongoose.connect(uri)
    .then(() => {
        console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ ERROR: Connection failed.");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        if (err.message.includes("bad auth")) {
            console.log("\n💡 TIP: 'bad auth' means the username or password is incorrect.");
            console.log("   1. Check 'Database Access' in Atlas.");
            console.log("   2. Edit user 'rajivishal2020_db_user' -> 'Edit Password'.");
            console.log("   3. Paste 'hrJvpvlfC8s4N1g' to ensure a strict match.");
        }
        process.exit(1);
    });
