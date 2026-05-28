"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function SmallDot() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="absolute left-6 -mt-1 h-2 w-2 animate-pulse rounded-full bg-transparent" />
    );
  }

  return (
    <div
      className={`border-foreground absolute left-6 -mt-1 h-2 w-2 rounded-full border ${isAuthenticated ? "bg-green-600" : "bg-destructive"}`}
    />
  );
}
