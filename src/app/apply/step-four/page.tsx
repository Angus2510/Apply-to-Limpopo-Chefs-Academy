"use client";
import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddApplyContext } from "@/contexts/applyContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";
import { studyDetailsSchema, NewApplyInitialValuesType } from "@/schemas";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const accommodationOptions = {
  Mokopane: [
    {
      label: "Rabe Single Room (En-suite) - R5800/Month",
      value: "Rabe Single Room (En-suite) - R5800/Month",
    },
    {
      label: "Rabe Sharing Room (En-suite) - R3300/Month",
      value: "Rabe Sharing Room (En-suite) - R3300/Month",
    },
    {
      label: "Rabe Single Room – R4000/Month",
      value: "Rabe Single Room – R4000/Month",
    },
    {
      label: "Rabe Single Room - R5600/Month",
      value: "Rabe Single Room - R5600/Month",
    },
    {
      label: "Rabe Sharing Room - R2800/Month",
      value: "Rabe Sharing Room - R2800/Month",
    },
    {
      label: "Voor Single Room – R4000/Month",
      value: "Voor Single Room – R4000/Month",
    },
    {
      label: "Voor Sharing Room - R2300/Month",
      value: "Voor Sharing Room - R2300/Month",
    },
    {
      label: "Hooge Single Room (En-suite) – R6000/Month",
      value: "Hooge Single Room (En-suite) – R6000/Month",
    },
    {
      label: "Hooge Single Room – R5800/Month",
      value: "Hooge Single Room – R5800/Month",
    },
  ],
  Polokwane: [
    {
      label: "Single Room - R5800/Month",
      value: "Single Room - R5800/Month",
    },
    {
      label: "Sharing Room - R3000/Month",
      value: "Sharing Room - R3000/Month",
    },
  ],
};

export default function StudyDetailsForm() {
  const { newApplyData, updateNewApplyDetails, dataLoaded } =
    useAddApplyContext();
  const router = useRouter();
  const form = useForm<NewApplyInitialValuesType>({
    resolver: zodResolver(studyDetailsSchema),
    defaultValues: newApplyData,
  });

  useEffect(() => {
    if (dataLoaded) {
      form.reset(newApplyData);
    }
  }, [dataLoaded, newApplyData, form]);

  const handleChange = useCallback(
    (name: string, value: any) => {
      updateNewApplyDetails({ [name]: value });
    },
    [updateNewApplyDetails]
  );

  const handleSubmit = (values: NewApplyInitialValuesType) => {
    updateNewApplyDetails(values);
    router.push("/apply/review");
  };

  const selectedCampus = form.watch("campusChoice");
  const needAccommodation = form.watch("needAccommodation");
  const selectedCourse = form.watch("choiceOfCourse");
  const hasPassport = form.watch("hasPassport");

  const isInternationalExchange =
    selectedCourse ===
    "International Exchange Program Diploma: Food Preparation & Culinary Arts - 17 Months";

  useEffect(() => {
    if (!needAccommodation) {
      form.setValue("accommodation", "");
    }
  }, [needAccommodation, form]);

  useEffect(() => {
    if (!isInternationalExchange) {
      form.setValue("hasPassport", undefined);
      form.setValue("passportNumber", "");
      form.setValue("passportIssueDate", "");
      form.setValue("passportExpiryDate", "");
    }
  }, [isInternationalExchange, form]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Card className="w-full max-w-3xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>Study Details</CardTitle>
          <CardDescription>Please fill out the study details.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid gap-4 grid-cols-1 md:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="choiceOfCourse"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Select Qualification</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleChange("choiceOfCourse", value);
                        }}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Award: Introduction to the Hospitality Industry & Cooking - 05 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Award: Introduction to the Hospitality Industry &
                            Cooking - 05 Months
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Certificate: Professional Cookery and the Principles of Hospitality - 10 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Certificate: Professional Cookery and the Principles
                            of Hospitality - 10 Months
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Diploma: Food Preparation and Culinary Arts - 17 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Diploma: Food Preparation and Culinary Arts - 17
                            Months
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Pastry Diploma: Professional Patisserie - 17 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pastry Diploma: Professional Patisserie - 17 Months
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="International Exchange Program Diploma: Food Preparation & Culinary Arts - 17 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            International Exchange Program Diploma: Food
                            Preparation & Culinary Arts - 17 Months
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Occupational Grande Chef: Dual Qualification + Trade Test - 03 Years" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Occupational Grande Chef: Dual Qualification + Trade
                            Test - 03 Years
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isInternationalExchange && (
                <>
                  <FormField
                    control={form.control}
                    name="hasPassport"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Do you have a valid passport?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value === "Yes");
                              handleChange("hasPassport", value === "Yes");
                            }}
                            value={field.value ? "Yes" : "No"}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="No" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {isInternationalExchange && hasPassport === true && (
                <>
                  <FormField
                    control={form.control}
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Passport Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter passport number"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleChange("passportNumber", e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passportIssueDate"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel>Passport Issue Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleChange("passportIssueDate", e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passportExpiryDate"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel>Passport Expiry Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleChange(
                                "passportExpiryDate",
                                e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {isInternationalExchange && hasPassport === false && (
                <div className="col-span-2 p-4 border border-red-300 bg-red-50 rounded-md">
                  <p className="text-red-800 font-medium">Important Note</p>
                  <p className="text-red-700 text-sm mt-2">
                    You must have a valid passport to apply for the
                    International Exchange Program Diploma. Please obtain a
                    passport before proceeding with your application.
                  </p>
                </div>
              )}

              <FormField
                control={form.control}
                name="campusChoice"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Select Campus</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleChange("campusChoice", value);
                        }}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Mokopane" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Mokopane
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Polokwane" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Polokwane
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="needAccommodation"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Do you need Student Accommodation?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value === "Yes");
                          handleChange("needAccommodation", value === "Yes");
                        }}
                        value={field.value ? "Yes" : "No"}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="No" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {needAccommodation && selectedCampus && (
                <FormField
                  control={form.control}
                  name="accommodation"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Accommodation Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleChange("accommodation", value);
                          }}
                          value={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {accommodationOptions[selectedCampus]?.map(
                            (option) => (
                              <FormItem
                                key={option.value}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={option.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            )
                          )}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="col-span-2 mt-4">
                Next
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
