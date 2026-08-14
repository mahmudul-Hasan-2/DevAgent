export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface FilterParams {
  search: string;
  category: string;
  minBudget: string;
  maxBudget: string;
  sortBy: string;
}

export const fetchProjects = async (filters: FilterParams) => {
  const cleanedParams = new URLSearchParams();

  // শুধুমাত্র ভ্যালু থাকা প্যারামিটারগুলোকেই যুক্ত করা হচ্ছে
  if (filters.search?.trim()) cleanedParams.append("search", filters.search);
  if (filters.category?.trim())
    cleanedParams.append("category", filters.category);
  if (filters.minBudget?.trim())
    cleanedParams.append("minBudget", filters.minBudget);
  if (filters.maxBudget?.trim())
    cleanedParams.append("maxBudget", filters.maxBudget);
  if (filters.sortBy?.trim()) cleanedParams.append("sortBy", filters.sortBy);

  try {
    // URL এর সাথে কোয়েরি প্যারামিটার যুক্ত করা হচ্ছে
    const url = `${BASE_URL}/projects?${cleanedParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Fetch API নিজে থেকে HTTP Error (যেমন: 400, 500) থ্রো করে না, তাই ম্যানুয়ালি চেক করতে হবে
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error; // TanStack Query যেন এরর হ্যান্ডেল করতে পারে
  }
};
