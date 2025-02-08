//boletos
export interface Asiento {
    id: string;
    fila: string;
    numero: number;
    estado: 'Disponible' | 'Ocupado' | 'Reservado';
    tipo: 'VIP' | 'Regular';
  }
  
  export interface Pelicula {
    id: number;
    titulo: string;
    duracion: number;
    clasificacion: string;
    imagen: string;
    sinopsis: string;
  }
  
  export interface Funcion {
    id: number;
    peliculaId: number;
    salaId: number;
    fecha: string;
    precio: {
      regular: number;
      vip: number;
    };
    asientosDisponibles: number;
    pelicula: Pelicula;
  }
  
  export interface MetodoPago {
    id: string;
    nombre: string;
    tipo: 'Tarjeta' | 'Efectivo' | 'App' | 'Transferencia' | 'QR';
    icono: string;
    configurado: boolean;
    comision: number;  // Agregado
    procesador: string; // Agregado
    tiempoPromedio: string;
  }
  
  
  
  
  export interface ResumenCompra {
    funcion: Funcion;
    asientos: Asiento[];
    total: number;
    metodoPago?: MetodoPago;
  }
