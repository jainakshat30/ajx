import { Shield, Building } from "lucide-react";

interface WorkItemProps {
  icon: "shield" | "building";
  company: string;
  role: string;
  period: string;
  summary: string;
  logoUrl?: string;
}

export function WorkItem({ icon, company, role, period, summary, logoUrl }: WorkItemProps) {
  const IconComponent = icon === "shield" ? Shield : Building;
  
  return (
    <div className="flex items-start gap-3 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={`${company} logo`}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
            <IconComponent className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
            {company}
          </h4>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {period}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-1">
          {role}
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
}
