import React, { ButtonHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { CategoryEnum, categoryState, todoSelector, todoState } from "../atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

export const ToDoList = () => {
  const toDos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={CategoryEnum.TO_DO}>To Do</option>
        <option value={CategoryEnum.DOING}>Doing</option>
        <option value={CategoryEnum.DONE}>Done</option>
      </select>
      <CreateTodo />
      <ul>
        {toDos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};
