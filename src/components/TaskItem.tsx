import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { ItemWrapper } from "./ItemWrapper";
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit.png'
import xIcon from '../assets/icons/x.png'


export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TaskItemProps {
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTaskTitle: string) => void;
    index: number,
    item: Task
}

export function TaskItem({ toggleTaskDone, removeTask, editTask, index, item }: TaskItemProps) {

    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [editedTitle, setEditedTitle] = useState(item.title)
    const textInputRef = useRef<TextInput>(null)


    function handleStartEditing() {
        setIsBeingEdited(true)
    }

    function handleCancelEditing() {
        setEditedTitle(item.title)
        setIsBeingEdited(false)
    }

    function handleSubmitEditing() {
        editTask(item.id, editedTitle)
        setIsBeingEdited(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isBeingEdited) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isBeingEdited])
    return (
        <ItemWrapper index={index}>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        value={editedTitle}
                        onChangeText={setEditedTitle}
                        editable={isBeingEdited}
                        onSubmitEditing={handleSubmitEditing}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    >
                    </TextInput>
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isBeingEdited ? (
                    <TouchableOpacity
                        testID={`x-${index}`}
                        onPress={handleCancelEditing}
                    >
                        <Image source={xIcon} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        testID={`edit-${index}`}
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>)}

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 24, opacity: isBeingEdited ? 0.2 : 1 }}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>

            </View>
        </ItemWrapper >
    )
}



const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})