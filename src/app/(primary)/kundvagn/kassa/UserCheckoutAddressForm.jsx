"use client";

import { useActionState, useEffect } from "react";
import { submitCheckoutFormData } from "./action";
import AddressForm from "@/components/AddressForm";

export default function UserCheckoutProfileForm({ data, onAddressSubmit }) {
  const [state, formAction, pending] = useActionState(submitCheckoutFormData, {
    data,
  });

  // When server action succeeds, notify parent component
  useEffect(() => {
    if (state?.success && state?.data) {
      // Call the onAddressSubmit function passed from parent
      // Note: We exclude givenName and surname as they are read-only
      const { givenName, surname, ...submissionData } = state.data;
      onAddressSubmit(submissionData);
    }
  }, [state?.success, state?.data, onAddressSubmit]);
  return (
    <div className="mb-8 space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">
          Leveransinformation
        </h2>
        <p className="text-muted-foreground text-sm">
          Vänligen kontrollera eller uppdatera dina fraktuppgifter. Du kan
          uppdatera din e-postadress och telefonnummer nedan. Namn och
          adressuppgifter hämtas från folkbokföringen och kan inte ändras. Är du
          inte folkbokförd kan du ej beställa från oss.
        </p>
      </div>

      <AddressForm
        formAction={formAction}
        data={data}
        state={state}
        pending={pending}
        submitLabel="Fortsätt"
        loadingLabel="Sparar..."
        showSuccessMessage={false} // Don't show success message in checkout flow
      />
    </div>
  );
}
