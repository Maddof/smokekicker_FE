"use client";

import { useState } from "react";
import AtcButtonFreeKit from "@/components/cart/atcButtonFreeKit";
import FreeStarterKitSelector from "./FreeStarterKitSelector";

const SubscriptionFreeKitForm = ({ starterKits }) => {
  const [selectedKit, setSelectedKit] = useState("");

  return (
    <>
      <FreeStarterKitSelector
        starterKits={starterKits}
        selectedKit={selectedKit}
        onSelectKit={setSelectedKit}
      />
      <AtcButtonFreeKit product={selectedKit} />
    </>
  );
};

export default SubscriptionFreeKitForm;
