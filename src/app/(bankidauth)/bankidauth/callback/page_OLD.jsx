// "use client";

// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import usePolling from "@/lib/utils/polling";

// const API_BASE_URL = "http://192.168.0.120:5000/api/bankid";

// export default function BankIDCallback() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderRef =
//     searchParams.get("orderRef") || localStorage.getItem("orderRef");

//   const initiated = searchParams.get("initiated") === "true";

//   if (!initiated) {
//     console.error("BankID flow not initiated properly.");
//     router.replace("/bankidauth/failed");
//     return null;
//   }

//   if (!orderRef) {
//     console.error("Missing order ref.");
//     router.replace("/bankidauth/failed");
//     return null;
//   }

//   // Handle redirection back to the original tab
//   // const handleRedirection = (url) => {
//   //   if (window.opener) {
//   //     // Redirect the original tab and close the new tab
//   //     window.opener.location.href = url;
//   //     window.close();
//   //   } else {
//   //     // Redirect in the current tab if no opener is available
//   //     router.replace(url);
//   //   }
//   // };

//   usePolling(
//     async () => {
//       const response = await fetch(`${API_BASE_URL}/collect`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderRef }),
//       });
//       if (!response.ok) throw new Error("Failed to fetch status");
//       return response.json();
//     },
//     1000,
//     () => router.replace("/bankidauth/success"),
//     () => router.replace("/bankidauth/failed")
//   );

//   return (
//     <div>
//       <h1>Processing Authentication...</h1>
//       <p>Please wait while we verify your authentication status.</p>
//     </div>
//   );
// }
