import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import CountrySelection from './components/CountrySelection';
import MainDashboard from './components/Dashboard/MainDashboard';

const AppContent: React.FC = () => {
  const { user, selectedCountry } = useAuth();

  if (!user) {
    return <Login />;
  }

  if (!selectedCountry) {
    return <CountrySelection />;
  }

  return <MainDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;