import reactDom from 'react-dom/client';
import './styles/testStyle.css';
import App from './components/app';

const root = document.getElementById('root');
reactDom.createRoot(root!).render(App());


