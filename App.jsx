const { useState, useMemo, useEffect } = React;

// CONFIGURAÇÃO CENTRAL DA TAG DE AFILIADO AMAZON
const AFFILIATE_TAG = "giosbuysimple-20";

const CATEGORIES = [
  { id: 'all', name: 'All Recommendations' },
  { id: 'electronics', name: 'Tech & Electronics' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'fitness', name: 'Fitness & Wellness' },
  { id: 'beauty', name: 'Beauty & Personal Care' }
];

const PRODUCTS = [
  {
    id: '1',
    title: 'Apple AirPods Pro (2nd Generation)',
    category: 'electronics',
    price: 189.99,
    originalPrice: 249.00,
    rating: 4.7,
    reviews: 14230,
    badge: 'Top Pick',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80',
    whyWeLoveIt: 'Industry-leading Active Noise Cancellation and adaptive audio experience.',
    asin: 'B0CHWRXM8U'
  },
  {
    id: '2',
    title: 'Anker Magnetic Power Bank 10,000mAh',
    category: 'electronics',
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviews: 8900,
    badge: 'Best Value',
    image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=600&q=80',
    whyWeLoveIt: 'Sleek MagSafe compatibility with fast charging for all modern smartphones.',
    asin: 'B099F55866'
  },
  {
    id: '3',
    title: 'COSRX Snail Mucin 96% Power Essence',
    category: 'beauty',
    price: 14.99,
    originalPrice: 25.00,
    rating: 4.8,
    reviews: 67400,
    badge: 'Viral Favorite',
    image: 'https://images.unsplash.com/photo-1608248597261-833244709123?auto=format&fit=crop&w=600&q=80',
    whyWeLoveIt: 'Deeply hydrates and repairs damaged skin barriers without heaviness.',
    asin: 'B00PBX3L7K'
  },
  {
    id: '4',
    title: 'Ninja Air Fryer Pro 4-in-1',
    category: 'home',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 32100,
    badge: 'Kitchen Must-Have',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80',
    whyWeLoveIt: 'Quick, healthy meals with minimal oil and easy dishwasher-safe cleanup.',
    asin: 'B07FDJMC99'
  },
  {
    id: '5',
    title: 'Theragun Mini Massage Gun',
    category: 'fitness',
    price: 159.00,
    originalPrice: 199.00,
    rating: 4.6,
    reviews: 5400,
    badge: 'Compact & Powerful',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
    whyWeLoveIt: 'Ultra-portable muscle recovery solution that easily fits in your gym bag.',
    asin: 'B0874LNK6H'
  },
  {
    id: '6',
    title: 'Stanley Quencher H2.0 Tumbler 40oz',
    category: 'home',
    price: 45.00,
    originalPrice: 45.00,
    rating: 4.7,
    reviews: 28900,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    whyWeLoveIt: 'Keeps drinks ice-cold all day long with a car-cup-holder compatible base.',
    asin: 'B0BQZW5M2R'
  }
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [selectedCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.whyWeLoveIt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getAmazonUrl = (asin) => {
    return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Gio’s <span className="text-indigo-600">BuySimple</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Simple Picks. Better Buys.</p>
          </div>

          <div className="w-full sm:w-80">
            <input
              type="text"
              placeholder="Search recommended products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto py-2 flex gap-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-900 flex items-start gap-3">
          <span className="font-bold text-indigo-600 uppercase tracking-wide">FTC Disclosure:</span>
          <span>
            As an Amazon Associate, Gio’s BuySimple earns from qualifying purchases. We independently select and review products we love.
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <div className="relative aspect-square bg-slate-100">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-2">
                      ★ {product.rating} <span className="text-slate-400 font-normal">({product.reviews.toLocaleString()} reviews)</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-slate-600 text-xs mb-4 line-clamp-2">{product.whyWeLoveIt}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-slate-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <a
                    href={getAmazonUrl(product.asin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    View on Amazon ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-3">
          <p className="font-bold text-slate-700">Gio’s BuySimple © {new Date().getFullYear()}</p>
          <p className="max-w-xl mx-auto text-[11px] leading-relaxed">
            Gio’s BuySimple participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
