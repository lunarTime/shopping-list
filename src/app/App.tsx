import { ConfigProvider, App as AntApp } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { HomePage } from '@pages/home';
import './App.css';

function App() {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <AntApp>
        <HomePage />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
