import React, { useState } from 'react';
import { X, User, Bot, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  stage: string;
}

const AIDebateExperience: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [showNotification, setShowNotification] = useState(false);

  const debateTopic = "影院观影时理应/无需禁止手机拍照行为";

  const conversation: Message[] = [
    { 
      role: 'user', 
      content: '我方认为，"禁止"与否的界限在于是否影响了他人的观影体验。我们不主张使用极强制性的手段和惩罚措施来管理屏摄行为，但我们也强调法律等社会规章制度是公知公权的体现，也是维护公共场所秩序的必要手段。如果一开始就从"让步"出发，将很难有效遏制屏摄等不文明行为。', 
      stage: '正方开篇陈词'
    },
    { 
      role: 'ai', 
      content: '我方认为"禁止"与否的界限应该在于是否侵犯了他人的权利和利益。因此，我们不主张使用惩罚措施来管理屏摄行为，而是倾向于通过引导和教育来提高观众的文明素养和公共意识。并且我方也尊重观众的分享和交流需求，认为应允许适度的屏摄行为。', 
      stage: '反方开篇陈词'
    },
    { 
      role: 'user', 
      content: '我方认为，电影院作为社交场景，观众在观影过程中往往会有分享和交流的需求。适度的屏摄可以满足这种需求，同时也不会对观影体验造成太大影响。因此，我们应该允许观众在不影响他人观影的前提下进行屏摄。', 
      stage: '正方驳论'
    },
    { 
      role: 'ai', 
      content: '可是我方认为，电影院是一个社交场景，观影体验是相互的。当有人因为拍照而忘记关掉闪光灯或拍照音效，这不仅影响了自己的观影体验，更严重地干扰了他人的观影。这种自私的行为违背了公共场所的基本礼仪。', 
      stage: '反方驳论'
    },
    { 
      role: 'user', 
      content: '从法律视角审视，尽管《电影产业促进法》对屏摄设定了明确的禁止条款，但法律的精髓在于平衡各方权益。影院若对屏摄采取一刀切的强硬态度，是否会对观众的正当分享意愿构成不必要的限制？如同图书馆对拍照行为的适度宽容，电影院也应考虑观众的合理需求。', 
      stage: '正方结辩'
    },
  ];

  const handleExperienceClick = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl w-full max-h-[90vh] overflow-hidden flex relative">
        {showNotification && (
          <div className="absolute top-0 left-0 right-0 bg-green-500 text-white p-4 text-center animate-fade-in-up">
            感谢您的支持！该功能正在积极开发中。一旦上线，我们将立即通知您。期待为您带来更优质的体验！
          </div>
        )}
        <div className="flex-1 pr-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">AI 磨辩</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">辩题：{debateTopic}</h3>
            <p className="text-gray-600">体验 AI 辅助下的辩论训练，提升您的辩论技巧！</p>
          </div>
          <div className="space-y-6">
            {conversation.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl shadow-md ${message.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className={`flex items-center ${message.role === 'user' ? 'justify-end' : 'justify-start'} p-3 border-b ${message.role === 'user' ? 'border-blue-100' : 'border-gray-200'}`}>
                    {message.role === 'ai' ? <Bot size={20} className="mr-2 text-gray-600" /> : <User size={20} className="ml-2 text-blue-600" />}
                    <span className="font-semibold text-gray-800">{message.role === 'user' ? '正方' : '反方'}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-800">{message.content}</p>
                  </div>
                  <div className={`text-sm ${message.role === 'user' ? 'text-blue-600' : 'text-gray-600'} p-2 text-right`}>
                    {message.stage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-72 flex flex-col justify-between border-l border-gray-200 pl-8">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">开始体验</h3>
            <div className="space-y-4">
              <button 
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                onClick={handleExperienceClick}
              >
                <MessageCircle size={20} className="mr-2" />
                支付以开始训练
              </button>
              <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors">
                取消
              </button>
            </div>
          </div>
          <div className="mt-8 bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              升级至高级计划以获得完整体验，包括个性化训练、详细反馈和进度追踪。
              <span className="block mt-2 font-semibold text-blue-600">仅需 ¥9.9/月</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDebateExperience;