import LinksCardList from '@/contexts/links/components/LinkCardList';
import NoteCardList from '@/contexts/notes/components/NoteCardList';
import { useAnimations } from '@/contexts/shared/hooks/useAnimations';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { fadeIn, fadeInUp } = useAnimations();

  return (
    <motion.div
      className="dashboard-container"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {/* Encabezado del Dashboard */}
      <motion.div className="mb-6" variants={fadeInUp}>
        <h1 className="mb-2 text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Bienvenido a tu espacio de trabajo colaborativo</p>
      </motion.div>

      {/* Contenedor principal con grid responsivo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Columna 1: Notas fijadas */}
        <motion.div className="col-span-1 space-y-6 lg:col-span-2" variants={fadeInUp}>
          <div className="rounded-lg bg-black-700 p-4 shadow-md">
            <h2 className="mb-4 border-b border-gray-700 pb-2 text-lg font-semibold text-white">
              Notas Importantes
            </h2>
            <NoteCardList showPinnedOnly={true} />
          </div>
        </motion.div>

        {/* Columna 2: Calendario y widgets */}
        <motion.div className="col-span-1 space-y-6" variants={fadeInUp}>
          {/* Widget de Calendario */}
          <div className="rounded-lg bg-black-700 p-4 shadow-md">
            <h2 className="mb-4 border-b border-gray-700 pb-2 text-lg font-semibold text-white">
              Calendario
            </h2>
            <div className="calendar-placeholder flex h-64 items-center justify-center rounded-lg bg-black-700/50">
              <p className="text-gray-400">Widget de Calendario</p>
            </div>
          </div>
        </motion.div>

        {/* Columna 3: Enlaces */}
        <motion.div
          className="col-span-1 space-y-6 md:col-span-2 lg:col-span-3"
          variants={fadeInUp}
        >
          <div className="rounded-lg bg-black-700 p-4 shadow-md">
            <h2 className="mb-4 border-b border-gray-700 pb-2 text-lg font-semibold text-white">
              Enlaces Guardados
            </h2>
            <LinksCardList cardStyle="modern" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
