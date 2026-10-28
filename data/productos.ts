export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: "Cremas" | "Ácidos" | "Mascarillas" | "Equipos";
  descripcion: string;
}

export const productosPro: Producto[] = [
  { id: "p1", nombre: "Crema Base para Masajes (1L)", precio: 25, categoria: "Cremas", descripcion: "Crema hipoalergénica de rápida absorción." },
  { id: "p2", nombre: "Ácido Hialurónico Puro (30ml)", precio: 45, categoria: "Ácidos", descripcion: "Sérum concentrado para hidratación profunda." },
  { id: "p3", nombre: "Mascarilla de Carbón Activado (500g)", precio: 30, categoria: "Mascarillas", descripcion: "Ideal para limpiezas faciales profundas." },
  { id: "p4", nombre: "Kit de Dermaplaining Profesional", precio: 60, categoria: "Equipos", descripcion: "Incluye 10 hojas quirúrgicas estériles." },
  { id: "p5", nombre: "Ampollas de Vitaminas C+E (10 uds)", precio: 40, categoria: "Ácidos", descripcion: "Antioxidante potente para protocolos faciales." },
];
