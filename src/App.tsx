import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { AnalysisSubject } from './components/AnalysisSubject';
import { ReverseThinkingFramework } from './components/ReverseThinkingFramework';
import { AIChatPanel } from './components/AIChatPanel';

export interface FrameworkData {
  customerBenefits: string[];
  strategicAssets: string[];
  coreCompetencies: string[];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'initial' | 'editing' | 'linkage' | 'completed' | 'final'>('initial');
  const [analysisSubject, setAnalysisSubject] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [frameworkData, setFrameworkData] = useState<FrameworkData>({
    customerBenefits: [
      'AI驱动的个性化商业规划，让每个创业者都能获得专属的战略咨询',
      '实时协同与知识沉淀，让商业思考过程可视化、可复用'
    ],
    strategicAssets: [
      'Co-Fo AI 引擎：深度理解商业逻辑的人工智能系统',
      '结构化商业框架库：经过验证的战略分析模型',
      '用户数据与行为洞察：持续优化的智能推荐系统',
      '协同工作流技术：实时多人协作基础设施',
      '知识图谱与案例库：行业最佳实践数据库'
    ],
    coreCompetencies: [
      '将复杂商业战略咨询转化为智能化、可规模化产品的能力——结合AI技术、商业洞察、用户体验设计的跨领域整合能力'
    ]
  });

  const handleFieldUpdate = (category: keyof FrameworkData, index: number, value: string) => {
    setFrameworkData(prev => {
      const newData = { ...prev };
      newData[category][index] = value;
      return newData;
    });
    
    // Simulate AI linkage update
    if (category === 'customerBenefits') {
      setHighlightedField('strategicAssets');
      setTimeout(() => setHighlightedField(null), 3000);
    } else if (category === 'strategicAssets') {
      setHighlightedField('coreCompetencies');
      setTimeout(() => setHighlightedField(null), 3000);
    }
  };

  const handleComplete = () => {
    const subject = `基于AI的个性化商业规划SaaS平台——通过Co-Fo智能助手，为创业者提供结构化战略分析、实时协同工作区和知识沉淀工具，将传统咨询服务转化为可规模化的数字产品`;
    setAnalysisSubject(subject);
    setCurrentPage('completed');
  };

  const handleConfirmAnalysis = () => {
    setCurrentPage('final');
    setIsEditing(false);
  };

  const isComplete = frameworkData.customerBenefits.every(b => b.trim()) &&
                     frameworkData.strategicAssets.every(a => a.trim()) &&
                     frameworkData.coreCompetencies.every(c => c.trim());

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <TopBar />
      
      <div className="flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <div className="h-full overflow-y-auto">
          <div className={`mx-auto px-6 py-8 transition-all duration-300 ${
            isChatOpen ? 'max-w-5xl' : 'max-w-7xl'
          }`}>
            {/* Co-Fo Guidance */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0" style={{ fontSize: '13px', fontWeight: 600 }}>
                  <span className="text-white">Co</span>
                </div>
                <div>
                  <p className="text-gray-800 leading-relaxed">
                    让我们从<strong>客户获益</strong>开始，倒推你的<strong>核心竞争力</strong>，定义你的核心产品与服务。
                  </p>
                  <p className="text-gray-600 mt-2 leading-relaxed" style={{ fontSize: '13px' }}>
                    我已经根据你之前的输入生成了初步草案，你可以直接修改，或点击"让Co-Fo提供建议"获取更多选项。
                  </p>
                </div>
              </div>
            </div>

            {/* Analysis Subject */}
            {(currentPage === 'completed' || currentPage === 'final') && (
              <div className="mb-6">
                <AnalysisSubject
                  content={analysisSubject}
                  isEditing={isEditing}
                  onEdit={() => setIsEditing(true)}
                  onSave={(value) => {
                    setAnalysisSubject(value);
                    setIsEditing(false);
                  }}
                  onConfirm={handleConfirmAnalysis}
                />
              </div>
            )}

            {/* Reverse Thinking Framework */}
            <div className="mb-6">
              <ReverseThinkingFramework
                data={frameworkData}
                highlightedField={highlightedField}
                onFieldUpdate={handleFieldUpdate}
                onRequestSuggestions={(category, index) => {
                  setCurrentPage('linkage');
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                className={`px-6 py-2.5 rounded-lg transition-colors ${
                  isComplete && currentPage !== 'final'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                style={{ fontSize: '14px', fontWeight: 500 }}
                disabled={!isComplete || currentPage === 'final'}
                onClick={handleComplete}
              >
                {currentPage === 'final' ? '已完成' : '标记完成'}
              </button>
            </div>
          </div>
        </div>

        {/* AI Chat Panel */}
        <AIChatPanel 
          currentPage={currentPage} 
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
    </div>
  );
}
