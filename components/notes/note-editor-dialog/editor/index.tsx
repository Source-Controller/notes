"use client"

import { useEffect, useRef, useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import va from "@vercel/analytics"
import { useCompletion } from "ai/react"
import { useAtom, useAtomValue } from "jotai"
import { toast } from "sonner"
import { useDebouncedCallback } from "use-debounce"

import { noteIdAtom } from "../../providers"
import { NovelProps, notesAtom } from "../../providers/notesAtom"
import { EditorBubbleMenu } from "./components"
import { TiptapExtensions } from "./extensions"
import { getPrevText } from "./lib/editor"
import { TiptapEditorProps } from "./props"

export function Editor() {
  const noteId = useAtomValue(noteIdAtom)
  const [notes, setNotes] = useAtom(notesAtom)
  const [content, setContent] = useState<NovelProps>(notes[noteId || 0].view)
  const [saveStatus, setSaveStatus] = useState("Saved")

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON()
    setSaveStatus("Saving...")
    setContent(json)
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved")
    }, 500)
  }, 750)

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved")
      const selection = e.editor.state.selection
      const lastTwo = getPrevText(e.editor, {
        chars: 2,
      })
      if (lastTwo === "++" && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        })
        complete(
          getPrevText(e.editor, {
            chars: 5000,
          })
        )
        // complete(e.editor.storage.markdown.getMarkdown());
        va.track("Autocomplete Shortcut Used")
      } else {
        debouncedUpdates(e)
      }
    },
    autofocus: "start",
  })

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      })
    },
    onError: (err) => {
      toast.error(err.message)
      if (err.message === "You have reached your request limit for the day.") {
        va.track("Rate Limit Reached")
      }
    },
  })

  const prev = useRef("")

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length)
    prev.current = completion
    editor?.commands.insertContent(diff)
  }, [isLoading, editor, completion])

  useEffect(() => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes]
      updatedNotes[noteId || 0] = {
        ...updatedNotes[noteId || 0],
        view: content,
      }
      return updatedNotes
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop()
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          })
        }
        editor?.commands.insertContent("++")
      }
    }
    const mousedownHandler = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      stop()
      if (window.confirm("AI writing paused. Continue?")) {
        complete(editor?.getText() || "")
      }
    }
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown)
      window.addEventListener("mousedown", mousedownHandler)
    } else {
      document.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("mousedown", mousedownHandler)
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("mousedown", mousedownHandler)
    }
  }, [stop, isLoading, editor, complete, completion.length])

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run()
      }}
      className="relative max-h-[500px] w-full overflow-y-auto border-stone-200 bg-white p-12 px-8 sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
    >
      <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
