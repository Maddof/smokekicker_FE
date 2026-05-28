import { getAccessTokenFromCookies } from "../cookies/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchAllActivePerks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/perks/all/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch active perks");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching active perks:", error);
    return { error: error.message };
  }
};

// Fetch a specific perk by slug (not user-specific)
const fetchActivePerkBySlug = async (perkSlug) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/perks/active/slug/${perkSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch perk with slug: ${perkSlug}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching perk ${perkSlug}:`, error);
    return { error: error.message };
  }
};

const fetchUserPerks = async () => {
  try {
    const token = await getAccessTokenFromCookies();

    const response = await fetch(`${API_BASE_URL}/perks/user/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (response.status === 401) {
      console.error("User is unauthenticated or token is invalid.");
      throw new Error("Unauthorized. Please log in.");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch user perks");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching user perks:", error);
    return { error: error.message };
  }
};

const fetchUserPerkByPerkId = async (perkId) => {
  try {
    const token = await getAccessTokenFromCookies();

    const response = await fetch(`${API_BASE_URL}/perks/user/${perkId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user perk status for perk ID: ${perkId}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user perk status for ${perkId}:`, error);
    return null;
  }
};

export {
  fetchAllActivePerks,
  fetchActivePerkBySlug,
  fetchUserPerks,
  fetchUserPerkByPerkId,
};
