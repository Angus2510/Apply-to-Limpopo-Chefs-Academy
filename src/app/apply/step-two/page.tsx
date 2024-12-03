'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddApplyContext } from '@/contexts/applyContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { guardianFormSchema } from '@/schemas';
import z from 'zod';

export default function GuardianForm() {
  const { newApplyData, updateNewApplyDetails, dataLoaded } = useAddApplyContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof guardianFormSchema>>({
    resolver: zodResolver(guardianFormSchema),
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

  const handleSubmit = (values: z.infer<typeof guardianFormSchema>) => {
    updateNewApplyDetails(values);
    router.push('/apply/step-three'); 
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Card className="w-full max-w-3xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>Parent or Guardian Details</CardTitle>
          <CardDescription>Please provide the details of the parent or guardian.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full grid gap-4 grid-cols-1 md:grid-cols-2"
            >

<FormField
                control={form.control}
                name="guardianName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Name" 
                        type="text" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('guardianName', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guardianSurname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Surname" 
                        type="text" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('guardianSurname', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guardianEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Email" 
                        type="email" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('guardianEmail', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guardianPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Phone Number" 
                        type="text" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleChange('guardianPhone', e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guardianRelation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relation <span className="text-red-500">*</span></FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleChange('guardianRelation', value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a relation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
