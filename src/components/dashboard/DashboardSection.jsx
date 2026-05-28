export default function DashboardSectionWrapper({ children, className = "" }) {
  return (
    <section className={`pt-8 pb-16 ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}
