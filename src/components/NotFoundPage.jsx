import Navbar from './Navbar';
import Footer from './Footer';

export default function NotFoundPage() {
  return (
    <main className="bg-black min-h-screen text-white flex flex-col">
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10 pt-20">
        <h1 
          className="text-6xl md:text-9xl font-bold mb-6"
          style={{ 
            fontFamily: 'var(--font-akira-expanded)',
            color: 'transparent',
            WebkitTextStroke: '1px white'
          }}
        >
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-akira-expanded)' }}>
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
       <p className="text-gray-500 text-sm mt-4">Return to the homepage to explore more content.</p>
      </section>
      <Footer />
    </main>
  );
}