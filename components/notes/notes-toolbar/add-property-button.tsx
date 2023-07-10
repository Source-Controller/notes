import { useAtom } from "jotai"
import { ChevronDown, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { tagsAtom } from "../providers"

export function AddPropertyButton() {
  const [tags, setTags] = useAtom(tagsAtom)

  const handleCheck = (index: number) => {
    setTags((prevTags) => {
      const updatedTags = { ...prevTags }
      updatedTags.check[index] = !tags.check[index]
      return updatedTags
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
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
            >
              {tag}
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
