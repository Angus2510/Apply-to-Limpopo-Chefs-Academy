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

// const cruiseShipCourse =
//   "International Cruise Ship Culinary Program Diploma: Food Preparation & Culinary Arts - 20 Months";

const getAgeFromDateOfBirth = (dateOfBirth?: string) => {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
};

const getBooleanRadioValue = (value?: boolean) =>
  value === true ? "Yes" : value === false ? "No" : "";

const accommodationOptions = {
  Mokopane: [
    {
      label: "Single Room (Hooge 86) - R5 800.00/Month",
      value: "Single Room (Hooge 86) - R5 800.00/Month",
    },
    {
      label: "Single En-suite Room (Hooge 86) - R6 000.00/Month",
      value: "Single En-suite Room (Hooge 86) - R6 000.00/Month",
    },
    {
      label: "Sharing Room (Voor Street) - R2 300.00/Month",
      value: "Sharing Room (Voor Street) - R2 300.00/Month",
    },
    {
      label: "Single Room (Voor Street) - R4 000.00/Month",
      value: "Single Room (Voor Street) - R4 000.00/Month",
    },
    {
      label: "Single Room (Rabe Street) - R4 150.00/Month",
      value: "Single Room (Rabe Street) - R4 150.00/Month",
    },
    {
      label: "Sharing Room (MKP) - R2 950.00/Month",
      value: "Sharing Room (MKP) - R2 950.00/Month",
    },
    {
      label: "Single (Sharing) Room (MKP) - R5 900.00/Month",
      value: "Single (Sharing) Room (MKP) - R5 900.00/Month",
    },
    {
      label: "Sharing En-suite Room (MKP) - R3 450.00/Month",
      value: "Sharing En-suite Room (MKP) - R3 450.00/Month",
    },
    {
      label: "Single En-suite Room (MKP) - R5 950.00/Month",
      value: "Single En-suite Room (MKP) - R5 950.00/Month",
    },
  ],
  Polokwane: [
    {
      label: "Single Room (PLK) - R5 950.00/Month",
      value: "Single Room (PLK) - R5 950.00/Month",
    },
    {
      label: "Sharing Room (PLK) - R3 150.00/Month",
      value: "Sharing Room (PLK) - R3 150.00/Month",
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
    [updateNewApplyDetails],
  );

  const selectedCampus = form.watch("campusChoice");
  const needAccommodation = form.watch("needAccommodation");
  const selectedCourse = form.watch("choiceOfCourse");
  const hasPassport = form.watch("hasPassport");
  const calculatedAge = getAgeFromDateOfBirth(newApplyData.dateOfBirth);
  // const requiresCruiseScreening = selectedCourse === cruiseShipCourse;
  // const isUnderMinimumAge = calculatedAge !== null && calculatedAge < 20;

  const handleSubmit = (values: NewApplyInitialValuesType) => {
    // if (requiresCruiseScreening && isUnderMinimumAge) {
    //   form.setError("isTwentyOrOlder", {
    //     type: "manual",
    //     message:
    //       "The applicant is under 20 years old based on the date of birth and cannot proceed with this programme.",
    //   });
    //   return;
    // }

    updateNewApplyDetails(values);
    router.push("/apply/review");
  };

  const requiresPassport =
    selectedCourse ===
    "International Exchange Program Diploma: Food Preparation & Culinary Arts - 17 Months";
  // || selectedCourse === cruiseShipCourse;

  useEffect(() => {
    if (!needAccommodation) {
      form.setValue("accommodation", "");
    }
  }, [needAccommodation, form]);

  useEffect(() => {
    if (!requiresPassport) {
      form.setValue("hasPassport", undefined);
      form.setValue("passportNumber", "");
      form.setValue("passportIssueDate", "");
      form.setValue("passportExpiryDate", "");
    }
  }, [requiresPassport, form]);

  // useEffect(() => {
  //   if (!requiresCruiseScreening) {
  //     form.setValue("isTwentyOrOlder", undefined);
  //     form.setValue("hasGrade11OrHigher", undefined);
  //     form.setValue("isSouthAfricanCitizen", undefined);
  //     form.setValue("hasCriminalRecord", undefined);
  //     form.setValue("isBmi35OrBelow", undefined);
  //     form.setValue("consentsDrugScreening", undefined);
  //     form.setValue("acceptsCruiseShipHours", undefined);
  //   }
  // }, [requiresCruiseScreening, form]);

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
                        {/* <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="International Cruise Ship Culinary Program Diploma: Food Preparation & Culinary Arts - 20 Months" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            International Cruise Ship Culinary Program Diploma:
                            Food Preparation &amp; Culinary Arts - 20 Months
                          </FormLabel>
                        </FormItem> */}
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

              {requiresPassport && (
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
                            value={getBooleanRadioValue(field.value)}
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

                  {/* requiresCruiseScreening && calculatedAge !== null && (
                    <div
                      className={`col-span-2 rounded-md border p-4 ${
                        isUnderMinimumAge
                          ? "border-red-300 bg-red-50"
                          : "border-emerald-300 bg-emerald-50"
                      }`}
                    >
                      <p
                        className={`font-medium ${
                          isUnderMinimumAge
                            ? "text-red-800"
                            : "text-emerald-800"
                        }`}
                      >
                        Calculated age from date of birth: {calculatedAge}
                      </p>
                      {isUnderMinimumAge && (
                        <p className="mt-2 text-sm text-red-700">
                          Applicants under 20 years old cannot continue with the
                          International Cruise Ship Culinary Program.
                        </p>
                      )}
                    </div>
                  ) */}

                  {/* requiresCruiseScreening && (
                    <>
                      <FormField
                        control={form.control}
                        name="isTwentyOrOlder"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>
                              Are you 20 years of age or older?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value === "Yes");
                                  handleChange(
                                    "isTwentyOrOlder",
                                    value === "Yes",
                                  );
                                }}
                                value={getBooleanRadioValue(field.value)}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="No" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
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
                        name="hasGrade11OrHigher"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>
                              Do you have a Grade 11 qualification or higher?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value === "Yes");
                                  handleChange(
                                    "hasGrade11OrHigher",
                                    value === "Yes",
                                  );
                                }}
                                value={getBooleanRadioValue(field.value)}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="No" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
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
                        name="isSouthAfricanCitizen"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>
                              Are you a South African citizen?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value === "Yes");
                                  handleChange(
                                    "isSouthAfricanCitizen",
                                    value === "Yes",
                                  );
                                }}
                                value={getBooleanRadioValue(field.value)}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="No" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
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
                        name="hasCriminalRecord"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>
                              Do you have a criminal record?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value === "Yes");
                                  handleChange(
                                    "hasCriminalRecord",
                                    value === "Yes",
                                  );
                                }}
                                value={getBooleanRadioValue(field.value)}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="No" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
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
                        name="isBmi35OrBelow"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>
                              Is your Body Mass Index (BMI) 35 or below?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value === "Yes");
                                  handleChange(
                                    "isBmi35OrBelow",
                                    value === "Yes",
                                  );
                                }}
                                value={getBooleanRadioValue(field.value)}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="No" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
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
                        name="consentsDrugScreening"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>
                              Do you consent to undergoing a drug screening test
                              conducted by a registered medical provider?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value === "Yes");
                                  handleChange(
                                    "consentsDrugScreening",
                                    value === "Yes",
                                  );
                                }}
                                value={getBooleanRadioValue(field.value)}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="No" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
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
                        name="acceptsCruiseShipHours"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>
                              Are you willing and able to work long hours (up to
                              12 hours per day), including extended periods
                              without scheduled days off, while employed on a
                              cruise ship?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value === "Yes");
                                  handleChange(
                                    "acceptsCruiseShipHours",
                                    value === "Yes",
                                  );
                                }}
                                value={getBooleanRadioValue(field.value)}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="Yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Yes
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="No" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    No
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  ) */}
                </>
              )}

              {requiresPassport && hasPassport === true && (
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
                                e.target.value,
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

              {requiresPassport && hasPassport === false && (
                <div className="col-span-2 p-4 border border-red-300 bg-red-50 rounded-md">
                  <p className="text-red-800 font-medium">Important Note</p>
                  <p className="text-red-700 text-sm mt-2">
                    You must have a valid passport to apply for this
                    international cruise or exchange programme. Please obtain a
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
                            ),
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
