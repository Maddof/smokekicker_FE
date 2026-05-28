"use client";

import { useActionState } from "react";
import AddressForm from "@/components/AddressForm";
import { submitCheckoutFormData } from "../../kundvagn/kassa/action";

export default function UserProfileForm({ data }) {
  const [state, formAction, pending] = useActionState(submitCheckoutFormData, {
    data,
  });

  return (
    <AddressForm
      formAction={formAction}
      data={data}
      state={state}
      pending={pending}
      readOnlyFields={["givenName", "surname"]}
      submitLabel="Spara ändringar"
      loadingLabel="Sparar..."
      successMessage="Din profil har uppdaterats!"
    />
  );
}
