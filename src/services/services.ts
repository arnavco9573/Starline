import { api } from "@/config/axios";

interface WaitlistPayload {
  full_name: string;
  email: string;
  phone_number?: string;
  professional_role?: string;
  organization?: string;
  location?: string;
  firm_size?: string;
  book_demo: boolean;
}

// POST /api/v1/waitlist
export const submitWaitlist = async (data: any) => {
  try {
    const res = await api.post("/api/v1/waitlist", data);
    console.log(res,"response from data")
    return res.data;
  } catch (err: any) {
    console.error("Waitlist submission failed:", err);
    throw err.response?.data || err;
  }
};
