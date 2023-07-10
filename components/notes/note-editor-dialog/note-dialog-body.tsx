import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState } from "react"
import dynamic from "next/dynamic"
import { useAtomValue, useSetAtom } from "jotai"

import { noteIdAtom, notesAtom } from "../providers"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export function NoteDialogBody() {
  const noteId = useAtomValue(noteIdAtom)
  const setNotes = useSetAtom(notesAtom)
  const notes = useAtomValue(notesAtom)

  const [value, setValue] = useState<string>(notes[noteId || 0].view)

  const handleChange = (newValue: string | undefined) => {
    setValue(newValue || "")

    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes]
      updatedNotes[noteId || 0] = {
        ...updatedNotes[noteId || 0],
        view: newValue || "",
      }
      return updatedNotes
    })
  }

  return <MDEditor value={value} onChange={handleChange} />
}
