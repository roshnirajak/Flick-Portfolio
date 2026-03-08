import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/about/page';
import NotFoundPage from './components/NotFoundPage';
import './globals.css';
import { VideoHoverProvider } from './contexts/VideoHoverContext';

function App() {
  return (
    <VideoHoverProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </VideoHoverProvider>
  )
}

export default App