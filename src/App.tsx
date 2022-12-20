import "./App.css";
import InputField from "./components/InputField";
import { Task } from "./features/task/model";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  completeTask,
  doneTask,
  activateTask,
} from "./features/tasksList/tasksListSlice";
import TasksList from "./components/TasksList";
import { RootState } from "./app/store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const handleAdd = (task: Task) => {
    dispatch(createTask(task));
  };

  const tasks = useSelector((state: RootState) => state.tasksList.tasks);
  const completedTasks = useSelector(
    (state: RootState) => state.tasksList.completedTasks
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (
      source.droppableId === "Todos" &&
      destination.droppableId === "Completed"
    ) {
      dispatch(completeTask(tasks[source.index]));
    }

    if (
      source.droppableId === "Completed" &&
      destination.droppableId === "Todos"
    ) {
      dispatch(activateTask(completedTasks[source.index]));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div className="heading">Taskify</div>
        <InputField handleAdd={handleAdd} />
        <TasksList tasks={tasks} completedTasks={completedTasks} />
      </div>
    </DragDropContext>
  );
};

export default App;
