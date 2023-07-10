import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { useAtom } from "jotai"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

import { filtersAtom, tagsAtom } from "../providers"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function SelectFilter({
  property,
  index,
  propertyValue,
}: {
  property: string
  index: number
  propertyValue: string[] | string
}) {
  const [tags] = useAtom(tagsAtom)

  const [, setFilters] = useAtom(filtersAtom)
  const [selectedValues, setSelectedValues] = React.useState<string[]>([])

  const options = propertyValue as string[]

  const [value, setValue] = React.useState<Checked[]>([])

  React.useEffect(() => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [property]: value,
      }
      return updatedFilters
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  React.useEffect(() => {
    const updatedValue = options.map((option) =>
      selectedValues.includes(option)
    )
    setValue(updatedValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-10 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {tags.names[index]}
          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.includes(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={tags.names[index]} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option)
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedValues((prevValues) =>
                          prevValues.filter((v) => v !== option)
                        )
                      } else {
                        setSelectedValues((prevValues) => [
                          ...prevValues,
                          option,
                        ])
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    <span>{option}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValues([])
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
