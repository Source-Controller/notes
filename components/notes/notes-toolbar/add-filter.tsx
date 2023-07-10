import { ChevronDown, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export function AddFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          Filter <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <Separator />
        <div className="my-1 flex cursor-pointer items-center px-2 py-1 hover:bg-gray-100">
          <Plus className="h-4 w-4" />
          Add a Filter
        </div>
      </PopoverContent>
    </Popover>
  )
}
