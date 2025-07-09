import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: false, message: "Method Not Allowed" });
  }

  try {
    const success = await signUp(req.body);

    if (success) {
      return res.status(200).json({ status: true, message: "Success" });
    } else {
      return res.status(409).json({ status: false, message: "Email already registered" });
    }
  } catch (err: any) {
    console.error("🔥 Error internal:", err);
    return res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
  }
}
