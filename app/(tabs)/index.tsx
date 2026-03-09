import { useEffect } from "react";
import { Text, View } from "react-native";
import { initDatabase } from "../../src/db/database";

export default function HomeScreen() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 24 }}>Stock Tracker</Text>
    </View>
  );
}