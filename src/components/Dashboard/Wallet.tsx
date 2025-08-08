import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Wallet, CreditCard, TrendingUp, TrendingDown, DollarSign, AlertCircle, Download, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const WalletManagement: React.FC = () => {
  const { selectedCountry } = useAuth();
  const [dateFilter, setDateFilter] = useState('month');
  const [statusFilter, setStatusFilter] = useState('all');

  const walletData = [
    { date: '01/01', ingresos: 15000, egresos: 8000, balance: 7000 },
    { date: '02/01', ingresos: 18000, egresos: 9500, balance: 8500 },
    { date: '03/01', ingresos: 22000, egresos: 11000, balance: 11000 },
    { date: '04/01', ingresos: 19000, egresos: 10200, balance: 8800 },
    { date: '05/01', ingresos: 25000, egresos: 12500, balance: 12500 },
    { date: '06/01', ingresos: 28000, egresos: 14000, balance: 14000 },
    { date: '07/01', ingresos: 32000, egresos: 15800, balance: 16200 }
  ];

  const transactions = [
    {
      id: '1',
      type: 'ingreso',
      description: 'Venta de boletos Mega-Sena',
      amount: 2450.50,
      date: '2025-01-10',
      status: 'completado',
      zone: 'São Paulo'
    },
    {
      id: '2',
      type: 'egreso',
      description: 'Pago de premio Baloto',
      amount: -15000.00,
      date: '2025-01-10',
      status: 'completado',
      zone: 'Bogotá'
    },
    {
      id: '3',
      type: 'ingreso',
      description: 'Comisión por ventas',
      amount: 850.25,
      date: '2025-01-09',
      status: 'pendiente',
      zone: 'Rio de Janeiro'
    },
    {
      id: '4',
      type: 'egreso',
      description: 'Gastos operativos',
      amount: -1200.00,
      date: '2025-01-09',
      status: 'completado',
      zone: 'Medellín'
    }
  ];

  const totalBalance = 485750.25;
  const monthlyIncome = 125000.50;
  const monthlyExpenses = 89250.75;
  const pendingPayments = 25500.00;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gestión de Cartera</h2>
          <p className="text-gray-600 mt-1">
            Control financiero y flujo de caja
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
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
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">Todas las transacciones</option>
              <option value="completado">Completadas</option>
              <option value="pendiente">Pendientes</option>
              <option value="cancelado">Canceladas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="all">Todos</option>
              <option value="ingreso">Ingresos</option>
              <option value="egreso">Egresos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Balance Total</p>
              <p className="text-2xl font-bold text-gray-900">${totalBalance.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15.2%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ingresos del Mes</p>
              <p className="text-2xl font-bold text-gray-900">${monthlyIncome.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8.7%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Gastos del Mes</p>
              <p className="text-2xl font-bold text-gray-900">${monthlyExpenses.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600">+3.2%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pagos Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">${pendingPayments.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-yellow-600">12 transacciones</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Flujo de Caja Semanal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={walletData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expenses */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ingresos vs Gastos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={walletData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Bar dataKey="ingresos" fill="#10B981" radius={4} />
              <Bar dataKey="egresos" fill="#EF4444" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transacciones Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
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
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.type === 'ingreso' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'ingreso' ? 'Ingreso' : 'Egreso'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                      ${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.zone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === 'completado' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'pendiente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status === 'completado' ? 'Completado' : 
                       transaction.status === 'pendiente' ? 'Pendiente' : 'Cancelado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
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

export default WalletManagement;