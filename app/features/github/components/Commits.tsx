import { Types } from "..";
import { Commit } from "./Commit";

export interface Props {
  user: Types.User
  commits: Types.Commits.Commit[]
}

export function Commits({ user, commits }: Props) {
  return (
    <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
      <div className="pl-6 lg:w-80">
        <div className="pt-6 pb-2">
          <h2 className="text-sm font-semibold">Activity</h2>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            {commits.map(commit => <Commit key={commit.sha} user={user} commit={commit}/>)}
          </ul>
          <div className="py-4 text-sm border-t border-gray-200">
            <a
              href="#"
              className="text-indigo-600 font-semibold hover:text-indigo-900"
            >
              View all activity <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}