import React, { useState } from 'react';
import { Trophy, Calendar, DollarSign, MapPin, User, Clock, Filter, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const WinnersToday: React.FC = () => {
  const { selectedCountry } = useAuth();
  const [lotteryFilter, setLotteryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const todayWinners = [
    {
      id: '1',
      ticketNumber: '12345',
      lottery: selectedCountry === 'brazil' ? 'Mega-Sena' : 'Baloto',
      winnerName: 'María González',
      prize: 125000.00,
      zone: selectedCountry === 'brazil' ? 'São Paulo' : 'Bogotá',
      time: '14:30',
      claimed: false,
      phone: '+55 11 99999-9999'
    },
    {
      id: '2',
      ticketNumber: '67890',
      lottery: selectedCountry === 'brazil' ? 'Quina' : 'Loto Colombia',
      winnerName: 'Carlos Silva',
      prize: 85000.00,
      zone: selectedCountry === 'brazil' ? 'Rio de Janeiro' : 'Medellín',
      time: '16:45',
      claimed: true,
      phone: '+55 21 88888-8888'
    },
    {
      id: '3',
      ticketNumber: '11111',
      lottery: selectedCountry === 'brazil' ? 'Lotofácil' : 'Chance',
      winnerName: 'Ana Rodríguez',
      prize: 15000.00,
      zone: selectedCountry === 'brazil' ? 'Brasília' : 'Cali',
      time: '18:20',
      claimed: false,
      phone: '+57 300 777-7777'
    },
    {
      id: '4',
      ticketNumber: '55555',
      lottery: selectedCountry === 'brazil' ? 'Timemania' : 'Lotería de Bogotá',
      winnerName: 'Pedro Martínez',
      prize: 45000.00,
      zone: selectedCountry === 'brazil' ? 'Belo Horizonte' : 'Barranquilla',
      time: '20:15',
      claimed: true,
      phone: '+57 310 666-6666'
    }
  ];

  const totalPrizes = todayWinners.reduce((sum, winner) => sum + winner.prize, 0);
  const claimedPrizes = todayWinners.filter(w => w.claimed).reduce((sum, winner) => sum + winner.prize, 0);
  const unclaimedCount = todayWinners.filter(w => !w.claimed).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Ganadores de Hoy</h2>
          <p className="text-gray-600 mt-1">
            Premios del día {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar Lista</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Lotería
            </label>
            <select
              value={lotteryFilter}
              onChange={(e) => setLotteryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">Todas las loterías</option>
              {selectedCountry === 'brazil' ? (
                <>
                  <option value="mega-sena">Mega-Sena</option>
                  <option value="quina">Quina</option>
                  <option value="lotofacil">Lotofácil</option>
                  <option value="timemania">Timemania</option>
                </>
              ) : (
                <>
                  <option value="baloto">Baloto</option>
                  <option value="loto">Loto Colombia</option>
                  <option value="chance">Chance</option>
                  <option value="bogota">Lotería de Bogotá</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado del Premio
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">Todos</option>
              <option value="claimed">Reclamados</option>
              <option value="unclaimed">Sin reclamar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zona
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="all">Todas las zonas</option>
              {selectedCountry === 'brazil' ? (
                <>
                  <option value="sao-paulo">São Paulo</option>
                  <option value="rio">Rio de Janeiro</option>
                  <option value="brasilia">Brasília</option>
                  <option value="belo-horizonte">Belo Horizonte</option>
                </>
              ) : (
                <>
                  <option value="bogota">Bogotá</option>
                  <option value="medellin">Medellín</option>
                  <option value="cali">Cali</option>
                  <option value="barranquilla">Barranquilla</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Ganadores</p>
              <p className="text-2xl font-bold text-gray-900">{todayWinners.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Premios</p>
              <p className="text-2xl font-bold text-gray-900">${totalPrizes.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Premios Reclamados</p>
              <p className="text-2xl font-bold text-gray-900">${claimedPrizes.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sin Reclamar</p>
              <p className="text-2xl font-bold text-gray-900">{unclaimedCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Winners Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {todayWinners.map((winner) => (
          <div key={winner.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full ${winner.claimed ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <Trophy className={`w-6 h-6 ${winner.claimed ? 'text-green-600' : 'text-yellow-600'}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{winner.winnerName}</h3>
                  <p className="text-sm text-gray-500">Ticket #{winner.ticketNumber}</p>
                </div>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                winner.claimed 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {winner.claimed ? 'Reclamado' : 'Pendiente'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Premio:</span>
                <span className="text-lg font-bold text-emerald-600">${winner.prize.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Lotería:</span>
                <span className="text-sm font-medium text-gray-900">{winner.lottery}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Zona:
                </span>
                <span className="text-sm font-medium text-gray-900">{winner.zone}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Hora:
                </span>
                <span className="text-sm font-medium text-gray-900">{winner.time}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Contacto:
                </span>
                <span className="text-sm font-medium text-gray-900">{winner.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                {!winner.claimed && (
                  <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Marcar como Reclamado
                  </button>
                )}
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-3 px-4 rounded-lg transition-colors">
            <Trophy className="w-5 h-5" />
            <span>Notificar Ganadores</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg transition-colors">
            <DollarSign className="w-5 h-5" />
            <span>Procesar Pagos</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-3 px-4 rounded-lg transition-colors">
            <Calendar className="w-5 h-5" />
            <span>Programar Recordatorios</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnersToday;