
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Package, Search, Plus, Filter, BarChart3, Users, Clock, CheckCircle, History } from "lucide-react";
import { MailDashboard } from "@/components/MailDashboard";
import { IncomingMail } from "@/components/IncomingMail";
import { OutgoingMail } from "@/components/OutgoingMail";
import { MailSearch } from "@/components/MailSearch";
import { MailHistory } from "@/components/MailHistory";
import { NotificationPanel } from "@/components/NotificationPanel";
import { useNotifications } from "@/contexts/NotificationContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { notifications, markAsRead, clearAll } = useNotifications();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">MailRoom Pro</h1>
                <p className="text-sm text-slate-600">Mail Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Staff
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <NotificationPanel 
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onClearAll={clearAll}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="incoming" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Incoming</span>
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Outgoing</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <MailDashboard />
          </TabsContent>

          <TabsContent value="incoming">
            <IncomingMail />
          </TabsContent>

          <TabsContent value="outgoing">
            <OutgoingMail />
          </TabsContent>

          <TabsContent value="search">
            <MailSearch />
          </TabsContent>

          <TabsContent value="history">
            <MailHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
