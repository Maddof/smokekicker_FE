"use client";

import { Input } from "@/components/ui/scn/input";
import { Label } from "@/components/ui/scn/label";
import { Button } from "@/components/ui/scn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/scn/select";
import { CheckCircle2 } from "lucide-react";

/**
 * Helper function to render field errors.
 */
const renderErrors = (errors) => {
  const errorList = Array.isArray(errors)
    ? errors
    : errors
      ? [errors]
      : [];

  return (
    errorList.length > 0 &&
    errorList.map((error, index) => (
      <p
        key={index}
        aria-live="polite"
        className="text-red-500"
      >
        {error}
      </p>
    ))
  );
};

const SHIPPING_COUNTRIES = [
  { value: "SE", label: "Sweden" },
  { value: "DK", label: "Denmark" },
  { value: "FI", label: "Finland" },
  { value: "NO", label: "Norway" },
  { value: "DE", label: "Germany" },
];

/**
 * Reusable address form component
 * @param {Object} props
 * @param {Function} props.formAction - Server action for form submission
 * @param {Object} props.data - Initial form data
 * @param {Object} props.state - Form state from server action
 * @param {boolean} props.pending - Loading state
 * @param {string} props.submitLabel - Custom label for submit button
 * @param {boolean} props.hideSubmitButton - Whether to hide the submit button
 * @param {string} props.loadingLabel - Custom label for loading state
 * @param {boolean} props.showSuccessMessage - Whether to show success message
 * @param {string} props.successMessage - Custom success message text
 */
export default function AddressForm({
  formAction,
  data = {},
  state = {},
  pending = false,
  submitLabel = "Save",
  hideSubmitButton = false,
  loadingLabel = "Saving...",
  showSuccessMessage = true,
  successMessage = "The information has been saved!",
  disableSubmit = false,
}) {
  return (
    <form action={formAction} className="space-y-4">
      <div className="xxsm:grid-cols-2 grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="givenName">First Name</Label>
          </div>
          <Input
            type="text"
            name="givenName"
            id="givenName"
            placeholder="First Name"
            defaultValue={
              state?.data?.givenName ??
              data?.givenName ??
              ""
            }
          />
          {renderErrors(state?.errors?.givenName)}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="surname">Last Name</Label>
          </div>
          <Input
            type="text"
            name="surname"
            id="surname"
            placeholder="Last Name"
            defaultValue={
              state?.data?.surname ?? data?.surname ?? ""
            }
          />
          {renderErrors(state?.errors?.surname)}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          defaultValue={
            state?.data?.email ?? data?.email ?? ""
          }
          required
        />
        {renderErrors(state?.errors?.email)}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Phone"
          defaultValue={
            state?.data?.phone ?? data?.phone ?? ""
          }
          required
        />
        {renderErrors(state?.errors?.phone)}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country *</Label>
        <Select
          name="country"
          defaultValue={
            state?.data?.country ?? data?.country ?? "SE"
          }
          required
        >
          <SelectTrigger
            id="country"
            className="bg-background-foreground border-input/50"
          >
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {SHIPPING_COUNTRIES.map((country) => (
              <SelectItem
                key={country.value}
                value={country.value}
              >
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {renderErrors(state?.errors?.country)}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="line1">Address *</Label>
        </div>
        <Input
          name="line1"
          id="line1"
          placeholder="Address"
          defaultValue={
            state?.data?.line1 ?? data?.line1 ?? ""
          }
          required
          minLength="5"
          maxLength="100"
        />
        {renderErrors(state?.errors?.line1)}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="line2">Address Line 2</Label>
        </div>
        <Input
          name="line2"
          id="line2"
          placeholder="Address Line 2"
          defaultValue={
            state?.data?.line2 ?? data?.line2 ?? ""
          }
          minLength="3"
          maxLength="100"
        />
        {renderErrors(state?.errors?.line2)}
      </div>

      <div className="xxsm:grid-cols-5 grid grid-cols-1 gap-4">
        <div className="xxsm:col-span-2 col-span-full space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="postalCode">
              Postal Code *
            </Label>
          </div>
          <Input
            name="postalCode"
            id="postalCode"
            placeholder="12345"
            defaultValue={
              state?.data?.postalCode ??
              data?.postalCode ??
              ""
            }
            pattern="\d{5}"
            title="Postal code must be exactly 5 digits"
            required
          />
          {renderErrors(state?.errors?.postalCode)}
        </div>

        <div className="xxsm:col-span-3 col-span-full space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="city">City *</Label>
          </div>
          <Input
            name="city"
            id="city"
            placeholder="City"
            defaultValue={
              state?.data?.city ?? data?.city ?? ""
            }
            required
            minLength="2"
            maxLength="50"
          />
          {renderErrors(state?.errors?.city)}
        </div>
      </div>

      {state?.errors?.server && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-700">
            {state.errors.server}
          </p>
        </div>
      )}

      {/* Success message */}
      {showSuccessMessage && state?.success && (
        <div className="flex items-center gap-2 rounded-md bg-green-50 p-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p
            aria-live="polite"
            className="text-sm text-green-700"
          >
            {successMessage}
          </p>
        </div>
      )}

      {!hideSubmitButton && (
        <Button
          type="submit"
          className={`mt-6 w-full ${
            pending || disableSubmit
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          disabled={pending || disableSubmit}
        >
          {pending ? loadingLabel : submitLabel}
        </Button>
      )}
    </form>
  );
}
