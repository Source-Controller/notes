import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useAtom } from "jotai"

import { Button } from "@/components/ui/button"

import { noteIdAtom, notesAtom, propertiesOfTagsAtom } from "./providers"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function NoteCreateNew({
  changeOpen,
}: {
  changeOpen: (val: boolean) => void
}) {
  const [notes, setNotes] = useAtom(notesAtom)
  const [properties] = useAtom(propertiesOfTagsAtom)
  const [, setNoteId] = useAtom(noteIdAtom)

  const addNew = () => {
    setNotes((prevNotes) => {
      let tempTag = {}
      Object.keys(properties).map((key) => {
        const value = properties[key]
        if (typeof value === "string") {
          tempTag = { ...tempTag, [key]: "" }
        } else if (Array.isArray(value)) {
          const arr: Checked[] = Array(value.length).fill(false)
          tempTag = { ...tempTag, [key]: arr }
        }
      })
      const updatedNotes = [
        ...prevNotes,
        {
          id: prevNotes[prevNotes.length - 1].id + 1,
          title: "New Note",
          tags: tempTag,
          view: "",
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
