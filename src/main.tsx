import ReactDOM from 'react-dom/client';
import Logger from '@ezuikit/utils-logger';
import { type LoggerCls } from '@ezuikit/utils-logger/dist/types/logger';
import { Provider } from 'react-redux';
import ErrorBoundary from '@/components/ErrorBoundary';
import { store } from './store';
import Page from './page';
import 'antd/dist/reset.css';
import { client } from '@/shared/services';
import { ApolloProvider } from '@apollo/client/react';
import '@/i18n/i18n';

const logger: LoggerCls = Logger({
  level: process.env.NODE_ENV === 'production' ? 'ERROR' : 'INFO',
  name: 'RATS',
  showTime: true,
});

/** global logger */
window.logger = logger;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Page />
      </ApolloProvider>
    </Provider>
  </ErrorBoundary>,
  // </React.StrictMode>
);
