import { Course } from "@prisma/client";
import { db } from "~/utils/db.server";
import { FormFields } from ".";

export async function getCourses(): Promise<Course[]> {
  return await db.course.findMany()
}

export async function getCourse(id: string): Promise<Course | null> {
  return await db.course.findUnique({
    where: {
      id,
    }
  })
}

export async function saveCourse(data: FormFields, id?: string): Promise<void> {
  if(id) {
    await db.course.update({
      where: { id },
      data
    })
  }else {
    await db.course.create({
      data
    })
  } 
}

export async function deleteCourse(id?: string): Promise<Course> {
  return await db.course.delete({
    where: { id }
  })
}