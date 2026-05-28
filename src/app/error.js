"use client";

import { useEffect } from "react";

export default function CustomError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div className="container">
      <h1>Something Went Wrong</h1>
      <p>{error?.message || "An unexpected error occurred."}</p>
    </div>
  );
}
