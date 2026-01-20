import { ExternalLink } from "lucide-react";

interface ProjectLink {
  label: string;
  href: string;
}

interface ProjectListItemProps {
  title: string;
  links: ProjectLink[];
  bullets: string[];
  tags: string[];
}

export function ProjectListItem({ title, links, bullets, tags }: ProjectListItemProps) {
  return (
    <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
          {title}
        </h4>
        <div className="flex gap-2 ml-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
            >
              {link.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </div>
      
      <ul className="space-y-1 mb-3">
        {bullets.map((bullet, index) => (
          <li key={index} className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            • {bullet}
          </li>
        ))}
      </ul>
      
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
