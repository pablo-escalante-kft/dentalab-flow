
import {
  CheckCircle,
  Upload,
  BarChart3,
  Timer,
  Settings,
  FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Upload,
    title: "Easy Scan Upload",
    description: "Direct integration with all major intraoral scanners for seamless case submission."
  },
  {
    icon: BarChart3,
    title: "Real-time Tracking",
    description: "Monitor your cases from submission to delivery with detailed status updates."
  },
  {
    icon: Timer,
    title: "Fast Turnaround",
    description: "Optimized workflow ensures quick processing and delivery of your orders."
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous quality checks at every step of the production process."
  },
  {
    icon: Settings,
    title: "Custom Solutions",
    description: "Tailored options for materials, shades, and special requirements."
  },
  {
    icon: FileText,
    title: "Digital Records",
    description: "Secure storage and easy access to all your case histories and documents."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need in One Platform</h2>
          <p className="text-gray-600">
            Streamline your dental lab workflow with our comprehensive suite of tools and services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
