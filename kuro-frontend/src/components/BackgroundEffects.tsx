import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Primary glow */}
      <div 
        className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full blur-[100px] opacity-20"
        style={{ 
          animation: 'backgroundFloat 10s ease-in-out infinite'
        }}
      />
      
      {/* Secondary glow */}
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] opacity-10"
        style={{ 
          animation: 'backgroundFloat 12s ease-in-out infinite reverse'
        }}
      />
      
      {/* Accent glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[90px] opacity-10"
        style={{ 
          animation: 'backgroundPulse 8s ease-in-out infinite'
        }}
      />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.03]"
      />

      <style>
        {`
          @keyframes backgroundFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
          }
          
          @keyframes backgroundPulse {
            0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.1); }
          }
        `}
      </style>
    </div>
  );
};

export default BackgroundEffects; 