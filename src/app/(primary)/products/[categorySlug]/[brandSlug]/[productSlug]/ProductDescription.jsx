// Reusable chevron icon component
const ChevronIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
  >
    <path
      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
      fill="currentColor"
    />
  </svg>
);

// Reusable accordion section component
const AccordionSection = ({
  title,
  defaultOpen = false,
  children,
}) => (
  <details
    className="group rounded-2xl border border-gray-100 bg-white px-4 shadow-lg"
    open={defaultOpen}
  >
    <summary className="flex w-full cursor-pointer items-center justify-between py-4">
      <h2 className="h2-accordion-shop">{title}</h2>
      <ChevronIcon />
    </summary>
    <div className="pt-0 pb-6">{children}</div>
  </details>
);

// Format values based on specification type
const formatSpecValue = (spec) => {
  // Use the appropriate value field based on data type
  const { dataType, unit } = spec.specificationType || {};

  if (dataType === "TEXT" && spec.textValue) {
    return spec.textValue;
  }

  if (dataType === "NUMBER" && spec.numericValue !== null) {
    return `${spec.numericValue} ${unit || ""}`;
  }

  if (
    dataType === "BOOLEAN" &&
    spec.booleanValue !== null
  ) {
    return spec.booleanValue ? "Yes" : "No";
  }

  return "N/A";
};

export default function ProductDescription({
  longDesc,
  nicotineLabelWarningText,
  specifications,
  ingredients,
}) {
  const hasSpecifications =
    Array.isArray(specifications) &&
    specifications.length > 0;
  return (
    <section className="pt-4 md:py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-4">
          {/* Product Description */}
          <AccordionSection
            title="Product Description"
            defaultOpen={true}
          >
            {longDesc ? (
              <div
                className="flex flex-col gap-3 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: longDesc,
                }}
              />
            ) : (
              <div className="py-4 text-gray-500">
                <p>
                  The product does not have a detailed
                  description at the moment.
                </p>
              </div>
            )}
            {nicotineLabelWarningText && (
              <div
                className="mt-6 border-4 border-black bg-white p-2 text-center text-xs font-bold text-black uppercase sm:text-sm"
                style={{
                  fontFamily:
                    "Helvetica, Arial, sans-serif",
                }}
              >
                {nicotineLabelWarningText}
              </div>
            )}
          </AccordionSection>

          {/* Specifications - Only show if specifications exist */}
          {hasSpecifications && (
            <AccordionSection title="Specifications">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {specifications.map((spec) => (
                      <tr
                        key={spec.id}
                        className="border-b border-gray-100"
                      >
                        <td className="xsm:w-4/5 py-3 pr-6 font-medium">
                          {spec.specificationType?.name ||
                            `Specification ${spec.specificationTypeId}`}
                        </td>
                        <td className="py-3">
                          {formatSpecValue(spec)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AccordionSection>
          )}

          {/* Ingredients - Only show if ingredients exist */}
          {ingredients && ingredients.trim() !== "" && (
            <AccordionSection title="Ingredients">
              <p>{ingredients}</p>
            </AccordionSection>
          )}
        </div>
      </div>
    </section>
  );
}
