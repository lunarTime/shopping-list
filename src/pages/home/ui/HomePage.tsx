import { theme } from 'antd';
import { ShoppingListWidget } from '@widgets/shopping-list';

export const HomePage = () => {
  const { token } = theme.useToken();
  
  return (
    <main style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <ShoppingListWidget />
    </main>
  );
};
