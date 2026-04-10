import type { ShoppingItem } from '@shared/types';
import { Card, Checkbox, Button, Space, Typography, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: ShoppingItem) => void;
}

export const ShoppingItemCard = ({ item, onToggle, onDelete, onEdit }: ShoppingItemCardProps) => {
  const calculateTotal = () => {
    if (!item.price) return 0;
    return item.priceMode === 'total' ? item.price : item.price * item.quantity;
  };

  const totalPrice = calculateTotal();

  return (
    <Card
      size="small"
      style={{ marginBottom: 12, borderRadius: 12 }}
      styles={{ body: { padding: '12px 16px' } }}
      hoverable
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Space size="middle" style={{ flex: 1 }}>
          <Checkbox
            checked={item.done}
            onChange={() => onToggle(item.id)}
          />
          <div style={{ flex: 1 }}>
            <Text
              delete={item.done}
              strong
              style={{ fontSize: 16, color: item.done ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.88)' }}
            >
              {item.title}
            </Text>
            <div style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.45)' }}>
              {item.quantity} {item.unit}
              {item.price ? ` × ${item.price} ₽ ${item.priceMode === 'per_unit' ? '/ ед.' : '(всего)'}` : ''}
              {item.price ? <strong style={{ marginLeft: 8, color: '#1890ff' }}>= {totalPrice.toFixed(2)} ₽</strong> : ''}
              {item.comment && <Tag style={{ marginLeft: 8 }}>{item.comment}</Tag>}
            </div>
          </div>
        </Space>
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(item)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(item.id)}
          />
        </Space>
      </div>
    </Card>
  );
};
