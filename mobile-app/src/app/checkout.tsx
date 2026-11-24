import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";

export default function CheckoutScreen() {
  const { cart, clearCart } = useContext(CartContext) as any;
  const router = useRouter();

  const [endereco, setEndereco] = useState("Rua Augusta, 1500 - São Paulo");
  const [pagamento, setPagamento] = useState("PIX");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc: number, item: any) => acc + Number(item.preco), 0);

  async function handleFinalizarPedido() {
    if (cart.length === 0) {
      Alert.alert("Aviso", "Seu carrinho está vazio.");
      router.push("/");
      return;
    }

    if (!endereco.trim()) {
      Alert.alert("Atenção", "Por favor, informe o endereço de entrega.");
      return;
    }

    try {
      setLoading(true);

      // Simulação da chamada de criação de preferência / pagamento (Mercado Pago API Integration)
      // O ID do usuário logado (ex: 1) e o valor total são enviados para o backend
      const pedido = await createOrder(1, total);

      if (pagamento === "PIX") {
        Alert.alert(
          "PIX Gerado com Sucesso (Mercado Pago) 💠",
          `Pedido #${pedido.id}\nValor: R$ ${total.toFixed(2)}\n\nChave Pix Copia e Cola gerada com sandbox do Mercado Pago. O pedido foi aprovado automaticamente para testes!`,
          [
            {
              text: "Ver Meus Pedidos",
              onPress: () => {
                clearCart();
                router.replace("/orders");
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Pedido Realizado! 🎉",
          `Pedido #${pedido.id} confirmado com sucesso via ${pagamento}!\nTotal: R$ ${total.toFixed(2)}`,
          [
            {
              text: "Ver Meus Pedidos",
              onPress: () => {
                clearCart();
                router.replace("/orders");
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível processar o pagamento via Mercado Pago. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header FEIJOWADA unificado */}
        <View style={styles.header}>
          <View style={styles.foodPatternContainer}>
            <Text style={styles.patternEmoji}>🍲 🍊 🥓 🌿 🍚</Text>
          </View>
          <Text style={styles.headerTitle}>FEIJOWADA</Text>
          <Text style={styles.headerSubtitle}>Finalização e Pagamento</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.mainTitle}>Checkout Mercado Pago</Text>

          {/* Resumo do Pedido */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumo da Compra</Text>
            <Text style={styles.summaryItems}>{cart.length} item(s) no carrinho</Text>
            <Text style={styles.summaryTotal}>Total: R$ {total.toFixed(2)}</Text>
          </View>

          {/* Endereço de Entrega */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Endereço de Entrega:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o endereço completo"
              placeholderTextColor="#888"
              value={endereco}
              onChangeText={setEndereco}
            />
          </View>

          {/* Forma de Pagamento */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Forma de Pagamento (Mercado Pago):</Text>
            <View style={styles.paymentOptions}>
              {["PIX", "Cartão", "Dinheiro"].map((tipo) => (
                <TouchableOpacity
                  key={tipo}
                  style={[
                    styles.paymentButton,
                    pagamento === tipo && styles.paymentButtonActive,
                  ]}
                  onPress={() => setPagamento(tipo)}
                >
                  <Text
                    style={[
                      styles.paymentText,
                      pagamento === tipo && styles.paymentTextActive,
                    ]}
                  >
                    {tipo === "PIX" ? "💠 PIX" : tipo === "Cartão" ? "💳 Cartão" : "💵 Dinheiro"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Detalhe do Gateway */}
          <View style={styles.gatewayInfoBox}>
            <Text style={styles.gatewayInfoText}>
              🔒 Ambiente seguro integrado com a API do Mercado Pago (Sandbox Mode).
            </Text>
          </View>

          {/* Botão de Confirmação */}
          <TouchableOpacity
            style={[styles.confirmButton, loading && { opacity: 0.7 }]}
            onPress={handleFinalizarPedido}
            disabled={loading}
          >
            <Text style={styles.confirmButtonText}>
              {loading ? "Processando Pagamento..." : `✨ Pagar R$ ${total.toFixed(2)} via ${pagamento}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/cart")}
          >
            <Text style={styles.backButtonText}>← Voltar ao Carrinho</Text>
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
    paddingBottom: 30,
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
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6DCD0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 4,
  },
  summaryItems: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 8,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27AE60",
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
  paymentOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  paymentButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  paymentButtonActive: {
    backgroundColor: "#800020",
    borderColor: "#800020",
  },
  paymentText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#334155",
  },
  paymentTextActive: {
    color: "#FFFFFF",
  },
  gatewayInfoBox: {
    backgroundColor: "#E8F8F5",
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#27AE60",
    marginBottom: 16,
  },
  gatewayInfoText: {
    fontSize: 12,
    color: "#145A32",
  },
  confirmButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#334155",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});