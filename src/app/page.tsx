"use client";
import { UserButton } from "@/components/user-button";
import { useGetWorkspaces } from "../features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  const [open, setOpen] = useCreateWorkspaceModal(); // global state management with jotai
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
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
