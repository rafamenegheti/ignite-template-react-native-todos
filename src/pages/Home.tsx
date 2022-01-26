import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskAlreadyExists = tasks.find(task => task.title === newTaskTitle);

    if(taskAlreadyExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
      )

      return
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(previousValues => [...previousValues, newTask])
  };

  function handleEditTask(id: number, newTaskTitle: string) {
    const taskToBeEdit = tasks.findIndex(task => task.id === id)
    const newTask = [...tasks]
    newTask[taskToBeEdit].title = newTaskTitle

    setTasks(newTask)
  }

  function handleToggleTaskDone(id: number) {
    const taskToBeDone = tasks.findIndex(task => task.id === id)
    const newTask = [...tasks]
    newTask[taskToBeDone].done = !newTask[taskToBeDone].done

    setTasks(newTask)

  }

  function handleRemoveTask(id: number) {

    const deleteTask = () => {
      const newTasks = tasks.filter(task => task.id !== id)
      setTasks(newTasks)
    }

    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => deleteTask(),
          style: "destructive",
        },
      ],
    )

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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