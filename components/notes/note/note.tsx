import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Trash } from "lucide-react"

import { NoteTags } from "./note-tags"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface TagsType {
  [key: string]: any | Checked[]
}

interface NoteType {
  id: number
  title: string
  tags: TagsType
  view: string
}

export function Note({ note }: { note: NoteType }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const onDelete = (event: any) => {
    event.stopPropagation()
    alert("del")
    // invoke onDelete func
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="relative flex min-h-[39px] select-none flex-wrap items-center gap-4 break-all border-b border-gray-300 py-2 pl-4 pr-8">
        <div className="mr-auto text-sm">{note.title}</div>

        <NoteTags note={note} />

        <div className="px-5 text-sm">07/07/2023</div>
        <Trash
          className="absolute right-2 top-[11px] h-4 w-4 cursor-pointer select-none"
          onClick={onDelete}
        />
      </div>
    </div>
  )
}
