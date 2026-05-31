"use client";
import { useState, Fragment } from "react";
import { Button } from "./ui/scn/button";

export const ReadMore = ({
  id,
  children,
  initialParagraphs = 1,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert children to array for easier handling
  const childrenArray = Array.isArray(children)
    ? children
    : [children];

  // Check if we have enough children to need a "read more" button
  const hasMoreContent =
    childrenArray.length > initialParagraphs;

  // Get initial and hidden content
  const initialContent = childrenArray.slice(
    0,
    initialParagraphs,
  );
  const hiddenContent = childrenArray.slice(
    initialParagraphs,
  );

  return (
    <div
      id={id}
      className="flex flex-col items-start gap-2"
    >
      {/* Always render initial content */}
      {initialContent.map((child, index) => (
        <Fragment key={`initial-${index}`}>
          {child}
        </Fragment>
      ))}

      {/* Render hidden content with conditional visibility */}
      {hasMoreContent && (
        <div
          className={`flex w-full flex-col gap-2 ${isExpanded ? "block" : "hidden"}`}
          aria-hidden={!isExpanded}
        >
          {hiddenContent.map((child, index) => (
            <Fragment key={`hidden-${index}`}>
              {child}
            </Fragment>
          ))}
        </div>
      )}

      {/* Show toggle button if there's more content */}
      {hasMoreContent && (
        <Button
          variant="link"
          className="p-0"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={id}
        >
          {isExpanded ? "show less -" : "show more +"}
        </Button>
      )}
    </div>
  );
};
