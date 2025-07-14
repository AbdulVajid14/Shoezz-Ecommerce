// Notification.js
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';

const Notification = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  };

  const icon = {
    success: <FiCheck className="text-green-500" />,
    error: <FiAlertTriangle className="text-red-500" />,
    info: <FiAlertTriangle className="text-blue-500" />
  };

  return (
    <div className={`fixed top-4 right-4 border-l-4 rounded-lg shadow-lg p-4 max-w-sm ${bgColor[type]}`}>
      <div className="flex items-center">
        <div className="mr-3">
          {icon[type]}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;