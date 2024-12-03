"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ApplyRoutes } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Student Details",
    route: "step-one",
    link: ApplyRoutes.STUDENT_DETAILS,
  },
  {
    title: "Parent or Guardian Details",
    route: "step-two",
    link: ApplyRoutes.GUARDIAN_DETAILS,
  },
  {
    title: "Education Details",
    route: "step-three",
    link: ApplyRoutes.EDUCATION_DETAILS,
  },
  {
    title: "Study Details",
    route: "step-four",
    link: ApplyRoutes.STUDY_DETAILS,
  },

  { title: "Review", route: "review", link: ApplyRoutes.REVIEW_APPLICATION },
];

export default function StepNavigation() {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const stepIndex = steps.findIndex((step) => pathname.includes(step.route));
    setCurrentStep(stepIndex);
  }, [pathname]);

  return (
    <Card className="w-full flex flex-col justify-between">
      <CardHeader className="text-center">
        <CardTitle>Application Steps</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="relative flex flex-row justify-between lg:flex-col lg:justify-start lg:gap-8 pt-4">
          {steps.map((step, i) => (
            <Link
              href={step.link}
              key={step.link}
              className="group z-20 flex items-center gap-3 text-lg"
            >
              {" "}
              {/* Changed text-2xl to text-lg */}
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors duration-200 lg:h-12 lg:w-12 lg:text-lg",
                  pathname.includes(step.route)
                    ? "border-none bg-green-700 text-black group-hover:border-none group-hover:text-black"
                    : "border-gray-300 bg-gray-100 text-gray-500 group-hover:border-gray-400 group-hover:text-gray-700"
                )}
              >
                {i + 1}
              </span>
              <span
                className={cn(
                  "hidden transition-colors duration-200 lg:block",
                  pathname.includes(step.route)
                    ? "font-semibold text-green-700"
                    : "font-light text-gray-500 group-hover:text-gray-700"
                )}
              >
                {step.title}
              </span>
            </Link>
          ))}
          <div className="absolute top-[calc(65%)] transform -translate-y-1/2 flex w-full border-b border-dashed border-gray-300 lg:hidden" />
        </div>
      </CardContent>
    </Card>
  );
}
