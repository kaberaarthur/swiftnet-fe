import React from 'react';

const DarkContainer = () => {
  return (
    <div 
      className="min-h-screen p-8 flex items-center justify-center"
      style={{ backgroundColor: '#0f172a' }}
    >
      <div 
        className="max-w-2xl w-full rounded-lg shadow-2xl p-8 border"
        style={{ 
          backgroundColor: '#1e293b',
          borderColor: '#334155'
        }}
      >
        <h1 
          className="text-4xl font-bold mb-6 text-center"
          style={{ color: '#f1f5f9' }}
        >
          Welcome to the Dark Side
        </h1>
        
        <p 
          className="text-lg leading-relaxed mb-6"
          style={{ color: '#cbd5e1' }}
        >
          This is a beautifully designed dark theme container component. The design 
          uses carefully selected hex colors to create a modern, sleek appearance 
          that's easy on the eyes and perfect for dark mode interfaces.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div 
            className="p-4 rounded-md border"
            style={{ 
              backgroundColor: '#334155',
              borderColor: '#475569'
            }}
          >
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: '#e2e8f0' }}
            >
              Feature One
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Elegant dark theme with custom hex colors for perfect brand alignment.
            </p>
          </div>
          
          <div 
            className="p-4 rounded-md border"
            style={{ 
              backgroundColor: '#334155',
              borderColor: '#475569'
            }}
          >
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: '#e2e8f0' }}
            >
              Feature Two
            </h3>
            <p style={{ color: '#94a3b8' }}>
              Responsive design that works perfectly on all device sizes.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            style={{ 
              backgroundColor: '#3b82f6',
              color: '#ffffff'
            }}
            onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
            }}
            onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
            }}
          >
            Get Started
          </button>
        </div>
        
        <div 
          className="mt-8 p-4 rounded-md border-l-4"
          style={{ 
            backgroundColor: '#1a2332',
            borderLeftColor: '#10b981'
          }}
        >
          <p 
            className="text-sm"
            style={{ color: '#a7f3d0' }}
          >
            💡 <strong>Pro Tip:</strong> This component uses hex codes for colors 
            instead of Tailwind's color classes, giving you complete control over 
            your brand colors while still leveraging Tailwind's utility classes 
            for layout and spacing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DarkContainer;