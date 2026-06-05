import { ContactDetailsInfo } from "@/components/ContactDetailsInfo";
import { getFileUrl } from "@/lib/utils/getUrl";
import { FileText } from "lucide-react";

export function TermsMainContentSection({ section }) {
  const pdf = section?.pdf;
  const hasPdf = Boolean(pdf?.url);

  return (
    <section id={section?.id}>
      <div className="container">
        <h1 className="mb-8 font-bold">
          {section?.headline}
        </h1>

        {section?.content ? (
          <div
            className="prose [&>h2]:my-4"
            dangerouslySetInnerHTML={{
              __html: section.content,
            }}
          />
        ) : (
          <div className="prose [&>h2]:my-4">
            Unfortunately, we couldn't load the content for
            this section at the moment.
          </div>
        )}

        {hasPdf ? (
          <div className="border-primary/20 bg-primary/0 mt-8 rounded-md border p-4">
            <a
              href={getFileUrl(pdf?.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-2 font-medium underline underline-offset-4 hover:opacity-80"
              aria-label={`Show ${pdf?.title || "terms"} as PDF`}
            >
              <FileText size={18} aria-hidden="true" />
              Show {pdf?.title || "terms"} as PDF
            </a>
          </div>
        ) : null}

        <ContactDetailsInfo className="mt-8" />
      </div>
    </section>
  );
}

// Mapping of section keys to their corresponding React components for the Terms page
export const termsSectionComponents = {
  mainContent: TermsMainContentSection,
};
