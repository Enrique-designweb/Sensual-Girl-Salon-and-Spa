export interface Servicio {
  id: string;
  nombre: string;
  precio: number;
  moneda: string;
  duracion: number; // en minutos
  descripcion: string;
}

export interface Especialista {
  id: string;
  nombre: string;
  rol: string;
  imagen: string;
  servicios: Servicio[];
}

export const especialistas: Especialista[] = [
  {
    id: "legna",
    nombre: "Legna",
    rol: "Especialista en Masajes",
    imagen: "/legna.webp",
    servicios: [
      { id: "l1", nombre: "Masaje Relajante (Espalda, cuello y hombros)", precio: 7000, moneda: "CUP", duracion: 40, descripcion: "Libera tensiones en la zona superior del cuerpo." },
      { id: "l2", nombre: "Masaje Relajante (Cuerpo completo)", precio: 9000, moneda: "CUP", duracion: 60, descripcion: "Una experiencia integral para renovar tu energía." },
      { id: "l3", nombre: "Masaje Descontracturante", precio: 7000, moneda: "CUP", duracion: 40, descripcion: "Alivia nudos musculares en trapecio y hombros." },
      { id: "l4", nombre: "Masaje Capilar y Facial", precio: 6500, moneda: "CUP", duracion: 30, descripcion: "Relajación para rostro, cuero cabelludo y cuello." },
      { id: "l5", nombre: "Masaje Capilar y Facial (Alta Frecuencia)", precio: 8000, moneda: "CUP", duracion: 45, descripcion: "Tratamiento avanzado con alta frecuencia." },
      { id: "l6", nombre: "Reflexología Podal", precio: 7000, moneda: "CUP", duracion: 30, descripcion: "Estimulación de puntos energéticos en piernas y pies." },
      { id: "l7", nombre: "Drenaje Linfático Abdominal", precio: 7000, moneda: "CUP", duracion: 35, descripcion: "Reduce la retención de líquidos y mejora la digestión." },
      { id: "l8", nombre: "Masaje Terapéutico", precio: 8000, moneda: "CUP", duracion: 40, descripcion: "Enfocado en la zona afectada para aliviar el dolor." },
    ],
  },
  {
    id: "kleyan",
    nombre: "Kleyan",
    rol: "Especialista Facial",
    imagen: "/kleyan.webp",
    servicios: [
      { id: "k1", nombre: "Limpieza Facial Superficial", precio: 6500, moneda: "CUP", duracion: 40, descripcion: "Limpieza rápida para mantener tu piel radiante." },
      { id: "k2", nombre: "Limpieza Facial Profunda", precio: 8500, moneda: "CUP", duracion: 60, descripcion: "Extracción de impurezas y oxigenación total." },
      { id: "k3", nombre: "Limpieza Facial con Dermaplaning", precio: 9500, moneda: "CUP", duracion: 60, descripcion: "Exfoliación profunda para una piel de porcelana." },
      { id: "k4", nombre: "Hidralips", precio: 7000, moneda: "CUP", duracion: 40, descripcion: "Hidratación y volumen natural para tus labios." },
      { id: "k5", nombre: "Microneedling (Péptidos)", precio: 12000, moneda: "CUP", duracion: 60, descripcion: "Estimulación de colágeno y elasticidad." },
      { id: "k6", nombre: "Microneedling (Ácido Hialurónico)", precio: 12000, moneda: "CUP", duracion: 60, descripcion: "Hidratación profunda a nivel celular." },
      { id: "k7", nombre: "Plasma Rico en Plaquetas", precio: 15000, moneda: "CUP", duracion: 60, descripcion: "Rejuvenecimiento utilizando tu propia biología." },
      { id: "k8", nombre: "Exosomas", precio: 20000, moneda: "CUP", duracion: 60, descripcion: "Tecnología de vanguardia para la juventud de tu piel." },
      { id: "k9", nombre: "Armonización Facial", precio: 30000, moneda: "CUP", duracion: 90, descripcion: "Equilibrio estético y natural de tus facciones." },
    ],
  },
];
