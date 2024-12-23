import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import React, { Children } from "react"

interface HintProps {
    label: string;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}
const Hint = ({ children, label, align, side }: HintProps) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
            {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align} className="bg-black text-white border border-white/5">
                <p className="text-xs font-medium">{label}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default Hint
