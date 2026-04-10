import { Form, Input, InputNumber, Button, Select, Space, Radio } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import type { ShoppingItem, Unit } from '@shared/types';
import { useEffect } from 'react';

interface AddItemFormProps {
  onAdd: (item: Omit<ShoppingItem, 'id' | 'done'>) => void;
  initialValues?: Partial<ShoppingItem>;
  isEditing?: boolean;
}

export const AddItemForm = ({ onAdd, initialValues, isEditing }: AddItemFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    onAdd(values);
    if (!isEditing) {
      form.resetFields();
    }
  };

  const units: Unit[] = ['кг', 'гр', 'л', 'мл', 'шт'];

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={initialValues || { quantity: 1, unit: 'шт', priceMode: 'per_unit' }}
      style={!isEditing ? {
        padding: 24,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        marginBottom: 24
      } : {}}
    >
      <Form.Item
        name="title"
        label="Название"
        rules={[{ required: true, message: 'Введите название товара' }]}
      >
        <Input placeholder="Например: Молоко" />
      </Form.Item>

      <Space align="start" style={{ display: 'flex' }} wrap>
        <Form.Item
          name="quantity"
          label="Кол-во"
          rules={[{ required: true, message: 'Укажите кол-во' }]}
        >
          <InputNumber min={0.01} precision={2} style={{ width: 100 }} />
        </Form.Item>

        <Form.Item name="unit" label="Ед. изм.">
          <Select style={{ width: 80 }}>
            {units.map((u) => (
              <Select.Option key={u} value={u}>
                {u}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Цена (₽)"
        >
          <InputNumber min={0} precision={2} style={{ width: 120 }} placeholder="0.00" />
        </Form.Item>

        <Form.Item name="priceMode" label="Расчет цены">
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value="per_unit">За ед.</Radio.Button>
            <Radio.Button value="total">За всё</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Space>

      <Form.Item name="comment" label="Комментарий">
        <Input.TextArea placeholder="Дополнительная информация" autoSize={{ minRows: 1, maxRows: 3 }} />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          icon={isEditing ? <SaveOutlined /> : <PlusOutlined />}
          block
          size="large"
          style={{ borderRadius: 8, height: 48 }}
        >
          {isEditing ? 'Сохранить изменения' : 'Добавить в список'}
        </Button>
      </Form.Item>
    </Form>
  );
};
