export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  img: string;
  categoria: string;
  stock: number;
  fecha_creacion?: string;
}