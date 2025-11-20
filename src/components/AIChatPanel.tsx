import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatPanelProps {
  currentPage: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AIChatPanel({ currentPage, isOpen, onToggle }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '你好！我是 Co-Fo，你的商业规划助手。让我们一起定义你的核心产品与服务。我已经根据你之前填写的创业路径信息，生成了一份初步草案。',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'ai',
      content: '我们将采用"倒推思考"的方式：从你想为客户提供的核心价值（客户获益）开始，向后推导支撑这些价值的战略资产，最终总结出你的核心竞争力。',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentPage === 'linkage') {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai',
        content: '我已根据你修改的"客户获益"，调整了下游的"战略资产"建议。你可以查看框架中高亮显示的更新内容。',
        timestamp: new Date()
      }]);
    } else if (currentPage === 'completed') {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai',
        content: '太棒了！🎉 你已经完成了产品与服务的核心框架。我已经为你生成了"分析主体"的总结描述，这将作为后续所有模块分析的核心线索。请仔细审核，如需修改可以点击编辑按钮。',
        timestamp: new Date()
      }]);
    } else if (currentPage === 'final') {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai',
        content: '完美！你的产品与服务定义已经确认完成。接下来，我们可以继续构建商业模式，或者你也可以随时回来修改这个模块的内容。',
        timestamp: new Date()
      }]);
    }
  }, [currentPage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '好的，我理解你的想法。让我根据你的反馈调整框架内容...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={onToggle}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group z-50"
          >
            <Sparkles className="w-7 h-7 text-white" />
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">3</span>
            </div>
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ fontSize: '13px' }}>
              Co-Fo AI 助手
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 flex flex-col shadow-2xl z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="text-gray-900">Co-Fo AI</h5>
                    <p className="text-gray-500" style={{ fontSize: '12px' }}>商业规划助手 • 在线</p>
                  </div>
                </div>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{message.content}</p>
                    <p
                      className={`mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                      style={{ fontSize: '11px' }}
                    >
                      {message.timestamp.toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <p className="text-gray-600 mb-2" style={{ fontSize: '12px', fontWeight: 500 }}>快速操作：</p>
              <div className="space-y-1">
                <button className="w-full text-left text-blue-600 hover:text-blue-700 px-2 py-1.5 rounded hover:bg-blue-50 transition-colors" style={{ fontSize: '12px' }}>
                  💡 为"客户获益"提供更多选项
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-700 px-2 py-1.5 rounded hover:bg-blue-50 transition-colors" style={{ fontSize: '12px' }}>
                  🎯 分析我的核心竞争力
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-700 px-2 py-1.5 rounded hover:bg-blue-50 transition-colors" style={{ fontSize: '12px' }}>
                  📊 查看行业案例参考
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="与 Co-Fo 对话..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ fontSize: '14px' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`p-2 rounded-lg transition-colors ${
                    inputValue.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
