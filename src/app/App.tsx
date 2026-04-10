import { ConfigProvider, App as AntApp, theme as antTheme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { HomePage } from '@pages/home';
import { ThemeProvider, useTheme } from '@shared/lib/theme-context';
import './App.css';

function AppContent() {
    const { theme } = useTheme();

    return (
        <ConfigProvider
            locale={ruRU}
            theme={{
                algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
                token: {
                    colorPrimary: '#fb7f3c',
                    borderRadius: 12,
                },
            }}
        >
            <AntApp>
                <HomePage />
            </AntApp>
        </ConfigProvider>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
