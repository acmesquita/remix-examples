import { ActionFunction, LoaderFunction, redirect, useActionData, useLoaderData } from "remix";
import { ZodError } from 'zod'
import { extractValidationError, validator } from "~/utils";
import { ActionData, AdminDb } from "~/features/admin";
import { CourseForm } from "~/features/admin/components/CourseForm";
import { Course } from "@prisma/client";
import { Error } from "~/components/Error";

export interface LoaderData {
  course: Course
}

export const loader: LoaderFunction = async ({ params }): Promise<LoaderData | Response> => {
  const course = await AdminDb.getCourse(params.courseId!)

  if (!course) {
    throw new Response('Not Found', {
      status: 404
    })
  } else {
    return { course }
  }
}

export const action: ActionFunction = async ({ request, params }): Promise<ActionData | Response | void> => {
  const data = Object.fromEntries(await request.formData())
  try {
    await AdminDb.saveCourse(validator.parse(data), params.courseId)

    return redirect('/admin/courses')

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

export function ErrorBoundary({ error }: { error: Error }) {
  return <Error message={error.message} />
}

export function CatchBoundary({ error }: { error: Error }) {
  return <Error message={error?.message} />
}

export default function () {

  const { course } = useLoaderData<LoaderData>()
  const actionData = useActionData<ActionData>()

  return (
    <>
      <form action={`/admin/courses/${course.id}/delete`} method="delete">
        <button
          type="submit"
          className="bg-red-600 mb-6 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </form>
      <CourseForm course={course} actionData={actionData} />
    </>
  )
}