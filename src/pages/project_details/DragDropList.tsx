/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { useParams } from "react-router-dom";
import Column from "./Column";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { useTasksDispatch } from "../../context/task/context";
import { reorderTasks } from "../../context/task/actions";
import { AvailableColumns, ProjectData } from "../../context/task/types";
import {updateTask } from "../../context/task/actions";
const Container = (props: React.PropsWithChildren) => {
  return <div className="flex">{props.children}</div>;
};
const DragDropList = (props: {
  data: ProjectData;
}) => {
  const taskDispatch = useTasksDispatch();
  const { projectID } = useParams();
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startKey = source.droppableId as AvailableColumns;
    const finishKey = destination.droppableId as AvailableColumns;

    const start = props.data.columns[startKey];
    const finish = props.data.columns[finishKey];
console.log("start",start)
    if (start === finish) {
      const newTaskIDs = Array.from(start.taskIDs);
      console.log("me", newTaskIDs)
//       splice(start, deleteCount)
// splice(start, deleteCount, item1)
      newTaskIDs.splice(source.index, 1);
      newTaskIDs.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIDs: newTaskIDs,
      };
      const newState = {
        ...props.data,
        columns: {
          ...props.data.columns,
          [newColumn.id]: newColumn,
        },
      };
      
      reorderTasks(taskDispatch, newState);
      
      return;
    }
    // start and finish list are different

    const startTaskIDs = Array.from(start.taskIDs);
 
    
    // Remove the item from `startTaskIDs`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedItems = startTaskIDs.splice(source.index, 1);
    console.log("upda", updatedItems)
    const newStart = {
      ...start,
      taskIDs: startTaskIDs,
    };

    const finishTaskIDs = Array.from(finish.taskIDs);

    // Insert the item to destination list.
    finishTaskIDs.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIDs: finishTaskIDs,
    };

    // Create new state with newStart and newFinish 
    const newState = {
      ...props.data,
      columns: {
        ...props.data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    reorderTasks(taskDispatch, newState);
    const updatedTask = props.data.tasks[updatedItems[0]];
    updatedTask.state = finishKey;
    updateTask(taskDispatch, projectID ?? "", updatedTask);
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {props.data.columnOrder.map((colID) => {
          const column = props.data.columns[colID];
          const tasks = column.taskIDs.map((taskID) => props.data.tasks[taskID]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

export default DragDropList;