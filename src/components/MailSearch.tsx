
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, CalendarIcon, Filter, Mail, Package, User, Building, Clock, CheckCircle, AlertCircle, Truck } from "lucide-react";
import { format } from "date-fns";

export const MailSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mailType, setMailType] = useState("all");
  const [status, setStatus] = useState("all");
  const [direction, setDirection] = useState("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample data - in a real app, this would come from your database
  const allMail = [
    {
      id: "IN001",
      direction: "incoming",
      sender: "ABC Corporation",
      recipient: "John Smith",
      department: "Finance",
      type: "Letter",
      priority: "Normal",
      status: "delivered",
      date: "2024-01-15",
      time: "09:30 AM",
      notes: "Confidential document"
    },
    {
      id: "OUT001",
      direction: "outgoing",
      sender: "Marketing Department",
      recipient: "XYZ Corporation",
      recipientAddress: "123 Business Ave, City, State 12345",
      type: "Document Package",
      priority: "Normal",
      status: "shipped",
      date: "2024-01-15",
      time: "02:30 PM",
      trackingNumber: "TRK123456789",
      carrier: "FedEx",
      notes: "Marketing materials for Q1 campaign"
    },
    {
      id: "IN002",
      direction: "incoming",
      sender: "Legal Services Inc",
      recipient: "Sarah Johnson",
      department: "Legal",
      type: "Package",
      priority: "High",
      status: "awaiting_pickup",
      date: "2024-01-14",
      time: "10:15 AM",
      notes: "Signature required"
    },
    {
      id: "OUT002",
      direction: "outgoing",
      sender: "Legal Department",
      recipient: "Johnson & Associates",
      recipientAddress: "456 Law Street, Legal City, State 67890",
      type: "Certified Mail",
      priority: "High",
      status: "pending",
      date: "2024-01-14",
      time: "",
      notes: "Legal documents - signature required"
    }
  ];

  const handleSearch = () => {
    let results = allMail;

    // Filter by search query
    if (searchQuery.trim()) {
      results = results.filter(mail => 
        mail.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mail.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mail.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (mail.notes && mail.notes.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by mail type
    if (mailType !== "all") {
      results = results.filter(mail => mail.type === mailType);
    }

    // Filter by status
    if (status !== "all") {
      results = results.filter(mail => mail.status === status);
    }

    // Filter by direction
    if (direction !== "all") {
      results = results.filter(mail => mail.direction === direction);
    }

    // Filter by date range
    if (startDate) {
      results = results.filter(mail => new Date(mail.date) >= startDate);
    }
    if (endDate) {
      results = results.filter(mail => new Date(mail.date) <= endDate);
    }

    setSearchResults(results);
    setHasSearched(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setMailType("all");
    setStatus("all");
    setDirection("all");
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchResults([]);
    setHasSearched(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-800"><Truck className="h-3 w-3 mr-1" />Shipped</Badge>;
      case "awaiting_pickup":
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Awaiting Pickup</Badge>;
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Mail Search</h2>
        <p className="text-slate-600">Search and filter all mail records</p>
      </div>

      {/* Search Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800">Search Filters</CardTitle>
          <CardDescription>Use the filters below to find specific mail items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Query */}
          <div>
            <Label htmlFor="search">Search Query</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                id="search"
                placeholder="Search by ID, sender, recipient, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="direction">Direction</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Directions</SelectItem>
                  <SelectItem value="incoming">Incoming</SelectItem>
                  <SelectItem value="outgoing">Outgoing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mailType">Mail Type</Label>
              <Select value={mailType} onValueChange={setMailType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Letter">Letter</SelectItem>
                  <SelectItem value="Package">Package</SelectItem>
                  <SelectItem value="Document Package">Document Package</SelectItem>
                  <SelectItem value="Certified Mail">Certified Mail</SelectItem>
                  <SelectItem value="Express">Express</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="awaiting_pickup">Awaiting Pickup</SelectItem>
                  <SelectItem value="notified">Notified</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSearch} className="bg-gradient-to-r from-blue-600 to-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">
              Search Results ({searchResults.length} items found)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((mail) => (
                  <div key={mail.id} className="p-4 bg-slate-50 rounded-lg border">
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
                            <p className="text-sm text-slate-600">{mail.date} {mail.time && `at ${mail.time}`}</p>
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
                              <span className="text-slate-600">Type:</span>
                              <span className="ml-2 font-medium">{mail.type}</span>
                            </div>
                            {mail.trackingNumber && (
                              <div>
                                <span className="text-slate-600">Tracking:</span>
                                <span className="ml-2 font-medium">{mail.trackingNumber}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {mail.notes && (
                          <div className="mt-3 p-2 bg-white rounded text-sm">
                            <span className="text-slate-600">Notes:</span> {mail.notes}
                          </div>
                        )}
                      </div>
                      
                      <div className="lg:text-right space-y-2">
                        <div className="flex lg:flex-col items-center lg:items-end gap-2">
                          {getStatusBadge(mail.status)}
                          {getPriorityBadge(mail.priority)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">No results found</h3>
                <p className="text-slate-600">Try adjusting your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!hasSearched && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="pt-12 pb-12 text-center">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">Ready to Search</h3>
            <p className="text-slate-600">Use the filters above and click "Search" to find mail records.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
