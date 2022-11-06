const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');

// This will create an new instance of "MongoMemoryServer" and automatically start it







module.exports.connect = async () => {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();
    // const uri = await mongod.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        
        
        
    };

    await mongoose.connect(uri, mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    const mongod = await MongoMemoryServer.create();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}