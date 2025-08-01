import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  ShoppingCart, Heart, Star, Filter, X, Menu, Search, Download, Eye, Plus, Minus, 
  Sparkles, Crown, Book, Quote, ArrowRight, ChevronLeft, ChevronRight, Mail,
  Instagram, Facebook, Twitter, Play, Bookmark, Clock, User, MessageCircle
} from 'lucide-react';

// Sample books for demonstration (can be removed later)
const featuredBooks = [
  {
    id: 1,
    title: "Whispered Promises",
    author: "Isabella Rose",
    price: 12.99,
    rating: 4.8,
    reviews: 234,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    description: "A heartwarming tale of second chances and unexpected love...",
    genre: "Contemporary Romance",
    isFeatured: true,
    isNew: true
  },
  {
    id: 2,
    title: "Midnight in Tuscany",
    author: "Elena Moretti",
    price: 14.99,
    rating: 4.9,
    reviews: 156,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "Under the Italian stars, two hearts find their destiny...",
    genre: "Historical Romance",
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 3,
    title: "The Baker's Heart",
    author: "Sophie Chen",
    price: 11.99,
    rating: 4.7,
    reviews: 189,
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description: "Love rises like fresh bread in this sweet small-town romance...",
    genre: "Small Town Romance",
    isFeatured: true,
    isNew: false
  }
];

// Blog posts sample
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Romance Tropes That Never Get Old",
    excerpt: "From enemies to lovers to second chance romance, discover the beloved tropes that keep us turning pages...",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    author: "Romance Editorial Team",
    date: "December 15, 2024",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Creating the Perfect Reading Nook",
    excerpt: "Transform any corner of your home into a romantic reading sanctuary with these cozy design tips...",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    author: "Lifestyle Team",
    date: "December 12, 2024",
    readTime: "3 min read"
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    text: "Every book feels like a warm embrace. Isabella's characters live in my heart long after the last page.",
    author: "Sarah M.",
    rating: 5,
    book: "Whispered Promises"
  },
  {
    id: 2,
    text: "The perfect escape from reality. These stories remind me why I fell in love with romance.",
    author: "Emma K.",
    rating: 5,
    book: "Midnight in Tuscany"
  },
  {
    id: 3,
    text: "Beautiful writing, swoony heroes, and endings that make you believe in love again.",
    author: "Jessica R.",
    rating: 5,
    book: "The Baker's Heart"
  }
];

// Hook for managing application state
const useRomanceStore = () => {
  const [state, setState] = useState({
    currentPage: 'home',
    selectedBook: null,
    cart: [],
    showCart: false,
    searchQuery: '',
    currentTestimonial: 0,
    currentCarouselIndex: 0
  });

  const actions = useMemo(() => ({
    setCurrentPage: (page) => setState(prev => ({ ...prev, currentPage: page })),
    setSelectedBook: (book) => setState(prev => ({ ...prev, selectedBook: book, currentPage: 'book' })),
    addToCart: (book) => setState(prev => ({
      ...prev,
      cart: prev.cart.find(item => item.id === book.id) 
        ? prev.cart 
        : [...prev.cart, { ...book, quantity: 1 }]
    })),
    toggleCart: () => setState(prev => ({ ...prev, showCart: !prev.showCart })),
    setSearchQuery: (query) => setState(prev => ({ ...prev, searchQuery: query })),
    setCurrentTestimonial: (index) => setState(prev => ({ ...prev, currentTestimonial: index })),
    setCurrentCarouselIndex: (index) => setState(prev => ({ ...prev, currentCarouselIndex: index }))
  }), []);

  return { ...state, ...actions };
};

// Enhanced Header with warm, romantic design
const Header = ({ currentPage, setCurrentPage, cart, toggleCart, searchQuery, setSearchQuery }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-50 bg-cream-50/95 backdrop-blur-lg border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <Heart className="w-8 h-8 text-rose-500 group-hover:text-rose-600 transition-colors" />
              <div className="absolute inset-0 w-8 h-8 bg-rose-300/20 rounded-full blur group-hover:bg-rose-400/30 transition-colors"></div>
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent">
              Romance Reads
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { key: 'home', label: 'Home' },
              { key: 'books', label: 'Books' },
              { key: 'blog', label: 'Blog' },
              { key: 'about', label: 'About' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
                  currentPage === key
                    ? 'text-rose-700 bg-rose-50 border border-rose-200'
                    : 'text-gray-700 hover:text-rose-600 hover:bg-rose-25'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-xl border border-rose-100 p-4 z-50">
                  <input
                    type="text"
                    placeholder="Search for your next love story..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all group">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-rose-600"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-rose-100">
            <nav className="flex flex-col space-y-2">
              {['home', 'books', 'blog', 'about'].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg transition-colors capitalize ${
                    currentPage === page
                      ? 'text-rose-700 bg-rose-50'
                      : 'text-gray-700 hover:text-rose-600 hover:bg-rose-25'
                  }`}
                >
                  {page}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section with emotional appeal
const HeroSection = ({ setCurrentPage }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-cream-50 via-rose-25 to-rose-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-rose-500" />
              <span className="text-rose-700 font-medium tracking-wide uppercase text-sm">
                Where Hearts Find Home
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight">
              <span className="text-gray-800">Fall in Love with</span>
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 bg-clip-text text-transparent">
                Every Story
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Discover heartwarming tales that kindle passion, inspire hope, and remind you 
              that love conquers all. Each story is a journey to your happily ever after.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setCurrentPage('books')}
              className="group bg-gradient-to-r from-rose-500 to-rose-600 text-white px-8 py-4 rounded-full font-semibold hover:from-rose-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Explore Books</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="border-2 border-rose-300 text-rose-700 px-8 py-4 rounded-full font-semibold hover:bg-rose-50 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Trailer</span>
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center space-x-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-700">50K+</div>
              <div className="text-sm text-gray-600">Happy Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-700">500+</div>
              <div className="text-sm text-gray-600">Love Stories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-700">4.9★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Right content - Featured book showcase */}
        <div className="relative">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-300/30 to-rose-400/30 rounded-3xl blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="flex items-start space-x-6">
                <img 
                  src={featuredBooks[0].cover}
                  alt={featuredBooks[0].title}
                  className="w-32 h-48 object-cover rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                      {featuredBooks[0].title}
                    </h3>
                    <p className="text-rose-600 font-medium">by {featuredBooks[0].author}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({featuredBooks[0].reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {featuredBooks[0].description}
                  </p>
                  
                  <button className="bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-rose-600 transition-colors">
                    Read Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Books Carousel
const FeaturedBooksCarousel = ({ books, onBookSelect, currentIndex, setCurrentIndex }) => {
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-4">
            Featured <span className="text-rose-600">Love Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked tales that have captured hearts worldwide
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {books.map((book) => (
                <div key={book.id} className="w-full flex-shrink-0">
                  <div className="bg-gradient-to-br from-rose-25 to-rose-50 p-12 lg:p-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                      <div className="order-2 lg:order-1 space-y-6">
                        <div className="flex items-center space-x-3">
                          {book.isNew && (
                            <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              NEW RELEASE
                            </span>
                          )}
                          {book.isBestseller && (
                            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              BESTSELLER
                            </span>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-4xl font-serif font-bold text-gray-800 mb-3">
                            {book.title}
                          </h3>
                          <p className="text-xl text-rose-600 mb-4">by {book.author}</p>
                          <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {book.description}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-gray-600">({book.reviews} reviews)</span>
                          <span className="text-2xl font-bold text-rose-600">${book.price}</span>
                        </div>

                        <div className="flex space-x-4">
                          <button 
                            onClick={() => onBookSelect(book)}
                            className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors flex items-center space-x-2"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          <button className="border-2 border-rose-300 text-rose-700 px-8 py-3 rounded-full font-semibold hover:bg-rose-50 transition-colors">
                            Preview
                          </button>
                        </div>
                      </div>

                      <div className="order-1 lg:order-2 flex justify-center">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-rose-300/30 rounded-3xl blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                          <img 
                            src={book.cover}
                            alt={book.title}
                            className="relative w-80 h-[480px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {books.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-rose-500' : 'bg-rose-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = ({ testimonials, currentTestimonial, setCurrentTestimonial }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length, setCurrentTestimonial]);

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 to-rose-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
          What Readers Are <span className="text-rose-600">Saying</span>
        </h2>
        <p className="text-xl text-gray-600 mb-16">
          Join thousands of readers who've found their escape in our stories
        </p>

        <div className="relative">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <Quote className="w-12 h-12 text-rose-300 mx-auto mb-8" />
            
            <div className="space-y-6">
              <p className="text-2xl font-light text-gray-700 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                ))}
              </div>
              
              <div className="text-center">
                <p className="font-semibold text-gray-800">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="text-rose-600 text-sm">
                  Reader of "{testimonials[currentTestimonial].book}"
                </p>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-rose-500' : 'bg-rose-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Preview Section
const BlogPreviewSection = ({ posts }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-4">
            Romance <span className="text-rose-600">Chronicles</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive deeper into the world of romance with our latest articles and insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group bg-gradient-to-br from-cream-25 to-rose-25 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 group-hover:text-rose-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-rose-600 font-semibold hover:text-rose-700 flex items-center space-x-1 group">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-600 transition-colors">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-rose-600 to-rose-700 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-rose-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <Heart className="w-16 h-16 text-rose-200 mx-auto mb-8" />
            
            <h2 className="text-4xl font-serif font-bold mb-4">
              Never Miss a <span className="text-rose-200">Love Story</span>
            </h2>
            
            <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
              Join our community of romance lovers and be the first to discover new releases, 
              exclusive content, and special offers crafted just for you.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-6 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur text-white placeholder-rose-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:bg-rose-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Subscribe</span>
              </button>
            </form>

            <p className="text-sm text-rose-200 mt-4">
              Join 50,000+ readers who trust us with their inbox
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-rose-500" />
              <span className="text-2xl font-serif font-bold">Romance Reads</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Where every story is a journey to love, every character becomes family, 
              and every ending fills your heart with joy.
            </p>
            <div className="flex space-x-4">
              <button className="p-3 bg-gray-800 rounded-full hover:bg-rose-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="p-3 bg-gray-800 rounded-full hover:bg-rose-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-3 bg-gray-800 rounded-full hover:bg-rose-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Books', 'Authors', 'Genres', 'New Releases', 'Bestsellers'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-rose-400 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'FAQs', 'Returns', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-rose-400 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Romance Reads. Made with ❤️ for romance lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

// Book Detail Page
const BookDetailPage = ({ book, addToCart, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-cream-50 to-rose-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className="hover:text-rose-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => setCurrentPage('books')}
            className="hover:text-rose-600 transition-colors"
          >
            Books
          </button>
          <span>/</span>
          <span className="text-rose-600">{book.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Book Cover */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute inset-0 bg-rose-300/30 rounded-3xl blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
              <img 
                src={book.cover}
                alt={book.title}
                className="relative w-96 h-[600px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              {book.isNew && (
                <div className="absolute top-4 left-4">
                  <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    NEW RELEASE
                  </span>
                </div>
              )}
              {book.isBestseller && (
                <div className="absolute top-4 right-4">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    BESTSELLER
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-serif font-bold text-gray-800 mb-4 leading-tight">
                {book.title}
              </h1>
              <p className="text-2xl text-rose-600 font-medium mb-6">by {book.author}</p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-700">{book.rating}</span>
                  <span className="text-gray-500">({book.reviews} reviews)</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {book.description}
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-rose-100">
              <div className="flex items-center justify-between mb-6">
                <div className="text-4xl font-bold text-rose-600">${book.price}</div>
                <div className="text-sm text-gray-600">
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                    {book.genre}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => addToCart(book)}
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-full font-semibold hover:from-rose-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center space-x-2 border-2 border-rose-200 text-rose-700 py-3 rounded-full hover:bg-rose-50 hover:border-rose-300 transition-all">
                    <Download className="w-5 h-5" />
                    <span>Preview</span>
                  </button>
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex items-center justify-center space-x-2 border-2 py-3 rounded-full transition-all ${
                      isWishlisted 
                        ? 'bg-rose-500 border-rose-500 text-white' 
                        : 'border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-rose-100 overflow-hidden">
          <div className="border-b border-rose-100">
            <nav className="flex">
              {[
                { key: 'description', label: 'Description' },
                { key: 'reviews', label: 'Reviews' },
                { key: 'author', label: 'About Author' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                    activeTab === key
                      ? 'text-rose-600 bg-rose-50 border-b-2 border-rose-500'
                      : 'text-gray-600 hover:text-rose-600 hover:bg-rose-25'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {book.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                  esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {testimonials.filter(t => t.book === book.title).map((review) => (
                  <div key={review.id} className="bg-rose-25 rounded-2xl p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-800">{review.author}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">"{review.text}"</p>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'author' && (
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-rose-200 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-rose-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">{book.author}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Award-winning romance author known for creating heartwarming stories that capture 
                    the essence of true love. With over a dozen bestselling novels, they have touched 
                    the hearts of readers worldwide with tales of passion, hope, and happily ever afters.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Homepage Component
const Homepage = ({ store }) => {
  return (
    <div className="pt-16">
      <HeroSection setCurrentPage={store.setCurrentPage} />
      <FeaturedBooksCarousel 
        books={featuredBooks}
        onBookSelect={store.setSelectedBook}
        currentIndex={store.currentCarouselIndex}
        setCurrentIndex={store.setCurrentCarouselIndex}
      />
      <TestimonialsSection 
        testimonials={testimonials}
        currentTestimonial={store.currentTestimonial}
        setCurrentTestimonial={store.setCurrentTestimonial}
      />
      <BlogPreviewSection posts={blogPosts} />
      <NewsletterSection />
    </div>
  );
};

// Simple cart component
const Cart = ({ cart, showCart, toggleCart }) => {
  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={toggleCart}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-serif font-bold">Shopping Cart</h2>
            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-6">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img src={item.cover} alt={item.title} className="w-16 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function RomanceBookstore() {
  const store = useRomanceStore();

  return (
    <div className="min-h-screen bg-cream-50">
      <Header
        currentPage={store.currentPage}
        setCurrentPage={store.setCurrentPage}
        cart={store.cart}
        toggleCart={store.toggleCart}
        searchQuery={store.searchQuery}
        setSearchQuery={store.setSearchQuery}
      />

      {store.currentPage === 'home' && <Homepage store={store} />}
      
      {store.currentPage === 'book' && store.selectedBook && (
        <BookDetailPage 
          book={store.selectedBook}
          addToCart={store.addToCart}
          setCurrentPage={store.setCurrentPage}
        />
      )}
      
      <Footer />
      
      <Cart 
        cart={store.cart}
        showCart={store.showCart}
        toggleCart={store.toggleCart}
      />
    </div>
  );
}
