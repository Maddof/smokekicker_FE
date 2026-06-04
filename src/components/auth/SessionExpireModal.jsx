"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/scn/dialog";
import { Button } from "@/components/ui/scn/button";

export default function SessionExpireModal({
  isOpen,
  onClose,
  onRefresh,
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md [&>button:last-child]:hidden">
        <DialogHeader>
          <DialogTitle>
            Session is about to expire
          </DialogTitle>
          <DialogDescription>
            Your session is about to expire. Click below to
            stay logged in.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onClose}>
            Log out
          </Button>
          <Button onClick={onRefresh}>
            Stay logged in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
