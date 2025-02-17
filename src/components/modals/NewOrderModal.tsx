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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientPhone: "",
    notes: "",
    files: [] as File[],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: [...Array.from(e.target.files || [])],
      }));
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setSelectedType(null);
    setFormData({
      patientFirstName: "",
      patientLastName: "",
      patientEmail: "",
      patientPhone: "",
      notes: "",
      files: [],
    });
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const { data: { user }, error: sessionError } = await supabase.auth.getUser();
      
      if (sessionError || !user) {
        throw new Error('Please sign in again to continue');
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profileData && !profileError) {
        await supabase.from('profiles').insert({
          id: user.id,
          full_name: user.user_metadata.full_name
        });
      }

      const { data: patientData, error: patientError } = await supabase
        .from("patients")
        .insert({
          first_name: formData.patientFirstName,
          last_name: formData.patientLastName,
          email: formData.patientEmail,
          phone: formData.patientPhone,
          dentist_id: user.id,
        })
        .select()
        .single();

      if (patientError) throw patientError;

      const { error: orderError } = await supabase.from("orders").insert({
        type: selectedType!,
        patient_id: patientData.id,
        dentist_id: user.id,
        details: {
          notes: formData.notes,
        },
      });

      if (orderError) throw orderError;

      toast({
        title: "Order created successfully",
        description: "Your order has been submitted.",
      });

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error creating order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.patientFirstName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          patientFirstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.patientLastName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          patientLastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        patientEmail: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        patientPhone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <input
                      type="file"
                      id="files"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Label
                      htmlFor="files"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      Choose Files
                    </Label>
                    <p className="mt-2 text-sm text-gray-500">
                      or drag and drop your files here
                    </p>
                  </div>
                </div>
                {formData.files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Selected Files:</h4>
                    <ul className="space-y-2">
                      {formData.files.map((file, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center gap-2"
                        >
                          <FileUp className="h-4 w-4" />
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Type:</dt>
                      <dd className="font-medium">{selectedType}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Patient:</dt>
                      <dd className="font-medium">
                        {formData.patientFirstName} {formData.patientLastName}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Files:</dt>
                      <dd className="font-medium">{formData.files.length} files</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleSubmit();
                } else {
                  setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
                }
              }}
              disabled={
                (currentStep === 0 && !selectedType) ||
                (currentStep === 1 &&
                  (!formData.patientFirstName || !formData.patientLastName)) ||
                isLoading
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentStep === steps.length - 1 ? "Submit Order" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderModal;
