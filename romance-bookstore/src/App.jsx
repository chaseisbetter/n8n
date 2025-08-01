import React, { useState, useMemo, useCallback } from 'react';
import { ShoppingCart, Heart, Star, Filter, X, Menu, Search, Download, Eye, Plus, Minus, Sparkles, Crown } from 'lucide-react';

// Empty books array - no books in the system
const mockBooks = [];

// Optimized state management
const useBookstore = () => {
  const [state, setState] = useState({
    cart: [],
    currentPage: 'home',
    selectedBook: null,
    showCart: false,
    searchQuery: '',
    filters: { genre: '', spiceLevel: '' },
    sortBy: 'popular'
  });

  const actions = useMemo(() => ({
    addToCart: (book) => setState(prev => ({
      ...prev,
      cart: prev.cart.find(item => item.id === book.id)
        ? prev.cart
        : [...prev.cart, { ...book, quantity: 1 }]
    })),

    removeFromCart: (bookId) => setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== bookId)
    })),

    updateQuantity: (bookId, quantity) => {
      if (quantity === 0) {
        actions.removeFromCart(bookId);
        return;
      }
      setState(prev => ({
        ...prev,
        cart: prev.cart.map(item => 
          item.id === bookId ? { ...item, quantity } : item
        )
      }));
    },

    setCurrentPage: (page) => setState(prev => ({ 
      ...prev, 
      currentPage: page, 
      selectedBook: null 
    })),

    setSelectedBook: (book) => setState(prev => ({ 
      ...prev, 
      selectedBook: book, 
      currentPage: 'book' 
    })),

    toggleCart: () => setState(prev => ({ 
      ...prev, 
      showCart: !prev.showCart 
    })),

    setSearchQuery: (query) => setState(prev => ({
      ...prev,
      searchQuery: query
    })),

    setFilters: (filters) => setState(prev => ({ 
      ...prev, 
      filters 
    })),

    setSortBy: (sortBy) => setState(prev => ({ 
      ...prev, 
      sortBy 
    }))
  }), []);

  return { ...state, ...actions };
};

// Search component
const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className={`relative transition-all duration-300 ${isExpanded ? 'w-80' : 'w-12'}`}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for forbidden desires..."
            className={`w-full bg-white/10 backdrop-blur border border-white/20 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0 w-0 pl-0 pr-0'
            }`}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => !searchQuery && setIsExpanded(false)}
          />
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute left-0 top-0 p-3 text-gray-300 hover:text-rose-400 hover:bg-white/5 rounded-full transition-all duration-300 group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        {isExpanded && searchQuery && (
          <button
            type="submit"
            className="ml-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            Search
          </button>
        )}
      </form>
    </div>
  );
};

// Updated Header with functional search
const Header = ({ cart, toggleCart, setCurrentPage, currentPage, searchQuery, setSearchQuery, onSearch }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-gray-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-3 text-2xl font-serif text-white hover:text-rose-400 transition-all duration-300"
          >
            <div className="relative">
              <Crown className="w-7 h-7 text-rose-500" />
              <div className="absolute inset-0 w-7 h-7 bg-rose-500/20 rounded-full blur animate-pulse"></div>
            </div>
            <span className="bg-gradient-to-r from-white via-rose-200 to-rose-300 bg-clip-text text-transparent font-bold tracking-wide">
              NOIR & DESIRE
            </span>
          </button>
          
          <nav className="hidden md:flex space-x-8">
            {['home', 'shop'].map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize font-medium transition-all duration-300 px-4 py-2 rounded-lg ${
                  currentPage === page 
                    ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20' 
                    : 'text-gray-300 hover:text-rose-400 hover:bg-white/5'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={onSearch}
            />
            <button className="p-3 text-gray-300 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-all duration-300 group">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={toggleCart}
              className="relative p-3 text-gray-300 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {showMobileMenu && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-gray-700">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {['home', 'shop'].map(page => (
              <button 
                key={page}
                onClick={() => { setCurrentPage(page); setShowMobileMenu(false); }}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-all duration-300 capitalize font-medium"
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// Empty state component
const EmptyBookGrid = ({ searchQuery }) => {
  return (
    <div className="text-center py-32">
      <div className="relative mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-500/20 to-red-500/20 rounded-full flex items-center justify-center">
          <Search className="w-12 h-12 text-rose-400" />
        </div>
        <div className="absolute inset-0 w-24 h-24 mx-auto bg-rose-500/10 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      <h3 className="text-3xl font-serif font-bold text-white mb-4">
        {searchQuery ? 'No Stories Found' : 'The Collection Awaits'}
      </h3>
      
      <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
        {searchQuery 
          ? `No forbidden tales match "${searchQuery}". Try a different search term.`
          : 'Our sinfully sophisticated collection is being curated. Soon, passionate stories will fill these digital shelves.'
        }
      </p>
      
      {searchQuery && (
        <button 
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105"
        >
          Clear Search
        </button>
      )}
    </div>
  );
};

// Updated Homepage without books
const Homepage = ({ setCurrentPage, searchQuery, onSearch }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-rose-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-500/5 to-red-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-10">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-rose-400" />
                <div className="absolute inset-0 w-6 h-6 bg-rose-400/30 rounded-full blur animate-pulse"></div>
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-rose-400 opacity-90">
                Sinfully Sophisticated Collection
              </span>
            </div>
            
            <h1 className="text-7xl font-serif font-bold leading-tight mb-10">
              <span className="text-white">Unleash Your</span>
              <br />
              <span className="bg-gradient-to-r from-rose-400 via-red-400 to-rose-500 bg-clip-text text-transparent">
                Dark Desires
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
              Dive into a world where passion knows no bounds. Our collection is being carefully curated to bring you stories that will leave you breathless, craving more with every stolen glance and forbidden touch.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => setCurrentPage('shop')}
                className="bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white px-10 py-5 rounded-2xl font-bold hover:from-rose-600 hover:via-red-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-rose-500/25 text-lg tracking-wide"
              >
                EXPLORE COLLECTION
              </button>
              <button className="border-2 border-rose-500/50 text-rose-400 px-10 py-5 rounded-2xl font-bold hover:bg-rose-500/10 hover:border-rose-400 transition-all transform hover:scale-105 backdrop-blur-sm text-lg tracking-wide">
                COMING SOON
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results or Empty State */}
      {searchQuery && (
        <section className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EmptyBookGrid searchQuery={searchQuery} />
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-500/10 to-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-rose-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-red-500/5"></div>
            <div className="relative">
              <div className="relative mb-8">
                <Sparkles className="w-16 h-16 text-rose-400 mx-auto" />
                <div className="absolute inset-0 w-16 h-16 bg-rose-400/20 rounded-full blur-xl mx-auto animate-pulse"></div>
              </div>
              <h2 className="text-5xl font-serif font-bold text-white mb-6">
                Join the 
                <span className="bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent"> Inner Circle</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Be the first to know when our forbidden collection launches. Get exclusive early access and intimate author secrets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email to begin..."
                  className="flex-1 px-8 py-5 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 bg-white/5 backdrop-blur text-white placeholder-gray-400 text-lg"
                />
                <button className="bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white px-10 py-5 rounded-2xl font-bold hover:from-rose-600 hover:via-red-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-rose-500/25 text-lg tracking-wide">
                  NOTIFY ME
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Updated Shop page with empty state
const ShopPage = ({ searchQuery, filters, setFilters, sortBy, setSortBy }) => {
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/10 sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-bold text-white flex items-center space-x-3">
                  <Filter className="w-6 h-6 text-rose-400" />
                  <span>Refine Search</span>
                </h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-8">
                <div className="text-center text-gray-400">
                  <p className="text-sm">Filters will be available when our collection launches.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
              <div>
                <h1 className="text-6xl font-serif font-bold text-white mb-4">
                  Collection 
                  <span className="bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent"> Coming Soon</span>
                </h1>
                <p className="text-gray-300 text-xl">Our passionate stories are being curated</p>
              </div>
              
              <div className="flex items-center space-x-6 mt-6 sm:mt-0">
                <button 
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center space-x-3 bg-white/5 backdrop-blur border border-white/20 px-6 py-4 rounded-2xl hover:bg-white/10 transition-all text-white font-medium"
                >
                  <Filter className="w-5 h-5 text-rose-400" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <EmptyBookGrid searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated Cart Drawer
const CartDrawer = ({ cart, showCart, toggleCart, updateQuantity, removeFromCart }) => {
  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl border-l border-gray-200">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/80">
            <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-rose-500" />
              <span>Shopping Cart</span>
            </h2>
            <button 
              onClick={toggleCart} 
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Books will appear here when our collection launches!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function RomanceBookstore() {
  const store = useBookstore();
  
  const handleSearch = useCallback((query) => {
    console.log('Searching for:', query);
    // Search functionality is implemented but returns no results since mockBooks is empty
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Header 
        cart={store.cart}
        toggleCart={store.toggleCart}
        setCurrentPage={store.setCurrentPage}
        currentPage={store.currentPage}
        searchQuery={store.searchQuery}
        setSearchQuery={store.setSearchQuery}
        onSearch={handleSearch}
      />
      
      {store.currentPage === 'home' && (
        <Homepage 
          setCurrentPage={store.setCurrentPage}
          searchQuery={store.searchQuery}
          onSearch={handleSearch}
        />
      )}
      
      {store.currentPage === 'shop' && (
        <ShopPage 
          searchQuery={store.searchQuery}
          filters={store.filters}
          setFilters={store.setFilters}
          sortBy={store.sortBy}
          setSortBy={store.setSortBy}
        />
      )}
      
      <CartDrawer 
        cart={store.cart}
        showCart={store.showCart}
        toggleCart={store.toggleCart}
        updateQuantity={store.updateQuantity}
        removeFromCart={store.removeFromCart}
      />
    </div>
  );
}
