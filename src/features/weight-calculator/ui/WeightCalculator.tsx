import { Form, Space, Input, InputNumber, Button, Typography, theme, Card, Divider } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Text, Title } = Typography;

interface WeightCalculatorValues {
    title: string;
    grams: number;
    pricePerKg: number;
    comment?: string;
}

interface WeightCalculatorProps {
    onAddToShoppingList: (item: {
        title: string;
        quantity: number;
        unit: 'гр';
        price: number;
        priceMode: 'per_unit';
        comment?: string;
    }) => void;
}

export const WeightCalculator = ({ onAddToShoppingList }: WeightCalculatorProps) => {
    const [form] = Form.useForm<WeightCalculatorValues>();
    const { token } = theme.useToken();
    const [grams, setGrams] = useState<number>(0);
    const [pricePerKg, setPricePerKg] = useState<number>(0);

    const kilograms = grams / 1000;
    const totalPrice = pricePerKg * kilograms;
    const pricePerGram = pricePerKg > 0 ? pricePerKg / 1000 : 0;

    const handleAddToList = () => {
        const title = form.getFieldValue('title');
        const comment = form.getFieldValue('comment');

        if (!title) {
            form.validateFields(['title']);

            return;
        }

        onAddToShoppingList({
            title,
            quantity: grams,
            unit: 'гр',
            price: pricePerKg,
            priceMode: 'per_unit',
            comment,
        });

        form.resetFields();
        setGrams(0);
        setPricePerKg(0);
    };

    return (
        <Card
            size="small"
            style={{
                borderRadius: 16,
                background: token.colorBgContainer,
            }}
        >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Title level={5} style={{ margin: 0 }}>
                    Калькулятор весовых товаров
                </Title>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    Укажите вес и цену за кг для автоматического расчета
                </Text>
            </div>

            <Form form={form} layout="vertical" style={{ maxWidth: 400, margin: '0 auto' }}>
                <Form.Item
                    name="title"
                    label="Название товара"
                    rules={[{ required: true, message: 'Введите название' }]}
                >
                    <Input placeholder="Например: Конфеты" />
                </Form.Item>

                <Form.Item label="Вес">
                    <Input.Group compact style={{ display: 'flex' }}>
                        <Form.Item name="grams" noStyle>
                            <Space.Compact>
                                <InputNumber
                                    min={1}
                                    precision={1}
                                    step={10}
                                    style={{ width: '100%' }}
                                    value={grams}
                                    onChange={(val) => setGrams(val || 0)}
                                    addonBefore="гр"
                                />
                            </Space.Compact>
                        </Form.Item>
                        <Space.Compact>
                            <InputNumber
                                disabled
                                value={parseFloat(kilograms.toFixed(3))}
                                style={{ width: '100%' }}
                                addonAfter="кг"
                            />
                        </Space.Compact>
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    name="pricePerKg"
                    label="Цена за 1 кг"
                    rules={[{ required: true, message: 'Укажите цену' }]}
                >
                    <InputNumber
                        min={0}
                        precision={2}
                        step={10}
                        style={{ width: '100%' }}
                        value={pricePerKg}
                        onChange={(val) => setPricePerKg(val || 0)}
                        prefix="₽"
                    />
                </Form.Item>

                <Divider style={{ margin: '12px 0' }} />

                <div
                    style={{
                        padding: 12,
                        background: token.colorFillAlter,
                        borderRadius: 8,
                        marginBottom: 16,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 4,
                        }}
                    >
                        <Text type="secondary">Вес:</Text>
                        <Text strong>
                            {grams} гр ({kilograms.toFixed(3)} кг)
                        </Text>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 4,
                        }}
                    >
                        <Text type="secondary">Цена за 1 кг:</Text>
                        <Text strong>{pricePerKg.toFixed(2)} ₽</Text>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 4,
                        }}
                    >
                        <Text type="secondary">Цена за 1 гр:</Text>
                        <Text>{pricePerGram.toFixed(4)} ₽</Text>
                    </div>
                    <Divider style={{ margin: '8px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text strong>Итого:</Text>
                        <Text strong style={{ color: token.colorPrimary, fontSize: 18 }}>
                            {totalPrice.toFixed(2)} ₽
                        </Text>
                    </div>
                </div>

                <Form.Item name="comment" label="Комментарий (необязательно)">
                    <Input.TextArea
                        placeholder="Дополнительная информация"
                        autoSize={{ minRows: 1, maxRows: 2 }}
                    />
                </Form.Item>

                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToList}
                    block
                    size="large"
                    style={{
                        borderRadius: 8,
                        height: 48,
                        opacity: totalPrice > 0 ? 1 : 0.5,
                    }}
                    disabled={totalPrice <= 0}
                >
                    Добавить в список покупок
                </Button>
            </Form>
        </Card>
    );
};
