const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // connection string to mongodb
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected on: ${connect.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;