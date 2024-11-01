import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 设置服务器选择超时
  socketTimeoutMS: 45000, // 设置套接字超时
};

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .then(() => {
        console.log('MongoDB 客户端在开发环境中成功连接');
        return client; // 返回客户端实例
      })
      .catch(err => {
        console.error('MongoDB 连接失败:', err);
        throw err; // 确保错误被抛出
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(() => {
      console.log('MongoDB 客户端在生产环境中成功连接');
      return client; // 返回客户端实例
    })
    .catch(err => {
      console.error('MongoDB 连接失败:', err);
      throw err; // 确保错误被抛出
    });
}

export default clientPromise; // 只导出 clientPromise
