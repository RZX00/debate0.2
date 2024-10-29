// pages/api/track-click.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { clicks } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('debate20'); 
      const collection = db.collection('Cluster0'); 

      // 插入点击记录
      await collection.insertOne({ clicks, timestamp: new Date() });

      res.status(200).json({ message: '点击记录已保存' });
    } catch (error) {
      res.status(500).json({ error: '数据库错误' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
