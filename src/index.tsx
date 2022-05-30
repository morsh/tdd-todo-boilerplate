import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Root } from './components/Root/Root';

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
