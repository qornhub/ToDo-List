import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useMutation } from "@apollo/client/react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN, SIGNUP } from "../api/operations";

type AuthData = {
  login?: {
    user: {
      id: string;
      email: string;
    };
    token: string;
  };
  signup?: {
    user: {
      id: string;
      email: string;
    };
    token: string;
  };
};

export default function LoginScreen() {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading: loginLoading }] =
    useMutation<AuthData>(LOGIN);

  const [signup, { loading: signupLoading }] =
    useMutation<AuthData>(SIGNUP);

  const loading = loginLoading || signupLoading;

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Missing information",
        "Please enter your email and password."
      );
      return;
    }

    try {
      if (isSignup) {
        const { data } = await signup({
          variables: {
            email: email.trim(),
            password,
          },
        });

        if (data?.signup?.token) {
  await AsyncStorage.setItem("token", data.signup.token);
  await AsyncStorage.setItem(
    "user",
    JSON.stringify(data.signup.user)
  );

  Alert.alert("Account created", "Your account has been created.");
  router.replace("/todo");
}
      } else {
        const { data } = await login({
          variables: {
            email: email.trim(),
            password,
          },
        });

        if (data?.login?.token) {
  await AsyncStorage.setItem("token", data.login.token);
  await AsyncStorage.setItem(
    "user",
    JSON.stringify(data.login.user)
  );

  router.replace("/todo");
}
      }
    } catch (error) {
      Alert.alert(
        isSignup ? "Sign up failed" : "Login failed",
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>✓</Text>

        <Text style={styles.title}>
          {isSignup ? "Create your account" : "Welcome back"}
        </Text>

        <Text style={styles.subtitle}>
          {isSignup
            ? "Create an account to start managing your todos"
            : "Sign in to manage your todos"}
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[
              styles.button,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isSignup ? "Create Account" : "Sign In"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsSignup(!isSignup)}
          >
            <Text style={styles.switchText}>
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Create one"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    alignSelf: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
  },

  form: {
    width: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 18,
  },

  button: {
    height: 50,
    backgroundColor: "#2563EB",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  switchButton: {
    alignItems: "center",
    marginTop: 20,
  },

  switchText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "500",
  },
});