import { useCallback, useState } from "react";
import type { ApiResponse, User } from "../types/User.interface";

const useUsersApi = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    perPage: 6
  });

  const fetchUsers = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);

    try {
      try {
        const apiUrl = page === 1
          ? "https://reqres.in/api/users"
          : `https://reqres.in/api/users?page=${page}`;

        console.log(`Fetching from: ${apiUrl} `);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1",
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        console.log("Successfully fetched from external API");

        setUsers(data.data);
        setPagination({
          currentPage: data.page,
          totalPages: data.total_pages,
          total: data.total,
          perPage: data.per_page
        });

      } catch (fetchError) {
        console.error("External API fetch failed:", fetchError);
      }

    } catch (error) {
      console.error("API Route Error:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserDetail = useCallback (async (userId: number): Promise<User | null> => {
    console.log(`Attempting to fetch user with ID: ${userId}`);

    try {
      try {
        const apiUrl = `https://reqres.in/api/users/${userId}`;
        console.log(`Fetching from: ${apiUrl}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "React-App",
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Successfully fetched user from external API");
        return data.data;

      } catch (fetchError) {
        console.error("External API fetch failed for user:", fetchError);
      }

    } catch (error) {
      console.error("User detail fetch error:", error);
      return null;
    }
    return null;
  }, []);

  return {
    users,
    loading,
    error,
    pagination,
    usingFallback,
    fetchUsers,
    fetchUserDetail
  };
};

export default useUsersApi;