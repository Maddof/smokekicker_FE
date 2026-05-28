// Used in dashboard subscription management page,
// Used in client components

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const updateSubscriptionDetails = async ({
  subscriptionId,
  intervalCount,
  selectedItems,
}) => {
  const response = await fetch(
    `${API_BASE_URL}/subscriptions/${subscriptionId}/update`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        intervalCount,
        selectedItems,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update subscription");
  }

  const data = await response.json();

  return data;
};

export { updateSubscriptionDetails };
