import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/favorites", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate, // mutate là hàm để trigger refetch data
  };
};

export default useFavorites;
