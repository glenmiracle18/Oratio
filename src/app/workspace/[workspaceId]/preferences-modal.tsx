import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveWorkpsace } from "@/features/workspaces/api/use-remove-workspace";
import { useUpdateWorkpsace } from "@/features/workspaces/api/use-update-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Loader, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;

}

const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const router = useRouter();

  const [ ConfrimDialog, confirm ] = useConfirm("Are you sure", "This action is irreversible");


  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkpsace();
  const { mutate: removerWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkpsace();

    const workspaceId = useWorkspaceId();

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateWorkspace({
            id: workspaceId,
            name: value,
        }, {
            onSuccess: () => {
                console.log('successfull')
                setEditOpen(false);
                toast.success("✅ Workspace updated succesfully")
            },
            onError: () => {
                console.log('an error occured')
                setEditOpen(false)
                toast.error("⛔️ Failed to update workspace")
            }
        })
    }

    const handleDelete = async () => {
      const confirmed = await confirm();
      if (!confirmed) return;
      
      removerWorkspace({ id: workspaceId }, 
        {
          onSuccess: () => {
            console.log('delete successful')
            router.replace('/')
            setEditOpen(false)
            toast.success("workspace deleted")
          },
          onError: () => {
            console.log('an error occured')
            setEditOpen(false)
            setEditOpen(false)
            toast.error("⛔️ Failed to update workspace")
        }
        })
    }

  return (
    <>
    <ConfrimDialog />
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="text-black p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="flex px-4 pb-4 flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Workspace Name</p>
                  <p className="text-sm text-[#1264a3] hover:underline font-semibold cursor-pointer">
                    Edit
                  </p>

                  <DialogContent className="bg-white text-black">
                    <DialogHeader>
                        <DialogTitle>Rename this workspace</DialogTitle>
                    </DialogHeader>
                    <form action="" onSubmit={handleEdit} className="space-y-4">
                        <Input 
                        value={value} 
                        disabled={isUpdatingWorkspace} 
                        onChange={(e) => setValue(e.target.value)} 
                        required
                        // autoFocus
                        maxLength={80}
                        minLength={3}
                        placeholder="Workspace name e.g 'Work', 'Personal', 'Home'..."
                        />
                        <DialogFooter>
                            <DialogClose asChild >
                                <Button variant='outline' disabled={isUpdatingWorkspace}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type='submit' disabled={isUpdatingWorkspace}>Save</Button>
                        </DialogFooter>
                    </form>
                  </DialogContent>
                </div>
                <p className="text-sm">{value}</p>
              </div>
            </DialogTrigger>
          </Dialog>

          <button
            disabled={isRemovingWorkspace}
            onClick={handleDelete}
            className="flex items-center gap-x-2 py-4 px-5 bg-white rounded-lg cursor-pointer text-rose-600"
          >
            {isRemovingWorkspace ? (
              <Loader className="size-10 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete Workspace</p>
              </div>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default PreferencesModal;
