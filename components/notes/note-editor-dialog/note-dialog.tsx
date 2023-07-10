import { NoteDialogBody } from "./note-dialog-body"
import { NoteDialogHeader } from "./note-dialog-header"

export function NoteDialog() {
  return (
    <div className="lg:p-5">
      <NoteDialogHeader />
      <div className="mt-[35px]">
        <NoteDialogBody />
      </div>
    </div>
  )
}
