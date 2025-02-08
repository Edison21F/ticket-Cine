"use client"; 
import React, { useState } from 'react';
import { 
  Ticket, 
  CreditCard, 
  Calendar,
  ChevronRight,
  Plus,
  Search,
  Armchair,
  CheckCircle2,
  X,
  Clock,
  //Info,
  QrCode,
  Wallet,
  Building2 as BankIcon,
  User,
  Receipt,
  Printer,
  DollarSign,
  Mail
} from 'lucide-react';
import type { Asiento, Funcion, MetodoPago, Pelicula, ResumenCompra } from '../../../types/boleto';

// Mock data
const peliculasMock: Pelicula[] = [
  {
    id: 1,
    titulo: "Dune: Parte Dos",
    duracion: 166,
    clasificacion: "PG-13",
    imagen: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&q=80&w=300",
    sinopsis: "Paul Atreides se une a los Fremen y comienza un viaje espiritual y político."
  },
  {
    id: 2,
    titulo: "Pobres Criaturas",
    duracion: 141,
    clasificacion: "R",
    imagen: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=300",
    sinopsis: "La historia de Belle Baxter, una joven revivida por un científico brillante pero poco ortodoxo."
  }
];

const funcionesMock: Funcion[] = [
  {
    id: 1,
    peliculaId: 1,
    salaId: 1,
    fecha: '2024-03-20T18:30',
    precio: {
      regular: 8.50,
      vip: 12.00
    },
    asientosDisponibles: 142,
    pelicula: peliculasMock[0]
  },
  {
    id: 2,
    peliculaId: 2,
    salaId: 2,
    fecha: '2024-03-20T20:45',
    precio: {
      regular: 8.50,
      vip: 12.00
    },
    asientosDisponibles: 156,
    pelicula: peliculasMock[1]
  }
];

const metodospagoMock: MetodoPago[] = [
  { 
    id: '1', 
    nombre: 'Tarjeta de Crédito', 
    tipo: 'Tarjeta', 
    icono: 'credit-card', 
    configurado: true,
    comision: 3.5,
    procesador: 'Visa/Mastercard',
    tiempoPromedio: '5-10 segundos'
  },
  { 
    id: '2', 
    nombre: 'Efectivo', 
    tipo: 'Efectivo', 
    icono: 'dollar-sign', 
    configurado: true,
    comision: 0,
    procesador: 'Directo',
    tiempoPromedio: 'Inmediato'
  },
  { 
    id: '3', 
    nombre: 'PayPal', 
    tipo: 'App', 
    icono: 'paypal', 
    configurado: false,
    comision: 4.5,
    procesador: 'PayPal Inc.',
    tiempoPromedio: '10-15 segundos'
  },
  { 
    id: '4', 
    nombre: 'Transferencia', 
    tipo: 'Transferencia', 
    icono: 'bank', 
    configurado: false,
    comision: 1.5,
    procesador: 'ACH',
    tiempoPromedio: '24-48 horas'
  },
  { 
    id: '5', 
    nombre: 'Pago QR', 
    tipo: 'QR', 
    icono: 'qr-code', 
    configurado: false,
    comision: 2.0,
    procesador: 'QR Pay',
    tiempoPromedio: '5-10 segundos'
  }
];

// Mock data for seat buyers
const compradores: { [key: string]: { nombre: string; email: string; fecha: string; metodoPago: string } } = {
    'A1': { nombre: 'Juan Pérez', email: 'juan@email.com', fecha: '2024-03-20 15:30', metodoPago: 'Tarjeta' },
    'A2': { nombre: 'María López', email: 'maria@email.com', fecha: '2024-03-20 15:31', metodoPago: 'PayPal' },
    'B5': { nombre: 'Carlos Ruiz', email: 'carlos@email.com', fecha: '2024-03-20 16:00', metodoPago: 'Efectivo' },
  };

function VentasReservas() {
  const [activeTab, setActiveTab] = useState<'ventas' | 'asientos' | 'pagos'>('ventas');
  const [asientosSeleccionados, setAsientosSeleccionados] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuncion, setSelectedFuncion] = useState<Funcion | null>(null);
  const [tipoVenta, setTipoVenta] = useState<'online' | 'taquilla'>('online');
  const [resumenCompra, setResumenCompra] = useState<ResumenCompra | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const seatsPerRow = 20;
    const seats: Asiento[] = [];

    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const random = Math.random();
        const estado = compradores[seatId] ? 'Ocupado' : random > 0.8 ? 'Reservado' : 'Disponible';
        seats.push({
          id: seatId,
          fila: row,
          numero: i,
          estado,
          tipo: row === 'A' || row === 'B' ? 'VIP' : 'Regular'
        });
      }
    });

    return seats;
  };

  const asientosMock = generateSeats();

  const handleAsientoClick = (asientoId: string) => {
    if (!selectedFuncion) return;
    
    if (compradores[asientoId]) {
      setSelectedSeat(asientoId);
      return;
    }
    
    setAsientosSeleccionados(prev => 
      prev.includes(asientoId) 
        ? prev.filter(id => id !== asientoId)
        : [...prev, asientoId]
    );

    const asientosData = asientosMock.filter(a => 
      asientosSeleccionados.includes(a.id)
    );

    const total = asientosData.reduce((sum, asiento) => 
      sum + (asiento.tipo === 'VIP' ? selectedFuncion.precio.vip : selectedFuncion.precio.regular), 
      0
    );

    setResumenCompra({
      funcion: selectedFuncion,
      asientos: asientosData,
      total
    });
  };

  const handleNuevaVenta = () => {
    setSelectedFuncion(null);
    setAsientosSeleccionados([]);
    setResumenCompra(null);
    setActiveTab('ventas');
  };

  const handleSeleccionFuncion = (funcion: Funcion) => {
    setSelectedFuncion(funcion);
    setActiveTab('asientos');
  };

  const handleConfirmarSeleccion = () => {
    if (asientosSeleccionados.length > 0) {
      setActiveTab('pagos');
    }
  };

  const handleConfiguracionPago = (metodoPago: MetodoPago) => {
    if (resumenCompra) {
      setResumenCompra({
        ...resumenCompra,
        metodoPago
      });
    }
  };

  const filteredFunciones = funcionesMock.filter(funcion =>
    funcion.pelicula.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(funcion.fecha).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSeatGrid = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    return rows.map((row) => {
      const rowSeats = asientosMock.filter(seat => seat.fila === row);
      return (
        <div key={row} className="flex gap-2 justify-center mb-2">
          <div className="w-6 flex items-center justify-center text-gray-400">
            {row}
          </div>
          <div className="flex gap-2">
            {rowSeats.slice(0, 10).map((seat) => (
              <button
                key={seat.id}
                disabled={seat.estado === 'Ocupado' && !compradores[seat.id]}
                onClick={() => handleAsientoClick(seat.id)}
                className={`
                  w-8 h-8 rounded flex items-center justify-center text-xs font-medium relative
                  ${seat.estado === 'Ocupado' 
                    ? 'bg-red-500 cursor-pointer' 
                    : seat.estado === 'Reservado'
                    ? 'bg-yellow-500 cursor-not-allowed'
                    : asientosSeleccionados.includes(seat.id)
                    ? 'bg-green-500 hover:bg-green-600'
                    : seat.tipo === 'VIP'
                    ? 'bg-[#0EA5E9] hover:bg-[#0284C7] cursor-pointer'
                    : 'bg-[#0F172A] border border-[#0EA5E9] hover:bg-[#0284C7] cursor-pointer'
                  }
                  transition-colors duration-200
                `}
              >
                {seat.numero}
                {compradores[seat.id] && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
          <div className="w-8" />
          <div className="flex gap-2">
            {rowSeats.slice(10).map((seat) => (
              <button
                key={seat.id}
                disabled={seat.estado === 'Ocupado' && !compradores[seat.id]}
                onClick={() => handleAsientoClick(seat.id)}
                className={`
                  w-8 h-8 rounded flex items-center justify-center text-xs font-medium relative
                  ${seat.estado === 'Ocupado' 
                    ? 'bg-red-500 cursor-pointer' 
                    : seat.estado === 'Reservado'
                    ? 'bg-yellow-500 cursor-not-allowed'
                    : asientosSeleccionados.includes(seat.id)
                    ? 'bg-green-500 hover:bg-green-600'
                    : seat.tipo === 'VIP'
                    ? 'bg-[#0EA5E9] hover:bg-[#0284C7] cursor-pointer'
                    : 'bg-[#0F172A] border border-[#0EA5E9] hover:bg-[#0284C7] cursor-pointer'
                  }
                  transition-colors duration-200
                `}
              >
                {seat.numero}
                {compradores[seat.id] && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      );
    });
  };

  const renderTaquillaContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#0F172A] p-6 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#0EA5E9] rounded-lg">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Venta en Taquilla</h3>
            <p className="text-gray-400 text-sm">Gestión de ventas presenciales</p>
          </div>
        </div>
        <div className="space-y-4">
          <button className="w-full bg-[#0EA5E9] text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0284C7] transition-colors">
            <Printer className="w-5 h-5" />
            Imprimir Tickets
          </button>
          <button className="w-full bg-[#0F172A] border border-[#0EA5E9] text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0EA5E9] transition-colors">
            <DollarSign className="w-5 h-5" />
            Registrar Pago en Efectivo
          </button>
        </div>
        <div className="mt-6">
          <h4 className="font-medium mb-2">Resumen del Día</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Ventas totales</span>
              <span>$1,234.50</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Tickets vendidos</span>
              <span>45</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Efectivo en caja</span>
              <span>$890.00</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0F172A] p-6 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#0EA5E9] rounded-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Próximas Funciones</h3>
            <p className="text-gray-400 text-sm">Gestión de horarios y disponibilidad</p>
          </div>
        </div>
        <div className="space-y-4">
          {funcionesMock.map(funcion => (
            <div key={funcion.id} className="p-4 bg-[#1E293B] rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{funcion.pelicula.titulo}</h4>
                <span className="text-[#0EA5E9]">{funcion.asientosDisponibles} asientos</span>
              </div>
              <div className="text-sm text-gray-400">
                {new Date(funcion.fecha).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className= "min-h-screen bg-transparent text-white p-6"> {/* fondo transparente!!!!!!!!!!!!!!! */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Administración de Sala
        </h1>

        {/* Tabs de navegación */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('ventas')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'ventas'
                ? 'bg-[#0EA5E9] text-white'
                : 'bg-[#0F172A] text-gray-300 hover:bg-[#1E293B]'
            }`}
          >
            <Ticket className="w-5 h-5 mr-2" />
            Venta de Boletos
          </button>
          <button
            onClick={() => setActiveTab('asientos')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'asientos'
                ? 'bg-[#0EA5E9] text-white'
                : 'bg-[#0F172A] text-gray-300 hover:bg-[#1E293B]'
            }`}
          >
            <Armchair className="w-5 h-5 mr-2" />
            Selección de Asientos
          </button>
          <button
            onClick={() => setActiveTab('pagos')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'pagos'
                ? 'bg-[#0EA5E9] text-white'
                : 'bg-[#0F172A] text-gray-300 hover:bg-[#1E293B]'
            }`}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Métodos de Pago
          </button>
        </div>

        {/* Contenido principal */}
        <div className="bg-[#0F172A]/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
          {activeTab === 'ventas' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Venta de Boletos</h2>
                  <p className="text-gray-400 text-sm">Selecciona el tipo de venta y la función</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setTipoVenta('online')}
                      className={`px-4 py-2 rounded-lg ${
                        tipoVenta === 'online' 
                          ? 'bg-[#0EA5E9] text-white' 
                          : 'bg-[#1E293B] text-gray-300'
                      }`}
                    >
                      Online
                    </button>
                    <button 
                      onClick={() => setTipoVenta('taquilla')}
                      className={`px-4 py-2 rounded-lg ${
                        tipoVenta === 'taquilla' 
                          ? 'bg-[#0EA5E9] text-white' 
                          : 'bg-[#1E293B] text-gray-300'
                      }`}
                    >
                      Taquilla
                    </button>
                  </div>
                  <button 
                    onClick={handleNuevaVenta}
                    className="bg-[#0EA5E9] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#0284C7] transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Venta
                  </button>
                </div>
              </div>
              
              {tipoVenta === 'online' ? (
                <>
                  {/* Buscador de funciones */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar película o función..."
                      className="w-full bg-[#1E293B] text-white px-4 py-3 rounded-lg pl-12 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                    />
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  </div>

                  {/* Lista de funciones */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredFunciones.map(funcion => (
                      <div key={funcion.id} className="bg-[#1E293B] p-4 rounded-lg">
                        <div className="flex gap-4">
                          <img 
                            src={funcion.pelicula.imagen} 
                            alt={funcion.pelicula.titulo}
                            className="w-24 h-36 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{funcion.pelicula.titulo}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{funcion.pelicula.duracion} min</span>
                              <span className="px-2 py-0.5 bg-[#0EA5E9] rounded text-white">
                                {funcion.pelicula.clasificacion}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                              {funcion.pelicula.sinopsis}
                            </p>
                            <div className="flex justify-between items-end mt-4">
                              <div>
                                <p className="text-sm text-gray-400">Fecha y hora</p>
                                <p className="font-medium">
                                  {new Date(funcion.fecha).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-400">Desde</p>
                                <p className="font-semibold text-[#0EA5E9]">
                                  ${funcion.precio.regular.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center border-t border-[#2D3748] pt-4">
                          <div className="flex items-center gap-2">
                            <Armchair className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">
                              {funcion.asientosDisponibles} asientos disponibles
                            </span>
                          </div>
                          <button 
                            onClick={() => handleSeleccionFuncion(funcion)}
                            className="bg-[#0EA5E9] px-4 py-2 rounded-lg flex items-center hover:bg-[#0284C7] transition-colors"
                          >
                            Seleccionar
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                renderTaquillaContent()
              )}
            </div>
          )}

          {activeTab === 'asientos' && selectedFuncion && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Selección de Asientos</h2>
                  <p className="text-gray-400">
                    {selectedFuncion.pelicula.titulo} - {new Date(selectedFuncion.fecha).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Disponible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm">Ocupado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Reservado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-[#0EA5E9] rounded"></div>
                    <span className="text-sm">VIP</span>
                  </div>
                </div>
              </div>

              {/* Pantalla */}
              <div className="w-full text-center mb-8">
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mb-2"></div>
                <span className="text-sm text-gray-400">Pantalla</span>
              </div>

              {/* Grid de asientos */}
              <div className="max-w-4xl mx-auto mb-8">
                {renderSeatGrid()}
              </div>

              {/* Información del comprador del asiento */}
              {selectedSeat && compradores[selectedSeat] && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
                  <div className="bg-[#1E293B] p-6 rounded-lg max-w-md w-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">Información del Asiento {selectedSeat}</h3>
                      <button 
                        onClick={() => setSelectedSeat(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-[#0EA5E9]" />
                        <div>
                          <p className="text-sm text-gray-400">Comprador</p>
                          <p className="font-medium">{compradores[selectedSeat].nombre}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-[#0EA5E9]" />
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="font-medium">{compradores[selectedSeat].email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#0EA5E9]" />
                        <div>
                          <p className="text-sm text-gray-400">Fecha de compra</p>
                          <p className="font-medium">{compradores[selectedSeat].fecha}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-[#0EA5E9]" />
                        <div>
                          <p className="text-sm text-gray-400">Método de pago</p>
                          <p className="font-medium">{compradores[selectedSeat].metodoPago}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Resumen de selección */}
              {asientosSeleccionados.length > 0 && resumenCompra && (
                <div className="bg-[#1E293B] p-4 rounded-lg max-w-md mx-auto">
                  <h3 className="font-semibold mb-2">Resumen de Compra</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-400">
                      Asientos seleccionados:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {asientosSeleccionados.map(id => (
                        <span key={id} className="bg-[#0EA5E9] px-2 py-1 rounded text-sm">
                          {id}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#2D3748] pt-4">
                    <span className="font-medium">Total a pagar:</span>
                    <span className="text-xl font-bold text-[#0EA5E9]">
                      ${resumenCompra.total.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={handleConfirmarSeleccion}
                    className="w-full bg-[#0EA5E9] py-2 rounded-lg flex items-center justify-center hover:bg-[#0284C7] transition-colors mt-4"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Confirmar Selección
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pagos' && resumenCompra && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Métodos de Pago</h2>
                <p className="text-gray-400"> Selecciona un método de pago para completar tu compra
                </p>
              </div>
              
              <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metodospagoMock.map(metodo => (
                    <div key={metodo.id} className="bg-[#1E293B] p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        {metodo.tipo === 'Tarjeta' && <CreditCard className="w-6 h-6" />}
                        {metodo.tipo === 'Efectivo' && <Wallet className="w-6 h-6" />}
                        {metodo.tipo === 'App' && <Ticket className="w-6 h-6" />}
                        {metodo.tipo === 'Transferencia' && <BankIcon className="w-6 h-6" />}
                        {metodo.tipo === 'QR' && <QrCode className="w-6 h-6" />}
                        <div>
                          <h3 className="text-lg font-semibold">{metodo.nombre}</h3>
                          <span className="text-sm text-gray-400">{metodo.tipo}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        metodo.configurado 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {metodo.configurado ? 'Activo' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Comisión</span>
                        <span>{metodo.comision}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Procesador</span>
                        <span>{metodo.procesador}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Tiempo promedio</span>
                        <span>{metodo.tiempoPromedio}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => handleConfiguracionPago(metodo)}
                        className={`flex-1 py-2 rounded-lg text-sm text-center ${
                          resumenCompra.metodoPago?.id === metodo.id
                            ? 'bg-[#0EA5E9] text-white'
                            : 'bg-[#2D3748] text-gray-300 hover:bg-[#0EA5E9] hover:text-white'
                        } transition-colors`}
                      >
                        {resumenCompra.metodoPago?.id === metodo.id ? 'Seleccionado' : 'Seleccionar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumen final */}
              {resumenCompra.metodoPago && (
                <div className="mt-8 bg-[#1E293B] p-6 rounded-lg max-w-md mx-auto">
                {/*<div className= "min-h-screen bg-transparent text-white p-6">*/}
                  <h3 className="text-lg font-semibold mb-4">Resumen de la Compra</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Película</span>
                      <span>{resumenCompra.funcion.pelicula.titulo}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Función</span>
                      <span>{new Date(resumenCompra.funcion.fecha).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Asientos</span>
                      <span>{asientosSeleccionados.join(', ')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Método de pago</span>
                      <span>{resumenCompra.metodoPago.nombre}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Comisión ({resumenCompra.metodoPago.comision}%)</span>
                      <span>${(resumenCompra.total * resumenCompra.metodoPago.comision / 100).toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-[#2D3748]">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total</span>
                        <span className="text-xl font-bold text-[#0EA5E9]">
                          ${(resumenCompra.total * (1 + resumenCompra.metodoPago.comision / 100)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-[#0EA5E9] py-3 rounded-lg font-medium hover:bg-[#0284C7] transition-colors">
                      Confirmar Pago
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VentasReservas;