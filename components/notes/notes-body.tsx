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
import { useAtom, useSetAtom } from "jotai"

import { Dialog, DialogContent } from "@/components/ui/dialog"

import { Note } from "./note"
import { NoteDialog } from "./note-editor-dialog"
import { noteIdAtom, notesAtom } from "./providers"

export function NotesBody(props: any) {
  const { filterValue } = props
  const [notes, setNotes] = useAtom(notesAtom)

  // Note Dialog
  const [isOpen, changeOpen] = useState(false)

  const setNoteId = useSetAtom(noteIdAtom)

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
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filterValue.toLowerCase())
  )

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
