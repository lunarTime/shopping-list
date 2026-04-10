import { Tabs, theme } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

interface BottomTabBarProps {
    activeTab: string;
    onChange: (key: string) => void;
    children: Record<string, React.ReactNode>;
}

export const BottomTabBar = ({ activeTab, onChange }: BottomTabBarProps) => {
    const { token } = theme.useToken();

    const items: TabsProps['items'] = [
        {
            key: 'shopping-list',
            label: (
                <span>
                    <ShoppingCartOutlined /> Список покупок
                </span>
            ),
        },
        {
            key: 'weight-calculator',
            label: (
                <span>
                    <ShoppingCartOutlined /> Весовой калькулятор
                </span>
            ),
        },
    ];

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                width: '90%',
                maxWidth: 500,
            }}
        >
            <div
                style={{
                    background: token.colorBgContainer,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: 20,
                    boxShadow: token.boxShadowTertiary,
                    border: `1px solid ${token.colorBorderSecondary}`,
                    padding: '8px 16px',
                    opacity: 0.92,
                }}
            >
                <Tabs
                    activeKey={activeTab}
                    onChange={onChange}
                    items={items}
                    centered
                    size="small"
                    style={{ margin: 0 }}
                />
            </div>
        </div>
    );
};
