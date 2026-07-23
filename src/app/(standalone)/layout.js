export default function StandaloneLayout({ children }) {
  return (
    <main
      className="flex flex-col items-center justify-center px-4 py-16"
      style={{ minHeight: "100vh" }}
    >
      {children}
    </main>
  );
}
