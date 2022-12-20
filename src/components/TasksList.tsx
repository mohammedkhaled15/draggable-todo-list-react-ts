import { Droppable } from "react-beautiful-dnd";
import { Task } from "../features/task/model";
import TaskCard from "./TaskCard";

interface TasksListProps {
  tasks: Task[];
  completedTasks: Task[];
}
const TasksList = ({ tasks, completedTasks }: TasksListProps) => {
  return (
    <div className="container">
      <Droppable droppableId="Todos">
        {(provided, snapshot) => (
          <div
            className={`todos ${
              snapshot.isDraggingOver ? "todos-glowing" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {tasks.map((task, index) => {
              return <TaskCard task={task} key={task.id} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="Completed">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "complete-glowing" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Complete Tasks</span>
            {completedTasks.map((task, index) => {
              return <TaskCard task={task} key={task.id} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TasksList;
