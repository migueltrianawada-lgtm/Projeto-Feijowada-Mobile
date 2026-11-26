import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { getOrders } from "../services/orderService";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useRouter } from "expo-router";

type Order = {
  id: number;
  usuario_id: number;
  valor_total: number;
  status: string;
};

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.log("ERRO ORDERS", error);
      Alert.alert("Erro", "Não foi possível carregar o histórico.");
    } finally {
      setLoading(false);
    }
  }

  const exportarHistoricoJson = async () => {
    try {
      if (!orders || orders.length === 0) {
        Alert.alert("Aviso", "Não há pedidos para exportar.");
        return;
      }

      const jsonString = JSON.stringify(orders, null, 2);
      const fileName = `historico_pedidos_${Date.now()}.json`;
      const fileUri = `${(FileSystem as any).documentDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Erro", "O compartilhamento não está disponível neste dispositivo.");
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Exportar Histórico de Pedidos (JSON)',
        UTI: 'public.json',
      });

    } catch (error) {
      console.error("Erro ao exportar JSON:", error);
      Alert.alert("Erro", "Não foi possível gerar o arquivo JSON.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#800020" />
        <Text style={{ marginTop: 10, color: '#64748B' }}>Carregando histórico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Feijowada com o mesmo padrão e espaçamento da Home */}
      <View style={styles.header}>
        <View style={styles.foodPatternContainer}>
          <Text style={styles.patternEmoji}>🍲 🍊 🥓 🌿 🍚</Text>
        </View>
        <Text style={styles.headerTitle}>FEIJOWADA</Text>
        <Text style={styles.headerSubtitle}>Gestão e Histórico de Pedidos</Text>
      </View>

      <View style={styles.content}>
        {/* Título Centralizado */}
        <Text style={styles.mainTitle}>Meus Pedidos Realizados</Text>

        {/* Botão de Exportação com texto mais curto e moderno */}
        <TouchableOpacity style={styles.exportButton} onPress={exportarHistoricoJson}>
          <Text style={styles.exportButtonText}>📁 Baixar Relatório de Vendas (JSON)</Text>
        </TouchableOpacity>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.listArea}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Pedido #{item.id}</Text>
                <Text style={[styles.statusBadge, item.status === 'ENTREGUE' ? styles.statusDone : styles.statusPending]}>
                  {item.status}
                </Text>
              </View>
              <Text style={styles.clientText}>Cliente ID: {item.usuario_id}</Text>
              <Text style={styles.totalText}>Total: R$ {Number(item.valor_total).toFixed(2)}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum pedido encontrado no sistema.</Text>
          }
        />

        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <Text style={styles.backButtonText}>← Voltar ao Cardápio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F6F0', // Fundo gourmet acolhedor igual ao index
  },
  header: {
    backgroundColor: '#800020',
    paddingTop: 55, // Título posicionado abaixo, idêntico à Home
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listArea: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 15, // Espaço otimizado para rolar livremente
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F6F0',
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#1E293B",
    textAlign: "center",
  },
  exportButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  exportButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6DCD0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1E293B',
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    letterSpacing: 0.5,
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
    color: '#D97706',
  },
  statusDone: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
  },
  clientText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
    fontSize: 15,
  },
  backButton: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 85, // Sobe o botão e garante margem segura acima da Tab Bar
    elevation: 2,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});