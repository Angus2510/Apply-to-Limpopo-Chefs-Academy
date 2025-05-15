// app/api/finalSubmit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { handleFinalSubmission } from "@/utils/formSubmission";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Extract the captcha token from the request
    const { captchaToken, ...formData } = data;

    // Check if captcha token exists
    if (!captchaToken) {
      return NextResponse.json(
        { message: "CAPTCHA verification required" },
        { status: 400 }
      );
    }

    // Verify the captcha token with Google's reCAPTCHA API
    const captchaVerification = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captchaToken,
        },
      }
    );

    // If verification failed, return an error
    if (!captchaVerification.data.success) {
      return NextResponse.json(
        { message: "CAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // If CAPTCHA verification was successful, proceed with form submission
    await handleFinalSubmission(formData);
    return NextResponse.json({ message: "Final submission successful" });
  } catch (error) {
    console.error("Error during final submission:", error);
    return NextResponse.json(
      { message: "Error during final submission" },
      { status: 500 }
    );
  }
}
