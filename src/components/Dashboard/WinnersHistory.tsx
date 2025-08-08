import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Trophy, Calendar, Filter, Download, Search, TrendingUp } from 'lucide-react';
import { mockWinners } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const WinnersHistory: React.FC = () => {
  const { selectedCountry } = useAuth();
  const [dateFilter, setDateFilter] = useState('month');
  const [lotteryFilter, setLotteryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWinners = mockWinners.filter(winner => 
    winner.country === selectedCountry &&
    (lotteryFilter === 'all' || winner.lottery.toLowerCase().includes(lotteryFilter)) &&
    (searchTerm === '' || 
     winner.winnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     winner.ticketNumber.includes(searchTerm))
  );

  const winnersChartData = [
    { month: 'Jul', ganadores: 45, premios: 2500000 },
    { month: 'Ago', ganadores: 52, premios: 3200000 },
    { month: 'Sep', ganadores: 38, premios: 1800000 },
    { month: 'Oct', ganadores: 61, premios: 4100000 },
    { month: 'Nov', ganadores: 47, premios: 2900000 },
    { month: 'Dic', ganadores: 69, premios: 5200000 },
    { month: 'Ene', ganadores: 43, premios: 2700000 }
  ];

  const totalWinners = filteredWinners.length;
  const totalPrizes = filteredWinners.reduce((sum, winner) => sum + winner.prize, 0);
  const avgPrize = totalPrizes / totalWinners || 0;
  const claimedCount = filteredWinners.filter(w => w.claimed).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Historial de Ganadores</h2>
          <p className="text-gray-600 mt-1">
            Registro completo de premios otorgados
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar Historial</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Período
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="quarter">Este trimestre</option>
              <option value="year">Este año</option>
              <option value="all">Todo el historial</option>
            </select>
          </div>

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
                  <option value="mega">Mega-Sena</option>
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
              Estado
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="all">Todos</option>
              <option value="claimed">Reclamados</option>
              <option value="unclaimed">Sin reclamar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-2" />
              Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nombre o ticket..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Ganadores</p>
              <p className="text-2xl font-bold text-gray-900">{totalWinners}</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12.5%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Premios</p>
              <p className="text-2xl font-bold text-gray-900">${totalPrizes.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+18.3%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Premio Promedio</p>
              <p className="text-2xl font-bold text-gray-900">${avgPrize.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5.7%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tasa de Reclamo</p>
              <p className="text-2xl font-bold text-gray-900">{((claimedCount / totalWinners) * 100).toFixed(1)}%</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-600">{claimedCount} de {totalWinners}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Winners Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Tendencia de Ganadores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={winnersChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, 'Ganadores']} />
              <Line type="monotone" dataKey="ganadores" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Prizes Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribución de Premios</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winnersChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Premios']} />
              <Bar dataKey="premios" fill="#3B82F6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Winners Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Historial Completo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ganador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lotería
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zona
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWinners.map((winner) => (
                <tr key={winner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{winner.ticketNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {winner.winnerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {winner.lottery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600">
                    ${winner.prize.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {winner.zone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      winner.claimed 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {winner.claimed ? 'Reclamado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {winner.date.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WinnersHistory;