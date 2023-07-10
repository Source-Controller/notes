import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useAtomValue } from "jotai"

import { propertiesOfTagsAtom, tagsAtom, typeOfTagsAtom } from "../providers"

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

export function NoteTags({ note }: { note: NoteType }) {
  // types of Properties(like string, select or multiselect)
  const types = useAtomValue(typeOfTagsAtom)
  const propertiesOfTags = useAtomValue(propertiesOfTagsAtom)

  const tags = useAtomValue(tagsAtom)

  return (
    <div className="flex gap-3 px-2">
      {Object.keys(propertiesOfTags).map((key, keyIndex) => {
        if (!tags.check[keyIndex]) {
          return
        }
        const value = propertiesOfTags[key]
        // key -> tagName, value -> properties in tag
        if (types[key] === "text") {
          if (note.tags[key] === "") {
            return
          }
          return (
            <span
              key={note.tags[key]}
              className="border border-[#b7eb8f] bg-[#f6ffed] px-1.5 py-0.5 text-xs text-[#389e0d]"
            >
              {note.tags[key]}
            </span>
          )
        } else if (types[key] === "select") {
          if (note.tags[key] === "") {
            return
          }
          return (
            <span
              key={note.tags[key]}
              className="border border-[#ffa39e] bg-[#fff1f0] px-1.5 py-0.5 text-xs text-[#cf1322]"
            >
              {note.tags[key]}
            </span>
          )
        } else if (types[key] === "multiselect") {
          if (!note.tags[key].length) {
            return
          }
          return (
            <div
              key={note.title}
              className="flex flex-wrap items-center gap-1.5"
            >
              {Array.isArray(value) &&
                value.map((property, index) => {
                  if (!note.tags[key][index]) {
                    return
                  }
                  return (
                    <span
                      key={note.title + property}
                      className="border border-[#91d5ff] bg-[#e6f7ff] px-1.5 py-0.5 text-xs text-[#096dd9]"
                    >
                      {property}
                    </span>
                  )
                })}
            </div>
          )
        }
        return
      })}
    </div>
  )
}
