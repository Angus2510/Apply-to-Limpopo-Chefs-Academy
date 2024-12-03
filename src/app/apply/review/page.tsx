"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAddApplyContext } from "@/contexts/applyContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
            <div>
              <h3 className="font-semibold">Student Details</h3>
              <p>Name: {newApplyData?.studentName || ""}</p>
              <p>Surname: {newApplyData?.studentSurname || ""}</p>
              <p>ID Number: {newApplyData?.studentIdNumber || ""}</p>
              <p>Email: {newApplyData?.emailAddress || ""}</p>
              <p>Phone: {newApplyData?.phone || ""}</p>
              <p>Whatsapp Number: {newApplyData?.whatsapp || ""}</p>
              <p>Gender: {newApplyData?.studentGender || ""}</p>
              <p>Address: {newApplyData?.studentAddress || ""}</p>
              <p>City: {newApplyData?.studentCity || ""}</p>
              <p>Province: {newApplyData?.studentProvince || ""}</p>
              <p>Postal Code: {newApplyData?.studentPostalCode || ""}</p>
              <Button onClick={() => handleEdit("step-one")}>Edit</Button>
            </div>
            <div>
              <h3 className="font-semibold">Guardian Details</h3>
              <p>Email: {newApplyData?.guardianEmail || ""}</p>
              <p>Phone: {newApplyData?.guardianPhone || ""}</p>
              <p>Name: {newApplyData?.guardianName || ""}</p>
              <p>Surname: {newApplyData?.guardianSurname || ""}</p>
              <p>Relation: {newApplyData?.guardianRelation || ""}</p>
              <Button onClick={() => handleEdit("step-two")}>Edit</Button>
            </div>
            <div>
              <h3 className="font-semibold">Study Details</h3>
              <p>
                Attending School: {newApplyData?.attendingSchool ? "Yes" : "No"}
              </p>
              <p>Highest Grade: {newApplyData?.highestGrade || ""}</p>
              <p>Year Passed: {newApplyData?.passedYear || ""}</p>
              <p>Subjects: {newApplyData?.subjects || ""}</p>
              <Button onClick={() => handleEdit("step-three")}>Edit</Button>
            </div>
            <div>
              <h3 className="font-semibold">Course and Campus</h3>
              <p>Choice of Course: {newApplyData?.choiceOfCourse || ""}</p>
              <p>Campus Choice: {newApplyData?.campusChoice || ""}</p>
              <p>Intake: {newApplyData?.intake || ""}</p>
              <p>
                Need Accommodation:{" "}
                {newApplyData?.needAccommodation ? "Yes" : "No"}
              </p>
              <p>
                Accommodation Option: {newApplyData?.accommodationOption || ""}
              </p>
              <Button onClick={() => handleEdit("step-four")}>Edit</Button>
            </div>
          </div>
          <div className="mt-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={isLoading}>
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
