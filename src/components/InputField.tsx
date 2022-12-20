import "./style.css";
import { FormEvent, useState, useRef } from "react";
import { Task } from "../features/task/model";

interface InputFieldProps {
  handleAdd: (task: Task) => void;
}

const InputField = ({ handleAdd }: InputFieldProps) => {
  const [text, setText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAdd({ id: Date.now(), text, isDone: false });
    setText("");
    inputRef.current?.blur();
  };
  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        type="input"
        placeholder="Enter Your task"
        className="input__box"
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="input__submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
