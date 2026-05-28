export default function QuickHeaderDashboardWrapper({
  children,
  className = "",
}) {
  return (
    <div className="xsm:flex-row mb-8 flex flex-col items-start justify-between gap-4">
      {children}
    </div>
  );
}
