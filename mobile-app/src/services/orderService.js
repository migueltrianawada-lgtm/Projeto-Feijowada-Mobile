import api from "./api";

export async function createOrder(
  usuario_id,
  valor_total
) {

  const response =
    await api.post(
      "/orders",
      {
        usuario_id,
        valor_total
      }
    );

  return response.data;

}