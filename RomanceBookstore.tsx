import React, { useState, useMemo, useCallback } from 'react';
import { ShoppingCart, Heart, Star, Filter, X, Menu, Search, Download, Eye, Plus, Minus, Sparkles, Crown } from 'lucide-react';

// Optimized mock data with better imagery
const mockBooks = [
  {
    id: 1,
    title: "Forbidden Desires",
    author: "Emma Rose",
    price: 4.99,
    genre: "Forbidden Romance",
    rating: 4.8,
    reviews: 234,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center",
    description: "When Isabella meets her brother's best friend at a wedding, sparks fly in the most forbidden way possible. A tale of passion that breaks all the rules, set against the backdrop of Italian vineyards and stolen moments.",
    tropes: ["Forbidden Love", "Best Friend's Sister", "Wedding Romance", "Age Gap"],
    spiceLevel: 4,
    blurb: "A forbidden attraction that ignites at the worst possible moment...",
    isNew: true,
    isBestseller: false
  },
  {
    id: 2,
    title: "The Billionaire's Secret",
    author: "Sophia Knight",
    price: 5.99,
    genre: "Billionaire Romance",
    rating: 4.6,
    reviews: 189,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center",
    description: "CEO Alexander Grey has a secret that could destroy everything. But when he meets his new assistant, he's willing to risk it all for a chance at love.",
    tropes: ["Billionaire Hero", "Office Romance", "Secret Identity", "Boss/Employee"],
    spiceLevel: 3,
    blurb: "Power, passion, and secrets that could change everything...",
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    title: "Dark Temptation",
    author: "Raven Black",
    price: 6.99,
    genre: "Dark Romance",
    rating: 4.9,
    reviews: 445,
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop&crop=center",
    description: "In the shadows of the city, dangerous love blooms between a crime lord and the woman who could be his salvation or his destruction.",
    tropes: ["Dark Hero", "Enemies to Lovers", "Mafia Romance", "Morally Gray"],
    spiceLevel: 5,
    blurb: "Love and danger intertwined in the most seductive way...",
    isNew: false,
    isBestseller: true
  },
  {
    id: 4,
    title: "Only One Bed",
    author: "Luna Hayes",
    price: 3.99,
    genre: "Contemporary Romance",
    rating: 4.7,
    reviews: 312,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center",
    description: "A weekend getaway goes wrong when rival colleagues are forced to share the last hotel room in town. With only one bed.",
    tropes: ["Only One Bed", "Enemies to Lovers", "Forced Proximity", "Workplace Romance"],
    spiceLevel: 3,
    blurb: "One room, one bed, two people who can't stand each other...",
    isNew: true,
    isBestseller: false
  },
  {
    id: 5,
    title: "Grumpy Sunshine Love",
    author: "Daisy Miller",
    price: 4.49,
    genre: "Contemporary Romance",
    rating: 4.5,
    reviews: 278,
    cover: "https://images.unsplash.com/photo-1535905557558-afc4877cdf3f?w=400&h=600&fit=crop&crop=center",
    description: "Sunshine bakery owner meets grumpy bookstore owner next door. Opposites attract in the sweetest way possible.",
    tropes: ["Grumpy x Sunshine", "Neighbors", "Small Town", "Slow Burn"],
    spiceLevel: 2,
    blurb: "When sunshine meets storm clouds, magic happens...",
    isNew: false,
    isBestseller: false
  },
  {
    id: 6,
    title: "Royal Affair",
    author: "Victoria Crown",
    price: 7.99,
    genre: "Royal Romance",
    rating: 4.8,
    reviews: 156,
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center",
    description: "A commoner's life changes forever when she catches the eye of a mysterious prince. But royal love comes with royal consequences.",
    tropes: ["Royal Hero", "Secret Identity", "Class Difference", "Fish Out of Water"],
    spiceLevel: 3,
    blurb: "Crown jewels and stolen kisses in a forbidden royal romance...",
    isNew: true,
    isBestseller: true
  }
];

// Optimized state management
const useBookstore = () => {
  const [state, setState] = useState({
    cart: [],
    currentPage: 'home',
    selectedBook: null,
    showCart: false,
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

// Optimized components with better styling
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    new: 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white',
    bestseller: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white',
    spice: 'bg-gradient-to-r from-rose-400 to-pink-500 text-white'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const StarRating = ({ rating, size = 'sm' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star 
          key={i} 
          className={`${sizes[size]} ${
            i < Math.floor(rating) 
              ? 'text-amber-400 fill-current' 
              : 'text-gray-300'
          }`} 
        />
      ))}
    </div>
  );
};

const SpiceLevel = ({ level, size = 'sm' }) => {
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };
  
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`${sizes[size]} ${i < level ? 'text-rose-500' : 'text-gray-300'}`}>
          🌶️
        </span>
      ))}
    </div>
  );
};

const Header = ({ cart, toggleCart, setCurrentPage, currentPage }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 text-2xl font-serif text-rose-900 hover:text-rose-700 transition-colors"
          >
            <Crown className="w-6 h-6" />
            <span>Blush & Bind</span>
          </button>
          
          <nav className="hidden md:flex space-x-8">
            {['home', 'shop'].map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize font-medium transition-colors ${
                  currentPage === page 
                    ? 'text-rose-900 border-b-2 border-rose-500' 
                    : 'text-gray-700 hover:text-rose-700'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
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
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-rose-100">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {['home', 'shop'].map(page => (
              <button 
                key={page}
                onClick={() => { setCurrentPage(page); setShowMobileMenu(false); }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors capitalize"
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

const BookCard = ({ book, onBookClick, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
          onClick={() => onBookClick(book)}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {book.isNew && <Badge variant="new">NEW</Badge>}
          {book.isBestseller && (
            <Badge variant="bestseller" className="flex items-center space-x-1">
              <span>🔥</span>
              <span>BESTSELLER</span>
            </Badge>
          )}
        </div>

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
            <button 
              onClick={() => onBookClick(book)}
              className="flex-1 bg-white/90 backdrop-blur text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-white transition-all flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onAddToCart(book); }}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{book.blurb}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StarRating rating={book.rating} />
            <span className="text-sm text-gray-600">({book.reviews})</span>
          </div>
          <SpiceLevel level={book.spiceLevel} />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            ${book.price}
          </span>
          <Badge className="text-xs">{book.genre}</Badge>
        </div>
      </div>
    </div>
  );
};

const Homepage = ({ books, onBookClick, onAddToCart, setCurrentPage }) => {
  const featuredBook = books.find(book => book.isBestseller) || books[0];
  const categories = [...new Set(books.map(book => book.genre))];
  
  const categoryIcons = {
    'Forbidden Romance': '🚫',
    'Billionaire Romance': '💰',
    'Dark Romance': '🖤',
    'Contemporary Romance': '💕',
    'Royal Romance': '👑'
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-rose-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-rose-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-2 text-rose-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Premium Romance Collection</span>
              </div>
              
              <h1 className="text-6xl font-serif font-bold text-gray-900 leading-tight">
                Discover Your Next
                <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Romantic Escape
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
                Indulge in steamy stories, forbidden love, and happily ever afters. 
                Your next book boyfriend is just one click away.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => setCurrentPage('shop')}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Shop Collection
                </button>
                <button className="border-2 border-rose-500 text-rose-500 px-8 py-4 rounded-xl font-semibold hover:bg-rose-50 transition-all transform hover:scale-105">
                  Browse Free Samples
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative group">
                <img 
                  src={featuredBook.cover} 
                  alt={featuredBook.title}
                  className="w-80 h-[500px] object-cover rounded-2xl shadow-2xl mx-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
                  <h3 className="font-serif text-xl font-bold text-gray-900">{featuredBook.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {featuredBook.author}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="bestseller" className="flex items-center space-x-1">
                      <span>🔥</span>
                      <span>Featured</span>
                    </Badge>
                    <StarRating rating={featuredBook.rating} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Promo Banner */}
      <section className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white py-4 overflow-hidden">
        <div className="animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-semibold flex items-center justify-center space-x-2">
              <span className="animate-bounce">🔥</span>
              <span>Limited Time: 3 for 2 on all Steamy Series! Use code STEAM3</span>
              <span className="animate-bounce">🔥</span>
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Explore by Mood
            </h2>
            <p className="text-xl text-gray-600">Find your perfect match from our curated collections</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setCurrentPage('shop')}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="aspect-square bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200/20 to-purple-200/20 group-hover:scale-110 transition-transform duration-500"></div>
                  <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category] || '💎'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-gray-900 text-center group-hover:text-rose-600 transition-colors">
                    {category}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter with gradient background */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 via-rose-50 to-pink-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-rose-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
            <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-6" />
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Never Miss a Steamy Release
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Get exclusive previews, author interviews, and special deals delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white/80 backdrop-blur"
              />
              <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ShopPage = ({ books, onBookClick, onAddToCart, filters, setFilters, sortBy, setSortBy }) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const genres = useMemo(() => [...new Set(books.map(book => book.genre))], [books]);
  
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      if (filters.genre && book.genre !== filters.genre) return false;
      if (filters.spiceLevel && book.spiceLevel < parseInt(filters.spiceLevel)) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest': return b.id - a.id;
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return b.reviews - a.reviews;
      }
    });
  }, [books, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-rose-500" />
                  <span>Filters</span>
                </h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Genre</label>
                  <select 
                    value={filters.genre} 
                    onChange={(e) => setFilters({...filters, genre: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white/80 backdrop-blur"
                  >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Spice Level</label>
                  <div className="space-y-2">
                    {[1,2,3,4,5].map(level => (
                      <button
                        key={level}
                        onClick={() => setFilters({...filters, spiceLevel: level.toString()})}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                          filters.spiceLevel === level.toString()
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <SpiceLevel level={level} />
                          <span className="text-sm font-medium">
                            {['Sweet', 'Warm', 'Hot', 'Steamy', 'Scorching'][level-1]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setFilters({ genre: '', spiceLevel: '' })}
                  className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Romance Collection</h1>
                <p className="text-gray-600 text-lg">{filteredAndSortedBooks.length} books available</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button 
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center space-x-2 bg-white/80 backdrop-blur border border-gray-200 px-4 py-3 rounded-xl hover:bg-white transition-all"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white/80 backdrop-blur"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onBookClick={onBookClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookPage = ({ book, onAddToCart, cart }) => {
  const [activeTab, setActiveTab] = useState('description');
  const isInCart = cart.some(item => item.id === book.id);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Book Cover */}
          <div className="flex justify-center">
            <div className="relative group">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-96 h-[600px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {book.isNew && <Badge variant="new">NEW RELEASE</Badge>}
                {book.isBestseller && (
                  <Badge variant="bestseller" className="flex items-center space-x-1">
                    <span>🔥</span>
                    <span>BESTSELLER</span>
                  </Badge>
                )}
              </div>
              
              <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">{book.title}</h1>
              <p className="text-2xl text-gray-600 mb-6">by {book.author}</p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <StarRating rating={book.rating} size="md" />
                  <span className="text-xl font-semibold text-gray-700">{book.rating}</span>
                  <span className="text-gray-500">({book.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-lg font-medium text-gray-700">Spice Level:</span>
                <SpiceLevel level={book.spiceLevel} size="md" />
                <span className="text-sm text-gray-600 font-medium">
                  {['Sweet', 'Warm', 'Hot', 'Steamy', 'Scorching'][book.spiceLevel-1]}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-2xl border border-rose-100">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Perfect if you love:</h3>
              <div className="flex flex-wrap gap-3">
                {book.tropes.map(trope => (
                  <span key={trope} className="bg-gradient-to-r from-rose-200 to-pink-200 text-rose-900 px-4 py-2 rounded-full text-sm font-semibold">
                    {trope}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-8">
                <span className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  ${book.price}
                </span>
                <Badge className="text-sm px-4 py-2">{book.genre}</Badge>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => onAddToCart(book)}
                  disabled={isInCart}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
                    isInCart 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isInCart ? 'Already in Cart ✓' : 'Add to Cart 🛒'}
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center space-x-2 border-2 border-gray-200 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all transform hover:scale-105">
                    <Download className="w-5 h-5" />
                    <span className="font-medium">Preview</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 border-2 border-rose-200 text-rose-600 py-3 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all transform hover:scale-105">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Wishlist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-semibold text-lg capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-xl leading-relaxed">{book.description}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <StarRating rating={5} />
                    <span className="font-bold text-gray-900 text-lg">Amazing read!</span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    "Couldn't put it down! The chemistry between the characters was absolutely perfect. 
                    The perfect amount of steam and romance. Highly recommend!"
                  </p>
                  <p className="text-sm text-gray-500 font-medium">- BookLover23 ⭐</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <StarRating rating={4} />
                    <span className="font-bold text-gray-900 text-lg">Great storyline</span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    "Love the tropes and the writing style. The author really knows how to build tension!"
                  </p>
                  <p className="text-sm text-gray-500 font-medium">- RomanceReader 📚</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ cart, showCart, toggleCart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
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
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">Add some steamy reads to get started!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 bg-white/60 backdrop-blur p-4 rounded-2xl shadow-sm border border-gray-100">
                    <img src={item.cover} alt={item.title} className="w-16 h-24 object-cover rounded-lg shadow-md" />
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{item.author}</p>
                      <p className="text-sm font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center hover:from-gray-200 hover:to-gray-300 transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center hover:from-rose-200 hover:to-pink-200 transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4 bg-white/80">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-bold hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg text-lg">
                Proceed to Checkout 🔥
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function RomanceBookstore() {
  const store = useBookstore();
  
  return (
    <div className="min-h-screen bg-white">
      <Header 
        cart={store.cart}
        toggleCart={store.toggleCart}
        setCurrentPage={store.setCurrentPage}
        currentPage={store.currentPage}
      />
      
      {store.currentPage === 'home' && (
        <Homepage 
          books={mockBooks}
          onBookClick={store.setSelectedBook}
          onAddToCart={store.addToCart}
          setCurrentPage={store.setCurrentPage}
        />
      )}
      
      {store.currentPage === 'shop' && (
        <ShopPage 
          books={mockBooks}
          onBookClick={store.setSelectedBook}
          onAddToCart={store.addToCart}
          filters={store.filters}
          setFilters={store.setFilters}
          sortBy={store.sortBy}
          setSortBy={store.setSortBy}
        />
      )}
      
      {store.currentPage === 'book' && store.selectedBook && (
        <BookPage 
          book={store.selectedBook}
          onAddToCart={store.addToCart}
          cart={store.cart}
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