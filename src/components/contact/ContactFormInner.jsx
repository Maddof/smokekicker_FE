"use client";

import { useEffect, useRef, useState } from "react";
// import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "../ui/scn/button";
import { Input } from "../ui/scn/input";
import { Label } from "../ui/scn/label";
import "cap-widget";

const BE_BASE_URL =
  process.env.NEXT_PUBLIC_BE_BASE_URL ||
  "https://api.smokify.se";

export const ContactFormInner = () => {
  // const { executeRecaptcha } = useGoogleReCaptcha();
  const capWidgetRef = useRef(null);
  const [capToken, setCapToken] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    // Honeypot fields
    website: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Ensure the CAPTCHA widget is only rendered on the client side to avoid issues with server-side rendering and hydration. The widget will call the onsolve callback when the user successfully completes the CAPTCHA, providing a token that we can use for verification on the backend.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitError("");

    try {
      if (!capToken) {
        throw new Error(
          "Verifiera att du inte är en robot.",
        );
      }

      const response = await fetch(
        `${BE_BASE_URL}/contact/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, capToken }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw { response: { data } };
      }

      // Clear the form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        website: "",
        honeypot: "",
      });
      setCapToken("");
      capWidgetRef.current?.reset();
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000); // Hide success message after 5 seconds
    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle field-specific validation errors
        const fieldErrors = {};
        error.response.data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle general error
        setSubmitError(
          error.response?.data?.error ||
            "Det gick inte att skicka formuläret. Försök igen senare.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <h2 className="mb-6">Kontakta oss</h2>

      {submitSuccess && (
        <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
          Tack för ditt meddelande! Vi återkommer så snart
          som möjligt.
        </div>
      )}

      {submitError && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Honeypot fields - hidden from users but visible to bots */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex="-1"
          aria-hidden="true"
        />
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex="-1"
          aria-hidden="true"
        />

        {/* Name field */}
        <div className="mb-4">
          <Label htmlFor="name" className="mb-2">
            Namn *
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full ${errors.name ? "border-red-500" : "border-gray-300"}`}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="mb-4">
          <Label htmlFor="email" className="mb-2">
            E-post *
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full ${errors.email ? "border-red-500" : "border-gray-300"}`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone field (optional) */}
        <div className="mb-4">
          <Label htmlFor="phone" className="mb-2 block">
            Telefon (valfritt)
          </Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full ${
              errors.phone
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Subject field */}
        <div className="mb-4">
          <Label htmlFor="subject" className="mb-2 block">
            Ämne *
          </Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full ${errors.subject ? "border-red-500" : "border-gray-300"}`}
            required
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message field */}
        <div className="mb-6">
          <Label htmlFor="message" className="mb-2">
            Meddelande *
          </Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={`focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none ${
              errors.message
                ? "border-red-500"
                : "border-gray-300"
            }`}
            required
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message}
            </p>
          )}
        </div>

        {/* CAPTCHA widget */}

        {isMounted && (
          <cap-widget
            ref={capWidgetRef}
            data-cap-api-endpoint="https://cap.smokify.se/2a8eda71be/"
            data-cap-i18n-initial-state="Verifiera att du inte är en robot"
            data-cap-i18n-verifying-label="Verifierar..."
            data-cap-i18n-solved-label="Verifierad"
            onsolve={(e) => {
              setCapToken(e.detail.token);
            }}
            onreset={() => {
              setCapToken("");
            }}
          />
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isSubmitting || !capToken}
          className="w-full"
        >
          {isSubmitting
            ? "Skickar..."
            : "Skicka meddelande"}
        </Button>
      </form>
    </div>
  );
};
