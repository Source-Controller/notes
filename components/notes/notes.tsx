"use client"

import { useEffect, useState } from "react"
import { useAtom } from "jotai"

import { NotesBody } from "./notes-body"
import { NotesHeader } from "./notes-header"
import { NotesToolBar } from "./notes-toolbar"
import { NoteProps, notesAtom } from "./providers/notesAtom"
import {
  propertiesOfTagsAtom,
  propertiesOfTagsType,
} from "./providers/propertiesAtom"
import { TagsProps, tagsAtom } from "./providers/tagsAtom"
import { TagsTypeProps, typeOfTagsAtom } from "./providers/typeOfTagsAtom"

interface NotesProps {
  notes?: NoteProps[]
  properties?: propertiesOfTagsType
  tags?: TagsProps
  tagsType?: TagsTypeProps
  onChange?: (
    notes: NoteProps[],
    properties: propertiesOfTagsType,
    tags: TagsProps,
    tagsType: propertiesOfTagsType
  ) => void
}

export function Notes({
  notes,
  properties,
  tags,
  tagsType,
  onChange,
}: NotesProps) {
  const [filterValue, setFilterValue] = useState<string>("")
  const handleFilterValue = (val: string) => {
    setFilterValue(val)
  }

  const [_notes, setNotes] = useAtom(notesAtom)
  const [_properties, setProperties] = useAtom(propertiesOfTagsAtom)
  const [_tags, setTags] = useAtom(tagsAtom)
  const [_tagsType, setTagsType] = useAtom(typeOfTagsAtom)
  if (notes) {
    setNotes(notes)
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

  useEffect(() => {
    if (onChange) {
      onChange(_notes, _properties, _tags, _tagsType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_notes, _properties, _tags, _tagsType])

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
