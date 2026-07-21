"use client";

import { Input } from "@/components/ui/scn/input";
import { Label } from "@/components/ui/scn/label";
import CountrySelect from "./CountrySelect";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CountryRegionFields({
  availableShippingCountries = [],
  countryValue = "SE",
  regionValue = "",
  errors = {},
  renderErrors,
}) {
  const handleCountryChange = async (selectedCountry) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/shipping/regions?countryCode=${encodeURIComponent(selectedCountry)}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch regions for country ${selectedCountry}`,
        );
      }

      const regions = await response.json();
      console.log("Fetched regions:", regions);
    } catch (error) {
      console.error(
        "Error fetching shipping regions:",
        error,
      );
    }
  };

  return (
    <div className="xsm:grid-cols-2 grid grid-cols-1 gap-2">
      <div className="xsm:col-span-1 col-span-full space-y-2">
        <Label htmlFor="country">Country *</Label>
        <CountrySelect
          name="country"
          id="country"
          countries={availableShippingCountries}
          defaultValue={countryValue}
          required
          onValueChange={handleCountryChange}
        />
        {renderErrors?.(errors?.country)}
      </div>

      <div className="xsm:col-span-1 col-span-full space-y-2">
        <Label htmlFor="region">Region / State</Label>
        <Input
          name="region"
          id="region"
          placeholder="Region"
          defaultValue={regionValue}
        />
        {renderErrors?.(errors?.region)}
      </div>
    </div>
  );
}
