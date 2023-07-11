import React, { useEffect, useRef, useState } from "react"
import { useAtomValue, useSetAtom } from "jotai"

import { noteIdAtom, notesAtom } from "../providers"

export function InlineInput() {
  const [inputRef, setInputRef] = useState<HTMLHeadingElement | null>(null)

  const noteId = useAtomValue(noteIdAtom)
  const setNotes = useSetAtom(notesAtom)
  const notes = useAtomValue(notesAtom)

  const [value, onChange] = useState<string>("")

  const handleChange = () => {
    if (inputRef !== null && typeof noteId === "number") {
      onChange(inputRef.innerText)

      const tempValue = inputRef.innerText
      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes]
        updatedNotes[noteId] = {
          ...updatedNotes[noteId],
          title: tempValue,
        }
        return updatedNotes
      })
    }
  }

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  useEffect(() => {
    if (typeof noteId === "number") {
      onChange(notes[noteId].title)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const ref = inputRef
    return () => {
      if (ref) {
        setInputRef(null)
      }
    }
  }, [inputRef])

  useEffect(() => {
    if (value !== inputRef?.innerText && inputRef !== null) {
      inputRef.innerText = value
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <h1
      ref={(ref) => setInputRef(ref)}
      contentEditable={true}
      onKeyPress={handleKeyPress}
      onInput={handleChange}
      data-testid="input"
      className="mb-3.5 px-1 py-0.5 text-3xl"
    ></h1>
  )
}
