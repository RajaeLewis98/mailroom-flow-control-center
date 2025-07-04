
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Users,
  Calendar
} from "lucide-react";

export const MailDashboard = () => {
  const stats = [
    {
      title: "Total Mail Today",
      value: "47",
      change: "+12%",
      icon: Mail,
      color: "blue"
    },
    {
      title: "Pending Delivery",
      value: "23",
      change: "-5%",
      icon: Clock,
      color: "orange"
    },
    {
      title: "Delivered",
      value: "156",
      change: "+8%",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Outgoing",
      value: "31",
      change: "+15%",
      icon: Package,
      color: "purple"
    }
  ];

  const recentActivity = [
    {
      id: "M001",
      type: "incoming",
      recipient: "John Smith",
      sender: "ABC Corporation",
      status: "delivered",
      time: "2 hours ago"
    },
    {
      id: "M002",
      type: "outgoing",
      recipient: "XYZ Company",
      sender: "Marketing Dept",
      status: "pending",
      time: "3 hours ago"
    },
    {
      id: "M003",
      type: "incoming",
      recipient: "Sarah Johnson",
      sender: "Legal Services",
      status: "awaiting_pickup",
      time: "4 hours ago"
    },
    {
      id: "M004",
      type: "incoming",
      recipient: "Mike Davis",
      sender: "Government Office",
      status: "delivered",
      time: "5 hours ago"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case "awaiting_pickup":
        return <Badge className="bg-blue-100 text-blue-800">Awaiting Pickup</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="flex items-center text-xs text-slate-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from yesterday
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-800">Recent Activity</CardTitle>
                <CardDescription>Latest mail transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'incoming' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'incoming' ? (
                        <Mail className={`h-3 w-3 ${
                          activity.type === 'incoming' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      ) : (
                        <Package className={`h-3 w-3 ${
                          activity.type === 'incoming' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {activity.id} - {activity.recipient}
                      </p>
                      <p className="text-xs text-slate-600">
                        From: {activity.sender}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(activity.status)}
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Quick Actions</CardTitle>
            <CardDescription>Common mailroom tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex flex-col items-center justify-center space-y-2">
                <Mail className="h-5 w-5" />
                <span className="text-sm">Log Incoming</span>
              </Button>
              <Button className="h-20 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 flex flex-col items-center justify-center space-y-2">
                <Package className="h-5 w-5" />
                <span className="text-sm">Send Outgoing</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Notify Recipient</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Schedule Pickup</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
