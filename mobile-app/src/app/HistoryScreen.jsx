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
        <ActivityIndicator size="large" color="#d35400" />
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Histórico de Vendas</Text>
      <Text style={styles.subtitle}>Acompanhe seus pedidos anteriores e exporte os dados.</Text>

      {/* Botão exigido no projeto para exportar o JSON */}
      <TouchableOpacity style={styles.exportButton} onPress={exportarHistoricoJson}>
        <Text style={styles.exportButtonText}>📥 Exportar Histórico (JSON)</Text>
      </TouchableOpacity>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  exportButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  exportButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  cardDate: {
    fontSize: 14,
    color: '#95a5a6',
  },
  itemText: {
    fontSize: 15,
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    paddingTop: 8,
  },
  totalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2980b9',
  },
  emptyText: {
    textAlign: 'center',
    color: '#95a5a6',
    marginTop: 40,
    fontSize: 16,
  },
});