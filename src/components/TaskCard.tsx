import { Task } from "../features/task/model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  editTask,
  doneTask,
  deleteTaskFromCompleted,
} from "../features/tasksList/tasksListSlice";

import { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { RootState } from "../app/store";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard = ({ task, index }: TaskCardProps) => {
  const dispatch = useDispatch();

  const completedTasks = useSelector(
    (state: RootState) => state.tasksList.completedTasks
  );
  const tasks = useSelector((state: RootState) => state.tasksList.tasks);

  const [editing, setEditing] = useState<boolean>(false);
  const [editedText, setEditingText] = useState<string>(task.text);

  const editingInputRef = useRef<HTMLInputElement>(null);

  const handleEditing = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editTask({ text: editedText, id: task.id }));
    setEditing(false);
  };

  useEffect(() => {
    editingInputRef.current?.focus();
  }, [editing]);

  const handleDelete = (task: Task) => {
    if (task.isDone) {
      dispatch(deleteTaskFromCompleted(task.id));
    } else {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`taskCard ${snapshot.isDragging ? "dragging" : ""}`}
          onSubmit={(e) => handleEditing(e)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {editing ? (
            <input
              value={editedText}
              onChange={(e) => setEditingText(e.target.value)}
              className="taskCard-text"
              ref={editingInputRef}
            />
          ) : task.isDone ? (
            <s className="taskCard-text">{task.text}</s>
          ) : (
            <span className="taskCard-text">{task.text}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!editing && !task.isDone) setEditing(!editing);
                editingInputRef.current?.focus();
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(task)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => dispatch(doneTask(task.id))}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TaskCard;
