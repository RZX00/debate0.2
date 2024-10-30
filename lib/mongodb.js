import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // 在开发环境中使用全局变量来避免热重载时创建多个连接
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 在生产环境中创建新的连接
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { clicks } = req.body; // 获取请求体中的点击数据

    try {
      const client = await clientPromise;
      const db = client.db('debate20'); 
      const collection = db.collection('Cluster0'); 
      // 查找当前类型的点击记录
      let record = await collection.findOne({ type: clicks.type });

      if (record) {
        // 如果记录存在，更新点击次数
        await collection.updateOne(
          { type: clicks.type },
          { $inc: { count: clicks.count } } // 累加点击次数
        );
      } else {
        // 如果记录不存在，创建新的记录
        await collection.insertOne({
          type: clicks.type,
          count: clicks.count,
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: '服务器错误' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
