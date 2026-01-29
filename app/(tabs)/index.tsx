import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();
  const todos = useQuery(api.tasks.getTasks);
  const addTodo = useMutation(api.tasks.addTask);
  const [taskTitle, setTaskTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddTodo = async () => {
    const title = taskTitle.trim();
    if (!title || isSaving) return;

    try {
      setIsSaving(true);
      await addTodo({ title });
      setTaskTitle("");
    } catch (error) {
      console.error("Failed to add task", error);
    } finally {
      setIsSaving(false);
    }
  };

  console.log(todos);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <TextInput
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          width: 200,
          marginTop: 20,
          borderRadius: 5,
        }}
      />

      <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleDarkMode}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={handleAddTodo}>
        <Text>{isSaving ? "Adding..." : "Add todo"}</Text>
      </TouchableOpacity>
    </View>
  );
}
