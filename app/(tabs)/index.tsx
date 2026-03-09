import { useEffect, useState  } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { db, initDatabase } from "../../src/db/database";

type TrackedStock = {
  id: number;
  symbol: string;
  name: string | null;
  added_at: number;
};

export default function HomeScreen() {
  const [stocks, setStocks] = useState<TrackedStock[]>([]);

  useEffect(() => {
    initDatabase();
  }, []);

  const loadStocks = () => {
    const rows = db.getAllSync<TrackedStock>(
      "SELECT * FROM tracked_stocks ORDER BY added_at DESC"
    );
    setStocks(rows);
  };

  const addTestStock = () => {
    db.runSync(
      "INSERT OR IGNORE INTO tracked_stocks(symbol, name, added_at) VALUES (?, ?, ?)",
      ["AAPL", "Apple Inc.", Date.now()]
    );
    loadStocks();
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "700", margin: 50, }}>Stock Tracker</Text>

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

      <FlatList
        data={stocks}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ color: "#6b7280" }}>No stocks added yet.</Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              padding: 12,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.symbol}</Text>
            <Text style={{ color: "#6b7280", marginTop: 4 }}>
              {item.name ?? "No name"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}