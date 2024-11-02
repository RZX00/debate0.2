import React, { useState } from 'react';
import { X } from 'lucide-react';

interface UpgradeModalProps {
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [paymentClickCount, setPaymentClickCount] = useState(0); // 支付按钮点击次数
  const [cancelClickCount, setCancelClickCount] = useState(0);   // 取消按钮点击次数

  const handlePayment = async () => {
    const newPaymentCount = paymentClickCount + 1;
    setPaymentClickCount(newPaymentCount); // 更新支付按钮点击次数

    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      onClose(); // 关闭窗口
    }, 5000);

    console.log('即将发送的请求体:', { clicks: { count: newPaymentCount, type: 'deepsearchpayment' } });

    // 记录支付按钮点击事件
    await fetch('/api/track-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clicks: { count: newPaymentCount, type: 'deepsearchPayment' } }),
    });

  };

  const handleCancel = async () => {
    const newCancelCount = cancelClickCount + 1;
    setCancelClickCount(newCancelCount); // 更新取消按钮点击次数
    
    onClose();

    console.log('即将发送的取消请求体:', { clicks: { count: newCancelCount, type: 'deepsearchcancel' } });

    // 记录取消按钮点击事件
    await fetch('/api/track-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clicks: { count: newCancelCount, type: 'deepsearchCancel' } }),
    });


  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-900">升级高级方案</h2>
        </div>
        {!showThankYou ? (
          <>
            <p className="mb-6">升级高级方案畅享【深度搜索】功能与【AI磨辩】功能。</p>
            <p className="mb-6">深度搜索将增加学术搜索和专业数据搜索（如相关法案、实验报告、经济数据等专业数据来源），并使用【专业级辩论大模型】提供更丰富全面细致的回答。内测结束后我们将恢复原价，同时发放首批高级付费用户专属福利！</p>
             <span className="block mt-1 font-semibold text-blue-600">仅需2.69RMB/月 or 0.1RMB/3次深度搜索</span>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                支付以体验
              </button>
            </div>
          </>
        ) : (
       <div>
          <p className="text-green-600 font-semibold">
            wow！没想到你真的愿意付费体验我们的功能！感谢您的支持！我们会全力开发该功能！一旦上线，我们将立即通知您。期待为您带来更优质的体验！</p>
            <p className="text-green-600 font-semibold">
            为表歉意，在该功能正式上线后，您将拥有内测用户专属的免费使用权！再次感谢您的支持!
          </p>
         </div>
        )}
      </div>
    </div>
  );
};

export default UpgradeModal;
