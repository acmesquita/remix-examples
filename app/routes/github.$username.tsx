import { LoaderFunction, useLoaderData } from "remix";
import { Error } from "~/components/Error";
import { GithubApi, Repositories, Types } from "~/features/github";

export const loader: LoaderFunction = async ({ params }) => {
  return {
    user: await GithubApi.getUser(params.username),
    repos: await GithubApi.getRepos(params.username)
  }
}

export function ErrorBoundary() {
  return <Error />
}

export default function () {
  const { user, repos } = useLoaderData<Types.Repositories.LoaderData>()

  return <Repositories user={user} repos={repos} />
}