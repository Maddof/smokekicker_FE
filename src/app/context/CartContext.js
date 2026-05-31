"use client";

import {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import {
  calcSubtotal,
  calcVat,
} from "@/lib/utils/cart/calculations";

const CartContext = createContext();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEN_MINUTES = parseInt(
  process.env.NEXT_PUBLIC_TIMECHECK_TOKEN,
);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    discount: 0,
    total: 0,
  });
  const [errorMessage, setErrorMessage] = useState(null); // State for managing error messages
  const [loadingProductIds, setLoadingProductIds] =
    useState([]); // Track loading by product ID
  const [loading, setLoading] = useState(false); // Track loading globally
  const [shippingCost, setShippingCost] = useState(0); // Default shipping cost (example)

  // const { sessionTimeleft, refreshToken } = useAuth();

  // Fetch the cart from the backend
  const fetchCartFromBackend = async () => {
    // Dubbelkolla även bot-check här innan fetch, ifall någon lyckas trigga fetchCartFromBackend på ett sätt som inte går via useEffect ovan.
    const isBot =
      /bot|googlebot|crawler|spider|robot|crawling/i.test(
        navigator.userAgent,
      );
    if (isBot) return;

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "GET",
        credentials: "include", // Include cookies for fallback
      });

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          setErrorMessage(
            "Du måste vara inloggad och registrerad för att hantera din varukorg.",
          );
          return;
        }
        // Unexpected error: Throw for further handling
        throw new Error(
          `Failed to fetch cart: ${response.statusText}`,
        );
      }

      const data = await response.json();
      // console.log("Fetched cart data:", data);
      setCartItems(data.items); // Sync cart state
      setCartTotals({
        subtotal: data.totals.subtotal,
        discount: data.totals.discount,
        total: data.totals.total,
      });
      setErrorMessage(null); // Clear any existing error messages

      // if (sessionTimeleft < TEN_MINUTES) {
      //   await refreshToken(); // refreshes token and fetch new session
      // }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setErrorMessage(
        "Kunde inte ladda din varukorg. Vänligen försök igen senare.",
      ); // Handle unexpected errors
      // alert("Kunde inte ladda din varukorg.");
      // window.location.reload(); // Refresh the page to recover from error
    }
  };

  // Add an item to the cart
  const addToCart = async (productId, quantity = 1) => {
    const safeQuantity = Math.max(1, Number(quantity) || 1);
    let hasError = false;
    try {
      setLoading(true); // Start loading
      setLoadingProductIds((prev) => [...prev, productId]); // Add product ID to loading state

      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity: safeQuantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        hasError = true;
        console.error("Error adding to cart:", data.error);
        setErrorMessage(data.error); // Store error message in state
        return { success: false, error: data.error };
        return;
      }
    } catch (error) {
      hasError = true;
      console.error("Error adding to cart:", error);
      setErrorMessage(error.message); // Set error message
      return { success: false, error: error.message };
    } finally {
      // await fetchCartFromBackend(); // Refresh cart
      setLoadingProductIds((prev) =>
        prev.filter((id) => id !== productId),
      ); // Remove product ID from loading state
      setLoading(false); // Stop loading
      if (!hasError) {
        setErrorMessage(null);
        await fetchCartFromBackend();
      } else {
        setTimeout(() => setErrorMessage(null), 3000); // Clear error after 4 seconds
      }
      // setErrorMessage(null); // Clear error if successful
    }
  };

  // Subtract an item from the cart
  const subtractItemFromCart = async (productId) => {
    try {
      setLoading(true); // Start loading

      // Find product in cart using flattened key itemId
      const productInCart = cartItems.find(
        (item) => item.itemId === productId,
      );

      if (productInCart.quantity > 1) {
        // Decrease quantity in backend
        await fetch(`${API_BASE_URL}/cart`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies for fallback

          body: JSON.stringify({
            productId,
            quantity: 1, // Reduce by 1
          }),
        });
      } else {
        // Remove item from backend if quantity becomes zero
        await fetch(`${API_BASE_URL}/cart`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include cookies for fallback

          body: JSON.stringify({ productId }),
        });
      }
      await fetchCartFromBackend(); // Refresh cart
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Remove a specific item from the cart
  const removeFromCart = async (item) => {
    try {
      setLoading(true); // Start loading

      // Since the cart is flattened, use item.itemId depending on the type
      const payload = { productId: item.itemId };

      await fetch(`${API_BASE_URL}/cart/item`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for fallback

        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error,
      );
    } finally {
      await fetchCartFromBackend(); // Refresh cart
      setLoading(false); // Stop loading
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      setLoading(true);

      await fetch(`${API_BASE_URL}/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies for fallback
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setCartItems([]); // Clear local state
      setCartTotals({ subtotal: 0, discount: 0, total: 0 }); // Reset totals
      setLoading(false);
    }
  };

  // Calculate total quantity of items in the cart
  const totalQuantity = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [cartItems]);

  // "subtotal before discount" comes from server when available
  const subtotal = useMemo(() => {
    if (cartTotals?.subtotal != null)
      return cartTotals.subtotal;
    return calcSubtotal(cartItems);
    // return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }, [cartItems, cartTotals]);

  const discount = useMemo(() => {
    return cartTotals?.discount ?? 0;
  }, [cartTotals]);

  const vat = useMemo(() => {
    // Calculate VAT based on cart items and shipping cost
    return calcVat(cartItems, shippingCost);
  }, [cartItems, shippingCost]);

  // Calculate total (subtotal + shipping + taxes/other modifiers)
  const total = useMemo(() => {
    // Backend total excludes shipping, so we add it here
    const base =
      cartTotals?.total ?? calcSubtotal(cartItems);
    return base + shippingCost; // Add other modifiers like taxes if needed
  }, [cartTotals, cartItems, shippingCost]);

  // Helpers to get unit price

  const getUnitPrice = (item) =>
    item?.pricing?.unitPrice ?? item.price ?? 0;

  const getDiscountedUnitPrice = (item) =>
    item?.pricing?.discountedUnitPrice ?? item.price ?? 0;

  const getLineTotal = (item) =>
    item?.pricing?.lineTotal ??
    (item.price || 0) * (item.quantity || 0);

  const getLineDiscount = (item) =>
    item?.pricing?.lineDiscount ??
    Math.max(
      (item.price || 0) * (item.quantity || 0) -
        getLineTotal(item),
      0,
    );

  const getLineSubtotal = (item) =>
    item?.pricing?.lineSubtotal ??
    (getUnitPrice(item) || 0) * (item?.quantity || 0);

  // Fetch the cart on component mount
  useEffect(() => {
    // const authStatus = getCookie("authStatus");
    // if (!authStatus || authStatus !== "true") {
    //   // If `authStatus` is not set or indicates not authenticated
    //   setLoading(false);
    //   return;
    // }
    // Check user agent to prevent fetching cart for bots/crawlers
    const isBot =
      /bot|googlebot|crawler|spider|robot|crawling/i.test(
        navigator.userAgent,
      );
    if (isBot) return;

    // Todo: Will check for cart cookie instead of authStatus in the future, to allow cart fetching for non-logged in users as well.

    fetchCartFromBackend();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        loadingProductIds,
        loading,
        subtractItemFromCart,
        clearCart,
        removeFromCart,
        totalQuantity,
        subtotal,
        vat,
        shippingCost,
        setShippingCost,
        total,
        discount,
        errorMessage,
        getUnitPrice,
        getDiscountedUnitPrice,
        getLineTotal,
        getLineDiscount,
        getLineSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
