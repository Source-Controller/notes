import { InlineInput } from "../components"
import { NoteDialogProperties } from "./note-dialog-properties"

export function NoteDialogHeader() {
  return (
    <header className="page-header">
      <InlineInput />
      <NoteDialogProperties />
    </header>
  )
}
