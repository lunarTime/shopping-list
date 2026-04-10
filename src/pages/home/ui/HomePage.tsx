import { ShoppingListWidget } from '@widgets/shopping-list';

export const HomePage = () => {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <ShoppingListWidget />
    </main>
  );
};
