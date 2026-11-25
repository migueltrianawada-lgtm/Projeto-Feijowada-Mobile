import { NativeTabs } from 'expo-router/native-tabs';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      {/* 1. Tela Inicial / Cardápio */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Cardápio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/home.png')} renderingMode="template" />
      </NativeTabs.Trigger>

      {/* 2. Tela de Carrinho */}
      <NativeTabs.Trigger name="cart">
        <NativeTabs.Trigger.Label>Carrinho</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} renderingMode="template" />
      </NativeTabs.Trigger>

      {/* 3. Tela de Pedidos / Histórico */}
      <NativeTabs.Trigger name="orders">
        <NativeTabs.Trigger.Label>Pedidos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} renderingMode="template" />
      </NativeTabs.Trigger>

      {/* 4. Tela de Cadastro */}
      <NativeTabs.Trigger name="register">
        <NativeTabs.Trigger.Label>Cadastro</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} renderingMode="template" />
      </NativeTabs.Trigger>

      {/* 5. Tela de Login */}
      <NativeTabs.Trigger name="login">
        <NativeTabs.Trigger.Label>Login</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} renderingMode="template" />
      </NativeTabs.Trigger>

      {/* 6. Tela de Checkout */}
      <NativeTabs.Trigger name="checkout">
        <NativeTabs.Trigger.Label>Pagamento</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} renderingMode="template" />
      </NativeTabs.Trigger>

      {/* 7. Tela de Detalhes do Produto */}
      <NativeTabs.Trigger name="product-detail">
        <NativeTabs.Trigger.Label>Detalhes</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} renderingMode="template" />
      </NativeTabs.Trigger>

      {/* 8. Tela de Perfil */}
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>
          Perfil
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>


    </NativeTabs>





  );
}