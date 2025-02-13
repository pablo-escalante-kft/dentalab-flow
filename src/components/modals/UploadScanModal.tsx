
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

const scanSteps = [
  {
    title: "Upper Arch",
    description: "Scan the entire upper arch, ensuring coverage of all teeth and margins.",
  },
  {
    title: "Lower Arch",
    description: "Complete scan of the lower arch with particular attention to emergence profiles.",
  },
  {
    title: "Buccal Bite",
    description: "Capture the bite registration in centric occlusion.",
  },
  {
    title: "Preparation Area",
    description: "Detailed scan of the preparation site and adjacent teeth.",
  },
];

const UploadScanModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" className="flex items-center gap-2 h-auto py-4">
          <FileUp className="h-5 w-5" />
          Upload Scan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Digital Scan</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="space-y-6">
            {/* Scan Instructions */}
            <div className="space-y-4">
              {scanSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <h3 className="font-semibold flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white text-sm">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Button>Choose File</Button>
                <p className="mt-2 text-sm text-gray-500">
                  or drag and drop your scan files here
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Supported formats: STL, OBJ, DCM
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadScanModal;
