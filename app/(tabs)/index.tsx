import useTheme from "@/hooks/useTheme";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleDarkMode } = useTheme();
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
    </View>
  );
}
