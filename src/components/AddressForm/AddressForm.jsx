"use client";

import { Input } from "@/components/ui/scn/input";
import { Label } from "@/components/ui/scn/label";
import { Button } from "@/components/ui/scn/button";
import { CheckCircle2 } from "lucide-react";
import CountryRegionFields from "./CountryRegionFields";

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
  loadingLabel = "Saving...",
  showSuccessMessage = true,
  successMessage = "The information has been saved!",
  availableShippingCountries = [],
}) {
  return (
    <form
      action={formAction}
      className="flex flex-col gap-6"
    >
      <div className="xsm:grid-cols-2 grid grid-cols-1 gap-2">
        <div className="space-y-2">
          <Label htmlFor="givenName">First Name *</Label>
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
            required
          />
          {renderErrors(state?.errors?.givenName)}
        </div>

        <div className="space-y-2">
          <Label htmlFor="surname">Last Name *</Label>
          <Input
            type="text"
            name="surname"
            id="surname"
            placeholder="Last Name"
            defaultValue={
              state?.data?.surname ?? data?.surname ?? ""
            }
            required
          />
          {renderErrors(state?.errors?.surname)}
        </div>
      </div>

      <div className="xsm:grid-cols-2 grid grid-cols-1 gap-2">
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
            placeholder="+00 12 123 45 67"
            defaultValue={
              state?.data?.phone ?? data?.phone ?? ""
            }
            required
          />
          {renderErrors(state?.errors?.phone)}
        </div>
      </div>

      <CountryRegionFields
        availableShippingCountries={
          availableShippingCountries
        }
        countryValue={
          state?.data?.country ?? data?.country ?? "SE"
        }
        regionValue={
          state?.data?.region ?? data?.region ?? ""
        }
        errors={state?.errors}
        renderErrors={renderErrors}
      />

      <div className="space-y-2">
        <Label htmlFor="line1">Address *</Label>
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
        <Label htmlFor="line2">Address Line 2</Label>
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

      <div className="xsm:grid-cols-5 grid grid-cols-1 gap-2">
        <div className="xsm:col-span-2 col-span-full space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            name="postalCode"
            id="postalCode"
            placeholder="12345"
            defaultValue={
              state?.data?.postalCode ??
              data?.postalCode ??
              ""
            }
            title="Postal code must be exactly 5 digits"
            required
            minLength="2"
            maxLength="10"
          />
          {renderErrors(state?.errors?.postalCode)}
        </div>

        <div className="xsm:col-span-3 col-span-full space-y-2">
          <Label htmlFor="city">City *</Label>
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
      <Button
        type="submit"
        className={`mt-2 w-full ${
          pending ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={pending}
      >
        {pending ? loadingLabel : submitLabel}
      </Button>
    </form>
  );
}
