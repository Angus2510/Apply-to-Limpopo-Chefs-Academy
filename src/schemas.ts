import z from "zod";

const cruiseShipCourse =
  "International Cruise Ship Culinary Program Diploma: Food Preparation & Culinary Arts - 20 Months";
const passportRequiredCourses = [
  "International Exchange Program Diploma: Food Preparation & Culinary Arts - 17 Months",
  cruiseShipCourse,
] as const;

const calculateAge = (dateOfBirth?: string) => {
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

const isCruiseShipCourse = (choiceOfCourse?: string) =>
  choiceOfCourse === cruiseShipCourse;

const isPassportRequiredCourse = (choiceOfCourse?: string) =>
  passportRequiredCourses.includes(
    choiceOfCourse as (typeof passportRequiredCourses)[number],
  );

export const stepOneSchema = z.object({
  emailAddress: z.string().email().min(1, "Email address is required"),
  studentName: z.string().min(1, "Name is required"),
  studentSurname: z.string().min(1, "Surname is required"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: "Please enter a valid date of birth",
    }),
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

export const studyDetailsSchema = z
  .object({
    choiceOfCourse: z
      .enum([
        "Award: Introduction to the Hospitality Industry & Cooking - 05 Months",
        "Certificate: Professional Cookery and the Principles of Hospitality - 10 Months",
        "Diploma: Food Preparation and Culinary Arts - 17 Months",
        "Pastry Diploma: Professional Patisserie - 17 Months",
        "International Exchange Program Diploma: Food Preparation & Culinary Arts - 17 Months",
        cruiseShipCourse,
        "Occupational Grande Chef: Dual Qualification + Trade Test - 03 Years",
      ])
      .optional(),
    dateOfBirth: z.string().optional(),
    hasPassport: z.boolean().optional(),
    isTwentyOrOlder: z.boolean().optional(),
    hasGrade11OrHigher: z.boolean().optional(),
    isSouthAfricanCitizen: z.boolean().optional(),
    hasCriminalRecord: z.boolean().optional(),
    isBmi35OrBelow: z.boolean().optional(),
    consentsDrugScreening: z.boolean().optional(),
    acceptsCruiseShipHours: z.boolean().optional(),
    agreesToInterview: z.boolean().optional(),
    passportNumber: z.string().optional(),
    passportIssueDate: z.string().optional(),
    passportExpiryDate: z.string().optional(),
    campusChoice: z.enum(["Mokopane", "Polokwane"]),
    intake: z.enum(["January", "July"]),
    needAccommodation: z.boolean().optional(),
    accommodationOption: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      isPassportRequiredCourse(data.choiceOfCourse) &&
      data.hasPassport !== true
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hasPassport"],
        message:
          "A valid passport is required to continue with this programme.",
      });
    }

    if (!isCruiseShipCourse(data.choiceOfCourse)) {
      return;
    }

    const age = calculateAge(data.dateOfBirth);

    if (age === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["isTwentyOrOlder"],
        message:
          "A valid date of birth is required to verify the age requirement.",
      });
    } else if (age < 18) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["isTwentyOrOlder"],
        message:
          "Applicants for this programme must be 18 years of age or older.",
      });
    }

    if (data.isTwentyOrOlder !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["isTwentyOrOlder"],
        message:
          "Applicants must confirm that they are 18 years of age or older.",
      });
    }

    if (data.hasGrade11OrHigher !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hasGrade11OrHigher"],
        message: "A Grade 11 qualification or higher is required.",
      });
    }

    if (data.isSouthAfricanCitizen !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["isSouthAfricanCitizen"],
        message: "Only South African citizens may proceed with this programme.",
      });
    }

    if (data.hasCriminalRecord !== false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["hasCriminalRecord"],
        message:
          "Applicants with a criminal record may not proceed with this programme.",
      });
    }

    if (data.isBmi35OrBelow !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["isBmi35OrBelow"],
        message: "Applicants must have a BMI of 35 or below.",
      });
    }

    if (data.consentsDrugScreening !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["consentsDrugScreening"],
        message: "Consent to drug screening is required to proceed.",
      });
    }

    if (data.acceptsCruiseShipHours !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["acceptsCruiseShipHours"],
        message:
          "Applicants must be willing and able to work long cruise ship hours to proceed.",
      });
    }

    if (data.agreesToInterview !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["agreesToInterview"],
        message:
          "Agreement to attend the required interview is required to proceed.",
      });
    }
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
  dateOfBirth: z.string().optional(),
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
      "Award: Introduction to the Hospitality Industry & Cooking - 05 Months",
      "Certificate: Professional Cookery and the Principles of Hospitality - 10 Months",
      "Diploma: Food Preparation and Culinary Arts - 17 Months",
      "Pastry Diploma: Professional Patisserie - 17 Months",
      "International Exchange Program Diploma: Food Preparation & Culinary Arts - 17 Months",
      "International Cruise Ship Culinary Program Diploma: Food Preparation & Culinary Arts - 20 Months",
      "Occupational Grande Chef: Dual Qualification + Trade Test - 03 Years",
    ])
    .optional(),
  hasPassport: z.boolean().optional(),
  isTwentyOrOlder: z.boolean().optional(),
  hasGrade11OrHigher: z.boolean().optional(),
  isSouthAfricanCitizen: z.boolean().optional(),
  hasCriminalRecord: z.boolean().optional(),
  isBmi35OrBelow: z.boolean().optional(),
  consentsDrugScreening: z.boolean().optional(),
  acceptsCruiseShipHours: z.boolean().optional(),
  agreesToInterview: z.boolean().optional(),
  passportNumber: z.string().optional(),
  passportIssueDate: z.string().optional(),
  passportExpiryDate: z.string().optional(),
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
