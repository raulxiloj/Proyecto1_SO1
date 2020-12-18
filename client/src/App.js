import { connect, connect2 } from './api/socket';
import { AppRouter } from './routers/AppRouter';

function App() {
  connect();
  connect2();
  return <AppRouter/>
}

export default App;
