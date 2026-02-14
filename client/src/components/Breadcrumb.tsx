import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-foreground/60 py-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4" strokeWidth={1.5} />}
          {item.href ? (
            <Link href={item.href}>
              <span className="hover:text-foreground transition-colors cursor-pointer">
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="text-foreground/80 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
