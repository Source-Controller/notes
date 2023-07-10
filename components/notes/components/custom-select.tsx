import { useEffect, useRef, useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useAtom, useAtomValue } from "jotai"
import { ChevronDown } from "lucide-react"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  noteIdAtom,
  notesAtom,
  propertiesOfTagsAtom,
  tagsAtom,
} from "../providers"
import { AddOption } from "./add-option"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function CustomSelect(props: any) {
  // Property Name ( like algorithms and level, etc... )
  const { property, index } = props
  const tags = useAtomValue(tagsAtom)
  const tag = tags.names[index]

  // Note Id
  const noteId = useAtomValue(noteIdAtom)

  // Notes
  const [notes, setNotes] = useAtom(notesAtom)

  const properties = useAtomValue(propertiesOfTagsAtom)

  const [select, setSelect] = useState(notes[noteId || 0].tags[property])

  const [dialog, setDialog] = useState(false)

  const divRef = useRef<HTMLDivElement | null>(null)

  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const w = divRef.current.offsetWidth
        setWidth(w)
      }
    }

    // Attach the event listener
    window.addEventListener("resize", handleResize)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes]
      updatedNotes[noteId || 0] = {
        ...updatedNotes[noteId || 0],
        tags: {
          ...updatedNotes[noteId || 0].tags,
          [property]: select,
        },
      }
      return updatedNotes
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select])

  return (
    <div className="mb-[3px] flex h-8 items-center">
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DropdownMenu>
          <div className="mr-2.5 w-20 text-base lg:w-36">{tag}</div>
          <DropdownMenuTrigger asChild>
            <div
              ref={divRef}
              className="relative flex h-8 w-full cursor-pointer items-center border border-dashed px-3 py-1 text-sm data-[state=open]:border data-[state=open]:border-blue-300"
            >
              {select}
              <ChevronDown className="absolute bottom-1.5 right-2 h-4 w-4 text-slate-400" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`w-[${width}px]`}>
            <DropdownMenuRadioGroup value={select} onValueChange={setSelect}>
              {Array.isArray(properties[property]) ? (
                (properties[property] as string[]).map((p: string) => {
                  return (
                    <DropdownMenuRadioItem key={p} value={p}>
                      {p}
                    </DropdownMenuRadioItem>
                  )
                })
              ) : (
                <></> // or any other fallback UI if needed
              )}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DialogTrigger asChild className="flex justify-center">
              <DropdownMenuItem>Add option</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AddOption property={property} setClose={() => setDialog(false)} />
      </Dialog>
    </div>
  )
}
