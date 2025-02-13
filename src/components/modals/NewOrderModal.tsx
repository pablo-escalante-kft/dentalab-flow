
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Select Order Type",
    description: "Choose the type of dental work needed",
    options: ["Crown", "Bridge", "Implant", "Denture", "Other"],
  },
  {
    title: "Patient Information",
    description: "Enter patient details and requirements",
  },
  {
    title: "Upload Files",
    description: "Upload necessary scans and images",
  },
  {
    title: "Review & Submit",
    description: "Review order details before submission",
  },
];

const NewOrderModal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="flex items-center gap-2 h-auto py-4">
          New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Order - {steps[currentStep].title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  "flex flex-col items-center space-y-2",
                  index <= currentStep ? "text-primary" : "text-gray-400"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2",
                    index <= currentStep
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300"
                  )}
                >
                  {index + 1}
                </div>
                <span className="text-xs text-center hidden sm:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">
            {currentStep === 0 && (
              <div className="grid grid-cols-2 gap-4">
                {steps[0].options.map((option) => (
                  <Button
                    key={option}
                    variant={selectedType === option ? "default" : "outline"}
                    className="h-24"
                    onClick={() => setSelectedType(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
            {/* Add other step content here */}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
              }
              disabled={currentStep === 0 && !selectedType}
            >
              {currentStep === steps.length - 1 ? "Submit Order" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderModal;
