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
import { Checkbox } from "@/components/ui/checkbox";
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
      label: "Sinlge Room (En-suite) - R5500/Month",
      value: "Sinlge Room (En-suite) - R5500/Month",
    },
    {
      label: "Sharing Room (En-suite) - R3000/Month",
      value: "Sharing Room (En-suite) - R3000/Month",
    },
    { label: "Single Room - R3000/Month", value: "Single Room - R3000/Month" },
    {
      label: "Sharing Room - R2500/Month",
      value: "Sharing Room - R2500/Month",
    },
    {
      label: "Sharing Room (Voor Street) - R2000/Month",
      value: "Sharing Room (Voor Street) - R2000/Month",
    },
  ],
  Polokwane: [
    {
      label: "Sharing Room - R2500/Month",
      value: "Sharing Room - R2500/Month",
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
    // Directly navigate to the next page instead of step-five
    router.push("/apply/step-four");
  };

  const selectedCampus = form.watch("campusChoice");
  const needAccommodation = form.watch("needAccommodation");

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
                    <FormLabel>Qualification Choice</FormLabel>
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
                            <RadioGroupItem value="Award: Introduction to the Hospitality Industry & Cooking - 06 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Award: Introduction to the Hospitality Industry &
                            Cooking - 06 Months
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
                            <RadioGroupItem value="Diploma: Food Preparation and Culinary Arts - 10 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Diploma: Food Preparation and Culinary Arts - 10
                            Months
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Pastry Diploma: Professional Patisserie - 10 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pastry Diploma: Professional Patisserie - 10 Months
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Mauritius Exchange Program Diploma: Advanced Food Preparation & Culinary Arts - 12 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Mauritius Exchange Program Diploma: Advanced Food
                            Preparation & Culinary Arts - 12 Months
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
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Online Award: Introduction to the Hospitality Industry & Cooking - 08 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Online Award: Introduction to the Hospitality
                            Industry & Cooking - 08 Months
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Online Certificate: Professional Cookery and the Principles of Hospitality - 12 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Online Certificate: Professional Cookery and the
                            Principles of Hospitality - 12 Months
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
                    <FormLabel>Campus Choice</FormLabel>
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
                name="intake"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Enrol for</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleChange("intake", value);
                        }}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="January" />
                          </FormControl>
                          <FormLabel className="font-normal">January</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="July" />
                          </FormControl>
                          <FormLabel className="font-normal">July</FormLabel>
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
                    <FormLabel>Accommodation Needed</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {needAccommodation && (
                <FormField
                  control={form.control}
                  name="accommodationChoice"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Accommodation Choice</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleChange("accommodationChoice", value);
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
              <Button type="submit" className="col-span-2">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
