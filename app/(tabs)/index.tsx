import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();
  const todos = useQuery(api.tasks.getTasks);
  const addTodo = useMutation(api.tasks.addTask);
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
      <TouchableOpacity style={{ marginTop: 20 }} onPress={toggleDarkMode}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => addTodo({ title: "New todo" })}
      >
        <Text>Add todo</Text>
      </TouchableOpacity>
    </View>
  );
}
