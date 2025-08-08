import React, { useState } from 'react';
import { Ticket, Plus, Search, Filter, Edit, Trash2, Clock, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { mockLotteries } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const Lotteries: React.FC = () => {
  const { selectedCountry } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredLotteries = mockLotteries.filter(lottery => 
    lottery.country === selectedCountry &&
    (statusFilter === 'all' || (statusFilter === 'active' ? lottery.active : !lottery.active)) &&
    (searchTerm === '' || 
     lottery.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalLotteries = filteredLotteries.length;
  const activeLotteries = filteredLotteries.filter(l => l.active).length;
  const totalMaxPrize = filteredLotteries.reduce((sum, lottery) => sum + lottery.maxPrize, 0);
  const avgTicketPrice = filteredLotteries.reduce((sum, lottery) => sum + lottery.ticketPrice, 0) / filteredLotteries.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Administración de Loterías</h2>
          <p className="text-gray-600 mt-1">
            Gestión de tipos de lotería y configuraciones
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Lotería</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-2" />
              Buscar Lotería
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nombre de la lotería..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Estado
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">Todas las loterías</option>
              <option value="active">Activas</option>
              <option value="inactive">Inactivas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="name">Nombre</option>
              <option value="price">Precio del boleto</option>
              <option value="prize">Premio máximo</option>
              <option value="draw">Próximo sorteo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Loterías</p>
              <p className="text-2xl font-bold text-gray-900">{totalLotteries}</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500">
              <Ticket className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Loterías Activas</p>
              <p className="text-2xl font-bold text-gray-900">{activeLotteries}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Premio Total Máx.</p>
              <p className="text-2xl font-bold text-gray-900">${(totalMaxPrize / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Precio Prom. Boleto</p>
              <p className="text-2xl font-bold text-gray-900">${avgTicketPrice.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <Ticket className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Lotteries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLotteries.map((lottery) => (
          <div key={lottery.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full ${lottery.active ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                  <Ticket className={`w-6 h-6 ${lottery.active ? 'text-emerald-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{lottery.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedCountry === 'brazil' ? '🇧🇷 Brasil' : '🇨🇴 Colombia'}
                  </p>
                </div>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                lottery.active 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {lottery.active ? 'Activa' : 'Inactiva'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Precio Boleto:
                  </span>
                </div>
                <p className="text-lg font-bold text-emerald-600">${lottery.ticketPrice.toFixed(2)}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Premio Máximo:
                  </span>
                </div>
                <p className="text-lg font-bold text-blue-600">${(lottery.maxPrize / 1000000).toFixed(1)}M</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Hora del Sorteo:
                </span>
                <span className="text-sm font-semibold text-gray-900">{lottery.drawTime}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Próximo Sorteo:
                </span>
                <span className="text-sm font-semibold text-gray-900">{lottery.nextDraw.toLocaleDateString()}</span>
              </div>
            </div>

            {/* Progress Bar for Next Draw */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Tiempo hasta próximo sorteo</span>
                <span className="text-xs text-gray-500">2 días</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  Ver Estadísticas
                </button>
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  {lottery.active ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lottery Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Nueva Lotería</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Lotería
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Ej: Super Lotería"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio del Boleto
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="2.50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Premio Máximo
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="10000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora del Sorteo
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Próximo Sorteo
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active-lottery"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="active-lottery" className="ml-2 block text-sm text-gray-900">
                  Activar lotería inmediatamente
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Crear Lotería
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Resumen de Loterías Activas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{activeLotteries}</p>
            <p className="text-emerald-100">Loterías Activas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">${(totalMaxPrize / 1000000).toFixed(1)}M</p>
            <p className="text-emerald-100">En Premios Disponibles</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">24/7</p>
            <p className="text-emerald-100">Disponibilidad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lotteries;