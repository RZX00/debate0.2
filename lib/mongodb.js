const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // 确保在使用前安装 dotenv

const uri = "mongodb+srv://xyueli166:<db_password>@cluster0.w6gwt.mongodb.net/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("debate20").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
