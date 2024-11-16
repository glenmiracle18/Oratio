import React from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader, Plus } from 'lucide-react'

import { useWorkspaceId } from '@/hooks/use-workspace-id'
import { useGetWorkspace } from '@/features/workspaces/api/use-get-workpace'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces'
import { useCreateWorkspaceModal } from '@/features/workspaces/store/use-create-workspace-modal'

const WorkspaceSwitcher= () => {
    const router = useRouter()
    const workpsaceId = useWorkspaceId()
    const [_open, setOpen] = useCreateWorkspaceModal()
    
    const { data: workspace, isLoading: workspaceLoading  } = useGetWorkspace({ id: workpsaceId}); // for single workspace

    const {data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces(); // for all workspaces

    const filterWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workpsaceId)

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className='size-9 relative overflow-hidden bg-[#ABABAB] hover:bg-[#ABABAB]/80 text-slate-800 font-semibold text-xl '>
                {workspaceLoading ? (
                    <Loader className='size-5 shrink-0 animate-spin' />
                ): (
                    workspace?.name.charAt(0).toUpperCase()
                )}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' align='start' className='w-64'>
                <DropdownMenuItem 
                className='cursor-pointer flex-col justify-start items-start capitalize' 
                onClick={() => router.push(`/workspace/${workpsaceId}`)}
                >
                    {workspace?.name}
                    <span className="text-xs flex items-center gap-2 text-muted-foreground">
                        <div className='bg-emerald-500 ring-2 ring-emerald-300 ring-offset-1 size-2 rounded-full border-none' />
                        Active workspace
                    </span>
                </DropdownMenuItem>
                {filterWorkspaces?.map((workspace) => (
                    <DropdownMenuItem 
                    key={workspace._id}
                    onClick={() => router.push(`/workspace/${workspace._id}`)}
                    className='cursor-pointer capitalize overflow-hidden'
                    >
                        <div className="size-9 relative overflow-hidden bg-[#616061] text-white flex items-center justify-center text-lg rounded-md font-semibold mr-2 shrink-0">
                        {workspace?.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="truncate">{workspace.name}</p>
                    </DropdownMenuItem>
                ))}
                
                <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => setOpen(true)}
                >
                    <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 flex items-center justify-center text-lg rounded-md font-semibold mr-2">
                        <Plus />
                    </div>
                    Create a new workpace
                </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkspaceSwitcher