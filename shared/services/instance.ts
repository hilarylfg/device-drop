import {FetchClient} from "@/shared/utils/fetch/fetch-client";

export const api = new FetchClient({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL as string || "http://localhost:3000/api",
  options: {
    credentials: 'include'
  }
})
