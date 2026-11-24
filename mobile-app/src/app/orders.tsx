import {
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  FlatList
} from "react-native";

import {
  getOrders
} from "../services/orderService";

type Order = {
  id: number;
  usuario_id: number;
  valor_total: number;
  status: string;
};

export default function OrdersScreen() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  useEffect(() => {

    loadOrders();

  }, []);

  async function loadOrders() {

  try {

    const data =
      await getOrders();

    console.log(data);

    setOrders(data);

  }
  catch (error) {

    console.log(
      "ERRO ORDERS",
      error
    );

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
        Meus Pedidos
      </Text>

      <FlatList
        data={orders}
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
              Pedido #{item.id}
            </Text>

            <Text>
              Status: {item.status}
            </Text>

            <Text>
              Total: R$ {item.valor_total}
            </Text>

          </View>

        )}
      />

    </View>

  );

}