import { useState } from "react"

import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { AddFilter } from "./add-filter"
import { AddPropertyButton } from "./add-property-button"
import { AddPropertyDialog } from "./add-property-dialog"
import { PropertyFilters } from "./property-filters"

export function NotesToolBar(props: any) {
  const { filterValue, setFilterValue } = props

  const [dialog, setDialog] = useState(false)

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <div className="relative flex select-none flex-wrap items-center gap-4 break-all py-2">
        <Input
          placeholder="Filter Titles..."
          className="max-w-sm border-gray-300"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />
        <PropertyFilters />
        <AddPropertyButton />
      </div>

      <AddPropertyDialog setClose={() => setDialog(false)} />
    </Dialog>
  )
}
