import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(previousValues => [...previousValues, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const taskToBeDone = tasks.findIndex(task => task.id === id)
    const newTask = [...tasks]
    newTask[taskToBeDone].done = !newTask[taskToBeDone].done

    setTasks(newTask)


    console.log(tasks)

  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})