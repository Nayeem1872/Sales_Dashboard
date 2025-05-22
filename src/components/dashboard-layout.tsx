import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  BarChart3,
  Search,
  Menu,
  X,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Sheet, SheetContent } from "../components/ui/sheet";
import { cn } from "../lib/utils";
import { toast } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const userNameCookie = cookies.find((cookie) =>
      cookie.startsWith("user_name=")
    );
    const userEmailCookie = cookies.find((cookie) =>
      cookie.startsWith("user_email=")
    );

    if (userNameCookie) {
      setUserName(decodeURIComponent(userNameCookie.split("=")[1]));
    }

    if (userEmailCookie) {
      setUserEmail(decodeURIComponent(userEmailCookie.split("=")[1]));
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; max-age=0";
    document.cookie = "user_name=; path=/; max-age=0";
    document.cookie = "user_email=; path=/; max-age=0";

    toast.success("You have been logged out successfully");
    navigate("/");
  };

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "Sales Dashboard";
    if (location.pathname === "/faq") return "FAQ Settings";
    return "Dashboard";
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      current: location.pathname === "/dashboard",
    },
    {
      name: "FAQ Settings",
      href: "/faq",
      icon: HelpCircle,
      current: location.pathname === "/faq",
    },
    {
      name: "Log out",
      icon: LogOut,
      action: handleLogout, // Renamed from href to action for clarity
      current: false, // Logout is an action, not a current page
    },
  ];

  // Helper function to render navigation item content (icon + name)
  const renderNavItemContent = (item: (typeof navigation)[0]) => (
    <>
      <item.icon
        className={cn(
          "mr-3 h-5 w-5 flex-shrink-0",
          item.current
            ? "text-gray-500"
            : "text-gray-400 group-hover:text-gray-500"
        )}
        aria-hidden="true"
      />
      {item.name}
    </>
  );

  // Helper function to get common classes for nav items
  const getNavItemClasses = (current: boolean) =>
    cn(
      "group flex items-center rounded-md px-2 py-2 text-sm font-medium w-full text-left", // Added w-full and text-left for button consistency
      current
        ? "bg-gray-100 text-gray-900"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h1 className="text-xl font-bold">Sales Admin</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) =>
              item.href ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={getNavItemClasses(item.current)}
                >
                  {renderNavItemContent(item)}
                </Link>
              ) : item.action ? (
                <button
                  key={item.name}
                  onClick={item.action}
                  className={getNavItemClasses(item.current)}
                >
                  {renderNavItemContent(item)}
                </button>
              ) : null
            )}
          </div>
        </nav>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <h1 className="text-xl font-bold">Sales Admin</h1>
          </div>
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navigation.map((item) =>
                item.href ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={getNavItemClasses(item.current)}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {renderNavItemContent(item)}
                  </Link>
                ) : item.action ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.action) item.action();
                      setIsMobileMenuOpen(false);
                    }}
                    className={getNavItemClasses(item.current)}
                  >
                    {renderNavItemContent(item)}
                  </button>
                ) : null
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-2 hidden md:inline-flex"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative mx-4 flex-1 md:mx-0">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center">
              <h1 className="hidden text-xl font-semibold text-gray-800 md:block">
                {getPageTitle()}
              </h1>
            </div>

            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32" // You might want to replace this with a dynamic user image or a better placeholder
                        alt="User"
                      />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userName || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail || "No email"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  {/* Removed DropdownMenuSeparator and LogOut DropdownMenuItem */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
