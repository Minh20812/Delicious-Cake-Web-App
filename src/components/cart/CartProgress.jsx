import React from "react";
import { cn } from "@/lib/utils";

// Using 3 steps (removing "Giỏ hàng")
const steps = [
  { id: 1, name: "Giao hàng" },
  { id: 2, name: "Thanh toán" },
  { id: 3, name: "Xác nhận" },
];

const CartProgress = ({
  currentStep,
  compact = false,
  onStepClick,
  completedSteps = [],
  display = true,
}) => {
  // Don't render anything if display is false
  if (!display) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        className={cn("flex justify-between", compact ? "text-xs" : "text-sm")}
      >
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const canClick =
            isCompleted ||
            step.id === 1 ||
            completedSteps.includes(step.id - 1);

          return (
            <div
              key={step.id}
              onClick={() => canClick && onStepClick && onStepClick(step.id)}
              className={cn(
                "relative flex flex-col items-center",
                canClick && "cursor-pointer",
                !canClick && "cursor-not-allowed opacity-70",
                isCurrent
                  ? "text-brown font-medium"
                  : isCompleted
                  ? "text-green-600"
                  : "text-brown/40"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full mb-2",
                  isCurrent
                    ? "bg-brown text-cream"
                    : isCompleted
                    ? "bg-green-100 text-green-600 border border-green-600"
                    : "bg-gray-100 text-gray-400"
                )}
              >
                {step.id}
              </div>
              <div className={compact ? "hidden sm:block" : ""}>
                {step.name}
              </div>
              {step.id < steps.length && (
                <div
                  className={cn(
                    "absolute top-3 md:top-4 w-full h-0.5 left-1/2",
                    isCompleted ||
                      (isCurrent &&
                        step.id > 1 &&
                        completedSteps.includes(step.id - 1))
                      ? "bg-green-600"
                      : "bg-gray-200"
                  )}
                  style={{ width: "calc(100% - 3rem)" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartProgress;
