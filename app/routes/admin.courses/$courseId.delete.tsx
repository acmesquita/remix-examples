import { LoaderFunction, redirect } from "remix";
import { Error } from "~/components/Error";
import { AdminDb } from "~/features/admin";


export const loader: LoaderFunction = async ({ params }): Promise<Response | void> => {
  try {
    await AdminDb.deleteCourse(params.courseId)

    return redirect('..')

  } catch (error) {
    //@ts-ignore
    throw new Error(error.message)
  }
};

export function ErrorBoundary() {
  return <Error />
}