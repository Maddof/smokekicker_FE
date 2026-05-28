"use client";

import { useActionState, useEffect } from "react";
import { submitCheckoutFormData } from "./action";
import AddressForm from "@/components/AddressForm";
import { useCart } from "@/app/context/CartContext";

export default function UserCheckoutProfileForm({ data, onAddressSubmit }) {
  const [state, formAction, pending] = useActionState(submitCheckoutFormData, {
    data,
  });

  // Get cart status for free kits check
  const { cartContainsFreeStarterKitsWithoutSubscription } = useCart();

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
        disableSubmit={cartContainsFreeStarterKitsWithoutSubscription} // Disable submit button if cart only has free kits
      />
      {cartContainsFreeStarterKitsWithoutSubscription && (
        <div className="mt-4 rounded-md bg-amber-50 p-3 text-amber-800">
          <p className="text-sm font-medium">
            Din varukorg innehåller startpaket som kräver prenumeration.
            Vänligen lägg till en prenumeration för att fortsätta.
          </p>
        </div>
      )}
    </div>
  );
}
