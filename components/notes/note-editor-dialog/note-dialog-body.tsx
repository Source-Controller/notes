import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import { useState } from "react"
import dynamic from "next/dynamic"
import { useAtomValue, useSetAtom } from "jotai"

import { Editor } from "./editor"

export function NoteDialogBody() {
  return <Editor />
}
