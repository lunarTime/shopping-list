import { Card, Checkbox, Button, Space, Typography, Tag, theme } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ShoppingItem } from '@shared/types';
import { calculateItemTotal, getPriceLabel, formatQuantityInBaseUnit } from '@shared/lib/hooks';
import type { MouseEvent } from 'react';

const { Text } = Typography;

interface ShoppingItemCardProps {
    item: ShoppingItem;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (item: ShoppingItem) => void;
}

export const ShoppingItemCard = ({ item, onToggle, onDelete, onEdit }: ShoppingItemCardProps) => {
    const { token } = theme.useToken();

    const totalPrice = calculateItemTotal(item.price, item.quantity, item.unit, item.priceMode);

    const handleToggle = () => {
        onToggle(item.id);
    };

    const handleEdit = (e: MouseEvent) => {
        e.stopPropagation();
        onEdit(item);
    };

    const handleDelete = (e: MouseEvent) => {
        e.stopPropagation();
        onDelete(item.id);
    };

    return (
        <Card
            size="small"
            onClick={handleToggle}
            style={{
                marginBottom: 12,
                borderRadius: 12,
                cursor: 'pointer',
                border: item.done
                    ? `1px solid ${token.colorBorderSecondary}`
                    : `1px solid ${token.colorBorder}`,
                backgroundColor: item.done
                    ? token.colorBgContainerDisabled
                    : token.colorBgContainer,
            }}
            styles={{ body: { padding: '12px 16px' } }}
            hoverable
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Space size="middle" style={{ flex: 1 }}>
                    <Checkbox checked={item.done} onChange={() => handleToggle()} />
                    <div style={{ flex: 1 }}>
                        <Text
                            delete={item.done}
                            strong
                            style={{
                                fontSize: 16,
                                color: item.done ? token.colorTextDisabled : token.colorText,
                            }}
                        >
                            {item.title}
                        </Text>
                        <div style={{ fontSize: 13, color: token.colorTextDescription }}>
                            {formatQuantityInBaseUnit(item.quantity, item.unit)}
                            {item.price
                                ? ` × ${item.price} ₽ ${getPriceLabel(item.unit, item.priceMode)}`
                                : ''}
                            {item.price ? (
                                <strong style={{ marginLeft: 8, color: token.colorPrimary }}>
                                    = {totalPrice.toFixed(2)} ₽
                                </strong>
                            ) : (
                                ''
                            )}
                            {item.comment && <Tag style={{ marginLeft: 8 }}>{item.comment}</Tag>}
                        </div>
                    </div>
                </Space>
                <Space>
                    <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />
                    <Button type="text" danger icon={<DeleteOutlined />} onClick={handleDelete} />
                </Space>
            </div>
        </Card>
    );
};
