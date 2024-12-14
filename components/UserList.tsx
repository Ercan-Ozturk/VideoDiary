import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useUserStore } from "@/app/store";

const UserList: React.FC = () => {
  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.userCard}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text>{item.email}</Text>
          <Text>{item.address.city}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserList;
