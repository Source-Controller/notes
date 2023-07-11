import { atom } from "jotai";

interface propertiesOfTagsProps {
  [key: string]: string[] | string;
}

export const propertiesOfTagsAtom = atom<propertiesOfTagsProps>({
  algorithms: [
    "Dynamic Programming",
    "Depth-first Search",
    "Tree",
    "Two Pointers",
    "Binary Search",
  ], 
  level: [
    "Easy", 
    "Medium", 
    "Hard", 
  ],
})

export type { propertiesOfTagsProps }