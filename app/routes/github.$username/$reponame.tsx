import { LoaderFunction, useLoaderData } from "remix"
import { Error } from "~/components/Error"
import { GithubApi, Types } from "~/features/github"
import { Commits } from "~/features/github/components/Commits"

export const loader: LoaderFunction = async ({ params }): Promise<Types.Commits.LoaderData> => {
  return {
    user: await GithubApi.getUser(params.username),
    commits: await GithubApi.getCommits(params.username, params.reponame)
  }
}

export function ErrorBoundary() {
  return <Error message="Erro ao carregar os commits do repositório, tente novamente mais tarde."/>
}

export default function () {
  const { user, commits } = useLoaderData<Types.Commits.LoaderData>()

  return <Commits user={user} commits={commits}/>
}