
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, Mail, User, Building, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const IncomingMail = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [incomingMail, setIncomingMail] = useState([
    {
      id: "IN001",
      sender: "ABC Corporation",
      recipient: "John Smith",
      department: "Finance",
      type: "Letter",
      priority: "Normal",
      status: "awaiting_pickup",
      receivedDate: "2024-01-15",
      receivedTime: "09:30 AM",
      notes: "Confidential document"
    },
    {
      id: "IN002",
      sender: "Legal Services Inc",
      recipient: "Sarah Johnson",
      department: "Legal",
      type: "Package",
      priority: "High",
      status: "delivered",
      receivedDate: "2024-01-15",
      receivedTime: "10:15 AM",
      notes: "Signature required"
    },
    {
      id: "IN003",
      sender: "Government Office",
      recipient: "Mike Davis",
      department: "HR",
      type: "Certified Mail",
      priority: "High",
      status: "awaiting_pickup",
      receivedDate: "2024-01-15",
      receivedTime: "11:00 AM",
      notes: ""
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case "awaiting_pickup":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Awaiting Pickup</Badge>;
      case "notified":
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3 mr-1" />Notified</Badge>;
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
      id: `IN${String(incomingMail.length + 1).padStart(3, '0')}`,
      sender: formData.get('sender') as string,
      recipient: formData.get('recipient') as string,
      department: formData.get('department') as string,
      type: formData.get('type') as string,
      priority: formData.get('priority') as string,
      status: "awaiting_pickup",
      receivedDate: new Date().toISOString().split('T')[0],
      receivedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: formData.get('notes') as string || ""
    };

    setIncomingMail([newMail, ...incomingMail]);
    setIsDialogOpen(false);
    toast({
      title: "Mail Logged",
      description: `Incoming mail ${newMail.id} has been successfully logged.`,
    });
  };

  const updateStatus = (id: string, newStatus: string) => {
    setIncomingMail(incomingMail.map(mail => 
      mail.id === id ? { ...mail, status: newStatus } : mail
    ));
    toast({
      title: "Status Updated",
      description: `Mail ${id} status updated to ${newStatus.replace('_', ' ')}.`,
    });
  };

  const filteredMail = incomingMail.filter(mail => {
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
          <h2 className="text-2xl font-bold text-slate-800">Incoming Mail</h2>
          <p className="text-slate-600">Manage and track incoming mail items</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <Plus className="h-4 w-4 mr-2" />
              Log Incoming Mail
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Log New Incoming Mail</DialogTitle>
              <DialogDescription>
                Record details of a new mail item received.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddMail} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sender">Sender</Label>
                  <Input id="sender" name="sender" placeholder="Company/Person name" required />
                </div>
                <div>
                  <Label htmlFor="recipient">Recipient</Label>
                  <Input id="recipient" name="recipient" placeholder="Employee name" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select name="department" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Mail Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Letter">Letter</SelectItem>
                      <SelectItem value="Package">Package</SelectItem>
                      <SelectItem value="Certified Mail">Certified Mail</SelectItem>
                      <SelectItem value="Express">Express</SelectItem>
                      <SelectItem value="Document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" name="notes" placeholder="Additional notes..." />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
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
                  <SelectItem value="awaiting_pickup">Awaiting Pickup</SelectItem>
                  <SelectItem value="notified">Notified</SelectItem>
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
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{mail.id}</h3>
                      <p className="text-sm text-slate-600">{mail.receivedDate} at {mail.receivedTime}</p>
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
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-600">Department:</span>
                        <span className="ml-2 font-medium">{mail.department}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Type:</span>
                        <span className="ml-2 font-medium">{mail.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  {mail.notes && (
                    <div className="mt-3 p-2 bg-slate-50 rounded text-sm">
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
                    {mail.status === "awaiting_pickup" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(mail.id, "notified")}
                        >
                          Notify
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(mail.id, "delivered")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Mark Delivered
                        </Button>
                      </>
                    )}
                    {mail.status === "notified" && (
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
            <Mail className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No mail found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
