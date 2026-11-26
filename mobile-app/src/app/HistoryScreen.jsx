import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function HistoryScreen({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarHistorico();
  }, []);

  // Función para obtener el histórico (puedes adaptarla si usas tu API o SQLite local)
  const carregarHistorico = async () => {
    try {
      setLoading(true);
      // Aquí puedes conectar con tu endpoint del backend o tu SQLite local
      // Ejemplo simulado alineado a tus tablas (USUARIO, PRODUTO, PEDIDO, ITEM_PEDIDO)
      const dadosExemplo = [
        { id: 1, produto: 'Feijoada Completa Média', quantidade: 2, total: 90.00, data: '2026-11-20', status: 'Entregue' },
        { id: 2, produto: 'Caipirinha Tradicional', quantidade: 3, total: 45.00, data: '2026-11-21', status: 'Entregue' },
        { id: 3, produto: 'Feijoada Família', quantidade: 1, total: 120.00, data: '2026-11-23', status: 'Entregue' }
      ];
      setPedidos(dadosExemplo);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o histórico de pedidos.");
    } finally {
      setLoading(false);
    }
  };

  // Función obligatoria para cumplir con el requisito del Botón de Exportación en Formato JSON
  const exportarHistoricoJson = async () => {
    try {
      if (!pedidos || pedidos.length === 0) {
        Alert.alert("Aviso", "Não há pedidos para exportar.");
        return;
      }

      const jsonString = JSON.stringify(pedidos, null, 2);
      const fileName = `historico_pedidos_${Date.now()}.json`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

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
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Feijowada com o mesmo padrão e espaçamento */}
      <View style={styles.header}>
        <View style={styles.foodPatternContainer}>
          <Text style={styles.patternEmoji}>🍲 🍊 🥓 🌿 🍚</Text>
        </View>
        <Text style={styles.headerTitle}>FEIJOWADA</Text>
        <Text style={styles.headerSubtitle}>Histórico e Vendas Realizadas</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>📜 Histórico de Vendas</Text>
        <Text style={styles.subtitle}>Acompanhe seus pedidos anteriores e exporte os dados.</Text>

        {/* Botão exigido no projeto para exportar o JSON */}
        <TouchableOpacity style={styles.exportButton} onPress={exportarHistoricoJson}>
          <Text style={styles.exportButtonText}>📥 Exportar Histórico (JSON)</Text>
        </TouchableOpacity>

        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Pedido #{item.id}</Text>
                <Text style={styles.cardDate}>{item.data}</Text>
              </View>
              <Text style={styles.itemText}>{item.quantidade}x {item.produto}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.totalText}>Total: R$ {item.total.toFixed(2)}</Text>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum pedido encontrado.</Text>
          }
        />
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F6F0',
  },
  loadingText: {
    marginTop: 10,
    color: '#64748B',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 14,
    textAlign: 'center',
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
  listContainer: {
    paddingBottom: 120, // Espaço extra para evitar que a barra inferior cubra os últimos pedidos
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E6DCD0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  cardDate: {
    fontSize: 13,
    color: '#94A3B8',
  },
  itemText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  statusText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 40,
    fontSize: 15,
  },
});