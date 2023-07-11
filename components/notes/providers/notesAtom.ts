import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { atom } from "jotai";

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface TagsType {
  [key: string]: any | Checked[];
}

interface NoteType {
  id: number | string;
  title: string;
  tags: TagsType;
  view: string;
  dateCreatedAt: string;
}

const notesAtom = atom<NoteType[]>([
  {
    id: 'c6d86565-8b7f-4aac-b9f4-845bde4fb7d4', 
    title: "Two Sum",
    tags: {
      algorithms: [
        true, false, false, false, false
      ], 
      level: "Easy", 
    },
    view: "", 
    dateCreatedAt: '', 
  }, 
  {
    id: 'b91151af-3173-4fde-a1d2-8aa27084525d',
    title: "Coin Change",
    tags: {
      algorithms: [
        true, false, true, false, false
      ], 
      level: "Medium", 
    },
    view: "", 
    dateCreatedAt: '', 
  }, 
  {
    id: 'e085b4fe-b099-40df-8224-a895beb88af6',
    title: "Partition Equal Subset Sum",
    tags: {
      algorithms: [
        false, true, false, true, true
      ], 
      level: "Hard", 
    },
    view: "", 
    dateCreatedAt: '', 
  }, 
  {
    id: '49ca41a7-3d54-40a8-86fc-28367e611df9',
    title: "Longest Substring Without Repeating Characters",
    tags: {
      algorithms: [
        false, true, false, true, false
      ], 
      level: "Medium", 
    },
    view: "", 
    dateCreatedAt: '', 
  }, 
])

export { notesAtom };
export type { NoteType };
