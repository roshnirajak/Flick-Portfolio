import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import navigationData from "../data/navigation.json";
import { useVideoHover } from "../contexts/VideoHoverContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { navLinks } = navigationData;
  const { isVideoHovered } = useVideoHover();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e, href) => {
    e.preventDefault();

    // Check if it's a route (starts with /) or a hash link (starts with #)
    if (href.startsWith('/')) {
      // Route navigation - use react-router
      navigate(href);
      window.scrollTo(0, 0);
      setIsOpen(false);
    } else if (href.startsWith('#')) {
      // Hash link - if on homepage, scroll; otherwise navigate to homepage with hash
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setIsOpen(false);
        }
      } else {
        // navigate to homepage including the hash so HomePage can react to location change
        navigate(`/${href}`);
        setIsOpen(false);
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.querySelector('#home');
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate('/');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Desktop Navbar - Hidden on mobile */}
      <nav className={`hidden md:flex fixed left-[150px] right-[150px] z-50 
                 bg-white/5 backdrop-blur-xl backdrop-saturate-150 
                 border border-white/10 shadow-2xl rounded-lg transition-transform duration-500 ease-in-out
                 ${isVideoHovered ? '-translate-y-full top-[-100px]' : 'top-[20px]'}`}>
        <div className="max-w-7xl mx-auto px-4 py-2 w-full">
          <div className="flex justify-between items-center">
            {/* F on the left */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="text-xl md:text-2xl font-bold text-white"
              style={{ fontFamily: 'var(--font-akira-expanded)' }}
            >
              F
            </a>

            {/* Navigation links on the right */}
            <div className="flex gap-4 md:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button - Top Right */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-5 right-5 z-50 p-2 transition-transform"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Mobile Slider Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-dark-grey backdrop-blur-xl border-l border-white/10 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: 'var(--dark-grey)' }}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-lg font-medium text-gray-300 hover:text-white transition-colors py-4 border-b border-gray-700"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}
