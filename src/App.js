import { useState } from 'react';
import { Routes, Route, } from 'react-router-dom'
import Search from './pages/Search';
import User from './pages/User';

function App() {
  const [user, setUser] = useState(null);

  const handleFetchUserData = (userData) => {
    setUser(userData);
  };

  return (
      <main>
        <Routes>
              <Route
                 exact path="/"
                 element={<Search getDataUser={handleFetchUserData} />}
              />
              <Route
                exact path="/user/:username"
                element={<User user={user} />}
              />
            </Routes>
     </main>
  )
}

export default App;

