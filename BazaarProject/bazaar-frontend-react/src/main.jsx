import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import Store from './Store/index.jsx';

import App from './App.jsx';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={Store}><App /></Provider>);