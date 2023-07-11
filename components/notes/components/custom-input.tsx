import { useEffect, useState } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

import { Input } from "@/components/ui/input"

import {
  noteIdAtom,
  notesAtom,
  propertiesOfTagsAtom,
  tagsAtom,
} from "../providers"

export function CustomInput({
  property,
  index,
}: {
  property: string
  index: number
}) {
  const tags = useAtomValue(tagsAtom)
  const tag = tags.names[index]

  // Note Id
  const noteId = useAtomValue(noteIdAtom)

  // Notes
  const [notes, setNotes] = useAtom(notesAtom)

  const properties = useAtomValue(propertiesOfTagsAtom)

  const [text, setText] = useState(notes[noteId || 0].tags[property])

  useEffect(() => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes]
      updatedNotes[noteId || 0] = {
        ...updatedNotes[noteId || 0],
        tags: {
          ...updatedNotes[noteId || 0].tags,
          [property]: text,
        },
      }
      return updatedNotes
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <div className="mb-[3px] flex items-center">
      <div className="mr-2.5 w-20 text-base lg:w-36">{tag}</div>
      <Input className="h-8" value={text} onChange={handleChange} />
    </div>
  )
}
