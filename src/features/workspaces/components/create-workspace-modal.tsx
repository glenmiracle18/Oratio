"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";

export const CreateWorkpsaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate, data, error, isPending, isError, isSuccess, isSettled } =
    useCreateWorkspace();
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess(data) {
          console.log(data);
        },
      },
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">Create a Workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            required
            name="name"
            onChange={(e) => setName(e.target.value)}
            autoFocus
            placeholder="Enter workspace name e.g. 'Personal', 'Client', 'Project'"
            minLength={3}
            disabled={isPending}
            className="text-gray-800"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Create Workspace
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};