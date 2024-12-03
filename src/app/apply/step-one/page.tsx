'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { stepOneSchema, NewApplyInitialValuesType } from '@/schemas';
import { useAddApplyContext } from '@/contexts/applyContext';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

export default function StepOneForm() {
  const { newApplyData, updateNewApplyDetails, dataLoaded } = useAddApplyContext();
  const router = useRouter();

  const form = useForm<NewApplyInitialValuesType>({
    resolver: zodResolver(stepOneSchema),
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
    const result = stepOneSchema.safeParse(values);
    if (result.success) {
      updateNewApplyDetails(values);
      router.push('/apply/step-two');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Card className="w-full max-w-3xl mx-auto mt-4">
       <CardHeader>
         <CardTitle>Student Details</CardTitle>
         <CardDescription>Please fill out all the student details.</CardDescription>
         </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid gap-4 grid-cols-1 md:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Student Name"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('studentName', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentSurname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student Surname <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Student Surname"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('studentSurname', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentIdNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student ID Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ID Number"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('studentIdNumber', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentGender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student Gender <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleChange('studentGender', value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        type="email"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('emailAddress', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a phone number"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('phone', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                    Whatsapp Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Whatsapp number"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('whatsapp', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student Address <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Student Address"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('studentAddress', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student City <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Student City"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('studentCity', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentProvince"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student Province <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Student Province"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('studentProvince', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentPostalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Student Postal Code <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Student Postal Code"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('studentPostalCode', e.target.value);
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
