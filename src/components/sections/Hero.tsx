
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8 fade-in">
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-blue-50 text-primary rounded-full">
              Now Available for All Dental Practices
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Seamless Dental Lab Management at Your Fingertips
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Submit cases, track orders, and access expert resources—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="mt-16 slide-up">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-gray-900/0 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Dentalab Dashboard"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
