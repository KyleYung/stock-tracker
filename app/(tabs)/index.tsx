import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { db, initDatabase } from "../../src/db/database";

export default function HomeScreen() {
  useEffect(() => {
    initDatabase();
  }, []);

  const addTestStock = () => {
    db.runSync(
      "INSERT OR IGNORE INTO tracked_stocks(symbol, name, added_at) VALUES (?, ?, ?)",
      ["AAPL", "Apple Inc.", Date.now()]
    );
    console.log("Inserted AAPL");
  };

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

       <Pressable
        onPress={addTestStock}
        style={{
          backgroundColor: "#111827",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          Add Test Stock
        </Text>
      </Pressable>
    </View>
  );
}