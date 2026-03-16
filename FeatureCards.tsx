import React from 'react';

const features = [
  {
    emoji: '⚡',
    title: 'Lightning Fast',
    desc: 'Convert your JPG files to PDF in seconds. No waiting, no delays.',
    color: '#FFD93D',
    bg: 'rgba(255,217,61,0.1)',
    border: 'rgba(255,217,61,0.3)',
  },
  {
    emoji: '🗜️',
    title: '60% Compression',
    desc: 'We intelligently shrink your PDF by ~60% while preserving sharp, high-quality images.',
    color: '#FF6B35',
    bg: 'rgba(255,107,53,0.08)',
    border: 'rgba(255,107,53,0.25)',
  },
  {
    emoji: '🔒',
    title: 'Secure & Private',
    desc: 'All processing happens right in your browser. Files never leave your device.',
    color: '#4CAF50',
    bg: 'rgba(76,175,80,0.08)',
    border: 'rgba(76,175,80,0.25)',
  },
  {
    emoji: '📥',
    title: 'Easy Download',
    desc: 'One click to download your freshly compressed PDF. Clean and simple.',
    color: '#8BC34A',
    bg: 'rgba(139,195,74,0.1)',
    border: 'rgba(139,195,74,0.3)',
  },
  {
    emoji: '🖼️',
    title: 'Multi-Image',
    desc: 'Combine multiple JPG files into a single clean PDF document effortlessly.',
    color: '#FF8F00',
    bg: 'rgba(255,143,0,0.08)',
    border: 'rgba(255,143,0,0.25)',
  },
  {
    emoji: '🌿',
    title: 'No Sign-Up Needed',
    desc: 'Just upload and convert. No accounts, no emails, no fuss. Always free.',
    color: '#2E7D32',
    bg: 'rgba(46,125,50,0.08)',
    border: 'rgba(46,125,50,0.2)',
  },
];

const FeatureCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((f, i) => (
        <div
          key={i}
          className="feature-card p-6 rounded-2xl"
          style={{
            background: f.bg,
            border: `1px solid ${f.border}`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
            style={{ background: `rgba(255,255,255,0.8)`, boxShadow: `0 4px 12px ${f.border}` }}
          >
            {f.emoji}
          </div>
          <h3 className="font-bold text-lg mb-2" style={{ color: '#2E3A20' }}>
            {f.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#5D4E37' }}>
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
