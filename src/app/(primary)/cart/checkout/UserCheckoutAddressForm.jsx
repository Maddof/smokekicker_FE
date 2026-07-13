"use client";

import { useActionState, useEffect } from "react";
import { submitCheckoutFormAddressData } from "./action";
import AddressForm from "@/components/AddressForm";

export default function UserCheckoutProfileForm({
  data,
  onAddressSubmit,
  availableShippingCountries,
}) {
  const [state, formAction, pending] = useActionState(
    submitCheckoutFormAddressData,
    {
      data,
    },
  );

  // When server action succeeds, notify parent component
  useEffect(() => {
    if (state?.success && state?.data) {
      // Call the onAddressSubmit function passed from parent
      const { ...submissionData } = state.data;
      onAddressSubmit(submissionData);
    }
  }, [state?.success, state?.data, onAddressSubmit]);
  return (
    <div className="mb-8 space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">
          Delivery Information
        </h2>
        <p className="text-muted-foreground text-sm">
          Please review or update your shipping information.
          You can update your email address and phone number
          below.
        </p>
      </div>

      <AddressForm
        formAction={formAction}
        data={data}
        state={state}
        pending={pending}
        submitLabel="Continue"
        loadingLabel="Saving..."
        showSuccessMessage={false} // Don't show success message in checkout flow
        disableSubmit={pending} // Disable submit button while pending
        availableShippingCountries={
          availableShippingCountries
        }
      />
    </div>
  );
}
