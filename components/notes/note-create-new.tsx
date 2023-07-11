import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useAtom } from "jotai"

import { Button } from "./components/ui/button"
import {
  noteIdAtom,
  notesAtom,
  propertiesOfTagsAtom,
  typeOfTagsAtom,
} from "./providers"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const { v4: uuidv4 } = require("uuid")

export function NoteCreateNew({
  changeOpen,
}: {
  changeOpen: (val: boolean) => void
}) {
  const [notes, setNotes] = useAtom(notesAtom)
  const [properties] = useAtom(propertiesOfTagsAtom)
  const [, setNoteId] = useAtom(noteIdAtom)
  const [types] = useAtom(typeOfTagsAtom)

  const addNew = () => {
    setNotes((prevNotes) => {
      let tempTag = {}
      Object.keys(properties).map((key) => {
        const value = properties[key]
        if (types[key] === "text" || types[key] === "select") {
          tempTag = { ...tempTag, [key]: "" }
        } else if (types[key] === "multiselect") {
          const arr: Checked[] = Array(value.length).fill(false)
          tempTag = { ...tempTag, [key]: arr }
        }
      })
      const randomId = uuidv4()
      const updatedNotes = [
        ...prevNotes,
        {
          id: randomId,
          title: "New Note",
          tags: tempTag,
          view: "",
          dateCreatedAt: "",
        },
      ]
      return updatedNotes
    })
    setNoteId(notes.length)
    changeOpen(true)
  }
  return (
    <div className="relative flex min-h-[39px] select-none flex-wrap items-center gap-4 break-all pl-4 pr-8 pt-6">
      <Button onClick={addNew}>New Note</Button>
    </div>
  )
}
