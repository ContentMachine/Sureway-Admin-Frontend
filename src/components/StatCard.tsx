import { ChevronDown, ChevronUp } from "lucide-react";

interface StatCardProps {
  amount: string | number;
  label: string;
  icon: React.ReactNode;
  percentage: number;
}

const StatCard: React.FC<StatCardProps> = ({
  amount,
  label,
  icon,
  percentage,
}) => {
  const isPositive = percentage >= 0;

  return (
    <div className="flex items-center gap-9 justify-between bg-white rounded-sm py-4 px-8 box-shadow-2 w-full max-w-1/4">
      <div>
        <p className="text-base font-bold text-black font-sans">{amount}</p>
        <p className="text-xs text-gray-600 font-medium font-sans">{label}</p>
        <div
          className={`mt-2 text-xs font-medium flex items-center gap-1 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ChevronUp size={16} className="color-green-300" />
          ) : (
            <ChevronDown className="color-red-500" size={12} />
          )}
          {Math.abs(percentage).toFixed(2)}%
        </div>
      </div>

      {/* Right: Icon */}
      <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full text-blue-500">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
