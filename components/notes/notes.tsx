"use client"

import { useState } from "react"

import { NotesBody } from "./notes-body"
import { NotesHeader } from "./notes-header"
import { NotesToolBar } from "./notes-toolbar"

export function Notes() {
  const [filterValue, setFilterValue] = useState<string>("")
  const handleFilterValue = (val: string) => {
    setFilterValue(val)
  }
  return (
    <>
      <NotesToolBar
        filterValue={filterValue}
        setFilterValue={handleFilterValue}
      />
      <NotesHeader />
      <NotesBody filterValue={filterValue} />
    </>
  )
}
