import { Course } from "@prisma/client";
import { ActionData } from "..";

interface Props {
  actionData?: ActionData
  course?: Course
}

export function CourseForm({ actionData, course }: Props) {
  return (
    <form method='post'>
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {course ? 'Editando Curso': 'Novo Curso'}
          </h3>
        </div>

        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={actionData?.formValues?.name ?? course?.name}
              key={actionData?.formValues?.name ?? course?.name}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {actionData?.formErrors?.name ? (
              <p className="text-sm text-red-500 p-2">{actionData?.formErrors?.name}</p>
            ) : null}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <input
              type="text"
              name="description"
              id="description"
              defaultValue={actionData?.formValues?.description ?? course?.description}
              key={actionData?.formValues?.description ?? course?.description}
              autoComplete="family-name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {actionData?.formErrors?.description ? (
              <p className="text-sm text-red-500 p-2">{actionData?.formErrors?.description}</p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  </form>
  )
}