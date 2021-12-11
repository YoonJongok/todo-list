import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export enum CategoryEnum {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  id: number;
  text: string;
  category: CategoryEnum;
}

export const todoState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export const categoryState = atom<CategoryEnum>({
  key: "categoryState",
  default: CategoryEnum.TO_DO,
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const toDos = get(todoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
