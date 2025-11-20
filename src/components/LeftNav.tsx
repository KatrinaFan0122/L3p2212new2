import { FileText, User, Target, Briefcase, DollarSign, Users, TrendingUp } from 'lucide-react';

interface LeftNavProps {
  currentModule: string;
}

export function LeftNav({ currentModule }: LeftNavProps) {
  const modules = [
    { id: 'person', label: '人', icon: User, color: 'text-purple-600' },
    { id: 'entrepreneurial-path', label: '创业路径', icon: Target, color: 'text-blue-600' },
    { id: 'products-services', label: '产品与服务', icon: Briefcase, color: 'text-green-600', active: true },
    { id: 'business-model', label: '商业模式', icon: DollarSign, color: 'text-yellow-600' },
    { id: 'market-customers', label: '市场与客户', icon: Users, color: 'text-red-600' },
    { id: 'financials', label: '财务规划', icon: TrendingUp, color: 'text-indigo-600' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FileText className="w-8 h-8 text-blue-600" />
          <div>
            <div className="text-lg text-gray-900">BizFile</div>
            <div className="text-xs text-gray-500">商业规划工作区</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = module.id === currentModule;
          
          return (
            <button
              key={module.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : module.color}`} />
              <span className="text-sm">{module.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <div className="text-sm text-gray-900">创业者</div>
            <div className="text-xs text-gray-500">我的项目</div>
          </div>
        </div>
      </div>
    </div>
  );
}
