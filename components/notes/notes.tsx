"use client"

import { useState } from "react"
import { useSetAtom } from "jotai"

import { NotesBody } from "./notes-body"
import { NotesHeader } from "./notes-header"
import { NotesToolBar } from "./notes-toolbar"
import { NoteType, notesAtom } from "./providers/notesAtom"
import {
  propertiesOfTagsAtom,
  propertiesOfTagsType,
} from "./providers/propertiesAtom"
import { TagsProps, tagsAtom } from "./providers/tagsAtom"
import { TagsTypeProps, typeOfTagsAtom } from "./providers/typeOfTagsAtom"

interface NotesProps {
  data?: NoteType[]
  properties?: propertiesOfTagsType
  tags?: TagsProps
  tagsType?: TagsTypeProps
}

export function Notes({ data, properties, tags, tagsType }: NotesProps) {
  const [filterValue, setFilterValue] = useState<string>("")
  const handleFilterValue = (val: string) => {
    setFilterValue(val)
  }

  const setNotes = useSetAtom(notesAtom)
  const setProperties = useSetAtom(propertiesOfTagsAtom)
  const setTags = useSetAtom(tagsAtom)
  const setTagsType = useSetAtom(typeOfTagsAtom)
  if (data) {
    setNotes(data)
  }
  if (properties) {
    setProperties(properties)
  }
  if (tags) {
    setTags(tags)
  }
  if (tagsType) {
    setTagsType(tagsType)
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
