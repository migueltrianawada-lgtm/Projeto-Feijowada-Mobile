import {
  useEffect,
  useState,
  useContext
} from "react";

import {
  View,
  Text,
  FlatList,
  Button
} from "react-native";

import { getProducts } from "../services/productService";

import { CartContext } from "../context/CartContext";

import { Alert } from "react-native";

import { createOrder }
from "../services/orderService";

type Product = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
};

export default function HomeScreen() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const {
    cart,
    addProduct
  } = useContext(
    CartContext
  ) as any;

  async function finalizarPedido() {

  try {

    const total =
  cart.reduce(
    (
      acc: number,
      item: Product
    ) =>
      acc + item.preco,
    0
  );

    const pedido =
      await createOrder(
        1,
        total
      );

    Alert.alert(
      "Sucesso",
      `Pedido #${pedido.id} criado`
    );

  }
  catch (error) {

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

      const data =
        await getProducts();

      setProducts(data);

    }
    catch (error) {

      console.log(error);

    }

  }

  return (

    <View
      style={{
        flex: 1,
        padding: 20
      }}
    >

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20
        }}
      >
        Cardápio Feijowada
      </Text>

      <Text>
        Carrinho: {cart.length} item(s)
      </Text>

<Button
  title="Finalizar Pedido"
  onPress={finalizarPedido}
/>


      <FlatList
        data={products}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (

          <View
            style={{
              borderWidth: 1,
              padding: 15,
              marginBottom: 10,
              borderRadius: 10
            }}
          >

            <Text>
              {item.nome}
            </Text>

            <Text>
              {item.descricao}
            </Text>

            <Text>
              R$ {item.preco}
            </Text>

            <Button
              title="Adicionar"
              onPress={() =>
                addProduct(item)
              }
            />

          </View>

        )}
      />

    </View>

  );

}