import { ChevronRight, HelpCircle, FileText } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h5 className="text-gray-900">BizFile</h5>
          </div>
          <div className="h-5 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600" style={{ fontSize: '13px' }}>「事」商业价值设计</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-900" style={{ fontSize: '13px', fontWeight: 500 }}>产品与服务</span>
          </div>
        </div>
        
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors" style={{ fontSize: '13px' }}>
          <HelpCircle className="w-4 h-4" />
          <span>帮助</span>
        </button>
      </div>
    </div>
  );
}
