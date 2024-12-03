export interface FormErrors {
  [key: string]: string | undefined;
}

export enum ApplyRoutes {
  STUDENT_DETAILS = "/apply/step-one",
  GUARDIAN_DETAILS = "/apply/step-two",
  EDUCATION_DETAILS = "/apply/step-three",
  STUDY_DETAILS = "/apply/step-four",
  REVIEW_APPLICATION = "/apply/review",
}
