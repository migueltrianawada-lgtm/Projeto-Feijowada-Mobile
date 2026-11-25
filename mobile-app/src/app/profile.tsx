import {
  useContext
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useRouter } from "expo-router";

import {
  AuthContext
} from "../context/AuthContext";

export default function ProfileScreen() {

  const router = useRouter();

  const {
    logout
  } = useContext(
    AuthContext
  ) as any;

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.foodPatternContainer}>
          <Text style={styles.patternEmoji}>
            🍲 🍊 🥓 🌿 🍚
          </Text>
        </View>

        <Text style={styles.headerTitle}>
          FEIJOWADA
        </Text>

        <Text style={styles.headerSubtitle}>
          Área do Cliente
        </Text>

      </View>

      <View style={styles.content}>

        <View style={styles.card}>

          <Text style={styles.title}>
            👤 Meu Perfil
          </Text>

          <Text style={styles.label}>
            Nome
          </Text>

          <Text style={styles.value}>
            Miguel Enrique Palacios Triana
          </Text>

          <Text style={styles.label}>
            E-mail
          </Text>

          <Text style={styles.value}>
            miguel@email.com
          </Text>

          <Text style={styles.label}>
            Projeto
          </Text>

          <Text style={styles.value}>
            Feijowada
          </Text>

          <Text style={styles.status}>
            ✅ Usuário autenticado
          </Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {

              logout();

              router.replace(
                "/login"
              );

            }}
          >

            <Text style={styles.logoutButtonText}>
              🚪 Sair
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F9F6F0"
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
    elevation: 4
  },

  foodPatternContainer: {
    marginBottom: 6,
    opacity: 0.85
  },

  patternEmoji: {
    fontSize: 18,
    letterSpacing: 4
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1.5
  },

  headerSubtitle: {
    color: "#F3E8E8",
    fontSize: 13,
    marginTop: 4
  },

  content: {
    flex: 1,
    padding: 20
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    elevation: 4
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#800020",
    marginBottom: 20
  },

  label: {
    fontWeight: "bold",
    color: "#64748B",
    marginTop: 10
  },

  value: {
    fontSize: 16,
    color: "#1E293B"
  },

  status: {
    marginTop: 20,
    color: "#16A34A",
    fontWeight: "bold"
  },

  logoutButton: {
    backgroundColor: "#800020",
    marginTop: 25,
    padding: 14,
    borderRadius: 12,
    alignItems: "center"
  },

  logoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16
  }

});