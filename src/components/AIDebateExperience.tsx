import React, { useState } from 'react';
import { X, User, Bot, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
  stage: string;
}

const AIDebateExperience: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [showNotification, setShowNotification] = useState(false);

  const debateTopic = "自嘲文化是/不是对残酷现实的消解";

  const conversation: Message[] = [
   { 
      role: 'ai', 
      content: '自嘲文化，指在压力下自我贬低以宣泄情绪、寻求共鸣的亚文化。残酷现实则指经济形势严峻、工作环境内卷、上升渠道不畅等困境下，青年处处碰壁、自信受损、话语权被剥夺、资源分配不均等问题。首先，自嘲文化易形成自甘沉沦、安于现状的社会风气，降低社会生产力与经济市场活力，加剧经济形势的严峻。自嘲导致个体主体性与积极性消解，进而产生佛系消费、工作、生活等消极态度，使经济难以焕发生机。其次，自嘲文化的热度带来跟风与模仿，转移而非真正解决问题，制造焦虑与精神内耗，加深残酷现实的漩涡。为博取流量，夸张化叙述自嘲故事，满足受众猎奇心理，使自嘲娱乐化，真正寻求安慰与共鸣者被视作娱乐，无法排解苦闷。跟风自嘲使人们过度归咎外部环境，忽视积极作用，消极应对困难与挫折。综上，我方认为自嘲文化是对残酷现实的加剧。', 
      stage: '反方开篇陈词'
    },
    { 
      role: 'user', 
      content: '请问反方，你们如何解释自嘲文化所带来的消极社会风气？当我们看到越来越多的年轻人因为自嘲而安于现状，不再追求进步，这是否在加剧我们社会的经济困境？', 
      stage: '正方质询'
    },
    { 
      role: 'ai', 
      content: '正方提到的消极社会风气确实存在，但我们认为这并非自嘲文化的本质。自嘲文化更多是一种情绪释放的方式，它帮助个体在面对压力时找到出口，恢复能量。至于年轻人安于现状，这更多是社会环境和教育制度的问题，不能简单归咎于自嘲文化。', 
      stage: '反方驳论'
    },
    { 
      role: 'user', 
      content: '那么请问反方，自嘲文化的热度是否带来了跟风与模仿？这些跟风者是否真正理解了自嘲背后的含义，还是在为了博取流量而夸张化叙述？这样的行为是否制造了更多的焦虑和精神内耗？', 
      stage: '正方质询'
    },
    { 
      role: 'ai', 
      content: '确实存在跟风与模仿的现象，但这并不能否定自嘲文化的价值。跟风者可能没有完全理解自嘲的含义，但这并不意味着自嘲文化本身就是错误的。至于制造焦虑和精神内耗，这更多是个体在面对社会压力时的反应，与自嘲文化本身无直接关联。', 
      stage: '反方驳论'
    },
    { 
      role: 'ai', 
      content: '正方一直强调自嘲文化的负面影响，但你们是否忽视了它所带来的积极面？自嘲文化让我们在面对残酷现实时有了更多的勇气去面对，去寻求解决方案。它鼓励我们保持前行的姿态，在矛盾中选择奋进。', 
      stage: '反方质询'
    },
    { 
      role: 'user', 
      content: '我并没有忽视自嘲文化的积极面，但我认为这些积极面并不能掩盖其带来的问题。自嘲文化可能让个体在面对困境时选择逃避，而不是积极寻求解决之道。它可能让人们过度归咎于外部环境，而忽视了人本身可以起到的积极作用。', 
      stage: '正方驳论'
    },
    { 
      role: 'ai', 
      content: '正方对自嘲文化的理解似乎过于片面。自嘲并不是逃避，而是一种以轻松的方式去面对困境。它让我们在保持幽默的同时，也能更加清醒地认识到问题的本质。而且，自嘲文化并不是要人们忽视外部环境的影响，而是要我们在面对困境时保持一种积极的心态。', 
      stage: '反方质询'
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
            wow！没想到你真的愿意付费体验我们的功能！感谢您的支持！我们会全力开发该功能！一旦上线，我们将立即通知您。期待为您带来更优质的体验！wow！没想到你真的愿意付费体验我们的功能！感谢您的支持！我们会全力开发该功能！一旦上线，我们将立即通知您。期待为您带来更优质的体验！
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
            <p className="text-gray-600">体验和专业级 真知-辩论AI 的模拟辩论体验，随时随地磨辩！</p>
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
