import React, { useState, useEffect } from 'react';

const LoadingAnimation: React.FC = () => {
  const [loadingText, setLoadingText] = useState('正在链接服务器...');

  useEffect(() => {
    const texts = [
      '正在链接服务器...',
      '准备数据中，请稍候...',
      '获取最新数据...',
      '正在提取信息...',
      '过滤无关数据...',
      '重组数据信息...',
      '生成搜索结果...',
      '优化结果显示...',
      '正在处理洞察...',
      '正在生成结果...',
      '几乎完成，请稍候...'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < texts.length - 1) {
        setLoadingText(texts[index]);
        index++;
      } else {
        setLoadingText(texts[index]);
        clearInterval(interval);
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset="283"
            className="animate-dash"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-xl font-medium text-gray-800 mb-2">{loadingText}</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
