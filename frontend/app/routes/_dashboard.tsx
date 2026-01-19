import React, { useState } from "react";
import {
  Menu,
  X,
  Search,
  LogOut,
  Plus,
  Settings,
  Home,
  Users,
  BarChart3,
  TrendingUp,
  CreditCard,
  Clock,
  Clipboard,
  ChevronDown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const userName = "Sarah Johnson";
  const userRole = "admin";

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "patients", label: "Patients", icon: Users },
    { id: "plans", label: "Plans", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "appointments", label: "Appointments", icon: Clock },
    { id: "referrers", label: "Referrers", icon: Clipboard },
  ];

  const isCurrentPage = (page) => currentPage === page;

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddUserSubmit = () => {
    console.log("User added:", formData);
    setFormData({ name: "", email: "", role: "" });
    setShowAddUserModal(false);
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 z-40`}
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-2 w-full px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isCurrentPage(item.id)
                    ? "bg-purple-100 text-purple-600"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
                title={item.label}
              >
                <Icon size={20} />
              </button>
            );
          })}
        </nav>

        {/* Settings */}
        <button className="w-12 h-12 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 mb-2">
          <Settings size={20} />
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer">
          SJ
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-4 md:px-8">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <h1 className="text-lg font-semibold text-gray-900">
                {menuItems.find((item) => item.id === currentPage)?.label}
              </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden sm:block">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Search Mobile */}
              <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                <Search size={20} />
              </button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      SJ
                    </div>
                    <ChevronDown
                      size={18}
                      className="text-gray-400 hidden sm:block"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-gray-500 capitalize mt-1">
                        {userRole}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userRole === "admin" && (
                    <>
                      <DropdownMenuItem onClick={handleAddUser}>
                        <Plus size={16} className="mr-2 text-purple-600" />
                        <span>Add User</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings size={16} className="mr-2 text-gray-600" />
                        <span>View Logs</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <Outlet />
      </div>

      {/* Add User Modal */}
      <Dialog open={showAddUserModal} onOpenChange={setShowAddUserModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new user to your system.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleFormChange("role", value)}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setShowAddUserModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUserSubmit}
              disabled={!formData.name || !formData.email || !formData.role}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add User
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
