// Component for displaying errors and status messages

export default function StatusDisplay({ error, status }) {
  return (
    <>
      {status && <p>{status}</p>}
      {error && <p className="text-destructive">{error}</p>}
    </>
  );
}
