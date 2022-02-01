import { z, ZodError } from 'zod'
import { ActionData } from './features/admin';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date) {
  return `${new Date(date).toLocaleDateString('pt-br')} ${new Date(date).toLocaleTimeString('pt-br')}`
}

export const validator = z.object({
  name: z.string().min(6),
  description: z.string().min(12)
})

export const extractValidationError = (error: ZodError) => {
  return error.issues.reduce((acc, issue) => {
    //@ts-ignore
    acc[issue.path[0]] = issue.message
    return acc
  }, {})
}