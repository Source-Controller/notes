import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useAtom } from "jotai"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Separator } from "../components/ui/separator"
import {
  notesAtom,
  propertiesOfTagsAtom,
  tagsAtom,
  typeOfTagsAtom,
} from "../providers"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface TagsType {
  [key: string]: "text" | "select" | "multiselect"
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Please input the name of property" }),
  type: z.string().min(1, { message: "Please input the type of property" }),
})

export function AddPropertyDialog({ setClose }: { setClose: () => void }) {
  const [, setTypeOfTags] = useAtom(typeOfTagsAtom)
  const [, setTags] = useAtom(tagsAtom)
  const [, setProperties] = useAtom(propertiesOfTagsAtom)
  const [, setNotes] = useAtom(notesAtom)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const name = values["name"].toLowerCase().trim().replace(/\s/g, "")
    const type = values["type"].toLowerCase()

    setTypeOfTags((prevTags: TagsType) => {
      const updatedTags: TagsType = {
        ...prevTags,
        [name]: type as "text" | "select" | "multiselect",
      }
      return updatedTags
    })

    setTags((prevTags) => {
      const updatedTags = {
        names: prevTags.names.concat(values["name"]),
        check: prevTags.check.concat(true),
      }
      return updatedTags
    })

    switch (type) {
      case "text":
        setProperties((prevProperties) => {
          const updatedProperties = {
            ...prevProperties,
            [name]: "",
          }
          return updatedProperties
        })
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.map((note) => ({
            ...note,
            tags: {
              ...note.tags,
              [name]: "",
            },
          }))
          return updatedNotes
        })
        break
      case "select":
        setProperties((prevProperties) => {
          const updatedProperties = {
            ...prevProperties,
            [name]: [] as string[],
          }
          return updatedProperties
        })
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.map((note) => ({
            ...note,
            tags: {
              ...note.tags,
              [name]: "",
            },
          }))
          return updatedNotes
        })
        break
      case "multiselect":
        setProperties((prevProperties) => {
          const updatedProperties = {
            ...prevProperties,
            [name]: [] as string[],
          }
          return updatedProperties
        })
        setNotes((prevNotes) => {
          const updatedNotes = prevNotes.map((note) => ({
            ...note,
            tags: {
              ...note.tags,
              [name]: [] as Checked[],
            },
          }))
          return updatedNotes
        })
        break
      default:
        break
    }

    form.setValue("name", "")
    form.setValue("type", "")
    setType("")
    setClose()
  }

  const [type, setType] = useState<string>("")

  const handleType = (text: string) => {
    form.setValue("type", text)
    form.clearErrors("type")
    setType(text)
  }

  return (
    <DialogContent className="p-6">
      <DialogHeader>
        <DialogTitle>Create Property</DialogTitle>
      </DialogHeader>
      <Separator className="-mx-6 w-auto" />
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name of Property */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="min-h-[68px]">
                  <div className="flex items-center gap-6">
                    <FormLabel>Name: </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-[72px]" />
                </FormItem>
              )}
            />

            {/* Type of Property */}
            <DropdownMenu>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="min-h-[68px]">
                    <div className="flex items-center gap-6">
                      <FormLabel className="min-w-[44px]">Type: </FormLabel>
                      <DropdownMenuTrigger asChild>
                        <FormControl>
                          <Input {...field} value={type} />
                        </FormControl>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleType("Text")}>
                          Text
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleType("Select")}>
                          Select
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleType("MultiSelect")}
                        >
                          MultiSelect
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </div>
                    <FormMessage className="ml-[72px]" />
                  </FormItem>
                )}
              />
            </DropdownMenu>
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  )
}
