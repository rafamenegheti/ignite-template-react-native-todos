import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { TaskItem } from './TaskItem';



export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {


  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem 
          index={index}
          item={item}
          removeTask={removeTask}
          toggleTaskDone={toggleTaskDone}
          editTask={editTask}
          />
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

