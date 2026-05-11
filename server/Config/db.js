import mongoose from "mongoose";

// Database Connection Function

const db_conn = async()=>{
try {
    const db = process.env.MONGO_URL;
    const conn = await mongoose.connect(db);
    console.log(`${conn.connection.name} Database Connected Running Success On http://${conn.connection.host}:${conn.connection.port}`)
} catch (error) {
    console.log(error.message)
}
}

export default db_conn;