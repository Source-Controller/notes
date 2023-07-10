import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { atom } from "jotai";

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface tagsType {
  names: string[];
  check: Checked[];
}

export const tagsAtom = atom<tagsType>({
  names: [
    'Algorithms', 
    'Level', 
  ],
  check: [
    true, 
    true, 
  ]
});
