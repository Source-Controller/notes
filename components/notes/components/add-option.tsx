import { zodResolver } from "@hookform/resolvers/zod"
import { useAtom } from "jotai"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import {
  notesAtom,
  propertiesOfTagsAtom,
  tagsAtom,
  typeOfTagsAtom,
} from "../providers"

const formSchema = z.object({
  name: z.string().min(1, { message: "Please input the name of property" }),
})

export function AddOption({
  property,
  setClose,
}: {
  property: string
  setClose: () => void
}) {
  const [, setProperties] = useAtom(propertiesOfTagsAtom)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const name = values["name"]

    setProperties((prevProperties) => {
      const updatedProperties = {
        ...prevProperties,
        [property]: [...(prevProperties[property] as string[]), name],
      }

      return updatedProperties
    })

    form.setValue("name", "")
    setClose()
  }

  return (
    <DialogContent className="p-6">
      <DialogHeader>
        <DialogTitle>Add Option</DialogTitle>
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

            <Button type="submit">Add</Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  )
}
