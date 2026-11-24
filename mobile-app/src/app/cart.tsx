import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { CartContext } from "../context/CartContext";

export default function CartScreen() {
  const { cart, clearCart } = useContext(CartContext) as any;
  const router = useRouter();

  const total = cart.reduce((acc: number, item: any) => acc + Number(item.preco), 0);

  return (
    <View style={styles.container}>
      {/* Header Feijowada */}
      <View style={styles.header}>
        <View style={styles.foodPatternContainer}>
          <Text style={styles.patternEmoji}>🍲 🍊 🥓 🌿 🍚</Text>
        </View>
        <Text style={styles.headerTitle}>FEIJOWADA</Text>
        <Text style={styles.headerSubtitle}>Seu Carrinho de Compras</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Itens Selecionados</Text>

        <FlatList
          data={cart}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.nome}</Text>
                <Text style={styles.itemDesc}>{item.descricao || "Acompanhamentos padrão inclusos"}</Text>
              </View>
              <Text style={styles.itemPrice}>R$ {Number(item.preco).toFixed(2)}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Seu carrinho está vazio no momento.</Text>
          }
        />

        {/* Rodapé e Totais mais compactos para subir os botões */}
        <View style={styles.footerContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total do Pedido:</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>

          {cart.length > 0 && (
            <>
              <TouchableOpacity 
                style={styles.checkoutButton} 
                onPress={() => router.push("/checkout")}
              >
                <Text style={styles.checkoutButtonText}>🚀 Avançar para Checkout</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.clearButton} 
                onPress={clearCart}
              >
                <Text style={styles.clearButtonText}>🗑️ Limpar Carrinho</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.push("/")}
          >
            <Text style={styles.backButtonText}>← Voltar ao Cardápio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F0',
  },
  header: {
    backgroundColor: '#800020',
    paddingTop: 55,
    paddingBottom: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
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
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    color: '#F3E8E8',
    fontSize: 13,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E293B",
    textAlign: "center",
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6DCD0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#1E293B',
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 11,
    color: '#64748B',
  },
  itemPrice: {
    fontSize: 15,
    color: '#27AE60',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
    fontSize: 15,
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: '#E6DCD0',
    paddingTop: 10,
    marginTop: 6,
    marginBottom: 10, // Sobe os botões afastando-os do rodapé inferior do celular
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  totalValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  checkoutButton: {
    backgroundColor: '#800020',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#E74C3C',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#334155',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});