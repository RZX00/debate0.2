import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import DebateTopicForm from './components/DebateTopicForm';
import DebateTopicInfo from './components/DebateTopicInfo';
import LoadingAnimation from './components/LoadingAnimation';
import UpgradeModal from './components/UpgradeModal';
import { DebateTopicData } from './types';
import { ArrowLeft, Search } from 'lucide-react';

function App() {
  const [topicInfo, setTopicInfo] = useState<DebateTopicData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchMode, setSearchMode] = useState<'simple' | 'deep'>('simple');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleTopicSubmit = async (topic: string) => {
    setIsLoading(true);
    setShowResults(false);
    setTopicInfo(null);

    try {
      const response = await fetch(
        '/api/generate-summary',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ topic, mode: searchMode }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data: DebateTopicData = await response.json();
      setTopicInfo(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching summary:', error);
      // You might want to add some error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchModeChange = (mode: 'simple' | 'deep') => {
    if (mode === 'deep') {
      setShowUpgradeModal(true);
    } else {
      setSearchMode(mode);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-4 font-sans text-gray-900">
            <header className="w-full max-w-4xl mb-12 text-center pt-16 pb-8 relative">
              <Link to="/" className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors">
                <ArrowLeft size={24} />
                <span className="ml-2">返回主页</span>
              </Link>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                辩题信息检索
              </h1>
              <p className="text-xl text-gray-600">
                获取系统化的辩论主题信息
              </p>
            </header>
            <main className="w-full max-w-3xl">
              <div className="bg-white shadow-md rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <Search className="mr-2 text-blue-500" size={24} />
                    搜索模式
                  </h2>
                  <div className="flex space-x-4">
                    <button
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        searchMode === 'simple'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleSearchModeChange('simple')}
                    >
                      简洁搜索
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        searchMode === 'deep'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleSearchModeChange('deep')}
                    >
                      深度搜索
                    </button>
                  </div>
                </div>
                <DebateTopicForm 
                  onSubmit={handleTopicSubmit} 
                  isLoading={isLoading}
                />
              </div>
              {isLoading && <LoadingAnimation />}
              {!isLoading && showResults && topicInfo && (
                <DebateTopicInfo data={topicInfo} />
              )}
            </main>
            <footer className="mt-16 text-center text-gray-500">
              <p>产品内测中，所有搜索结果将不会被保存，敬请谅解</p>
              <p>反馈/联系我们：Rightzerox@outlook.com</p>
            </footer>
          </div>
        } />
      </Routes>
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </Router>
  );
}

export default App;