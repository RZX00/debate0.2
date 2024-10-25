// api/generate-summary.js

import fetch from 'node-fetch';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Vercel 自动加载根目录的 .env 文件

// 配置 OpenAI API 客户端
const openaiClient = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY, // 将密钥存储在 Vercel 环境变量中
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { topic } = req.body;

    try {
      // 调用 Serper API 获取相关信息
      const serperResponse = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.SERPER_API_KEY, // 使用环境变量
        },
        body: JSON.stringify({ q: topic }),
      });

      if (!serperResponse.ok) {
        const errorBody = await serperResponse.json();
        throw new Error(`Serper API Error: ${serperResponse.statusText}, ${JSON.stringify(errorBody)}`);
      }

      const serperData = await serperResponse.json();

      // 使用 OpenAI API 生成事件概述
      const openaiResponse = await openaiClient.chat.completions.create({
        model: 'qwen-turbo',
        messages: [{
          role: 'user',
          content: `你是一个辩题信息整理专家，你的语言风格一针见血，独到犀利，会保留所有有价值的信息，没有废话。请你根据以下信息生成关于 "${topic}" 的详细辩论主题信息，包括背景、关键概念解释、时间线、各方观点、争议焦点、社会影响、相关案例和最新进展。请以Markdown格式输出，使用适当的标题层级和列表格式。对于引用到的相关信息，请在文本中添加角标标注，所有引用的链接需在文本最后列出.：\n${JSON.stringify(serperData)}`
        }],
      });

      const summaryText = openaiResponse.choices[0].message.content.trim();

      // 发送响应
      res.status(200).json({ markdown: summaryText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '生成事件概述失败' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
