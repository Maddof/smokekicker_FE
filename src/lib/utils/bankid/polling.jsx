// import { useEffect, useRef } from "react";

// const usePolling = (
//   pollFn,
//   interval = 1000,
//   onComplete,
//   onError,
//   maxRetries = 10
// ) => {
//   const isPolling = useRef(true);
//   const retries = useRef(0);

//   useEffect(() => {
//     const poll = async () => {
//       try {
//         const result = await pollFn();
//         if (!isPolling.current || retries.current >= maxRetries) return;

//         if (result.status === "complete") {
//           isPolling.current = false;
//           onComplete(result);
//         } else if (result.status === "failed") {
//           isPolling.current = false;
//           onError(result);
//         } else {
//           retries.current += 1; // Increment retries
//           setTimeout(poll, interval);
//         }
//       } catch (error) {
//         isPolling.current = false;
//         onError(error);
//       }
//     };

//     poll();

//     return () => {
//       isPolling.current = false;
//     };
//   }, [pollFn, interval, onComplete, onError, maxRetries]);
// };

// export default usePolling;

// //pollFn, interval, onComplete, onError, maxRetries
