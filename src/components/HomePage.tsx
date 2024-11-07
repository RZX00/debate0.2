import React, { useState } from 'react';
import { Search, Zap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIDebateExperience from './AIDebateExperience';

const HomePage: React.FC = () => {
  const [showAIExperience, setShowAIExperience] = useState(false);

  const hotTopics = [
    "姜萍事件：网络舆论，真理的引路人还是迷路人？",
    "暧昧/暗恋，哪种关系更美妙？",
    "如果你吃到了黄磊没做熟的豆角、你会/不会说出来？",
    "视频平台应不应该偷偷降低视频画质？",
    "电子游戏应不应该被视为正式的体育运动？",
    "原生家庭批判让年轻人更幸福/更不幸福"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4 font-sans text-gray-900">
      <header className="w-full max-w-4xl mb-12 text-center pt-16 pb-8">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          真知 AI 辩论
        </h1>
        <p className="text-xl text-gray-600">
          思辨得真知！
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <div className="bg-white shadow-md rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Search className="mr-2 text-blue-500" size={24} />
              辩题信息检索
            </h2>
            <Link to="/search" className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-600 transition-all duration-300">
              开始检索
            </Link>
          </div>
          <p className="mb-6 text-gray-600">获取系统化的辩论主题信息，深入了解辩题背景、关键概念、各方观点、争议核心等系统化的辩题信息。</p>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              热门搜索
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hotTopics.map((topic, index) => (
                <li key={index}>
                  <Link 
                    to={`/search?topic=${encodeURIComponent(topic)}`}
                    className="flex items-center justify-between bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 p-3 rounded-lg group"
                  >
                    <span>{topic}</span>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-900">
            <Zap className="mr-2 text-blue-500" size={24} />
            AI 磨辩
          </h2>
          <p className="mb-4 text-gray-600">随时随地开启磨辩！任一环节，立论、质询、接质、对辩、结辩？应有尽有，供你选择！</p>
          <button 
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-600 transition-all duration-300"
            onClick={() => setShowAIExperience(true)}
          >
            体验
          </button>
          <p className="mt-4 text-sm text-gray-500"></p>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-500">
        <p>产品内测中，所有搜索结果将不会被保存，敬请谅解</p>
        <p>反馈/联系我们：Rightzerox@outlook.com</p>
      </footer>

      {showAIExperience && (
        <AIDebateExperience onClose={() => setShowAIExperience(false)} />
      )}
    </div>
  );
};

export default HomePage;
