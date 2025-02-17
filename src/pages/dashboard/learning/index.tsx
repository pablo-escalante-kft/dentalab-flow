
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, PlayCircle, FileText, Award } from "lucide-react";

const learningResources = [
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides on dental procedures",
    icon: PlayCircle,
    count: 24,
  },
  {
    title: "Documentation",
    description: "Detailed guides and best practices",
    icon: FileText,
    count: 15,
  },
  {
    title: "Case Studies",
    description: "Real-world case studies and examples",
    icon: BookOpen,
    count: 8,
  },
  {
    title: "Certifications",
    description: "Professional certifications and courses",
    icon: Award,
    count: 3,
  },
];

const LearningHubPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Hub</h1>
          <p className="text-gray-500 mt-2">
            Expand your knowledge with our curated learning resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningResources.map((resource) => (
            <Card key={resource.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <resource.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">{resource.description}</p>
                <div className="text-sm font-medium">
                  {resource.count} {resource.title.toLowerCase()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                  <div>
                    <h4 className="font-medium">New Tutorial Added</h4>
                    <p className="text-sm text-gray-500">
                      Advanced techniques for dental impressions
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Webinars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <PlayCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Digital Dentistry Workshop</h4>
                    <p className="text-sm text-gray-500">March {i * 5}, 2024</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearningHubPage;
