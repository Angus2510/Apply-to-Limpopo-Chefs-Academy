import { z } from 'zod';

export const step1Schema = z.object({
  name: z.string().min(1, "Name is required"),
});

export const step2Schema = z.object({
  email: z.string().email("Invalid email address"),
});

