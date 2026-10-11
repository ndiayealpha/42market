import { Icon, type IconName } from "@/src/components/atoms/Icon/Icon";

export interface TrustItemProps {
  icon: IconName;
  title: string;
  description: string;
}

/** One reassurance item in the footer's trust bar (icon + title + description). */
export function TrustItem({ icon, title, description }: TrustItemProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon name={icon} size={22} className="shrink-0 text-foreground" />
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
