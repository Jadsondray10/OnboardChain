"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const X_SIGNUP_URL = "https://x.com/i/flow/signup";

interface XSignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
  isConnecting: boolean;
}

export function XSignupModal({ open, onOpenChange, onConnect, isConnecting }: XSignupModalProps) {
  const [step, setStep] = React.useState<"ask" | "ready">("ask");

  // Reset to the first step each time the modal is reopened.
  React.useEffect(() => {
    if (open) setStep("ask");
  }, [open]);

  function handleCreateAccount() {
    window.open(X_SIGNUP_URL, "_blank", "noopener,noreferrer");
    setStep("ready");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {step === "ask" ? (
          <>
            <DialogHeader>
              <DialogTitle>Don't have an X account?</DialogTitle>
              <DialogDescription>
                Most Web3 communities, founders and projects communicate on X. Creating an
                account will help you discover opportunities, grow your reputation and connect
                with the ecosystem.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                I'll Do This Later
              </Button>
              <Button variant="gradient" onClick={handleCreateAccount}>
                Create an X Account <ExternalLink className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Ready when you are</DialogTitle>
              <DialogDescription>
                Once your account is set up, connect it here to finish this step.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                I'll Do This Later
              </Button>
              <Button
                variant="gradient"
                disabled={isConnecting}
                onClick={() => {
                  onConnect();
                  onOpenChange(false);
                }}
              >
                Connect X
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
