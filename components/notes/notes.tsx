"use client"

import { useState } from "react"

import { NotesBody } from "./notes-body"
import { NotesHeader } from "./notes-header"
import { NotesToolBar } from "./notes-toolbar"

export function Notes() {
  const [filterValue, setFilterValue] = useState<string>("")
  return (
    <>
      <NotesToolBar filterValue={filterValue} setFilterValue={setFilterValue} />
      <NotesHeader />
      <NotesBody filterValue={filterValue} />
    </>
  )
}
