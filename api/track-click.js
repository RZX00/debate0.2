import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: '请求方法不允许',
      message: `不支持 ${req.method} 方法` 
    });
  }

  try {
    console.log('接收到的请求数据:', req.body);

    const { clicks } = req.body;
    const clickCount = clicks.count;

    // 验证点击数据
    if (!clicks || typeof clicks !== 'object' || typeof clicks.count !== 'number') {
      return res.status(400).json({ 
        error: '数据格式错误',
        message: '缺少点击数据或格式不正确' 
      });
    }
    

    // 连接数据库
    const client = await clientPromise;
    if(!client){
      throw new Error('未能获取到 MongoClient 示例');
    }
    const db = client.db('debate20');
    const collection = db.collection('Cluster0');

    // 准备要存储的数据
    const clickData = {
      count: clickCount,
      timestamp: new Date(),
      createdAt: new Date().toISOString()
    };

    // 存储数据
    const result = await collection.insertOne(clickData);

    if (!result.insertedId) {
      throw new Error('数据存储失败');
    }

    // 返回成功响应
    return res.status(200).json({ 
      success: true,
      message: '点击记录已成功保存',
      id: result.insertedId,
      timestamp: clickData.timestamp
    });

  } catch (error) {
    // 错误日志记录
    console.error('点击追踪错误:', error);
    
    // 返回错误响应
    return res.status(500).json({ 
      error: '服务器内部错误',
      message: error.message
    });
  }
}
