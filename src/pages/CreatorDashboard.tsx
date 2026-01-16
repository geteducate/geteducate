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
  LogOut, RefreshCw, Eye, Loader2, X, Mail, Phone, Calendar, Link as LinkIcon,
  Home, Settings, Bell, Megaphone
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import logoImage from "@/assets/geteducate-logo.png";
import { UpdatesManagement } from "@/components/dashboard/UpdatesManagement";

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

const COLORS = ["#536DFE", "#FF5C93", "#43A047", "#FFC260", "#9013FE", "#00BCD4"];

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = sessionStorage.getItem("creatorAuthenticated") === "true";
    
    if (!isAuthenticated) {
      navigate("/creators", { replace: true });
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);

    const [appsRes, profilesRes, jobsRes] = await Promise.all([
      supabase.from("applications").select("*, job_categories(title)").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("job_categories").select("*")
    ]);

    if (appsRes.data) setApplications(appsRes.data);
    if (profilesRes.data) setProfiles(profilesRes.data);
    if (jobsRes.data) setJobCategories(jobsRes.data);

    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("creatorAuthenticated");
    navigate("/creators", { replace: true });
  };

  // Chart data
  const applicationsByJob = jobCategories.map((job) => ({
    name: job.title.length > 12 ? job.title.slice(0, 12) + "..." : job.title,
    count: applications.filter((app) => app.job_categories?.title === job.title).length,
  }));

  const statusData = [
    { name: "Pending", value: applications.filter((a) => a.status === "pending").length, color: COLORS[0] },
    { name: "Reviewed", value: applications.filter((a) => a.status === "reviewed").length, color: COLORS[1] },
    { name: "Accepted", value: applications.filter((a) => a.status === "accepted").length, color: COLORS[2] },
    { name: "Rejected", value: applications.filter((a) => a.status === "rejected").length, color: COLORS[3] },
  ].filter((d) => d.value > 0);

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

  const pendingCount = applications.filter((a) => a.status === "pending").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Navigation */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <img src={logoImage} alt="Logo" className="w-7 h-7 object-contain" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-lg">GetEducate</h1>
                <p className="text-xs text-primary-foreground/70">Creator Dashboard</p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm font-medium hover:text-white/80 transition-colors">
                <Home className="w-4 h-4" />
                Dashboard
              </button>
              <button 
                onClick={() => document.getElementById('updates-tab')?.click()}
                className="flex items-center gap-2 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors"
              >
                <Megaphone className="w-4 h-4" />
                Updates
              </button>
              <button className="flex items-center gap-2 text-sm font-medium text-primary-foreground/70 hover:text-white transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-white/10"
                onClick={fetchData}
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-white/10 relative"
              >
                <Bell className="w-5 h-5" />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {pendingCount > 9 ? "9+" : pendingCount}
                  </span>
                )}
              </Button>
              <div className="h-8 w-px bg-white/20 mx-2 hidden sm:block" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary-foreground hover:bg-white/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">Good Morning, Creator</h2>
          <p className="text-muted-foreground mt-1">Here's what's happening with your applications today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80 font-medium">Total Users</p>
                  <p className="text-3xl font-bold mt-1">{profiles.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">Registered accounts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80 font-medium">Applications</p>
                  <p className="text-3xl font-bold mt-1">{applications.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">Total submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80 font-medium">Pending Review</p>
                  <p className="text-3xl font-bold mt-1">{pendingCount}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">Needs attention</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80 font-medium">Open Positions</p>
                  <p className="text-3xl font-bold mt-1">{jobCategories.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-white/60 mt-3">Active job roles</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Applications Chart */}
          <Card className="lg:col-span-2 shadow-md border-0">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-lg font-semibold">Applications This Week</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="day" stroke="#9e9e9e" fontSize={12} />
                  <YAxis stroke="#9e9e9e" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#fff", 
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#536DFE" 
                    strokeWidth={3}
                    dot={{ fill: "#536DFE", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: "#536DFE" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Pie Chart */}
          <Card className="shadow-md border-0">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-lg font-semibold">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData.length > 0 ? statusData : [{ name: "No Data", value: 1, color: "#e0e0e0" }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Applications by Position */}
        <Card className="shadow-md border-0 mb-8">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg font-semibold">Applications by Position</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationsByJob} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" stroke="#9e9e9e" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#9e9e9e" fontSize={12} width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="count" fill="#536DFE" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Data Tables */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-white shadow-sm border">
            <TabsTrigger value="applications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Applications ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Users ({profiles.length})
            </TabsTrigger>
            <TabsTrigger id="updates-tab" value="updates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2">
              <Megaphone className="w-4 h-4" />
              Updates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card className="shadow-md border-0">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-lg font-semibold">All Applications</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {applications.length === 0 ? (
                  <div className="text-center py-16">
                    <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">No applications yet</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">Applications will appear here once submitted</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">Applicant</TableHead>
                          <TableHead className="font-semibold">Position</TableHead>
                          <TableHead className="font-semibold">Contact</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Date</TableHead>
                          <TableHead className="font-semibold text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications.map((app) => (
                          <TableRow key={app.id} className="hover:bg-muted/30">
                            <TableCell>
                              <div className="font-medium">{app.full_name}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-normal">
                                {app.job_categories?.title || "N/A"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-muted-foreground">{app.email}</div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  app.status === "pending" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                                  app.status === "accepted" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                                  app.status === "rejected" ? "bg-red-100 text-red-800 hover:bg-red-100" :
                                  "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                }
                              >
                                {app.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(app.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedApplication(app)}
                                className="hover:bg-primary/10"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
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
            <Card className="shadow-md border-0">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-lg font-semibold">Registered Users</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {profiles.length === 0 ? (
                  <div className="text-center py-16">
                    <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium">No users registered yet</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">Users will appear here once they sign up</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Email</TableHead>
                          <TableHead className="font-semibold">Registered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {profiles.map((profile) => (
                          <TableRow key={profile.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">
                              {profile.full_name || "N/A"}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {profile.email || "N/A"}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
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

          <TabsContent value="updates">
            <UpdatesManagement />
          </TabsContent>
        </Tabs>
      </main>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border-0 animate-in zoom-in-95 duration-200">
            <CardHeader className="bg-primary text-primary-foreground flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle className="text-xl">{selectedApplication.full_name}</CardTitle>
                <p className="text-primary-foreground/80 text-sm mt-1">
                  {selectedApplication.job_categories?.title || "Position not specified"}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedApplication(null)}
                className="text-primary-foreground hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <CardContent className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedApplication.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Applied</p>
                      <p className="font-medium">{new Date(selectedApplication.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge 
                        className={
                          selectedApplication.status === "pending" ? "bg-amber-100 text-amber-800" :
                          selectedApplication.status === "accepted" ? "bg-green-100 text-green-800" :
                          selectedApplication.status === "rejected" ? "bg-red-100 text-red-800" :
                          "bg-blue-100 text-blue-800"
                        }
                      >
                        {selectedApplication.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Links */}
                {(selectedApplication.portfolio_url || selectedApplication.resume_url) && (
                  <div className="flex flex-wrap gap-3">
                    {selectedApplication.portfolio_url && (
                      <a 
                        href={selectedApplication.portfolio_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                        Portfolio
                      </a>
                    )}
                    {selectedApplication.resume_url && (
                      <a 
                        href={selectedApplication.resume_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Resume
                      </a>
                    )}
                  </div>
                )}

                {/* Responses */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Why Interested
                    </h4>
                    <p className="text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                      {selectedApplication.why_interested}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Relevant Experience
                    </h4>
                    <p className="text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                      {selectedApplication.relevant_experience}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      What Makes You Stand Out
                    </h4>
                    <p className="text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                      {selectedApplication.what_stands_out}
                    </p>
                  </div>

                  {selectedApplication.availability && (
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Availability
                      </h4>
                      <p className="text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                        {selectedApplication.availability}
                      </p>
                    </div>
                  )}

                  {selectedApplication.expected_salary && (
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Expected Salary
                      </h4>
                      <p className="text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                        {selectedApplication.expected_salary}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;
