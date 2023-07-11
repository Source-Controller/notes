import { useAtom } from "jotai"
import { ChevronDown, Plus, Trash } from "lucide-react"

import { Button } from "../components/ui/button"
import { DialogTrigger } from "../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  filtersAtom,
  notesAtom,
  propertiesOfTagsAtom,
  tagsAtom,
  typeOfTagsAtom,
} from "../providers"

export function AddPropertyButton() {
  const [tags, setTags] = useAtom(tagsAtom)
  const [, setNotes] = useAtom(notesAtom)
  const [properties, setProperties] = useAtom(propertiesOfTagsAtom)
  const [, setTagsType] = useAtom(typeOfTagsAtom)
  const [, setFilters] = useAtom(filtersAtom)

  const handleCheck = (index: number) => {
    setTags((prevTags) => {
      const updatedTags = { ...prevTags }
      updatedTags.check[index] = !tags.check[index]
      return updatedTags
    })
  }

  const onPropertyDelete = (e: any, index: number) => {
    e.stopPropagation()

    setTags((prevTags) => {
      const updatedTags = { ...prevTags }
      updatedTags.names.splice(index, 1)
      updatedTags.check.splice(index, 1)
      return updatedTags
    })

    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes]
      for (let i = 0; i < updatedNotes.length; i++) {
        const keys = Object.keys(updatedNotes[i].tags)
        const key = keys[index]
        delete updatedNotes[i].tags[key]
      }
      return updatedNotes
    })

    setTagsType((prevTagsType) => {
      const updatedTagsType = { ...prevTagsType }
      const keys = Object.keys(updatedTagsType)
      const key = keys[index]
      delete updatedTagsType[key]
      return updatedTagsType
    })

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }
      const keys = Object.keys(updatedFilters)
      const key = keys[index]
      delete updatedFilters[key]
      return updatedFilters
    })

    setProperties((prevProperties) => {
      const updatedProperties = { ...prevProperties }
      const keys = Object.keys(updatedProperties)
      const key = keys[index]
      delete updatedProperties[key]
      return updatedProperties
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Properties <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {tags.names.map((tag, index) => {
          return (
            <DropdownMenuCheckboxItem
              key={tag}
              checked={tags.check[index]}
              onCheckedChange={() => handleCheck(index)}
              className="flex items-center justify-between gap-4"
            >
              {tag}
              <Trash
                onClick={(e) => onPropertyDelete(e, index)}
                className="h-4 w-4"
              />
            </DropdownMenuCheckboxItem>
          )
        })}
        <DropdownMenuSeparator />
        <DialogTrigger asChild>
          <DropdownMenuItem className="-m-1 cursor-pointer p-2">
            <div className="flex items-center border border-gray-300 px-2 py-1">
              <Plus className="h-4 w-4" />
              Add a property
            </div>
          </DropdownMenuItem>
        </DialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
