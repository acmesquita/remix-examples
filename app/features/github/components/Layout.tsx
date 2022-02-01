import React from "react";
import { Outlet } from "remix";
import * as Types from "../Github.types";
import { Navbar } from "./NavBar";
import { AccountProfile } from "./AccountProfile";

export interface Props {
  user: Types.User
  repos: Types.Repositories.Repo[]
  children: React.ReactChild
}

export function Layout({ user, repos, children }: Props) {
  return (
    <>
      <div className="fixed top-0 left-0 w-1/2 h-full bg-white" aria-hidden="true" />
      <div
        className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
        aria-hidden="true"
      />
      <div className="relative min-h-full flex flex-col">
        <Navbar user={user}/>
        <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <AccountProfile user={user} repos={repos}/>
            {/* Projects List */}
            {children}
          </div>
          {/* Activity feed */}
          <Outlet />
        </div>
      </div>
    </>
  );
}