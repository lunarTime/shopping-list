import { Typography, Empty, List, App as AntApp, Card, Statistic, Row, Col, Modal } from 'antd';
import { useState } from 'react';
import { useLocalStorage } from '@shared/lib/hooks';
import type { ShoppingItem } from '@shared/types';
import { ShoppingItemCard } from '@entities/shopping-item';
import { AddItemForm } from '@features/add-item';
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const ShoppingListWidget = () => {
  const [items, setItems] = useLocalStorage<ShoppingItem[]>('shopping-list', []);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const { message } = AntApp.useApp();

  const handleAddItem = (newItem: Omit<ShoppingItem, 'id' | 'done'>) => {
    // Fallback для генерации ID в небезопасных окружениях (без HTTPS/localhost)
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    };

    const item: ShoppingItem = {
      ...newItem,
      id: generateId(),
      done: false,
    };
    setItems((prev) => [item, ...prev]);
    message.success('Товар добавлен');
  };

  const handleUpdateItem = (updatedValues: Omit<ShoppingItem, 'id' | 'done'>) => {
    if (!editingItem) return;
    setItems((prev) =>
      prev.map((item) => (item.id === editingItem.id ? { ...item, ...updatedValues } : item))
    );
    setEditingItem(null);
    message.success('Товар обновлен');
  };

  const handleToggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    message.info('Товар удален');
  };

  const totalPrice = items.reduce((acc, item) => {
    if (!item.price) return acc;
    const itemTotal = item.priceMode === 'total' ? item.price : item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  const completedCount = items.filter(item => item.done).length;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: 40 }}>
        <Title level={2} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <ShoppingCartOutlined style={{ color: '#1890ff' }} /> Список покупок
        </Title>
      </header>

      <AddItemForm onAdd={handleAddItem} />

      {items.length > 0 && (
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <Card style={{ borderRadius: 16 }}>
              <Statistic
                title="Итого"
                value={totalPrice}
                precision={2}
                prefix={<DollarOutlined />}
                suffix="₽"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ borderRadius: 16 }}>
              <Statistic
                title="Куплено"
                value={completedCount}
                suffix={`/ ${items.length}`}
              />
            </Card>
          </Col>
        </Row>
      )}

      {items.length === 0 ? (
        <Empty description="Список пуст" style={{ marginTop: 40 }} />
      ) : (
        <List
          dataSource={items}
          renderItem={(item) => (
            <ShoppingItemCard
              key={item.id}
              item={item}
              onToggle={handleToggleItem}
              onDelete={handleDeleteItem}
              onEdit={setEditingItem}
            />
          )}
        />
      )}

      <Modal
        title="Редактирование товара"
        open={!!editingItem}
        onCancel={() => setEditingItem(null)}
        footer={null}
        destroyOnClose
      >
        {editingItem && (
          <AddItemForm
            onAdd={handleUpdateItem}
            initialValues={editingItem}
            isEditing
          />
        )}
      </Modal>
    </div>
  );
};
