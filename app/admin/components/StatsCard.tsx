import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  bgColor: string;
}

export default function StatsCard({ title, value, change, icon: Icon, bgColor }: StatsCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center space-x-1 text-green-400 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
