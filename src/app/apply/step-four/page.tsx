"use client";
import { useEffect } from "react";
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

const accommodationOptions = {
  Mokopane: [
    {
      label: "Single Room (2x sharing En-suite) - R5800/Month",
      value: "Single Room (2x sharing En-suite) - R5800/Month",
    },
    {
      label: "Sharing Room (En-suite) - R3300/Month",
      value: "Sharing Room (En-suite) - R3300/Month",
    },
    {
      label: "82 Rabe Single Room (4) - R4000/Month",
      value: "82 Rabe Single Room (4) - R4000/Month",
    },
    {
      label: "Single Room (2x sharing) - R5600/Month",
      value: "Single Room (2x sharing) - R5600/Month",
    },
    {
      label: "Sharing Room - R2800/Month",
      value: "Sharing Room - R2800/Month",
    },
    {
      label: "Voor Single Room (4) - R4000/Month",
      value: "Voor Single Room (4) - R4000/Month",
    },
    {
      label: "Voor Sharing Room - R2300/Month",
      value: "Voor Sharing Room - R2300/Month",
    },
    {
      label: "86 Hooge Single Room (En-suite) - R6000/Month",
      value: "86 Hooge Single Room (En-suite) - R6000/Month",
    },
    {
      label: "86 Hooge Single Room - R5800/Month",
      value: "86 Hooge Single Room - R5800/Month",
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

  const handleChange = (name: string, value: any) => {
    updateNewApplyDetails({ [name]: value });
  };

  const handleSubmit = (values: NewApplyInitialValuesType) => {
    updateNewApplyDetails(values);
    router.push("/apply/review");
  };

  const selectedCampus = form.watch("campusChoice");
  const needAccommodation = form.watch("needAccommodation");

  useEffect(() => {
    if (!needAccommodation) {
      form.setValue("accommodation", "");
      handleChange("accommodation", "");
    }
  }, [needAccommodation, form]);

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
