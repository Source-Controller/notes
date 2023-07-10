import { atom } from "jotai";

interface TagsType {
  [key: string]: 'text' | 'select' | 'multiselect';
}

export const typeOfTagsAtom = atom<TagsType>({
  algorithms: 'multiselect', 
  level: 'select', 
})