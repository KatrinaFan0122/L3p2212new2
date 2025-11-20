import { Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FrameworkColumnProps {
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  count: number;
  color: 'purple' | 'blue' | 'green';
  isHighlighted: boolean;
  onUpdate: (index: number, value: string) => void;
  onRequestSuggestions: (index: number) => void;
  aiNote?: string;
}

const colorClasses = {
  purple: {
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-700',
    button: 'text-purple-600 hover:bg-purple-50',
    highlight: 'ring-2 ring-purple-400'
  },
  blue: {
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-700',
    button: 'text-blue-600 hover:bg-blue-50',
    highlight: 'ring-2 ring-blue-400'
  },
  green: {
    border: 'border-green-200',
    bg: 'bg-green-50',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-700',
    button: 'text-green-600 hover:bg-green-50',
    highlight: 'ring-2 ring-green-400'
  }
};

export function FrameworkColumn({
  title,
  subtitle,
  description,
  items,
  count,
  color,
  isHighlighted,
  onUpdate,
  onRequestSuggestions,
  aiNote
}: FrameworkColumnProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      className={`border ${colors.border} rounded-lg p-5 relative ${
        isHighlighted ? colors.highlight : ''
      }`}
      animate={isHighlighted ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Updated Badge */}
      {isHighlighted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute -top-2.5 right-4 ${colors.badge} px-2.5 py-1 rounded-full flex items-center gap-1`}
          style={{ fontSize: '12px', fontWeight: 500 }}
        >
          <Sparkles className="w-3 h-3" />
          Co-Fo 已更新
        </motion.div>
      )}

      {/* Header */}
      <div className={`${colors.bg} rounded-lg p-4 mb-4`}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className={`${colors.text} mb-1`}>{title}</h3>
            <p className="text-gray-600" style={{ fontSize: '12px' }}>{subtitle}</p>
          </div>
          <span className={`${colors.badge} px-2 py-0.5 rounded`} style={{ fontSize: '12px' }}>
            Top {count}
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed" style={{ fontSize: '13px' }}>{description}</p>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-gray-600" style={{ fontSize: '12px', fontWeight: 500 }}>
                {title} {index + 1}
              </label>
              <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded" style={{ fontSize: '11px' }}>
                AI草案
              </span>
            </div>
            <textarea
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              className="w-full min-h-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              style={{ fontSize: '14px', lineHeight: '1.6' }}
              placeholder={`输入${title} ${index + 1}...`}
            />
            <button
              onClick={() => onRequestSuggestions(index)}
              className={`flex items-center gap-1.5 px-3 py-1.5 ${colors.button} border border-gray-300 rounded-lg transition-colors`}
              style={{ fontSize: '12px' }}
            >
              <Sparkles className="w-3 h-3" />
              让Co-Fo提供建议/选项
            </button>
          </div>
        ))}
      </div>

      {/* AI Note */}
      {aiNote && (
        <div className="mt-4 flex items-start gap-2 text-gray-600 bg-amber-50 border border-amber-200 rounded-lg p-3" style={{ fontSize: '12px', lineHeight: '1.5' }}>
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>{aiNote}</p>
        </div>
      )}
    </motion.div>
  );
}
