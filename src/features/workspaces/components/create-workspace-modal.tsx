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

export const CreateWorkpsaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">Create a Workspace</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <Input
            required
            autoFocus
            placeholder="Enter workspace name e.g. 'Personal', 'Client', 'Project'"
            minLength={3}
            disabled={false}
            className="text-gray-800"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={false}>
              Create Workspace
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
