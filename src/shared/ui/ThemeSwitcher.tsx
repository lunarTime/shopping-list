import { Button, theme as themeToken } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '@shared/lib/theme-context';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    const { token } = themeToken.useToken();

    return (
        <Button
            type="text"
            icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            size="large"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: token.colorPrimary,
            }}
        />
    );
};
