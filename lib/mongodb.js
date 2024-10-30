import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://xyueli166:<lixinyue228>@cluster0.w6gwt.mongodb.net/";

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  clientPromise = client.connect().then(() => {
    console.log("Successfully connected to MongoDB!");
    return client;
  });
}

export default clientPromise;
