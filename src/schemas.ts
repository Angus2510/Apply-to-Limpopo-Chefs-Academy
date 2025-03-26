import z from "zod";

export const stepOneSchema = z.object({
  emailAddress: z.string().email().min(1, "Email address is required"),
  studentName: z.string().min(1, "Name is required"),
  studentSurname: z.string().min(1, "Surname is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => value.length > 0, {
      message: "Invalid phone number",
    }),
  whatsapp: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => value.length > 0, {
      message: "Invalid phone number",
    }),
  studentIdNumber: z.string().min(1, "ID number is required"),
  studentGender: z.enum(["Male", "Female", "Other"]),
  studentAddress: z.string().min(1, "Address is required"),
  studentCity: z.string().min(1, "City is required"),
  studentProvince: z.string().min(1, "Province is required"),
  studentPostalCode: z.string().min(1, "Postal code is required"),
});

export const guardianFormSchema = z.object({
  guardianEmail: z.string().email().min(1, "Guardian email is required"),
  guardianPhone: z
    .string()
    .min(1, "Guardian phone number is required")
    .refine((value) => value.length > 0, {
      message: "Invalid phone number",
    }),
  guardianName: z.string().min(1, "Please enter a guardian name."),
  guardianSurname: z.string().min(1, "Please enter a guardian surname."),
  guardianRelation: z.enum(["Mother", "Father", "Other"]),
});

export const studyDetailsSchema = z.object({
  choiceOfCourse: z
    .enum([
      "Award: Introduction to the Hospitality Industry & Cooking - 06 Months",
      "Certificate: Professional Cookery and the Principles of Hospitality - 10 Months",
      "Diploma: Food Preparation and Culinary Arts - 10 Months",
      "Pastry Diploma: Professional Patisserie - 10 Months",
      "France Exchange Program Diploma: Food Preparation & Culinary Arts - 14 Months",
      "Occupational Grande Chef: Dual Qualification + Trade Test - 03 Years",
    ])
    .optional(),
  campusChoice: z.enum(["Mokopane", "Polokwane"]),
  intake: z.enum(["January", "July"]),
  needAccommodation: z.boolean().optional(),
  accommodationOption: z.string().optional(),
});

export const educationFormSchema = z.object({
  attendingSchool: z.boolean().optional(),
  highestGrade: z.string().min(1, "Highest grade passed is required"),
  passedYear: z.string().min(1, "Year passed is required"),
  subjects: z.string().min(1, "Subjects are required"),
});

export const uploadFormSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  fileType: z.string().min(1, "File type is required"),
});

export const newApplyInitialValuesSchema = z.object({
  emailAddress: z.string().optional(),
  studentName: z.string().optional(),
  studentSurname: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  studentIdNumber: z.string().optional(),
  studentGender: z.enum(["Male", "Female", "Other"]).optional(),
  studentAddress: z.string().optional(),
  studentCity: z.string().optional(),
  studentProvince: z.string().optional(),
  studentPostalCode: z.string().optional(),
  guardianEmail: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianName: z.string().optional(),
  guardianSurname: z.string().optional(),
  guardianRelation: z.enum(["Mother", "Father", "Other"]).optional(),
  attendingSchool: z.boolean().optional(),
  highestGrade: z.string().optional(),
  passedYear: z.string().optional(),
  subjects: z.string().optional(),

  choiceOfCourse: z
    .enum([
      "Award: Introduction to the Hospitality Industry & Cooking - 06 Months",
      "Certificate: Professional Cookery and the Principles of Hospitality - 10 Months",
      "Diploma: Food Preparation and Culinary Arts - 10 Months",
      "Pastry Diploma: Professional Patisserie - 10 Months",
      "France Exchange Program Diploma: Food Preparation & Culinary Arts - 14 Months",
      "Occupational Grande Chef: Dual Qualification + Trade Test - 03 Years",
    ])
    .optional(),
  campusChoice: z.enum(["Mokopane", "Polokwane"]).optional(),
  intake: z.enum(["January", "July"]).optional(),
  needAccommodation: z.boolean().optional(),
  accommodationOption: z.string().optional(),
  accommodation: z.string().optional(),

  fileName: z.string().optional(),
  fileType: z.string().optional(),
});

export type NewApplyInitialValuesType = z.infer<
  typeof newApplyInitialValuesSchema
>;
