import { Suspense } from "react";
import { ConfirmContent } from "./confirm-content";

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4">
          <div className="max-w-md w-full rounded-xl bg-white/10 p-8 shadow-md">
            <div className="text-center text-white text-lg">
              Confirming your email...
            </div>
          </div>
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
