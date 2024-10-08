"use client";
import { useEffect, useState } from "react";

import { CreateWorkpsaceModal } from "@/features/workspaces/components/create-workspace-modal";
// all modals will be globally imported here
export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // preventing hydration mismatch
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateWorkpsaceModal />
    </>
  );
};
