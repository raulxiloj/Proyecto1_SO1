import { connect } from './api/socket';
import { AppRouter } from './routers/AppRouter';

function App() {
  connect();
  return <AppRouter/>
}

export default App;
