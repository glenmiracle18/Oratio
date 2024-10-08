"use client";
import { UserButton } from "@/components/user-button";
import { useGetWorkspaces } from "../features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  const [open, setOpen] = useCreateWorkspaceModal(); // state management with jotai

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log("Redirect to workpsace");
    } else if (!open) {
      setOpen(true);
      console.log("Open create workspace modal");
    }
  }, [workspaceId, isLoading, open, setOpen]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
