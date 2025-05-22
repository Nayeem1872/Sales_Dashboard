"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, ChevronRight, Lock, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@dot.com");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to dashboard
  type LocationState = { from?: { pathname: string } };
  const from =
    (location.state as LocationState)?.from?.pathname || "/dashboard";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@dot.com" && password === "123456") {
      // Set mock token in cookies
      document.cookie = "auth_token=mock_token_12345; path=/; max-age=86400";
      document.cookie = "user_name=Admin User; path=/; max-age=86400";
      document.cookie = "user_email=admin@dot.com; path=/; max-age=86400";

      toast.success("Login successful! Welcome to the dashboard.");

      navigate(from, { replace: true });
    } else {
      toast.error("Login failed: Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-100 to-indigo-200 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-100 to-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-tr from-purple-200 to-indigo-300 opacity-20 blur-3xl"></div>
      </div>

      <div className="z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sales Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Sign in to access your admin panel
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-none bg-white/80 shadow-xl backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@dot.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <a
                      href="#"
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="relative w-full overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all hover:from-indigo-600 hover:to-purple-700"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                    <span className="absolute inset-0 -z-10 transform bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
                  </Button>
                </div>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-4 flex-shrink text-xs text-gray-400">
                    Demo Credentials
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="rounded-md bg-gray-50 p-3">
                  <div className="text-xs text-gray-500">
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      admin@dot.com
                    </p>
                    <p>
                      <span className="font-semibold">Password:</span> 123456
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Contact your administrator
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
