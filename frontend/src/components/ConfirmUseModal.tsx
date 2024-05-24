import React from 'react';

interface ConfirmUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string
}

const ConfirmUseModal: React.FC<ConfirmUseModalProps> = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h4 className="text-lg font-bold mb-4">{title}</h4>
        <div className="flex justify-center gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUseModal;
