import invariant from "tiny-invariant"
import { pick } from "lodash"
import { Types } from "."
import { Commits } from "./Github.types"

export const getUser = async (username?: string) => {
  invariant(username, 'Please provider an username as a string')

  const res = await fetch(`https://api.github.com/users/${username}`)

  return pick(await res.json(), ["login", "avatar_url", "html_url", "bio" ])
}

export const getRepos = async (username?: string) => {
  invariant(username, 'Please provider an username as a string')

  const res = await fetch(`https://api.github.com/users/${username}/repos`)

  const repos = await res.json()

  return repos.map(
    (repo: Types.Repositories.Repo) => (
      pick(repo, [
        "id", 
        "full_name", 
        "name", 
        "html_url", 
        "stargazers_count",
        "language"
      ])
    ))
}

export const getCommits = async (username?: string, reponame?: string): Promise<Types.Commits.Commit[]> => {
  invariant(username, 'Please provider an username as a string')
  invariant(reponame, 'Please provider an repository name as a string')

  const res = await fetch(`https://api.github.com/repos/${username}/${reponame}/commits`)

  return (await res.json()).map((commit: Commits.ApiResponse) => ({
    sha: commit.sha,
    message: commit.commit.message,
    html_url: commit.html_url
  }))
}