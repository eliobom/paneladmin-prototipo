import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  Trophy, 
  MapPin, 
  Ban, 
  Users, 
  Ticket,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Wallet,
  Calendar,
  History,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { user, selectedCountry, logout } = useAuth();

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    );
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Inicio',
      icon: Home,
      section: 'home'
    },
    {
      id: 'admin',
      label: 'Administrador',
      icon: Settings,
      submenu: [
        { id: 'ventas', label: 'Ventas', icon: BarChart3, section: 'sales' },
        { id: 'cartera', label: 'Cartera', icon: Wallet, section: 'wallet' }
      ]
    },
    {
      id: 'winners',
      label: 'Ganadores',
      icon: Trophy,
      submenu: [
        { id: 'ganadores-hoy', label: 'Ganadores Hoy', icon: Calendar, section: 'winners-today' },
        { id: 'historial-ganadores', label: 'Historial', icon: History, section: 'winners-history' }
      ]
    },
    {
      id: 'zona',
      label: 'Zonas',
      icon: MapPin,
      section: 'zones'
    },
    {
      id: 'bloquear',
      label: 'Bloquear Números',
      icon: Ban,
      section: 'blocked-numbers'
    },
    {
      id: 'usuarios',
      label: 'Usuarios',
      icon: Users,
      section: 'users'
    },
    {
      id: 'loterias',
      label: 'Loterías',
      icon: Ticket,
      section: 'lotteries'
    }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-2 rounded-lg">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">LottoAdmin</h2>
            <p className="text-xs text-gray-400">
              {selectedCountry === 'brazil' ? '🇧🇷 Brasil' : '🇨🇴 Colombia'}
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 rounded-full p-2">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.username}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {expandedMenus.includes(item.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedMenus.includes(item.id) && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            onClick={() => onSectionChange(subItem.section)}
                            className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                              activeSection === subItem.section
                                ? 'bg-emerald-600 text-white'
                                : 'hover:bg-gray-800'
                            }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span className="text-sm">{subItem.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  onClick={() => onSectionChange(item.section!)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeSection === item.section
                      ? 'bg-emerald-600 text-white'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition-colors text-red-400 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;