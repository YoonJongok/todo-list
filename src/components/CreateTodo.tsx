import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CategoryEnum, categoryState, todoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    setValue("toDo", "");
    setTodos((oldTodo) => [
      { text: toDo, id: Date.now(), category },
      ...oldTodo,
    ]);
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateTodo;
