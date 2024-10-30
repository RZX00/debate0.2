import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    global._mongoClientPromise.then(() => {
      console.log('MongoDB 客户端在开发环境中成功连接');
    }).catch(err => {
      console.error('MongoDB 连接失败:', err);
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect().then(() => {
    console.log('MongoDB 客户端在生产环境中成功连接');
  }).catch(err => {
    console.error('MongoDB 连接失败:', err);
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { clicks } = req.body;

    try {
      const client = await clientPromise; // 使用已连接的客户端
      const db = client.db('debate20');
      const collection = db.collection('Cluster0');

      // 查找当前类型的点击记录
      let record = await collection.findOne({ type: clicks.type });

      if (record) {
        // 如果记录存在，更新点击次数
        await collection.updateOne(
          { type: clicks.type },
          { $inc: { count: clicks.count } }
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
      console.error('处理点击数据时出错:', error);
      res.status(500).json({ success: false, message: '服务器错误' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
