import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Aviso", "Por favor, informe seu e-mail e senha.");
      return;
    }

    Alert.alert("Bem-vindo!", "Login realizado com sucesso.");
    router.replace("/");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Oficial Feijowada (mesmo padrão das outras telas) */}
        <View style={styles.header}>
          <View style={styles.foodPatternContainer}>
            <Text style={styles.patternEmoji}>🍲 🍊 🥓 🌿 🍚</Text>
          </View>
          <Text style={styles.headerTitle}>FEIJOWADA</Text>
          <Text style={styles.headerSubtitle}>Acesso à Plataforma</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Faça login para pedir sua feijoada artesanal</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="seuemail@exemplo.com"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              placeholderTextColor="#888"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => Alert.alert("Recuperação", "Enviamos um link para o seu e-mail.")}
          >
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.registerButtonText}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6F0",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#800020",
    paddingTop: 55,
    paddingBottom: 22,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  foodPatternContainer: {
    marginBottom: 6,
    opacity: 0.85,
  },
  patternEmoji: {
    fontSize: 18,
    letterSpacing: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    color: "#F3E8E8",
    fontSize: 13,
    marginTop: 4,
  },
  formContainer: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6DCD0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0F172A",
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#800020",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#800020",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  registerButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#800020",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#800020",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});