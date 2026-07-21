"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/scn/select";

const continentLabels = {
  AF: "Africa",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
  Other: "Other",
};

const continentOrder = [
  "AF",
  "AS",
  "EU",
  "NA",
  "OC",
  "SA",
  "Other",
];

const groupCountriesByContinent = (countries) => {
  return countries.reduce((groups, country) => {
    const continent = country?.continent || "Other";

    if (!groups[continent]) {
      groups[continent] = [];
    }

    groups[continent].push(country);

    return groups;
  }, {});
};

export default function CountrySelect({
  countries = [],
  defaultValue = "SE",
  name = "country",
  id = "country",
  required = false,
  onValueChange,
}) {
  const groupedShippingCountries =
    groupCountriesByContinent(countries);

  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      required={required}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        id={id}
        className="bg-background-foreground border-input/50"
      >
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {continentOrder.map((continent) => {
          const countriesInContinent =
            groupedShippingCountries[continent];

          if (!countriesInContinent?.length) {
            return null;
          }

          return (
            <SelectGroup key={continent}>
              <SelectLabel>
                {continentLabels[continent] || continent}
              </SelectLabel>
              {countriesInContinent.map((country) => (
                <SelectItem
                  key={country.code}
                  value={country.code}
                >
                  {country.name}
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
}
