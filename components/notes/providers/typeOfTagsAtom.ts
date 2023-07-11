import { atom } from "jotai";

interface TagsTypeProps {
  [key: string]: 'text' | 'select' | 'multiselect';
}

export const typeOfTagsAtom = atom<TagsTypeProps>({
  algorithms: 'multiselect', 
  level: 'select', 
})

export type { TagsTypeProps }