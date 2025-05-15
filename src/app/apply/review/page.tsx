"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useAddApplyContext } from "@/contexts/applyContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import {
  stepOneSchema,
  guardianFormSchema,
  studyDetailsSchema,
  educationFormSchema,
} from "@/schemas";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const schemaMap = {
  "step-one": stepOneSchema,
  "step-two": guardianFormSchema,
  "step-three": studyDetailsSchema,
  "step-four": educationFormSchema,
};

export default function SummaryPage() {
  const { newApplyData } = useAddApplyContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const checkRequiredFields = () => {
    for (const [step, schema] of Object.entries(schemaMap)) {
      const result = schema.safeParse(newApplyData);
      if (!result.success) {
        return step;
      }
    }
    return null;
  };

  const handleFinalSubmit = async () => {
    if (!captchaValue) {
      alert("Please verify that you are not a robot");
      return;
    }

    const missingStep = checkRequiredFields();
    if (missingStep) {
      router.push(`/apply/${missingStep}`);
    } else {
      setIsLoading(true);

      try {
        await axios.post(
          "/api/finalSubmit",
          {
            ...newApplyData,
            captchaToken: captchaValue,
          },
          { timeout: 60000 }
        );

        setShowAlert(true);
        router.push("/submit-confirmation");
      } catch (error) {
        console.error("Error during final submit:", error);
        alert("Failed to submit the application. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (step: string) => {
    router.push(`/apply/${step}`);
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Card className="w-full max-w-3xl mx-auto mt-4">
        <CardContent className="p-6 md:p-8">
          {isLoading && <div className="loading-indicator">Loading...</div>}
          {showAlert && (
            <div className="alert alert-success mb-4">
              Application submitted successfully!
            </div>
          )}
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="grid gap-4">
            {/* Your existing form sections here */}
            <div>
              <h3 className="font-semibold">Student Details</h3>
              {/* Student details content */}
              <Button onClick={() => handleEdit("step-one")}>Edit</Button>
            </div>
            <div>
              <h3 className="font-semibold">Guardian Details</h3>
              {/* Guardian details content */}
              <Button onClick={() => handleEdit("step-two")}>Edit</Button>
            </div>
            <div>
              <h3 className="font-semibold">Study Details</h3>
              {/* Study details content */}
              <Button onClick={() => handleEdit("step-three")}>Edit</Button>
            </div>
            <div>
              <h3 className="font-semibold">Course and Campus</h3>
              {/* Course and campus details content */}
              <Button onClick={() => handleEdit("step-four")}>Edit</Button>
            </div>
          </div>

          {/* Add reCAPTCHA here */}
          <div className="mt-6 mb-4 flex flex-col items-center">
            <p className="text-sm text-gray-600 mb-2">
              Please verify that you&#39;re not a robot
            </p>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleCaptchaChange}
            />
          </div>

          <div className="mt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={isLoading || !captchaValue}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to submit?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Please review all your information before submitting.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleFinalSubmit}>
                    Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
