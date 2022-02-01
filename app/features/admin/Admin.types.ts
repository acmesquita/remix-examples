import { Course } from "@prisma/client";

export interface LoaderData {
  courses: Course[]
}

export interface FormFields {
  name: string
  description: string
}

export interface ActionData {
  formErrors?: Partial<FormFields>
  formValues?: FormFields
}
