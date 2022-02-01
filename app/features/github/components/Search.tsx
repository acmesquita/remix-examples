import { SearchIcon } from "@heroicons/react/solid";
import { FormEvent, useRef } from "react";
import { Form, useNavigate, useParams, useTransition } from "remix";

export function Search() {
  const usernameInput = useRef<HTMLInputElement>(null)
  const nav = useNavigate()
  const { username } = useParams()

  const transition = useTransition()
  const loading = transition.state === 'submitting'

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const username = usernameInput.current?.value
    if (username){ nav(`/github/${username}`) }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex-1 flex justify-center lg:justify-end">
        <div className="w-full px-2 lg:px-6">
          <label htmlFor="search" className="sr-only">
            Search Github user
          </label>
          <div className="relative text-indigo-200 focus-within:text-gray-400">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-indigo-400 bg-opacity-25 text-indigo-100 placeholder-indigo-200 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
              placeholder="Search Github user"
              type="search"
              defaultValue={username}
              onBlur={handleSubmit}
              ref={usernameInput}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </Form>
  )
}