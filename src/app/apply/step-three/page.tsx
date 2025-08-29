"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationFormSchema, NewApplyInitialValuesType } from "@/schemas";
import { useAddApplyContext } from "@/contexts/applyContext";
import { z } from "zod";
import { useEffect } from "react";

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
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";

export default function EducationForm() {
  const { newApplyData, updateNewApplyDetails, dataLoaded } =
    useAddApplyContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: newApplyData, // Initialize with data from context
  });

  useEffect(() => {
    if (dataLoaded) {
      form.reset(newApplyData);
    }
  }, [dataLoaded, newApplyData, form]);

  const handleChange = (name: string, value: any) => {
    updateNewApplyDetails({ [name]: value });
  };

  const handleSubmit = (values: z.infer<typeof educationFormSchema>) => {
    updateNewApplyDetails(values);
    router.push("/apply/step-four"); // Replace with actual next step URL
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Card className="w-full max-w-3xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>High School Details</CardTitle>
          <CardDescription>
            Please enter the students high school details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid gap-4 grid-cols-1 md:grid-cols-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
                <FormField
                  control={form.control}
                  name="highestGrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Highest Grade Passed{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Highest Grade"
                          type="text"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleChange("highestGrade", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Year Passed <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Year Passed"
                          type="text"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleChange("passedYear", e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>
                      Subjects <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Subjects"
                        {...field}
                        className="w-full h-32 p-2 border rounded-md"
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange("subjects", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 md:col-span-2 flex justify-end">
                <Button type="submit" className="w-full md:w-auto">
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
