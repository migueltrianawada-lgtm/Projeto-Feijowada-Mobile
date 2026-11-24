import {
  useEffect,
  useState,
  useContext
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";

import { useRouter } from "expo-router";
import { getProducts } from "../services/productService";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../services/orderService";

type Product = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
};

// Imagens distintas livres de direitos autorais para cada variação do cardápio
const IMAGENS_PRATOS: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop",
  2: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
  3: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  4: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop",
};

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addProduct, clearCart } = useContext(CartContext) as any;
  const router = useRouter();

  const defaultProductImage = IMAGENS_PRATOS[1];

  async function finalizarPedido() {
    try {
      if (cart.length === 0) {
        Alert.alert("Aviso", "Seu carrinho está vazio.");
        return;
      }

      const total = cart.reduce(
        (acc: number, item: Product) => acc + Number(item.preco),
        0
      );

      const pedido = await createOrder(1, total);

      Alert.alert(
        "Sucesso",
        `Pedido #${pedido.id} criado com sucesso!`
      );
      clearCart();
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível criar o pedido"
      );
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      
      // Remove duplicados caso a API ou banco de dados retorne registros repetidos
      const listaUnica: Product[] = [];
      const nomesVistos = new Set<string>();

      for (const item of data) {
        const chave = item.nome.trim().toLowerCase();
        if (!nomesVistos.has(chave)) {
          nomesVistos.add(chave);
          listaUnica.push({
            ...item,
            imagem: item.imagem || IMAGENS_PRATOS[item.id] || defaultProductImage,
          });
        }
      }

      setProducts(listaUnica);
    } catch (error) {
      console.log(error);
    }
  }

  const totalCart = cart.reduce((acc: number, item: Product) => acc + Number(item.preco), 0);

  return (
    <View style={styles.container}>
      {/* Header Feijowada */}
      <View style={styles.header}>
        <View style={styles.foodPatternContainer}>
          <Text style={styles.patternEmoji}>🍲 🍊 🥓 🌿 🍚</Text>
        </View>
        <Text style={styles.headerTitle}>FEIJOWADA</Text>
        <Text style={styles.headerSubtitle}>Sabor e Tradição na sua Mesa</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Cardápio Principal</Text>

        <View style={styles.bannerCard}>
          <Text style={styles.bannerTitle}>🔥 Feijoada Fresquinha aos Finais de Semana!</Text>
          <Text style={styles.bannerText}>Acompanha arroz, couve, farofa crocante e laranja.</Text>
        </View>

        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/cart")}>
            <Text style={styles.navButtonText}>🛒 Carrinho ({cart.length})</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/orders")}>
            <Text style={styles.navButtonText}>📦 Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/orders")}>
            <Text style={styles.navButtonText}>📜 Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/register")}>
            <Text style={styles.navButtonText}>👤 Cadastro</Text>
          </TouchableOpacity>
        </View>

        {cart.length > 0 && (
          <TouchableOpacity style={styles.finalizeButton} onPress={finalizarPedido}>
            <Text style={styles.finalizeButtonText}>✨ Finalizar Pedido Rápido (R$ {totalCart.toFixed(2)})</Text>
          </TouchableOpacity>
        )}

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image 
                source={{ uri: item.imagem || defaultProductImage }} 
                style={styles.productThumbnail} 
                resizeMode="cover"
              />

              <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                  <Text style={styles.productName}>{item.nome}</Text>
                  <Text style={styles.productDesc} numberOfLines={2}>{item.descricao}</Text>
                  <Text style={styles.productPrice}>R$ {Number(item.preco).toFixed(2)}</Text>
                </View>

                <View style={styles.cardActions}>
                  <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={() => {
                      addProduct(item);
                      Alert.alert("Adicionado", `${item.nome} foi adicionado ao carrinho!`);
                    }}
                  >
                    <Text style={styles.addButtonText}>+ Adicionar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.detailButton} 
                    onPress={() =>
                      router.push({
                        pathname: "/product-detail",
                        params: {
                          id: String(item.id),
                          nome: item.nome,
                          descricao: item.descricao,
                          preco: String(item.preco),
                          imagem: item.imagem || defaultProductImage
                        }
                      })
                    }
                  >
                    <Text style={styles.detailButtonText}>Ver Detalhes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Carregando cardápio...</Text>
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
    padding: 16,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 12,
  },
  bannerCard: {
    backgroundColor: '#FDF2E9',
    borderLeftWidth: 4,
    borderLeftColor: '#D35400',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#A04000',
    marginBottom: 2,
  },
  bannerText: {
    fontSize: 13,
    color: '#6E2C00',
  },
  navContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 8,
  },
  navButton: {
    backgroundColor: '#334155',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexGrow: 1,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  finalizeButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  finalizeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6DCD0',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productThumbnail: {
    width: '100%',
    height: 140,
    backgroundColor: '#E6DCD0',
  },
  cardContent: {
    padding: 14,
  },
  cardInfo: {
    marginBottom: 10,
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#800020',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  detailButton: {
    flex: 1,
    backgroundColor: '#EDF2F7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#334155',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
    fontSize: 15,
  },
});