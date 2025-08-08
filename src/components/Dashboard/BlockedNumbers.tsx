import React, { useState } from 'react';
import { Ban, Plus, Search, Filter, Calendar, User, AlertTriangle, Trash2, Edit } from 'lucide-react';
import { mockBlockedNumbers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const BlockedNumbers: React.FC = () => {
  const { selectedCountry } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [lotteryFilter, setLotteryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredNumbers = mockBlockedNumbers.filter(blocked => 
    blocked.country === selectedCountry &&
    (lotteryFilter === 'all' || blocked.lottery.toLowerCase().includes(lotteryFilter)) &&
    (statusFilter === 'all' || (statusFilter === 'active' ? blocked.active : !blocked.active)) &&
    (searchTerm === '' || 
     blocked.number.includes(searchTerm) ||
     blocked.reason.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalBlocked = filteredNumbers.length;
  const activeBlocked = filteredNumbers.filter(b => b.active).length;
  const inactiveBlocked = filteredNumbers.filter(b => !b.active).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Números Bloqueados</h2>
          <p className="text-gray-600 mt-1">
            Gestión de números restringidos para ventas
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Ban className="w-4 h-4" />
            <span>Bloquear Número</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-2" />
              Buscar Número
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Número o razón..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Lotería
            </label>
            <select
              value={lotteryFilter}
              onChange={(e) => setLotteryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
              <option value="date">Fecha</option>
              <option value="number">Número</option>
              <option value="lottery">Lotería</option>
              <option value="user">Usuario</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Bloqueados</p>
              <p className="text-2xl font-bold text-gray-900">{totalBlocked}</p>
            </div>
            <div className="p-3 rounded-lg bg-red-500">
              <Ban className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Bloqueos Activos</p>
              <p className="text-2xl font-bold text-gray-900">{activeBlocked}</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-500">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Bloqueos Inactivos</p>
              <p className="text-2xl font-bold text-gray-900">{inactiveBlocked}</p>
            </div>
            <div className="p-3 rounded-lg bg-gray-500">
              <Ban className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Blocked Numbers Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNumbers.map((blocked) => (
          <div key={blocked.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-full ${blocked.active ? 'bg-red-100' : 'bg-gray-100'}`}>
                  <Ban className={`w-6 h-6 ${blocked.active ? 'text-red-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">#{blocked.number}</h3>
                  <p className="text-sm text-gray-500">{blocked.lottery}</p>
                </div>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                blocked.active 
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {blocked.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Razón del bloqueo:</span>
                <p className="text-sm font-medium text-gray-900 mt-1">{blocked.reason}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Bloqueado por:
                </span>
                <span className="text-sm font-medium text-gray-900">{blocked.blockedBy}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Fecha:
                </span>
                <span className="text-sm font-medium text-gray-900">{blocked.date.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  {blocked.active ? 'Desactivar' : 'Activar'}
                </button>
                <button className="bg-red-50 hover:bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Blocked Number Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Bloquear Número</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número a Bloquear
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Ej: 13"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lotería
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
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
                  Razón del Bloqueo
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                  placeholder="Describe la razón del bloqueo..."
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active-block"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="active-block" className="ml-2 block text-sm text-gray-900">
                  Activar bloqueo inmediatamente
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
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Bloquear Número
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Importante</h3>
            <p className="text-yellow-700 text-sm">
              Los números bloqueados no podrán ser vendidos en las loterías seleccionadas. 
              Esta acción afecta inmediatamente a todos los puntos de venta. 
              Asegúrate de comunicar estos cambios a tu equipo de ventas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedNumbers;