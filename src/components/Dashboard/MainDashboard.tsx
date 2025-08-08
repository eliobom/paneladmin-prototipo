import React, { useState } from 'react';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import Home from './Home';
import Sales from './Sales';
import WalletManagement from './Wallet';
import WinnersToday from './WinnersToday';
import WinnersHistory from './WinnersHistory';
import Zones from './Zones';
import BlockedNumbers from './BlockedNumbers';
import Users from './Users';
import Lotteries from './Lotteries';

const MainDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'home': return 'Dashboard Principal';
      case 'sales': return 'Gestión de Ventas';
      case 'wallet': return 'Gestión de Cartera';
      case 'winners-today': return 'Ganadores de Hoy';
      case 'winners-history': return 'Historial de Ganadores';
      case 'zones': return 'Gestión de Zonas';
      case 'blocked-numbers': return 'Números Bloqueados';
      case 'users': return 'Gestión de Usuarios';
      case 'lotteries': return 'Administración de Loterías';
      default: return 'Dashboard';
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'sales':
        return <Sales />;
      case 'wallet':
        return <WalletManagement />;
      case 'winners-today':
        return <WinnersToday />;
      case 'winners-history':
        return <WinnersHistory />;
      case 'zones':
        return <Zones />;
      case 'blocked-numbers':
        return <BlockedNumbers />;
      case 'users':
        return <Users />;
      case 'lotteries':
        return <Lotteries />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <Header title={getSectionTitle(activeSection)} />
        <main className="flex-1 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;