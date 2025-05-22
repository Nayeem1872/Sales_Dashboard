"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import {
  Download,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Search,
  ArrowUpDown,
  ChevronDown,
  RefreshCw,
  Sparkles,
  Clock,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";

import { Progress } from "../components/ui/progress";
import toast from "react-hot-toast";
import DashboardLayout from "../components/dashboard-layout";

// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000, target: 2400, profit: 2400 },
  { name: "Feb", sales: 3000, target: 2500, profit: 1800 },
  { name: "Mar", sales: 5000, target: 2600, profit: 3200 },
  { name: "Apr", sales: 2780, target: 2700, profit: 1900 },
  { name: "May", sales: 1890, target: 2800, profit: 1200 },
  { name: "Jun", sales: 2390, target: 2900, profit: 1700 },
  { name: "Jul", sales: 3490, target: 3000, profit: 2200 },
];

const weeklySalesData = [
  { name: "Mon", sales: 1200, visitors: 800 },
  { name: "Tue", sales: 1400, visitors: 950 },
  { name: "Wed", sales: 1800, visitors: 1200 },
  { name: "Thu", sales: 1600, visitors: 1100 },
  { name: "Fri", sales: 2000, visitors: 1300 },
  { name: "Sat", sales: 1800, visitors: 1400 },
  { name: "Sun", sales: 1200, visitors: 900 },
];

const productPerformance = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home Goods", value: 20 },
  { name: "Books", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Sample customer data
const customerData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    amount: 1200,
    date: "2023-05-15",
    status: "Completed",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    amount: 850,
    date: "2023-05-14",
    status: "Pending",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    amount: 2300,
    date: "2023-05-13",
    status: "Completed",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    amount: 750,
    date: "2023-05-12",
    status: "Failed",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    amount: 1600,
    date: "2023-05-11",
    status: "Completed",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    amount: 920,
    date: "2023-05-10",
    status: "Pending",
  },
  {
    id: 7,
    name: "David Taylor",
    email: "david@example.com",
    amount: 3100,
    date: "2023-05-09",
    status: "Completed",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    amount: 1450,
    date: "2023-05-08",
    status: "Completed",
  },
  {
    id: 9,
    name: "James Martinez",
    email: "james@example.com",
    amount: 680,
    date: "2023-05-07",
    status: "Failed",
  },
  {
    id: 10,
    name: "Jennifer Robinson",
    email: "jennifer@example.com",
    amount: 2100,
    date: "2023-05-06",
    status: "Completed",
  },
];

export default function DashboardPage() {
  const [chartView, setChartView] = useState<"monthly" | "weekly">("monthly");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "amount" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState("customers");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [realTimeData, setRealTimeData] = useState(weeklySalesData);
  const [visibleColumns] = useState({
    name: true,
    email: true,
    amount: true,
    date: true,
    status: true,
  });
  // const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) =>
        prev.map((item) => ({
          ...item,
          sales: item.sales + Math.floor(Math.random() * 50) - 25,
          visitors: item.visitors + Math.floor(Math.random() * 30) - 15,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredCustomers = customerData
    .filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const handleSort = (column: "name" | "amount" | "date") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const downloadCSV = () => {
    // Create CSV content
    const headers = ["Name", "Email", "Amount", "Date", "Status"];
    const visibleHeaders = headers.filter((_, index) => {
      const keys = ["name", "email", "amount", "date", "status"] as const;
      return visibleColumns[keys[index]];
    });

    const csvContent = [
      visibleHeaders.join(","),
      ...filteredCustomers.map((customer) => {
        const values = [
          visibleColumns.name ? customer.name : null,
          visibleColumns.email ? customer.email : null,
          visibleColumns.amount ? `$${customer.amount}` : null,
          visibleColumns.date
            ? new Date(customer.date).toLocaleDateString()
            : null,
          visibleColumns.status ? customer.status : null,
        ].filter(Boolean);
        return values.join(",");
      }),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `customer_data_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(
      <div>
        <strong>Export successful</strong>
        <div>Customer data has been exported to CSV</div>
      </div>
    );
  };

  const refreshData = () => {
    setIsRefreshing(true);

    // Simulate data refresh
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }

    refreshTimerRef.current = setTimeout(() => {
      // Update with "new" data
      setRealTimeData(
        weeklySalesData.map((item) => ({
          ...item,
          sales: item.sales + Math.floor(Math.random() * 200) - 100,
          visitors: item.visitors + Math.floor(Math.random() * 100) - 50,
        }))
      );

      setIsRefreshing(false);

      toast.success(
        <div>
          <strong>Data refreshed</strong>
          <div>Dashboard data has been updated with the latest information</div>
        </div>
      );
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard Header with Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Sales Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your sales today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Data
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500 font-medium">
                  +20.1%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
              <Progress value={75} className="h-1 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500 font-medium">+19%</span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
              <Progress value={68} className="h-1 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500 font-medium">+12%</span>
                <span className="text-xs text-muted-foreground ml-1">
                  new users today
                </span>
              </div>
              <Progress value={42} className="h-1 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500 font-medium">
                  +0.5%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  from last week
                </span>
              </div>
              <Progress value={32} className="h-1 mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different dashboard views */}
        <Tabs
          defaultValue="customers"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-white grid grid-cols-3 md:w-auto md:grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>
                    View your sales performance over time
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={chartView}
                    onValueChange={(value: "monthly" | "weekly") =>
                      setChartView(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[130px]">
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div id="sales-chart" className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartView === "monthly" ? (
                      <ComposedChart
                        data={salesData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                        <Bar dataKey="target" fill="#82ca9d" name="Target" />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="#ff7300"
                          name="Profit"
                        />
                      </ComposedChart>
                    ) : (
                      <AreaChart
                        data={realTimeData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="sales"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.3}
                          name="Sales"
                        />
                        <Area
                          type="monotone"
                          dataKey="visitors"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          fillOpacity={0.3}
                          name="Visitors"
                        />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>
                    Sales distribution by product category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productPerformance}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {productPerformance.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest sales and customer activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerData.slice(0, 5).map((customer, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 border-b pb-3 last:border-0"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            customer.status
                          )}`}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Purchased for ${customer.amount} •{" "}
                            {new Date(customer.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            customer.status === "Completed"
                              ? "default"
                              : customer.status === "Pending"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>
                  Detailed analysis of your sales performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="target" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="profit" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.6%</div>
                  <p className="text-xs text-muted-foreground">
                    +0.8% from last month
                  </p>
                  <div className="mt-4 h-[60px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", value: 2.4 },
                          { month: "Feb", value: 2.8 },
                          { month: "Mar", value: 3.2 },
                          { month: "Apr", value: 2.9 },
                          { month: "May", value: 3.6 },
                        ]}
                      >
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Order Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$89.42</div>
                  <p className="text-xs text-muted-foreground">
                    +$12.40 from last month
                  </p>
                  <div className="mt-4 h-[60px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", value: 65.2 },
                          { month: "Feb", value: 72.8 },
                          { month: "Mar", value: 78.3 },
                          { month: "Apr", value: 82.1 },
                          { month: "May", value: 89.4 },
                        ]}
                      >
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#82ca9d"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Customer Retention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78.3%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.3% from last month
                  </p>
                  <div className="mt-4 h-[60px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", value: 72.1 },
                          { month: "Feb", value: 74.5 },
                          { month: "Mar", value: 73.8 },
                          { month: "Apr", value: 76.2 },
                          { month: "May", value: 78.3 },
                        ]}
                      >
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#ff7300"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sales Forecast</CardTitle>
                <CardDescription>
                  Projected sales for the next 3 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        ...salesData,
                        {
                          name: "Aug",
                          sales: 3800,
                          target: 3100,
                          profit: 2400,
                        },
                        {
                          name: "Sep",
                          sales: 4200,
                          target: 3200,
                          profit: 2600,
                        },
                        {
                          name: "Oct",
                          sales: 4600,
                          target: 3300,
                          profit: 2900,
                        },
                      ]}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <defs>
                        <linearGradient
                          id="colorSales"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorSales)"
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#82ca9d"
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm font-medium">
                      AI Prediction: 15% growth expected in Q4
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      Last updated: Today at 9:41 AM
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Customer Details</CardTitle>
                  <CardDescription>
                    Manage and analyze your customer base
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative w-[250px]">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Button variant="outline" size="sm" onClick={downloadCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    {visibleColumns.name && (
                      <TableHead className="w-[200px]">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("name")}
                          className="flex items-center"
                        >
                          Customer Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    )}
                    {visibleColumns.email && <TableHead>Email</TableHead>}
                    {visibleColumns.amount && (
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("amount")}
                          className="flex items-center"
                        >
                          Purchase Amount
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    )}
                    {visibleColumns.date && (
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("date")}
                          className="flex items-center"
                        >
                          Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    )}
                    {visibleColumns.status && <TableHead>Status</TableHead>}
                    <TableHead className="text-right">Actions</TableHead>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={
                            Object.values(visibleColumns).filter(Boolean)
                              .length + 1
                          }
                          className="text-center py-8"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Search className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">
                              No customers found
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Try adjusting your search or filter criteria
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          {visibleColumns.name && (
                            <TableCell className="font-medium">
                              {customer.name}
                            </TableCell>
                          )}
                          {visibleColumns.email && (
                            <TableCell>{customer.email}</TableCell>
                          )}
                          {visibleColumns.amount && (
                            <TableCell>
                              ${customer.amount.toLocaleString()}
                            </TableCell>
                          )}
                          {visibleColumns.date && (
                            <TableCell>
                              {new Date(customer.date).toLocaleDateString()}
                            </TableCell>
                          )}
                          {visibleColumns.status && (
                            <TableCell>
                              <Badge
                                variant={
                                  customer.status === "Completed"
                                    ? "default"
                                    : customer.status === "Pending"
                                    ? "outline"
                                    : "destructive"
                                }
                              >
                                {customer.status}
                              </Badge>
                            </TableCell>
                          )}
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit customer
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Delete customer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>
                    Distribution of customers by segment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "New", value: 30 },
                            { name: "Returning", value: 45 },
                            { name: "Loyal", value: 25 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#8884d8" />
                          <Cell fill="#82ca9d" />
                          <Cell fill="#ffc658" />
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                  <CardDescription>Average rating: 4.7/5.0</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">5 Stars</span>
                        <span className="text-sm text-muted-foreground">
                          68%
                        </span>
                      </div>
                      <Progress value={68} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">4 Stars</span>
                        <span className="text-sm text-muted-foreground">
                          24%
                        </span>
                      </div>
                      <Progress value={24} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">3 Stars</span>
                        <span className="text-sm text-muted-foreground">
                          6%
                        </span>
                      </div>
                      <Progress value={6} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">2 Stars</span>
                        <span className="text-sm text-muted-foreground">
                          1%
                        </span>
                      </div>
                      <Progress value={1} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">1 Star</span>
                        <span className="text-sm text-muted-foreground">
                          1%
                        </span>
                      </div>
                      <Progress value={1} className="h-2 mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
