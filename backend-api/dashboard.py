# dashboard.py
# Painel de Análise de Vendas - Projeto FEIJOWADA
# Disciplina: Análise de Dados e Estatística

import json
import os
import pandas as pd
import streamlit as st
import matplotlib.pyplot as plt

# Configuração da Página do Dashboard
st.set_page_config(
    page_title="Dashboard FEIJOWADA",
    page_icon="🍲",
    layout="wide"
)

# Estilo Visual Personalizado (Tema Borgoña e Gourmet)
st.markdown("""
    <style>
        .main { background-color: #F9F6F0; }
        h1, h2, h3 { color: #800020; }
        .metric-card { background-color: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #E6DCD0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
    </style>
""", unsafe_allow_html=True)

st.title("🍲 Dashboard de Vendas - FEIJOWADA")
st.markdown("Painel estatístico gerado a partir do histórico de pedidos exportado pelo aplicativo móvel.")

# Função para carregar os dados do arquivo JSON gerado pelo App/Backend
@st.cache_data
def load_order_data():
    json_path = "orders.json"  # Caminho do arquivo JSON gerado pelo sistema
    
    # Se o arquivo não existir localmente para testes, criamos um dataset simulado robusto
    if not os.path.exists(json_path):
        sample_data = [
            {"id": 1, "usuario_id": 1, "total": 45.00, "status": "Concluído", "pagamento": "PIX", "data": "2026-11-20"},
            {"id": 2, "usuario_id": 2, "total": 96.00, "status": "Concluído", "pagamento": "Cartão", "data": "2026-11-21"},
            {"id": 3, "usuario_id": 1, "total": 32.50, "status": "Pendente", "pagamento": "PIX", "data": "2026-11-22"},
            {"id": 4, "usuario_id": 3, "total": 135.00, "status": "Concluído", "pagamento": "Cartão", "data": "2026-11-23"},
            {"id": 5, "usuario_id": 2, "total": 48.00, "status": "Concluído", "pagamento": "Dinheiro", "data": "2026-11-24"}
        ]
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(sample_data, f, indent=4, ensure_ascii=False)
            
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    return pd.DataFrame(data)

df = load_order_data()

# Verificação se o DataFrame contém dados
if df.empty:
    st.warning("Nenhum dado de pedido encontrado no arquivo JSON.")
else:
    # --- MÉTRICAS PRINCIPAIS (KPIs) ---
    faturamento_total = df["total"].sum()
    total_pedidos = len(df)
    ticket_medio = faturamento_total / total_pedidos if total_pedidos > 0 else 0

    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric(label="💰 Faturamento Total", value=f"R$ {faturamento_total:.2f}")
    with col2:
        st.metric(label="📦 Total de Pedidos", value=total_pedidos)
    with col3:
        st.metric(label="📊 Ticket Médio", value=f"R$ {ticket_medio:.2f}")

    st.markdown("---")

    # --- GRÁFICOS E ESTATÍSTICAS ---
    col_left, col_right = st.columns(2)

    with col_left:
        st.subheader("💳 Formas de Pagamento Utilizadas")
        if "pagamento" in df.columns:
            pagamento_counts = df["pagamento"].value_counts()
            fig, ax = plt.subplots(figsize=(6, 4))
            pagamento_counts.plot(kind="bar", color="#800020", ax=ax)
            ax.set_ylabel("Quantidade de Pedidos")
            ax.set_xlabel("Método de Pagamento")
            plt.xticks(rotation=0)
            st.pyplot(fig)
        else:
            st.info("Coluna 'pagamento' não encontrada no dataset.")

    with col_right:
        st.subheader("📈 Faturamento por Status do Pedido")
        if "status" in df.columns and "total" in df.columns:
            status_group = df.groupby("status")["total"].sum()
            fig, ax = plt.subplots(figsize=(6, 4))
            status_group.plot(kind="pie", autopct="%1.1f%%", colors=["#27AE60", "#D35400", "#34495E"], ax=ax, startangle=90)
            ax.set_ylabel("")
            st.pyplot(fig)
        else:
            st.info("Dados insuficientes para gerar o gráfico de status.")

    st.markdown("---")
    
    # --- TABELA DE DADOS BRUTOS ---
    st.subheader("📋 Tabela Consolidada de Pedidos (JSON Importado)")
    st.dataframe(df, use_container_width=True)