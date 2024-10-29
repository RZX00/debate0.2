// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://xyueli166:<db_password>@cluster0.w6gwt.mongodb.net/"; // 从环境变量获取连接字符串
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

// 在开发模式下使用全局变量，以避免重复连接
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 在生产环境下每次请求都创建新的连接
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
