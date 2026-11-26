import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../services/productService";

const IMAGENS_PRATOS: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop",
  2: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
  3: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
  4: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop",
};

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const { addProduct } = useContext(CartContext) as any;
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const defaultImage = IMAGENS_PRATOS[1];

  const [selectedProduct, setSelectedProduct] = useState({
    id: Number(params.id) || 1,
    nome: (params.nome as string) || "Feijoada Tradicional Completa",
    descricao:
      (params.descricao as string) ||
      "Acompanha arroz branco soltinho, couve refogada no alho, farofa crocante na manteiga e rodelas de laranja fresca.",
    preco: Number(params.preco) || 45.0,
    imagem: (params.imagem as string) || defaultImage,
  });

  // Atualiza sempre que o usuário clicar em "Ver Detalhes" de um prato diferente no Cardápio
  useEffect(() => {
    if (params.nome) {
      const idNum = Number(params.id) || 1;
      setSelectedProduct({
        id: idNum,
        nome: params.nome as string,
        descricao: (params.descricao as string) || "",
        preco: Number(params.preco) || 45.0,
        imagem: (params.imagem as string) || IMAGENS_PRATOS[idNum] || defaultImage,
      });
    }
  }, [params.id, params.nome, params.descricao, params.preco, params.imagem]);

  // Carrega os 4 pratos únicos para permitir alternar entre eles nesta tela
  useEffect(() => {
    async function fetchMenu() {
      try {
        const data = await getProducts();
        const unicos: any[] = [];
        const vistos = new Set<string>();
        for (const item of data) {
          const chave = item.nome.trim().toLowerCase();
          if (!vistos.has(chave)) {
            vistos.add(chave);
            unicos.push({
              ...item,
              imagem: item.imagem || IMAGENS_PRATOS[item.id] || defaultImage,
            });
          }
        }
        setAllProducts(unicos);
      } catch (e) {
        console.log(e);
      }
    }
    fetchMenu();
  }, []);

  function handleAddToCart() {
    addProduct(selectedProduct);
    Alert.alert("Sucesso", `${selectedProduct.nome} foi adicionado ao carrinho!`, [
      { text: "Ver Carrinho", onPress: () => router.push("/cart") },
      { text: "Continuar Comprando", onPress: () => router.push("/") },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Header Feijowada */}
      <View style={styles.header}>
        <View style={styles.foodPatternContainer}>
          <Text style={styles.patternEmoji}>🍲 🍊 🥓 🌿 🍚</Text>
        </View>
        <Text style={styles.headerTitle}>FEIJOWADA</Text>
        <Text style={styles.headerSubtitle}>Detalhes do Prato</Text>
      </View>

      <View style={styles.content}>
        {/* Seletor rápido dos 4 pratos caso acesse direto pela aba Detalhes */}
        {allProducts.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.selectorScroll}
          >
            {allProducts.map((item) => {
              const isSelected = item.nome === selectedProduct.nome;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.chipButton, isSelected && styles.chipButtonActive]}
                  onPress={() => setSelectedProduct(item)}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {/* Imagem Dinâmica do Prato */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedProduct.imagem }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.badgeTag}>
            <Text style={styles.badgeText}>🔥 Destaque da Casa</Text>
          </View>
        </View>

        {/* Informações do Prato */}
        <View style={styles.detailsCard}>
          <Text style={styles.productName}>{selectedProduct.nome}</Text>
          <Text style={styles.productPrice}>R$ {Number(selectedProduct.preco).toFixed(2)}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Descrição do Prato:</Text>
          <Text style={styles.productDesc}>{selectedProduct.descricao}</Text>

          <View style={styles.ingredientsBox}>
            <Text style={styles.ingredientsTitle}>✨ Ingredientes e Acompanhamentos:</Text>
            <Text style={styles.ingredientsText}>• Feijão preto selecionado com carnes nobres</Text>
            <Text style={styles.ingredientsText}>• Arroz branco soltinho</Text>
            <Text style={styles.ingredientsText}>• Couve mineira refogada</Text>
            <Text style={styles.ingredientsText}>• Farofa artesanal crocante</Text>
            <Text style={styles.ingredientsText}>• Fatias de laranja fresca</Text>
          </View>
        </View>

        {/* Botões de Ação */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>🛒 Adicionar ao Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <Text style={styles.backButtonText}>← Voltar ao Cardápio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F6F0",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 160, // Espaço extra generoso para afastar totalmente da Tab Bar
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
    padding: 16,
  },
  selectorScroll: {
    marginBottom: 14,
  },
  chipButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6DCD0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipButtonActive: {
    backgroundColor: "#800020",
    borderColor: "#800020",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  imageContainer: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    backgroundColor: "#E6DCD0",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  badgeTag: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#D35400",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6DCD0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27AE60",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 6,
  },
  productDesc: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 14,
  },
  ingredientsBox: {
    backgroundColor: "#FDF2E9",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#D35400",
  },
  ingredientsTitle: {
    fontWeight: "bold",
    color: "#A04000",
    fontSize: 13,
    marginBottom: 4,
  },
  ingredientsText: {
    fontSize: 12,
    color: "#7E5109",
    marginBottom: 2,
  },
  addButton: {
    backgroundColor: "#800020",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#334155",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 35, // Margem de segurança reforçada para afastar da barra inferior
    elevation: 2,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});