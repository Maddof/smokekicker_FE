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

export default function SessionExpireModal({ isOpen, onClose, onRefresh }) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md [&>button:last-child]:hidden">
        <DialogHeader>
          <DialogTitle>Sessionen löper snart ut</DialogTitle>
          <DialogDescription>
            Din session håller på att löpa ut. Klicka nedan för att förbli
            inloggad.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onClose}>
            Logga ut
          </Button>
          <Button onClick={onRefresh}>Håll mig inloggad</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
