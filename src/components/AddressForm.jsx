"use client";

import { Input } from "@/components/ui/scn/input";
import { Label } from "@/components/ui/scn/label";
import { Button } from "@/components/ui/scn/button";
import { CheckCircle2 } from "lucide-react";

/**
 * Helper function to render field errors.
 */
const renderErrors = (errors) => {
  return (
    errors?.length > 0 &&
    errors.map((error, index) => (
      <p key={index} aria-live="polite" className="text-red-500">
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
 * @param {Array<string>} props.readOnlyFields - Fields that should be read-only
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
  submitLabel = "Spara",
  hideSubmitButton = false,
  loadingLabel = "Sparar...",
  showSuccessMessage = true,
  successMessage = "Uppgifterna har sparats!",
  disableSubmit = false,
}) {
  const readOnlyFields = [
    "givenName",
    "surname",
    "line1",
    "postalCode",
    "city",
  ];

  // Helper to check if a field should be read-only
  const isReadOnly = (fieldName) => readOnlyFields.includes(fieldName);

  return (
    <form action={formAction} className="space-y-4">
      <div className="xxsm:grid-cols-2 grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="givenName">Förnamn</Label>
          </div>
          <Input
            type="text"
            name="givenName"
            id="givenName"
            placeholder="Förnamn"
            defaultValue={state?.data?.givenName ?? data?.givenName ?? ""}
            disabled={isReadOnly("givenName")}
            readOnly={isReadOnly("givenName")}
          />
          {renderErrors(state?.errors?.givenName)}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="surname">Efternamn</Label>
          </div>
          <Input
            type="text"
            name="surname"
            id="surname"
            placeholder="Efternamn"
            defaultValue={state?.data?.surname ?? data?.surname ?? ""}
            disabled={isReadOnly("surname")}
            readOnly={isReadOnly("surname")}
          />
          {renderErrors(state?.errors?.surname)}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-post *</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          defaultValue={state?.data?.email ?? data?.email ?? ""}
          required
        />
        {renderErrors(state?.errors?.email)}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefon *</Label>
        <Input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Telefon"
          defaultValue={state?.data?.phone ?? data?.phone ?? ""}
          required
        />
        {renderErrors(state?.errors?.phone)}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="line1">Adress *</Label>
        </div>
        <Input
          name="line1"
          id="line1"
          placeholder="Gatuadress"
          defaultValue={state?.data?.line1 ?? data?.line1 ?? ""}
          required
          minLength="5"
          maxLength="100"
          readOnly={isReadOnly("line1")}
          className={isReadOnly("line1") ? "cursor-not-allowed opacity-50" : ""}
        />
        {renderErrors(state?.errors?.line1)}
      </div>

      {isReadOnly("line1") && (
        <input
          type="hidden"
          name="line1"
          value={state?.data?.line1 ?? data?.line1 ?? ""}
        />
      )}

      <div className="xxsm:grid-cols-5 grid grid-cols-1 gap-4">
        <div className="xxsm:col-span-2 col-span-full space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="postalCode">Postnummer *</Label>
          </div>
          <Input
            name="postalCode"
            id="postalCode"
            placeholder="12345"
            defaultValue={state?.data?.postalCode ?? data?.postalCode ?? ""}
            pattern="\d{5}"
            title="Postnummer måste vara exakt 5 siffror"
            required
            readOnly={isReadOnly("postalCode")}
            className={
              isReadOnly("postalCode") ? "cursor-not-allowed opacity-50" : ""
            }
          />
          {renderErrors(state?.errors?.postalCode)}
        </div>

        {isReadOnly("postalCode") && (
          <input
            type="hidden"
            name="postalCode"
            value={state?.data?.postalCode ?? data?.postalCode ?? ""}
          />
        )}

        <div className="xxsm:col-span-3 col-span-full space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="city">Stad *</Label>
          </div>
          <Input
            name="city"
            id="city"
            placeholder="Stad/ort"
            defaultValue={state?.data?.city ?? data?.city ?? ""}
            required
            minLength="2"
            maxLength="50"
            readOnly={isReadOnly("city")}
            className={
              isReadOnly("city") ? "cursor-not-allowed opacity-50" : ""
            }
          />
          {renderErrors(state?.errors?.city)}
        </div>
        {isReadOnly("city") && (
          <input
            type="hidden"
            name="city"
            value={state?.data?.city ?? data?.city ?? ""}
          />
        )}
      </div>

      {state?.errors?.server && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-700">{state.errors.server}</p>
        </div>
      )}

      {/* Success message */}
      {showSuccessMessage && state?.success && (
        <div className="flex items-center gap-2 rounded-md bg-green-50 p-3">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <p aria-live="polite" className="text-sm text-green-700">
            {successMessage}
          </p>
        </div>
      )}

      {!hideSubmitButton && (
        <Button
          type="submit"
          className={`mt-6 w-full ${
            pending || disableSubmit ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={pending || disableSubmit}
        >
          {pending ? loadingLabel : submitLabel}
        </Button>
      )}
    </form>
  );
}
