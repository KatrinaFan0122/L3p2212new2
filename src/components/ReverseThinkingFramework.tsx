import { FrameworkColumn } from './FrameworkColumn';
import { ArrowLeft } from 'lucide-react';
import { FrameworkData } from '../App';

interface ReverseThinkingFrameworkProps {
  data: FrameworkData;
  highlightedField: string | null;
  onFieldUpdate: (category: keyof FrameworkData, index: number, value: string) => void;
  onRequestSuggestions: (category: keyof FrameworkData, index: number) => void;
}

export function ReverseThinkingFramework({
  data,
  highlightedField,
  onFieldUpdate,
  onRequestSuggestions
}: ReverseThinkingFrameworkProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">倒推思考框架</h2>
        <p className="text-gray-600" style={{ fontSize: '13px' }}>
          从右到左思考：核心竞争力 ← 战略资产 ← 客户获益<br />
          任何产品都要解决客户的真实需求，而非自嗨式的展示能力。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 relative">
        {/* Arrow indicators */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-12">
            <ArrowLeft className="w-8 h-8 text-gray-300" />
            <ArrowLeft className="w-8 h-8 text-gray-300" />
          </div>
        </div>

        {/* Core Competencies - Rightmost */}
        <FrameworkColumn
          title="核心竞争力"
          subtitle="Core Competencies"
          description="一种多职能组合的技能，能够带来可持续的竞争优势。这是结合你的特质和创业策略进行的核心竞争力分析。"
          items={data.coreCompetencies}
          count={1}
          color="purple"
          isHighlighted={highlightedField === 'coreCompetencies'}
          onUpdate={(index, value) => onFieldUpdate('coreCompetencies', index, value)}
          onRequestSuggestions={(index) => onRequestSuggestions('coreCompetencies', index)}
          aiNote="这是结合你的特质和创业策略进行的核心竞争力分析，你看符合你的认知么？不符合的话，我们可以再聊聊看。"
        />

        {/* Strategic Assets - Middle */}
        <FrameworkColumn
          title="战略资产"
          subtitle="Strategic Assets"
          description="支撑上述客户收益的，是哪 3-5 项你拥有的关键战略资产（有形与无形）。"
          items={data.strategicAssets}
          count={5}
          color="blue"
          isHighlighted={highlightedField === 'strategicAssets'}
          onUpdate={(index, value) => onFieldUpdate('strategicAssets', index, value)}
          onRequestSuggestions={(index) => onRequestSuggestions('strategicAssets', index)}
        />

        {/* Customer Benefits - Leftmost */}
        <FrameworkColumn
          title="客户获益"
          subtitle="Customer Benefits"
          description="为什么客户会选择你（而不是其他竞争对手）？请列出你具体差异化的 1-2 个客户价值点。"
          items={data.customerBenefits}
          count={2}
          color="green"
          isHighlighted={highlightedField === 'customerBenefits'}
          onUpdate={(index, value) => onFieldUpdate('customerBenefits', index, value)}
          onRequestSuggestions={(index) => onRequestSuggestions('customerBenefits', index)}
        />
      </div>
    </div>
  );
}