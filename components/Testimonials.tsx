"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquarePlus } from "lucide-react";

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

const defaultReviews: Review[] = [
  { id: "1", name: "María G.", text: "El masaje relajante con Legna fue una experiencia única. Salí como nueva.", rating: 5 },
  { id: "2", name: "Ana P.", text: "Kleyan es una artista con la limpieza facial. Mi piel nunca había estado tan radiante.", rating: 5 },
  { id: "3", name: "Carla R.", text: "El lugar es hermoso, la atención de primera. Volveré sin duda.", rating: 5 },
];

export default function Testimonials() {
  // Iniciamos con las reseñas por defecto para que el servidor renderice algo
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Cargar reseñas guardadas de localStorage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const saved = localStorage.getItem("sensual_reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      localStorage.setItem("sensual_reviews", JSON.stringify(defaultReviews));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;
    const newReview: Review = { id: Date.now().toString(), name, text, rating };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem("sensual_reviews", JSON.stringify(updated));
    setName(""); 
    setText(""); 
    setRating(5); 
    setIsFormOpen(false);
  };

  // Evitamos parpadeos hasta que el componente esté montado en el cliente
  if (!isMounted) return null;

  return (
    <section className="w-full py-24 px-6 bg-spa-burgundy relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-spa-marble mb-4">Lo que dicen nuestras clientas</h2>
          <p className="font-sans text-spa-marble/70 text-sm">Experiencias reales de quienes ya confiaron en nosotras.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div 
                key={review.id} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }}
                className="bg-[#2E0711]/80 border border-spa-gold/20 p-6 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="text-spa-gold fill-spa-gold" />)}
                  </div>
                  {/* Usamos entidades HTML para evitar el error de comillas */}
                  <p className="font-sans text-sm text-spa-marble/90 italic mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
                <p className="font-serif text-lg text-spa-gold">{review.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Formulario desplegable */}
        <div className="text-center">
          <button onClick={() => setIsFormOpen(!isFormOpen)} className="inline-flex items-center gap-2 bg-transparent border border-spa-gold text-spa-gold px-6 py-3 rounded-sm hover:bg-spa-gold hover:text-spa-burgundy transition-colors">
            <MessageSquarePlus size={18} /> Deja tu reseña
          </button>
        </div>

        <AnimatePresence>
          {isFormOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-6 max-w-lg mx-auto">
              <form onSubmit={handleSubmit} className="bg-[#2E0711] p-6 rounded-lg border border-spa-gold/30 space-y-4">
                <input type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-spa-burgundy border border-spa-gold/30 rounded-sm p-3 text-spa-marble outline-none" />
                <textarea placeholder="Cuéntanos tu experiencia..." value={text} onChange={(e) => setText(e.target.value)} required rows={3} className="w-full bg-spa-burgundy border border-spa-gold/30 rounded-sm p-3 text-spa-marble outline-none" />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-spa-gold">Calificación:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button type="button" key={star} onClick={() => setRating(star)}><Star size={20} className={star <= rating ? "text-spa-gold fill-spa-gold" : "text-spa-marble/30"} /></button>
                  ))}
                </div>
                <button type="submit" className="w-full bg-spa-gold text-spa-burgundy font-bold py-3 rounded-sm">ENVIAR RESEÑA</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
