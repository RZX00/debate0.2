// 导入必要的模块
import express from 'express';
import fetch from 'node-fetch';
import { OpenAI } from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config({path: 'C:/Users/27977/Desktop/project-root/debate-platform-backend/.env'});

// 创建 Express 应用
const app = express();
app.use(express.json());
app.use(cors());

// 配置 OpenAI API 客户端
const openaiClient = new OpenAI({
  apiKey: 'sk-ce4a31cda44f4f919d4828024217a5ca',
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

// API 路由：处理前端发送的辩题
app.post('/api/generate-summary', async (req, res) => {
  const { topic } = req.body;

  try {
    // 调用 Serper API 获取相关信息
    const serperResponse = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'f1f626eae8b24db4d999ea049e1b1584e13b5b59',
      },
      body: JSON.stringify({ q: topic }),
    });

    // 检查 Serper API 响应是否成功
    if (!serperResponse.ok) {
      const errorBody = await serperResponse.json();
      throw new Error(`Serper API Error: ${serperResponse.statusText}, ${JSON.stringify(errorBody)}`);
    }

    const serperData = await serperResponse.json();

    // 使用 OpenAI API 生成事件概述
    const openaiResponse = await openaiClient.chat.completions.create({
      model: 'qwen-plus-0919',
      messages: [{
        role: 'user',
        content: `你是一个辩题信息整理专家，你的语言风格一针见血，独到犀利，会保留所有有价值的信息，没有废话。请你根据以下信息生成关于 "${topic}" 的详细辩论主题信息，包括背景、关键概念解释、时间线、各方观点、争议焦点、社会影响、相关案例和最新进展。请以Markdown格式输出，使用适当的标题层级和列表格式。对于引用到的相关信息，请在文本中添加角标标注，所有引用的链接需在文本最后列出.：\n${JSON.stringify(serperData)}`
      }],
    });

    // 获取 OpenAI 返回的消息内容
    const summaryText = openaiResponse.choices[0].message.content.trim();
    
    // 发送响应
    res.json({ markdown: summaryText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '生成事件概述失败' });
  }
});

// 设置服务器端口并启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});