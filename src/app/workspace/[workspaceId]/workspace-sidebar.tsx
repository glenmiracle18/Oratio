import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workpace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareIcon,
  SendIcon,
} from "lucide-react";
import React, { use } from "react";
import WorkspaceHeader from "./workspace-header";
import SidebarItem from "./SidebarItem";
import useGetChannels from "@/features/channels/api/use-get-channels";
import {WorkspaceGroup} from "./workspace-group";

const WorskpaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });

  const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId})

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
        <p className="text-sm text-white">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#5E2C5F] py-2">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="mt-4 p-2 gap-2 flex flex-col">
        <SidebarItem id="threads" label="threads" icon={MessageSquareIcon} />
        <SidebarItem id="drafts" label="Drafts & Sent" icon={SendIcon} />

        </div>
      <WorkspaceGroup
        label="Channels"
        onNew = {() => {}}
        hint="Create a new channel"
      >

        {channels?.map((item) => (
          <SidebarItem
          key={item._id}
          id={item._id}
          label={item.name}
          icon={HashIcon}
          />
        ))}
        </WorkspaceGroup>
    </div>
  );
};

export default WorskpaceSidebar;
