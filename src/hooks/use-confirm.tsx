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
import { useState } from "react";

export const useConfirm = (
    title: string,
    message: string,
): [() => JSX.Element, () => Promise<unknown>] => {

    const [ promise, setPromise ] = useState<{ resolve: (value: boolean) => void} | null>(null)

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose(); // to reset the promise
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose(); // to reset the promise
    }

    const ConfrimDialog = () => {
        return (
            <Dialog open={promise != null }>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        {title}
                    </DialogHeader>
                    <DialogDescription>
                        {message}
                    </DialogDescription>

                    <DialogFooter className="pt-2">
                        <Button variant='outline' onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return [ConfrimDialog, confirm]
}