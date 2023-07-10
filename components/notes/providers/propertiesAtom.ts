import { atom } from "jotai";

interface propertiesOfTagsType {
  [key: string]: string[] | string;
}

export const propertiesOfTagsAtom = atom<propertiesOfTagsType>({
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