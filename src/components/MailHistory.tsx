
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, History, Mail, Package, User, Building, Clock, CheckCircle, AlertCircle, Truck, Eye } from "lucide-react";
import { format } from "date-fns";

export const MailHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMail, setSelectedMail] = useState<any>(null);

  // Sample mail history data - in a real app, this would come from your database
  const mailHistory = [
    {
      id: "IN001",
      direction: "incoming",
      sender: "ABC Corporation",
      recipient: "John Smith",
      department: "Finance",
      type: "Letter",
      priority: "Normal",
      currentStatus: "delivered",
      timeline: [
        {
          id: 1,
          action: "received",
          description: "Mail received at mailroom",
          timestamp: "2024-01-15T09:30:00Z",
          user: "Mailroom Staff",
          status: "received"
        },
        {
          id: 2,
          action: "logged",
          description: "Mail logged into system",
          timestamp: "2024-01-15T09:35:00Z",
          user: "Sarah Johnson",
          status: "awaiting_pickup"
        },
        {
          id: 3,
          action: "notified",
          description: "Recipient notified via email",
          timestamp: "2024-01-15T10:00:00Z",
          user: "System",
          status: "notified"
        },
        {
          id: 4,
          action: "delivered",
          description: "Mail delivered to recipient",
          timestamp: "2024-01-15T14:30:00Z",
          user: "Mike Davis",
          status: "delivered"
        }
      ]
    },
    {
      id: "OUT001",
      direction: "outgoing",
      sender: "Marketing Department",
      recipient: "XYZ Corporation",
      type: "Document Package",
      priority: "Normal",
      currentStatus: "delivered",
      timeline: [
        {
          id: 1,
          action: "created",
          description: "Outgoing mail request created",
          timestamp: "2024-01-14T11:00:00Z",
          user: "Marketing Team",
          status: "pending"
        },
        {
          id: 2,
          action: "prepared",
          description: "Mail prepared for shipping",
          timestamp: "2024-01-14T13:00:00Z",
          user: "Mailroom Staff",
          status: "prepared"
        },
        {
          id: 3,
          action: "shipped",
          description: "Mail shipped via FedEx - TRK123456789",
          timestamp: "2024-01-14T15:30:00Z",
          user: "FedEx Pickup",
          status: "shipped"
        },
        {
          id: 4,
          action: "delivered",
          description: "Mail delivered to destination",
          timestamp: "2024-01-15T10:15:00Z",
          user: "FedEx",
          status: "delivered"
        }
      ]
    },
    {
      id: "IN002",
      direction: "incoming",
      sender: "Legal Services Inc",
      recipient: "Sarah Johnson",
      department: "Legal",
      type: "Package",
      priority: "High",
      currentStatus: "awaiting_pickup",
      timeline: [
        {
          id: 1,
          action: "received",
          description: "Priority mail received",
          timestamp: "2024-01-15T10:15:00Z",
          user: "Mailroom Staff",
          status: "received"
        },
        {
          id: 2,
          action: "logged",
          description: "High priority mail logged",
          timestamp: "2024-01-15T10:20:00Z",
          user: "John Smith",
          status: "awaiting_pickup"
        },
        {
          id: 3,
          action: "notified",
          description: "Urgent notification sent to recipient",
          timestamp: "2024-01-15T10:25:00Z",
          user: "System",
          status: "notified"
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800"><Truck className="h-3 w-3 mr-1" />Shipped</Badge>;
      case "awaiting_pickup":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Awaiting Pickup</Badge>;
      case "notified":
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3 mr-1" />Notified</Badge>;
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "received":
        return <Mail className="h-4 w-4 text-blue-600" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "notified":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-slate-600" />;
    }
  };

  const filteredHistory = mailHistory.filter(mail =>
    mail.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Mail History</h2>
        <p className="text-slate-600">Track complete timeline of mail activities</p>
      </div>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search by mail ID, sender, or recipient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mail History List */}
      <div className="space-y-4">
        {filteredHistory.map((mail) => (
          <Card key={mail.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      mail.direction === 'incoming' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {mail.direction === 'incoming' ? (
                        <Mail className={`h-4 w-4 ${
                          mail.direction === 'incoming' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      ) : (
                        <Package className={`h-4 w-4 ${
                          mail.direction === 'incoming' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                        {mail.id}
                        <Badge variant="outline">
                          {mail.direction === 'incoming' ? 'Incoming' : 'Outgoing'}
                        </Badge>
                      </h3>
                      <p className="text-sm text-slate-600">
                        {mail.timeline.length} activities tracked
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Building className="h-3 w-3 mr-2 text-slate-400" />
                        <span className="text-slate-600">From:</span>
                        <span className="ml-2 font-medium">{mail.sender}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-2 text-slate-400" />
                        <span className="text-slate-600">To:</span>
                        <span className="ml-2 font-medium">{mail.recipient}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div>
                        <span className="text-slate-600">Type:</span>
                        <span className="ml-2 font-medium">{mail.type}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Last Activity:</span>
                        <span className="ml-2 font-medium">
                          {format(new Date(mail.timeline[mail.timeline.length - 1].timestamp), "MMM d, h:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:text-right space-y-3">
                  <div className="flex lg:flex-col items-center lg:items-end gap-2">
                    {getStatusBadge(mail.currentStatus)}
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedMail(mail)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Timeline
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <History className="h-5 w-5" />
                          Mail Timeline - {mail.id}
                        </DialogTitle>
                        <DialogDescription>
                          Complete activity history for this mail item
                        </DialogDescription>
                      </DialogHeader>
                      
                      {selectedMail && (
                        <div className="space-y-4">
                          {/* Mail Details */}
                          <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-600">From:</span>
                                <span className="ml-2 font-medium">{selectedMail.sender}</span>
                              </div>
                              <div>
                                <span className="text-slate-600">To:</span>
                                <span className="ml-2 font-medium">{selectedMail.recipient}</span>
                              </div>
                              <div>
                                <span className="text-slate-600">Type:</span>
                                <span className="ml-2 font-medium">{selectedMail.type}</span>
                              </div>
                              <div>
                                <span className="text-slate-600">Status:</span>
                                <span className="ml-2">{getStatusBadge(selectedMail.currentStatus)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Timeline */}
                          <div className="space-y-4">
                            <h4 className="font-medium text-slate-800">Activity Timeline</h4>
                            <div className="relative">
                              {/* Timeline line */}
                              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                              
                              {selectedMail.timeline.map((activity, index) => (
                                <div key={activity.id} className="relative flex items-start space-x-4 pb-6">
                                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-slate-200 rounded-full">
                                    {getActionIcon(activity.action)}
                                  </div>
                                  <div className="flex-1 min-w-0 pb-4">
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-medium text-slate-800 capitalize">
                                        {activity.action}
                                      </p>
                                      <p className="text-xs text-slate-500">
                                        {format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}
                                      </p>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">
                                      {activity.description}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                      By: {activity.user}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-12 pb-12 text-center">
            <History className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No history found</h3>
            <p className="text-slate-600">Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
