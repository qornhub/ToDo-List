import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQuery } from "@apollo/client/react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../api/apollo";
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../api/operations";
import {
  Trash2,
  LogOut,
} from "lucide-react-native";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
};

type GetTodosData = {
  todos: Todo[];
};

type CreateTodoData = {
  createTodo: Todo;
};

type UpdateTodoData = {
  updateTodo: Todo;
};

type DeleteTodoData = {
  deleteTodo: boolean;
};

export default function TodoScreen() {
  const [newTodo, setNewTodo] = useState("");

  const { data, loading, refetch } = useQuery<GetTodosData>(GET_TODOS);

  const [createTodo, { loading: creating }] =
  useMutation<CreateTodoData>(CREATE_TODO);

const [updateTodo] =
  useMutation<UpdateTodoData>(UPDATE_TODO);

const [deleteTodo] =
  useMutation<DeleteTodoData>(DELETE_TODO);

  const todos: Todo[] = data?.todos ?? [];

  const handleCreate = async () => {
    const title = newTodo.trim();

    if (!title) {
      return;
    }

    try {
      await createTodo({
        variables: { title },
      });

      setNewTodo("");
      await refetch();
    } catch (error) {
      Alert.alert("Error", "Could not create todo.");
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await updateTodo({
        variables: {
          id: todo.id,
          completed: !todo.completed,
        },
      });

      await refetch();
    } catch {
      Alert.alert("Error", "Could not update todo.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({
        variables: { id },
      });

      await refetch();
    } catch {
      Alert.alert("Error", "Could not delete todo.");
    }
  };

 const handleLogout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");

  await client.clearStore();

  router.replace("/");
};

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoCard}>
      <TouchableOpacity
        style={styles.todoMain}
        onPress={() => handleToggle(item)}
      >
        <View
          style={[
            styles.checkbox,
            item.completed && styles.checkboxCompleted,
          ]}
        >
          {item.completed && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </View>

        <Text
          style={[
            styles.todoTitle,
            item.completed && styles.todoCompleted,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

       <TouchableOpacity
  onPress={() => handleDelete(item.id)}
  style={styles.deleteButton}
  accessibilityLabel="Delete todo"
>
  <Trash2
    size={20}
    color="#dc2626"
    strokeWidth={2}
  />
</TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>My Todos</Text>
          <Text style={styles.count}>
            {todos.length} {todos.length === 1 ? "task" : "tasks"}
          </Text>
        </View>

        <TouchableOpacity
  onPress={handleLogout}
  style={styles.logoutButton}
  accessibilityLabel="Logout"
>
  <LogOut
    size={21}
    color="#475569"
    strokeWidth={2}
  />
</TouchableOpacity>
      </View>

      <View style={styles.addContainer}>
        <TextInput
          style={styles.addInput}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleCreate}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreate}
          disabled={creating}
        >
          {creating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.addButtonText}>+</Text>
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>
            Loading your todos...
          </Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderTodo}
          contentContainerStyle={
            todos.length === 0
              ? styles.emptyContainer
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>✓</Text>
              <Text style={styles.emptyTitle}>
                No todos yet
              </Text>
              <Text style={styles.emptyText}>
                Add your first task above.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  count: {
    marginTop: 3,
    color: "#64748b",
  },

  deleteButton: {
  padding: 8,
  marginLeft: 8,
},

logoutButton: {
  padding: 8,
},

  addContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  addInput: {
    flex: 1,
    height: 52,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  addButton: {
    width: 52,
    height: 52,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "300",
  },

  list: {
    paddingBottom: 30,
  },

  todoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  todoMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  checkmark: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  todoTitle: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
  },

  todoCompleted: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },



  deleteText: {
    color: "#dc2626",
    fontSize: 13,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#64748b",
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 36,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#334155",
  },

  emptyText: {
    marginTop: 6,
    color: "#64748b",
  },
});