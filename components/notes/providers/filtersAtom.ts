import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { atom } from "jotai";

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface TagsType {
  [key: string]: string | Checked[];
}

export const filtersAtom = atom<TagsType>({})