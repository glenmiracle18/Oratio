import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  'flex items-center gap-1.5 justify-start font-medium h-7 px-[18px] text-sm overflow-hidden',
  {
      variants: {
          variant: {
              default: 'text-[#f9edffcc]',
              active: 'text-[#481349] bg-white/90 hover:bg-white/90',
          }
      },
      defaultVariants: {
        variant: "default"
      }
  }
)

// props
interface SidebarItemProps {
  label: string;
  icon: IconType | LucideIcon;
  id: string;
  variant?: VariantProps<typeof sidebarItemVariants>['variant'];
}

const SidebarItem = ({ icon: Icon, label, id, variant }: SidebarItemProps) => {
  const workpaceId = useWorkspaceId();

  return (
    <div>
      <Button 
      className={cn(sidebarItemVariants({variant: variant}))} 
      variant='transparent' 
      asChild
      size='sm'
      >
        <Link
          href={`/workpaces/${workpaceId}/channels/${id}`}
          className="capitalize"
        >
          <Icon  className="size-3.5 mr-1 shrink-0"/>
          <span className="text-sm truncate">{label} </span>
        </Link>
      </Button>
    </div>
  );
};

export default SidebarItem;
