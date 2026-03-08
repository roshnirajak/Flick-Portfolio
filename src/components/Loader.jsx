import { useEffect, useState } from 'react';

export default function Loader({ onLoaded }) {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    let isLoaded = false;

    const finishLoading = () => {
      if (isLoaded) return;
      isLoaded = true;

      // Animate to 100%
      setProgress(100);

      // Start fade out after a short delay to show completion
      setTimeout(() => {
        setFadingOut(true);
        // Call onLoaded after fade out animation completes
        setTimeout(onLoaded, 3000);
      }, 2000);
    };

    // If page is already loaded, finish immediately
    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      // Start the animation to 95% to give a sense of progress
      setTimeout(() => setProgress(95), 100);
      window.addEventListener('load', finishLoading, { once: true });
    }

    // Safety timeout in case 'load' event doesn't fire
    const safetyTimeout = setTimeout(finishLoading, 8000);

    return () => {
      window.removeEventListener('load', finishLoading);
      clearTimeout(safetyTimeout);
    };
  }, [onLoaded]);

  return (
    <div className={`fixed inset-0 z-[200] bg-black flex items-center justify-center transition-opacity duration-500 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-1/3 max-w-xs h-px bg-gray-800">
        <div
          className="h-px bg-white transition-all duration-[1800ms] ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}