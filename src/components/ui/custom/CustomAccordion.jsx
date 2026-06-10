"use client";

import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

/**
 * The top-level wrapper for multiple accordion items.
 * Use this to group AccordionItem components together and apply consistent styling to the entire accordion set.
 * It renders a div that contains all child accordion items, maintaining their layout and structure.
 */
function Accordion({ children, className }) {
  return <div className={className}>{children}</div>;
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Represents a single collapsible section in the accordion.
 * Use this to create an individual expandable item that can be toggled open or closed.
 * It renders a details element that manages its own open/close state with smooth animations.
 */
function AccordionItem({ children, defaultOpen = false }) {
  return (
    <details className="group" open={defaultOpen}>
      {children}
    </details>
  );
}

AccordionItem.propTypes = {
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
};

/**
 * The clickable header of an accordion item.
 * Use this to define the title or trigger that users click to expand or collapse the content.
 * It renders a summary element with a title and an arrow icon that rotates when toggled.
 */
function AccordionTrigger({
  children,
  onClick,
  className,
}) {
  return (
    <summary
      className={cn(
        `flex w-full cursor-pointer items-center justify-between py-4 font-semibold`,
        className,
      )}
      onClick={onClick}
    >
      {children}
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4 shrink-0"
      >
        <path
          d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
          fill="currentColor"
        />
      </svg>
    </summary>
  );
}

AccordionTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

/**
 * The expandable content section of an accordion item.
 * Use this to display the content that appears when the accordion item is opened.
 * It renders a div containing the content, which slides in or out with animation when toggled.
 */
function AccordionContent({ children, className }) {
  return (
    <div
      className={`pb-6 text-sm leading-5 tracking-normal ${className}`}
    >
      {children}
    </div>
  );
}

AccordionContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * A component for creating semantic headings within accordion triggers
 * Allows you to use proper heading levels (h2, h3, etc.) for accessibility
 */
function AccordionHeading({
  level = 2,
  children,
  className,
}) {
  const Heading = `h${level}`;
  return (
    <Heading className={cn("font-semibold", className)}>
      {children}
    </Heading>
  );
}

AccordionHeading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionHeading,
};
