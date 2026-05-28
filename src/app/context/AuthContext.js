"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCookie } from "@/lib/utils/cookies/cookiesClient";
import { refreshAccessToken } from "./refreshToken";
import SessionExpireModal from "@/components/auth/SessionExpireModal";
import { handleLogout } from "@/lib/utils/user/userUtils";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [sessionTimeleft, setSessionTimeleft] = useState(null);
  let intervalId = null; // Variable to store the interval

  const fetchSession = async () => {
    // Step 2: Fetch session data if `authStatus` is true

    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
      });
      if (response.ok) {
        const session = await response.json();
        setUser(session);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    await refreshAccessToken();
    clearInterval(intervalId);
    await fetchSession(); // Fetch new session after refreshing
    setShowModal(false); // Close modal
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    handleLogout();
  };

  // Function to check token expiration and auto logout
  const checkSessionExpiration = () => {
    if (!user || !user.exp) return;

    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    const remainingTime = user.exp - currentTime;

    setSessionTimeleft(remainingTime);

    // We show the modal if less then 60sec left
    if (remainingTime <= 60) {
      setShowModal(true);
    }

    // We auto logout if no time left
    if (remainingTime <= 0) {
      handleLogout(); // Auto logout if expired
    }
  };

  // Fetch session data when the app mounts
  useEffect(() => {
    // Step 1: Check the `authStatus` cookie
    const authStatus = getCookie("authStatus");

    if (!authStatus || authStatus !== "true") {
      // If `authStatus` is not set or indicates not authenticated
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
    fetchSession();
  }, []);

  // Polling mechanism
  useEffect(() => {
    if (user) {
      checkSessionExpiration(); // Initial check

      intervalId = setInterval(() => {
        checkSessionExpiration();
      }, 1000 * 60); // Polling every 60 seconds (60000)

      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        refreshToken,
        sessionTimeleft,
      }}
    >
      {children}

      {/* Show modal when time is low */}
      <SessionExpireModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onRefresh={refreshToken}
      />
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
