import { LoaderFunction, useLoaderData } from 'remix';
import { Error } from '~/components/Error';
import { AdminDb, LoaderData } from '~/features/admin';
import { Courses } from '~/features/admin/components/Courses';

export const loader: LoaderFunction = async ({ params }) => {
  return {
    courses: await AdminDb.getCourses()
  }
}

export function ErrorBoundary() {
  return <Error />
}

export default function () {
  const { courses } = useLoaderData<LoaderData>()

  return <Courses courses={courses}/>
}