import React, { memo, useState, useCallback } from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';

// Optimized Image component
const OptimizedImage = memo(({ src, alt, className, width, height, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => setHasError(true), []);

  if (hasError) {
    return (
      <div className={`bg-rose-100 flex items-center justify-center ${className}`} {...props}>
        <div className="text-rose-300 text-center">
          <div className="text-2xl mb-2">📚</div>
          <div className="text-sm">Image not available</div>
        </div>
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

const BlogPreviewSection = memo(({ posts }) => {
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
                <OptimizedImage 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  width={600}
                  height={256}
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
});

export default BlogPreviewSection;