"use client"

import { useState } from "react"
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

import { Dialog, DialogContent } from "@/components/ui/dialog"

import { Note } from "./note"
import { NoteDialog } from "./note-editor-dialog"
import {
  filtersAtom,
  noteIdAtom,
  notesAtom,
  propertiesOfTagsAtom,
} from "./providers"

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

export function NotesBody({ filterValue }: { filterValue: string }) {
  const [notes, setNotes] = useAtom(notesAtom)

  // Note Dialog
  const [isOpen, changeOpen] = useState(false)

  const setNoteId = useSetAtom(noteIdAtom)

  // Filters
  const filters = useAtomValue(filtersAtom)

  const properties = useAtomValue(propertiesOfTagsAtom)

  // Drag & Drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      // Re-ordering
      setNotes((notes) => {
        const oldIndex = notes.findIndex((note) => note.id === active.id)
        const newIndex = notes.findIndex((note) => note.id === over?.id)
        return arrayMove(notes, oldIndex, newIndex)
      })
    } else if (active.rect) {
      // Note Dialog Open
      changeOpen(true)
      const oldIndex = notes.findIndex((note) => note.id === active.id)
      setNoteId(oldIndex)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Title Filter
  const titleFilteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filterValue.toLowerCase())
  )

  const isFiltered = (note: NoteType) => {
    let res: boolean = true
    Object.keys(filters).map((key, index) => {
      let flag: boolean = false
      const value = filters[key]
      if (typeof value === "string") {
        flag = note.tags[key].toLowerCase().includes(value) || value === ""
      } else if (Array.isArray(value) && Array.isArray(note.tags[key])) {
        for (let i = 0; i < value.length; i++) {
          if (note.tags[key][i] === value[i] && value[i] === true) {
            flag = true
          }
        }
      } else if (Array.isArray(value) && typeof note.tags[key] === "string") {
        for (let i = 0; i < value.length; i++) {
          if (value[i] === true && properties[key][i] === note.tags[key]) {
            flag = true
          }
        }
      }
      res = res && flag
    })
    return res
  }

  const filteredNotes = titleFilteredNotes.filter(isFiltered)

  return (
    <Dialog open={isOpen} onOpenChange={changeOpen}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={notes} strategy={verticalListSortingStrategy}>
          {filteredNotes.map((note) => {
            return <Note key={note.id} note={note} />
          })}
        </SortableContext>
      </DndContext>

      <DialogContent className="w-screen max-w-full lg:max-w-[85vw]">
        <NoteDialog />
      </DialogContent>
    </Dialog>
  )
}
