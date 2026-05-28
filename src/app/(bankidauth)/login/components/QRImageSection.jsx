import BankIDButton from "@/components/bankid/BankIDButtons";

export default function QRImageSection({
  qrImageSrc,
  hintCode,
  abortAction,
  openOnThisDevice,
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      {qrImageSrc && hintCode === "outstandingTransaction" && (
        <div className="m-4 flex max-w-96 flex-col items-center gap-6 rounded border-2 p-6">
          <div className="mx-auto text-center">
            <h2 className="border-primary mb-2 border-t-4 border-b-4 py-4">
              SCAN QR KOD
            </h2>
            <p>
              Starta BankID-appen och tryck på QR-ikonen. Läs sedan av den här
              QR-koden och tryck på verifiera.
            </p>
          </div>
          <div className="bg-white p-4">
            <img
              src={qrImageSrc}
              alt="BankID QR Code"
              className="h-56 w-56 object-contain"
              onError={() => {
                console.error("QR-koden kunde inte laddas");
              }}
            />
          </div>
          <button
            onClick={abortAction}
            className="border-primary rounded border bg-transparent px-4 py-2 font-semibold hover:text-red-400"
          >
            Avbryt
          </button>
          <BankIDButton
            onClick={openOnThisDevice}
            label={"Starta BankID på denna enhet istället"}
          />
        </div>
      )}
    </div>
  );
}
