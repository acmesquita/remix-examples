import { ActionFunction, redirect, useActionData } from "remix";
import { ZodError } from 'zod'
import { extractValidationError, validator } from "~/utils";
import { ActionData, AdminDb } from "~/features/admin";
import { CourseForm } from "~/features/admin/components/CourseForm";
import { Error } from "~/components/Error";

export const action: ActionFunction = async ({ request }): Promise<ActionData | Response | void > => {
  const data = Object.fromEntries(await request.formData())
  try {
    await AdminDb.saveCourse(validator.parse(data))

    return redirect('.')

  } catch (error) {
    if (error instanceof ZodError) {
      return {
        formErrors: extractValidationError(error),
        formValues: {
          name: data.name as string,
          description: data.description as string,
        }
      }
    }
    //@ts-ignore
    throw new Error(error.message)
  }
};

export function ErrorBoundary() {
  return <Error />
}

export default function () {
  const actionData = useActionData<ActionData>()

  return <CourseForm actionData={actionData} />
}