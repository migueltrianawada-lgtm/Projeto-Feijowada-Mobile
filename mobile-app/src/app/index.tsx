import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert
} from "react-native";

import { login } from "../services/authService";

export default function HomeScreen() {

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  async function entrar() {

    try {

      const dados =
        await login(
          email,
          senha
        );

      Alert.alert(
        "Login realizado",
        dados.usuario.nome
      );

    }
    catch {

      Alert.alert(
        "Erro",
        "Login inválido"
      );

    }

  }

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20
      }}
    >

      <Text>
        Email
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15
        }}
      />

      <Text>
        Senha
      </Text>

      <TextInput
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20
        }}
      />

      <Button
        title="Entrar"
        onPress={entrar}
      />

    </View>

  );

}