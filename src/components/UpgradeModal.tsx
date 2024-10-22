import React, { useState } from 'react';
import { X } from 'lucide-react';

interface UpgradeModalProps {
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
  const [showThankYou, setShowThankYou] = useState(false);

  const handlePayment = () => {
    setShowThankYou(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-900">升级高级方案</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {!showThankYou ? (
          <>
            <p className="mb-6">升级高级方案以体验深度搜索功能（9.9元/月）</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                支付
              </button>
            </div>
          </>
        ) : (
          <p className="text-green-600 font-semibold">
            感谢您的支持！该功能正在积极开发中。一旦上线，我们将立即通知您。期待为您带来更优质的体验！
          </p>
        )}
      </div>
    </div>
  );
};

export default UpgradeModal;