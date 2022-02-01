import { Course } from "@prisma/client";
import { Link } from "remix";
import { formatDate } from "~/utils";

interface Props {
  course: Course
}

export function CourseItem({ course }: Props) {
  return (
    <li className="p-4 border-2 border-gray-500 rounded-md shadow-md hover:shadow-none cursor-pointer hover:-translate-y-1 hover:bg-slate-100">
      <Link to={`${course.id}/edit`}>
        <h3 className="text-lg text-slate-500 font-semibold mb-2">
          {course.name}
        </h3>
        <blockquote>{course.description}</blockquote>
        <p className="text-right text-sm  text-gray-400">
          {formatDate(course.updatedAt)}
        </p>
      </Link>
    </li>
  )
}