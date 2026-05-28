import { ContactDetailsInfo } from "@/components/ContactDetailsInfo";

export function PrivacyMainContentSection({ section }) {
  return (
    <section id={section?.id}>
      <div className="container">
        <h1 className="mb-8 font-bold">{section?.headline}</h1>

        {section?.content ? (
          <div
            className="prose [&>h2]:my-4"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        ) : (
          <div className="prose [&>h2]:my-4">
            Tyvärr kunde vi inte ladda innehållet för den här sektionen just nu.
          </div>
        )}
        <ContactDetailsInfo className="mt-8" />
      </div>
    </section>
  );
}

// Mapping of section keys to their corresponding React components for the Privacy Policy page
export const privacySectionComponents = {
  mainContent: PrivacyMainContentSection,
};
