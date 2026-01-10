import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, FileText, TrendingUp, BarChart3, 
  LogOut, RefreshCw, Eye, Calendar, Mail, Phone, Loader2 
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import logoImage from "@/assets/geteducate-logo.png";

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  portfolio_url: string | null;
  resume_url: string | null;
  why_interested: string;
  relevant_experience: string;
  what_stands_out: string;
  availability: string | null;
  expected_salary: string | null;
  status: string;
  created_at: string;
  job_categories: { title: string } | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  created_at: string;
}

interface JobCategory {
  id: string;
  title: string;
}

const COLORS = ["#8b5cf6", "#06b6d4", "#f97316", "#ec4899", "#22c55e", "#eab308"];

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    // Check authentication and role
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/creators", { replace: true });
        return;
      }

      // Check if user has creator or admin role
      const { data: hasCreator } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "creator",
      });
      const { data: hasAdmin } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });

      if (!hasCreator && !hasAdmin) {
        navigate("/creators", { replace: true });
        return;
      }

      fetchData();
    };

    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch applications with job category info
    const { data: appsData, error: appsError } = await supabase
      .from("applications")
      .select("*, job_categories(title)")
      .order("created_at", { ascending: false });

    // Fetch profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    // Fetch job categories
    const { data: jobsData, error: jobsError } = await supabase
      .from("job_categories")
      .select("*");

    console.log("Applications fetched:", appsData, appsError);
    console.log("Profiles fetched:", profilesData, profilesError);
    console.log("Job categories fetched:", jobsData, jobsError);

    if (appsData) setApplications(appsData);
    if (profilesData) setProfiles(profilesData);
    if (jobsData) setJobCategories(jobsData);
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/creators");
  };

  // Analytics data
  const applicationsByJob = jobCategories.map((job) => ({
    name: job.title,
    count: applications.filter((app) => app.job_categories?.title === job.title).length,
  }));

  const statusData = [
    { name: "Pending", value: applications.filter((a) => a.status === "pending").length },
    { name: "Reviewed", value: applications.filter((a) => a.status === "reviewed").length },
    { name: "Accepted", value: applications.filter((a) => a.status === "accepted").length },
    { name: "Rejected", value: applications.filter((a) => a.status === "rejected").length },
  ].filter((d) => d.value > 0);

  // Weekly applications (simulated data based on created_at)
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toLocaleDateString("en-US", { weekday: "short" });
    const count = applications.filter((app) => {
      const appDate = new Date(app.created_at);
      return appDate.toDateString() === date.toDateString();
    }).length;
    return { day: dateStr, applications: count };
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center overflow-hidden">
              <img 
                src={logoImage} 
                alt="GetEducate Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">Creator Dashboard</h1>
              <p className="text-muted-foreground text-sm">GetEducate Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={fetchData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{profiles.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
              <FileText className="w-5 h-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Total submissions</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
              <TrendingUp className="w-5 h-5 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {applications.filter((a) => a.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Need attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Positions</CardTitle>
              <BarChart3 className="w-5 h-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{jobCategories.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active roles</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle>Applications This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData.length > 0 ? statusData : [{ name: "No Data", value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Applications by Job */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Applications by Position</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationsByJob}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabs for Applications and Users */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="applications">Applications ({applications.length})</TabsTrigger>
            <TabsTrigger value="users">Registered Users ({profiles.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No applications yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Applications will appear here once users submit them</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Position</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.full_name}</TableCell>
                            <TableCell>{app.job_categories?.title || "N/A"}</TableCell>
                            <TableCell>{app.email}</TableCell>
                            <TableCell>{app.phone}</TableCell>
                            <TableCell>
                              <Badge variant={app.status === "pending" ? "secondary" : "default"}>
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(app.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedApplication(app)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                {profiles.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No users registered yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Users will appear here once they sign up</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Registered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {profiles.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell className="font-medium">
                              {profile.full_name || "N/A"}
                            </TableCell>
                            <TableCell>{profile.email || "N/A"}</TableCell>
                            <TableCell>
                              {new Date(profile.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-card animate-scale-in">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{selectedApplication.full_name}</CardTitle>
                  <p className="text-muted-foreground">
                    {selectedApplication.job_categories?.title || "Position not specified"}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedApplication(null)}>
                  ✕
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedApplication.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedApplication.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(selectedApplication.created_at).toLocaleString()}</span>
                  </div>
                  <div>
                    <Badge>{selectedApplication.status}</Badge>
                  </div>
                </div>

                {selectedApplication.portfolio_url && (
                  <div>
                    <h4 className="font-semibold mb-1">Portfolio</h4>
                    <a href={selectedApplication.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {selectedApplication.portfolio_url}
                    </a>
                  </div>
                )}

                {selectedApplication.resume_url && (
                  <div>
                    <h4 className="font-semibold mb-1">Resume</h4>
                    <a href={selectedApplication.resume_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {selectedApplication.resume_url}
                    </a>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">Why interested in this role?</h4>
                  <p className="text-muted-foreground">{selectedApplication.why_interested}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Relevant Experience</h4>
                  <p className="text-muted-foreground">{selectedApplication.relevant_experience}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">What makes you stand out?</h4>
                  <p className="text-muted-foreground">{selectedApplication.what_stands_out}</p>
                </div>

                {selectedApplication.availability && (
                  <div>
                    <h4 className="font-semibold mb-1">Availability</h4>
                    <p className="text-muted-foreground">{selectedApplication.availability}</p>
                  </div>
                )}

                {selectedApplication.expected_salary && (
                  <div>
                    <h4 className="font-semibold mb-1">Expected Salary</h4>
                    <p className="text-muted-foreground">{selectedApplication.expected_salary}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreatorDashboard;
