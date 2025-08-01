import React, { useState, useCallback, memo } from 'react';
import { ShoppingCart, Heart, Star, Download, User, X } from 'lucide-react';

// Optimized Image component (could be shared)
const OptimizedImage = memo(({ src, alt, className, width, height, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => setHasError(true), []);

  if (hasError) {
    return (
      <div className={`bg-rose-100 flex items-center justify-center ${className}`} {...props}>
        <Heart className="w-8 h-8 text-rose-300" />
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && (
        <div className={`absolute inset-0 bg-rose-100 animate-pulse ${className}`} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        width={width}
        height={height}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
});

const TESTIMONIALS = [
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

const BookDetailPage = memo(({ book, addToCart, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted(prev => !prev);
  }, []);

  const handleAddToCart = useCallback(() => {
    addToCart(book);
  }, [addToCart, book]);

  const handleBreadcrumbClick = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'author', label: 'About Author' }
  ];

  const bookReviews = TESTIMONIALS.filter(t => t.book === book.title);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-cream-50 to-rose-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button 
            onClick={() => handleBreadcrumbClick('home')}
            className="hover:text-rose-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => handleBreadcrumbClick('books')}
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
              <OptimizedImage 
                src={book.cover}
                alt={book.title}
                className="relative w-96 h-[600px] object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                width={384}
                height={600}
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
                  onClick={handleAddToCart}
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
                    onClick={handleWishlistToggle}
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
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
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
                {bookReviews.map((review) => (
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
});

export default BookDetailPage;