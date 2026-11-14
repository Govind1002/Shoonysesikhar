import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import CategoryPage from './pages/CategoryPage';
import AboutUs from './pages/AboutUs';
import Videos from './pages/Videos';
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:id" element={<ArticleDetail />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/search" element={<SearchPage />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center py-24 text-center px-4">
                  <p className="text-6xl mb-4">📰</p>
                  <h1 className="text-2xl font-bold text-gray-700 mb-2">पृष्ठ नहीं मिला</h1>
                  <p className="text-gray-500 mb-4">आप जिस पृष्ठ को खोज रहे हैं वह उपलब्ध नहीं है।</p>
                  <a href="/" className="text-[#C0392B] hover:underline font-semibold">← होम पर जाएं</a>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}
