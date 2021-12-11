import React, { ButtonHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
interface IForm {
  toDo: string;
}

export enum CategoryEnum {
  "TO_DO",
  "Doing",
  "Done",
}
interface IToDo {
  id: number;
  text: string;
  category: CategoryEnum;
}

const todoState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export const ToDoList = () => {
  const [toDos, setTodos] = useRecoilState(todoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    setValue("toDo", "");
    setTodos((oldTodo) => [
      { text: toDo, id: Date.now(), category: CategoryEnum.TO_DO },
      ...oldTodo,
    ]);
  };

  const handleBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
        <ul>
          {toDos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button value={CategoryEnum.TO_DO} onClick={handleBtnClick}>
                {CategoryEnum[0]}
              </button>
              <button value={CategoryEnum.Doing} onClick={handleBtnClick}>
                {CategoryEnum[1]}
              </button>
              <button value={CategoryEnum.Done} onClick={handleBtnClick}>
                {CategoryEnum[2]}
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
