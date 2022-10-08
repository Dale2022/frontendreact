import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './main/App';
import './index.css';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);
