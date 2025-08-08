import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Trophy, Users, Ticket } from 'lucide-react';
import { mockDashboardStats, salesChartData, winnersChartData } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const Home: React.FC = () => {
  const { selectedCountry } = useAuth();
  const stats = mockDashboardStats;

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            {change > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const pieColors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Dashboard Principal
          </h2>
          <p className="text-gray-600 mt-1">
            Resumen general del sistema de loterías
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-4 py-2 rounded-lg">
          <div className="text-2xl">
            {selectedCountry === 'brazil' ? '🇧🇷' : '🇨🇴'}
          </div>
          <div>
            <p className="font-semibold">
              {selectedCountry === 'brazil' ? 'Brasil' : 'Colombia'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas Totales"
          value={`$${stats.totalSales.toLocaleString()}`}
          change={stats.salesGrowth}
          icon={DollarSign}
          color="bg-emerald-500"
        />
        <StatCard
          title="Premios Pagados"
          value={`$${stats.totalWinnings.toLocaleString()}`}
          change={stats.winnersGrowth}
          icon={Trophy}
          color="bg-blue-500"
        />
        <StatCard
          title="Usuarios Activos"
          value={stats.totalUsers}
          change={8.2}
          icon={Users}
          color="bg-yellow-500"
        />
        <StatCard
          title="Loterías Activas"
          value={stats.activeLotteries}
          change={0}
          icon={Ticket}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Ventas Mensuales</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                <span>Brasil</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Colombia</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Bar dataKey="brasil" fill="#10B981" radius={4} />
              <Bar dataKey="colombia" fill="#3B82F6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Winners by Lottery */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ganadores por Lotería</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={winnersChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="winners"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {winnersChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} ganadores`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                type: 'sale',
                message: 'Nueva venta de $4.50 en Mega-Sena',
                time: 'Hace 5 minutos',
                color: 'bg-green-100 text-green-800'
              },
              {
                type: 'winner',
                message: 'Nuevo ganador: $15,000 en Lotofácil',
                time: 'Hace 15 minutos',
                color: 'bg-yellow-100 text-yellow-800'
              },
              {
                type: 'user',
                message: 'Nuevo usuario registrado en zona Bogotá',
                time: 'Hace 30 minutos',
                color: 'bg-blue-100 text-blue-800'
              },
              {
                type: 'system',
                message: 'Números bloqueados actualizados',
                time: 'Hace 1 hora',
                color: 'bg-gray-100 text-gray-800'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${activity.color}`}>
                  {activity.type.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;