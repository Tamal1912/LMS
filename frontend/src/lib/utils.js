import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const api=axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})
