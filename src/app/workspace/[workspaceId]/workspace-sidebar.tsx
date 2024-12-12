import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workpace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import React, { use } from "react";
import WorkspaceHeader from "./workspace-header";

const WorskpaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-[#5E2C5F]">
        <Loader className="text-white size-5 animate-spin" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-[#5E2C5F]">
        <AlertTriangle className="text-white size-5" />
        <p className="text-sm text-white">
            Workspace not found
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#5E2C5F] py-2">
       <WorkspaceHeader workspace={workspace} isAdmin={member.role === 'admin'} />
    </div>
  ) 
};

export default WorskpaceSidebar;
