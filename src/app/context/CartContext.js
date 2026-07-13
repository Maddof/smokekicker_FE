"use client";

import {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";

const CartContext = createContext();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    discount: 0,
    total: 0,
    vat: 0,
    net: 0,
    vatRate: 0,
  });
  const [errorMessage, setErrorMessage] = useState(null); // State for managing error messages
  const [loadingProductIds, setLoadingProductIds] =
    useState([]); // Track loading by product ID
  const [loading, setLoading] = useState(false); // Track loading globally

  // const { sessionTimeleft, refreshToken } = useAuth();

  // Fetch the cart from the backend
  const fetchCartFromBackend = async (
    countryCode = "SE",
  ) => {
    // Dubbelkolla även bot-check här innan fetch, ifall någon lyckas trigga fetchCartFromBackend på ett sätt som inte går via useEffect ovan.
    const isBot =
      /bot|googlebot|crawler|spider|robot|crawling/i.test(
        navigator.userAgent,
      );
    if (isBot) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/cart?countryCode=${countryCode}`,
        {
          method: "GET",
          credentials: "include", // Include cookies for fallback
        },
      );

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          setErrorMessage(
            "You must be logged in and registered to manage your cart.",
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
        vat: data.totals.vat,
        net: data.totals.net,
        vatRate: data.totals.vatRate,
      });
      setErrorMessage(null); // Clear any existing error messages

      // if (sessionTimeleft < TEN_MINUTES) {
      //   await refreshToken(); // refreshes token and fetch new session
      // }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setErrorMessage(
        "Failed to load your cart. Please try again later.",
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

      console.log("Add to cart response:", data);

      if (!response.ok) {
        hasError = true;
        console.error("Error adding to cart:", data.error);
        setErrorMessage(data.error); // Store error message in state
        return { success: false, error: data.error };
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
        setTimeout(() => setErrorMessage(null), 3000); // Clear error after 3 seconds
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
      setCartTotals({
        subtotal: 0,
        discount: 0,
        total: 0,
        vat: 0,
        net: 0,
        vatRate: 0,
      }); // Reset totals
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
        fetchCartFromBackend,
        cartItems,
        setCartItems,
        addToCart,
        loadingProductIds,
        loading,
        subtractItemFromCart,
        clearCart,
        removeFromCart,
        totalQuantity,
        cartTotals,
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
