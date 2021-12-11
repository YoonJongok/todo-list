import React from "react";
import { useSetRecoilState } from "recoil";
import { CategoryEnum, IToDo, todoState } from "../atoms";

function Todo({ id, text, category }: IToDo) {
  const setToDos = useSetRecoilState(todoState);
  const handleBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };
      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li key={id}>
      <span> {text}</span>
      {category !== CategoryEnum.TO_DO && (
        <button name={CategoryEnum.TO_DO} onClick={handleBtnClick}>
          To Do
        </button>
      )}
      {category !== CategoryEnum.DOING && (
        <button name={CategoryEnum.DOING} onClick={handleBtnClick}>
          Doing
        </button>
      )}

      {category !== CategoryEnum.DONE && (
        <button name={CategoryEnum.DONE} onClick={handleBtnClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default Todo;
