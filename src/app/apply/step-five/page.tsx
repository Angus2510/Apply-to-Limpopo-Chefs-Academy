// Updated Step 5 logic for Loom link submission
"use client";

import React from "react";
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { z } from "zod";

const loomFormSchema = z.object({
  loomLink: z
    .string()
    .url({ message: "Please enter a valid Loom link." })
    .regex(/loom\.com\//, { message: "The link must be a Loom URL." }),
});

type FormData = z.infer<typeof loomFormSchema>;

export default function UploadForm() {
  const { newApplyData, updateNewApplyDetails } = useAddApplyContext();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loomFormSchema),
    defaultValues: {
      loomLink: newApplyData.loomLink || "",
    },
  });

  const handleSubmit = (values: FormData) => {
    updateNewApplyDetails({ loomLink: values.loomLink });
    router.push("/apply/review");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Card className="w-full max-w-3xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>Loom Link Submission</CardTitle>
          <CardDescription>
            Please record a short video on Loom and provide the link below.
            Topics to consider include your favourite dish, your favourite chef,
            why you chose Limpopo Chefs Academy, your aspirations as a chef, and
            where you see yourself in 5 years.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid gap-4 grid-cols-1"
            >
              <FormField
                control={form.control}
                name="loomLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-2">Loom Video Link</FormLabel>
                    <FormControl>
                      <input
                        type="url"
                        {...field}
                        placeholder="https://www.loom.com/share/your-video-link"
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 flex justify-end">
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
