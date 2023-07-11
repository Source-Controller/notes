import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { atom } from "jotai";

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface TagsProps {
  names: string[];
  check: Checked[];
}

export const tagsAtom = atom<TagsProps>({
  names: [
    'Algorithms', 
    'Level', 
  ],
  check: [
    true, 
    true, 
  ]
});

export type { TagsProps }