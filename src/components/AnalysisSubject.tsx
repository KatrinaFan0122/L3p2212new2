import { useState } from 'react';
import { Edit2, Check, AlertCircle } from 'lucide-react';

interface AnalysisSubjectProps {
  content: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (value: string) => void;
  onConfirm: () => void;
}

export function AnalysisSubject({ content, isEditing, onEdit, onSave, onConfirm }: AnalysisSubjectProps) {
  const [editValue, setEditValue] = useState(content);

  const handleSave = () => {
    onSave(editValue);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-gray-900">产品描述</h3>
            <span className="text-gray-500" style={{ fontSize: '12px' }}>（此定义将作为后续所有模块的核心线索）</span>
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full min-h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontSize: '14px', lineHeight: '1.6' }}
                placeholder="输入分析主体描述..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  保存
                </button>
                <button
                  onClick={() => {
                    setEditValue(content);
                    onSave(content);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-800 leading-relaxed">{content}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-white transition-colors"
                  style={{ fontSize: '13px' }}
                >
                  <Edit2 className="w-4 h-4" />
                  编辑
                </button>
                <button
                  onClick={onConfirm}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  style={{ fontSize: '13px', fontWeight: 500 }}
                >
                  <Check className="w-4 h-4" />
                  确认并继续
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0">
          <div className="flex items-start gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-lg" style={{ fontSize: '13px' }}>
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <div>
              <div style={{ fontWeight: 500 }}>重要</div>
              <div style={{ fontSize: '12px' }}>将关联后续模块</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}