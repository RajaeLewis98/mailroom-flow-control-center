
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, Package, User, Building, Truck, CheckCircle, Clock } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

export const OutgoingMail = () => {
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [outgoingMail, setOutgoingMail] = useState([
    {
      id: "OUT001",
      sender: "Marketing Department",
      recipient: "XYZ Corporation",
      recipientAddress: "123 Business Ave, City, State 12345",
      type: "Document Package",
      priority: "Normal",
      status: "shipped",
      shippedDate: "2024-01-15",
      shippedTime: "02:30 PM",
      trackingNumber: "TRK123456789",
      carrier: "FedEx",
      notes: "Marketing materials for Q1 campaign"
    },
    {
      id: "OUT002",
      sender: "Legal Department",
      recipient: "Johnson & Associates",
      recipientAddress: "456 Law Street, Legal City, State 67890",
      type: "Certified Mail",
      priority: "High",
      status: "pending",
      shippedDate: "",
      shippedTime: "",
      trackingNumber: "",
      carrier: "",
      notes: "Legal documents - signature required"
    },
    {
      id: "OUT003",
      sender: "HR Department",
      recipient: "ABC Consulting",
      recipientAddress: "789 Corporate Blvd, Business Town, State 11111",
      type: "Letter",
      priority: "Medium",
      status: "delivered",
      shippedDate: "2024-01-14",
      shippedTime: "11:00 AM",
      trackingNumber: "TRK987654321",
      carrier: "UPS",
      notes: ""
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800"><Truck className="h-3 w-3 mr-1" />Shipped</Badge>;
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const handleAddMail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newMail = {
      id: `OUT${String(outgoingMail.length + 1).padStart(3, '0')}`,
      sender: formData.get('sender') as string,
      recipient: formData.get('recipient') as string,
      recipientAddress: formData.get('recipientAddress') as string,
      type: formData.get('type') as string,
      priority: formData.get('priority') as string,
      status: "pending",
      shippedDate: "",
      shippedTime: "",
      trackingNumber: "",
      carrier: "",
      notes: formData.get('notes') as string || ""
    };

    setOutgoingMail([newMail, ...outgoingMail]);
    setIsDialogOpen(false);
    addNotification({
      type: "mail",
      title: "Mail Logged Successfully",
      description: `Outgoing mail ${newMail.id} to ${newMail.recipient} has been logged.`,
    });
  };

  const updateStatus = (id: string, newStatus: string, trackingNumber?: string, carrier?: string) => {
    setOutgoingMail(outgoingMail.map(mail => {
      if (mail.id === id) {
        const updatedMail = { ...mail, status: newStatus };
        if (newStatus === "shipped") {
          updatedMail.shippedDate = new Date().toISOString().split('T')[0];
          updatedMail.shippedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          if (trackingNumber) updatedMail.trackingNumber = trackingNumber;
          if (carrier) updatedMail.carrier = carrier;
        }
        return updatedMail;
      }
      return mail;
    }));
    addNotification({
      type: "success",
      title: "Status Updated",
      description: `Mail ${id} status updated to ${newStatus}.`,
    });
  };

  const filteredMail = outgoingMail.filter(mail => {
    const matchesSearch = 
      mail.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mail.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || mail.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Outgoing Mail</h2>
          <p className="text-slate-600">Manage and track outgoing mail items</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
              <Plus className="h-4 w-4 mr-2" />
              Log Outgoing Mail
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Log New Outgoing Mail</DialogTitle>
              <DialogDescription>
                Record details of a new mail item to be sent.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddMail} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sender">Sender Department</Label>
                  <Select name="sender" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Finance Department">Finance Department</SelectItem>
                      <SelectItem value="HR Department">HR Department</SelectItem>
                      <SelectItem value="Legal Department">Legal Department</SelectItem>
                      <SelectItem value="Marketing Department">Marketing Department</SelectItem>
                      <SelectItem value="Operations Department">Operations Department</SelectItem>
                      <SelectItem value="IT Department">IT Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recipient">Recipient</Label>
                  <Input id="recipient" name="recipient" placeholder="Company/Person name" required />
                </div>
              </div>
              <div>
                <Label htmlFor="recipientAddress">Recipient Address</Label>
                <Textarea id="recipientAddress" name="recipientAddress" placeholder="Full mailing address" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Mail Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Letter">Letter</SelectItem>
                      <SelectItem value="Document Package">Document Package</SelectItem>
                      <SelectItem value="Certified Mail">Certified Mail</SelectItem>
                      <SelectItem value="Express">Express</SelectItem>
                      <SelectItem value="Package">Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select name="priority" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" name="notes" placeholder="Additional notes..." />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-purple-700">
                Log Mail Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search by ID, sender, or recipient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mail List */}
      <div className="grid gap-4">
        {filteredMail.map((mail) => (
          <Card key={mail.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Package className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{mail.id}</h3>
                      {mail.shippedDate && (
                        <p className="text-sm text-slate-600">Shipped: {mail.shippedDate} at {mail.shippedTime}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
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
                      {mail.trackingNumber && (
                        <div className="flex items-center">
                          <Truck className="h-3 w-3 mr-2 text-slate-400" />
                          <span className="text-slate-600">Tracking:</span>
                          <span className="ml-2 font-medium">{mail.trackingNumber}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-600">Type:</span>
                        <span className="ml-2 font-medium">{mail.type}</span>
                      </div>
                      {mail.carrier && (
                        <div>
                          <span className="text-slate-600">Carrier:</span>
                          <span className="ml-2 font-medium">{mail.carrier}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-slate-50 rounded text-sm">
                    <span className="text-slate-600">Address:</span> {mail.recipientAddress}
                  </div>
                  
                  {mail.notes && (
                    <div className="mt-2 p-2 bg-slate-50 rounded text-sm">
                      <span className="text-slate-600">Notes:</span> {mail.notes}
                    </div>
                  )}
                </div>
                
                <div className="lg:text-right space-y-3">
                  <div className="flex lg:flex-col items-center lg:items-end gap-2">
                    {getStatusBadge(mail.status)}
                    {getPriorityBadge(mail.priority)}
                  </div>
                  
                  <div className="flex gap-2">
                    {mail.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(mail.id, "shipped", "TRK" + Math.random().toString().substr(2, 9), "FedEx")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Mark Shipped
                      </Button>
                    )}
                    {mail.status === "shipped" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(mail.id, "delivered")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMail.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-12 pb-12 text-center">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No mail found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
