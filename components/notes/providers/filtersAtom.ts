import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { atom } from "jotai";

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface FilterType {
  [key: string]: string | Checked[];
}

export const filtersAtom = atom<FilterType>({})