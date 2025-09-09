interface AchievementItemProps {
  title: string;
  date: string;
  description: string;
}

export function AchievementItem({ title, date, description }: AchievementItemProps) {
  return (
    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-1">
        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
          {title}
        </h4>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-4 flex-shrink-0">
          {date}
        </span>
      </div>
      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
