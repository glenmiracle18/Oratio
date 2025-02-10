import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa6";
import { useToggle } from "react-use";

interface WorkspaceGroupProps {
    label: string;
    hint?: string;
    onNew: () => void;
    children: React.ReactNode;
}

export const WorkspaceGroup = ({
    label,
    hint,
    onNew,
    children,
}: WorkspaceGroupProps) => {

    const [ on, toggle ] = useToggle(true);

    return (
        <div className="flex flex-col px-2">
            <div className="flex items-center px-3.5 group">
                <Button variant='transparent' className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6" onClick={toggle}>
                    <FaCaretDown  className={cn("size-4", !on && "-rotate-90 transition-all " )}/>
                </Button>
                <Button variant='transparent' size='sm' className="p-1.5 group text-sm text-[#f9edffcc] h-[24px] justify-start overflow-hidden items-center">
                    <span className="truncate">{label}</span>
                </Button>

                {onNew && (
                    <Hint label={hint as string} side="top" align="center" >
                        <Button 
                        onClick={onNew}
                        variant='transparent' 
                        size='iconSm' 
                        className="p-0.5 text-[#f9edffcc] opacity-0 group-hover:opacity-100 transition-opacity text-sm ml-auto size-6 shrink-0"
                        >
                            <PlusIcon  className="size-5"/>
                        </Button>
                    </Hint>
                )}
            </div>
            <div className="ml-3.5">
            { on && children}
            </div>
        </div>
    )
}