import ReactDOM from 'react-dom/client';
import Logger from '@ezuikit/utils-logger';
import { type LoggerCls } from '@ezuikit/utils-logger/dist/types/logger';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/components/ErrorBoundary';
import { store } from './shared/store';
import Page from './page';
import '@/styles/tailwind.css';
import 'antd/dist/reset.css';
import { QueryClientProvider } from '@tanstack/react-query';
import '@/i18n/i18n';
import { queryClient } from './shared/services';

const logger: LoggerCls = Logger({
  level: import.meta.env.PROD ? 'ERROR' : 'INFO',
  name: 'RATS',
  showTime: true,
});

/** global logger */
window.logger = logger;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Page />
      </QueryClientProvider>
    </Provider>
  </ErrorBoundary>,
  // </React.StrictMode>
);
