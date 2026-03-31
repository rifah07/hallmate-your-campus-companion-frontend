import { motion } from 'framer-motion';

interface PageBannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

/**
 * Elegant page banner with parallax-like background image and teal gradient overlay.
 * Used across all public pages for visual consistency.
 */
export default function PageBanner({ title, subtitle, backgroundImage }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      {/* Teal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-800/90 via-teal-700/85 to-teal-900/90" />
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/20 to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight drop-shadow-lg"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/80 text-base md:text-lg max-w-xl mx-auto drop-shadow"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
