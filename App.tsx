import { useEffect, useRef, useState } from 'react';
import UploadZone from './components/UploadZone';
import ProgressDisplay from './components/ProgressDisplay';
import DownloadSection from './components/DownloadSection';
import FeatureCards from './components/FeatureCards';
import FloatingLeaves from './components/FloatingLeaves';
import MangoTreeSVG from './components/MangoTreeSVG';
import usePdfConverter from './hooks/usePdfConverter';

const STEPS_WITH_LEAVES: Array<'uploading' | 'converting' | 'compressing'> = [
  'uploading',
  'converting',
  'compressing',
];

export default function App() {
  const { phase, progress, result, convert, reset } = usePdfConverter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showLeaves, setShowLeaves] = useState(false);
  const processingRef = useRef<HTMLDivElement>(null);

  const isProcessing = phase !== 'idle' && phase !== 'done' && phase !== 'error';
  const isDone = phase === 'done';

  // Scroll to processing section when it starts
  useEffect(() => {
    if (isProcessing || isDone) {
      setTimeout(() => {
        processingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [isProcessing, isDone]);

  // Show leaves during processing phases
  useEffect(() => {
    const active = STEPS_WITH_LEAVES.includes(phase as any);
    setShowLeaves(active);
  }, [phase]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    convert(files);
  };

  const handleReset = () => {
    reset();
    setSelectedFiles([]);
    setShowLeaves(false);
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #F1F8E9 0%, #FFFDE7 45%, #FFF3E0 100%)' }}
    >
      {/* Floating leaf particles during processing */}
      <FloatingLeaves active={showLeaves} />

      {/* Background decorative blobs */}
      <div
        className="bg-blob"
        style={{ width: 500, height: 500, background: '#4CAF50', top: -100, left: -150 }}
      />
      <div
        className="bg-blob"
        style={{ width: 400, height: 400, background: '#FFD93D', top: 200, right: -100 }}
      />
      <div
        className="bg-blob"
        style={{ width: 350, height: 350, background: '#FF6B35', bottom: 100, left: '30%' }}
      />

      {/* ═══════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════ */}
      <nav className="relative z-10 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-3xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>🥭</span>
          <span
            className="font-fredoka text-2xl tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #FF6B35, #FFD93D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Your Mango PDF
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-sm font-semibold" style={{ color: '#5D4037' }}>
          <a href="#features" className="hover:text-orange-500 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-orange-500 transition-colors">How It Works</a>
          <a
            href="#upload"
            className="btn-mango py-2 px-5 text-sm"
            style={{ padding: '8px 20px', fontSize: '0.875rem' }}
          >
            Try Free 🥭
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════ */}
      <section className="relative z-10 pt-8 pb-4 px-6 text-center max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
          style={{
            background: 'rgba(76,175,80,0.12)',
            border: '1.5px solid rgba(76,175,80,0.3)',
            color: '#2E7D32',
          }}
        >
          <span className="animate-pulse-soft">🌿</span>
          <span>Free • Fast • No Sign-Up Required</span>
          <span className="animate-pulse-soft">🌿</span>
        </div>

        {/* Main heading */}
        <h1
          className="font-fredoka leading-tight mb-4"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            color: '#1B5E20',
            letterSpacing: '-0.5px',
          }}
        >
          Convert JPG to PDF
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FF6B35 30%, #FFD93D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            with Your Mango PDF 🥭
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="max-w-2xl mx-auto font-medium mb-8 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#4E342E' }}
        >
          Fast, automatic <strong style={{ color: '#FF6B35' }}>60% PDF compression</strong> with high-quality output and a fresh, creative experience.
          Upload your JPGs and get a perfectly sized PDF in seconds — right from your browser.
        </p>

        {/* Stats pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: '⚡', text: 'Under 10 Seconds' },
            { icon: '🗜️', text: '60% Compression' },
            { icon: '🔒', text: '100% Private' },
            { icon: '🆓', text: 'Always Free' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{
                background: 'rgba(255,255,255,0.8)',
                border: '1.5px solid rgba(255,255,255,0.9)',
                color: '#3E2723',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <span>{stat.icon}</span>
              <span>{stat.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MAIN UPLOAD / PROCESSING AREA
      ════════════════════════════════════════════ */}
      <section id="upload" className="relative z-10 px-6 pb-16 max-w-5xl mx-auto">
        <div
          className="glass-card p-8 md:p-12"
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          {/* Idle state: Upload zone + tree SVG side by side */}
          {phase === 'idle' && (
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
              {/* Upload zone */}
              <div className="flex-shrink-0">
                <UploadZone onFilesSelected={handleFilesSelected} disabled={isProcessing} />
              </div>

              {/* Divider on desktop */}
              <div
                className="hidden lg:block self-stretch w-px"
                style={{ background: 'rgba(76,175,80,0.2)' }}
              />

              {/* Tree + tips */}
              <div className="flex flex-col items-center gap-6">
                <div className="animate-sway">
                  <MangoTreeSVG phase="idle" size={220} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-sm mb-3" style={{ color: '#2E7D32' }}>
                    📋 How it works
                  </p>
                  <div className="flex flex-col gap-2 text-left">
                    {[
                      { step: '1', text: 'Upload your JPG files', icon: '📤' },
                      { step: '2', text: 'We convert them to PDF', icon: '🔄' },
                      { step: '3', text: 'Auto-compress by 60%', icon: '🗜️' },
                      { step: '4', text: 'Download your PDF!', icon: '📥' },
                    ].map(item => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #4CAF50, #8BC34A)' }}
                        >
                          {item.step}
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#4E342E' }}>
                          {item.icon} {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Processing state */}
          {isProcessing && (
            <div ref={processingRef} className="flex flex-col items-center gap-8">
              {/* Animated growing tree */}
              <div
                className="relative"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                <MangoTreeSVG phase={phase as any} size={260} />

                {/* Processing ring */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ top: '10%' }}
                >
                  <svg width="280" height="280" viewBox="0 0 280 280" style={{ position: 'absolute' }}>
                    <circle
                      cx="140" cy="140" r="130"
                      stroke="rgba(76,175,80,0.15)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      cx="140" cy="140" r="130"
                      stroke="url(#progressGrad)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 130}`}
                      strokeDashoffset={`${2 * Math.PI * 130 * (1 - progress / 100)}`}
                      transform="rotate(-90 140 140)"
                      style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                    />
                    <defs>
                      <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4CAF50" />
                        <stop offset="50%" stopColor="#FFD93D" />
                        <stop offset="100%" stopColor="#FF6B35" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* File info */}
              {selectedFiles.length > 0 && (
                <div
                  className="flex flex-wrap justify-center gap-2"
                >
                  {selectedFiles.slice(0, 4).map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(76,175,80,0.1)', color: '#2E7D32', border: '1px solid rgba(76,175,80,0.2)' }}
                    >
                      <span>🖼️</span>
                      <span>{f.name.length > 18 ? f.name.substring(0, 15) + '...' : f.name}</span>
                    </div>
                  ))}
                  {selectedFiles.length > 4 && (
                    <div
                      className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35' }}
                    >
                      +{selectedFiles.length - 4} more
                    </div>
                  )}
                </div>
              )}

              <ProgressDisplay
                phase={phase}
                progress={progress}
                fileCount={selectedFiles.length}
              />
            </div>
          )}

          {/* Done state */}
          {isDone && (
            <div ref={processingRef} className="flex flex-col lg:flex-row items-center gap-10">
              {/* Completed tree */}
              <div className="flex-shrink-0 animate-float">
                <MangoTreeSVG phase="done" size={240} />
              </div>

              {/* Divider */}
              <div
                className="hidden lg:block self-stretch w-px"
                style={{ background: 'rgba(76,175,80,0.2)' }}
              />

              {/* Download section */}
              <div className="flex-1 w-full">
                <ProgressDisplay
                  phase={phase}
                  progress={100}
                  fileCount={selectedFiles.length}
                  originalSize={result?.originalSize}
                  compressedSize={result?.compressedSize}
                />
                <div className="mt-6">
                  <DownloadSection
                    pdfBlob={result?.blob ?? null}
                    onReset={handleReset}
                    originalSize={result?.originalSize}
                    compressedSize={result?.compressedSize}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {phase === 'error' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🥺</div>
              <h3 className="font-fredoka text-2xl mb-2" style={{ color: '#C62828' }}>
                Oops! Something went wrong
              </h3>
              <p className="text-gray-500 mb-6">
                The mango fell from the tree! Please try again with valid JPG files.
              </p>
              <button className="btn-green" onClick={handleReset}>
                🌱 Try Again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES SECTION
      ════════════════════════════════════════════ */}
      <section id="features" className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: 'rgba(255,107,53,0.1)', color: '#E64A19', border: '1.5px solid rgba(255,107,53,0.2)' }}
          >
            🌟 Why Your Mango PDF?
          </div>
          <h2
            className="font-fredoka mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1B5E20' }}
          >
            Fresh Features, Zero Fuss
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Everything you need to convert and compress your JPG files into perfect PDFs.
          </p>
        </div>
        <FeatureCards />
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS SECTION
      ════════════════════════════════════════════ */}
      <section id="how-it-works" className="relative z-10 px-6 py-16">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(76,175,80,0.08) 0%, rgba(255,217,61,0.1) 100%)',
            border: '1.5px solid rgba(76,175,80,0.2)',
          }}
        >
          <div className="text-center mb-10">
            <h2
              className="font-fredoka mb-2"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#1B5E20' }}
            >
              From Tree to PDF in 4 Steps 🌳
            </h2>
            <p className="text-gray-500 font-medium">Simple, fast, and naturally satisfying.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector arrows - desktop only */}
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="hidden lg:flex absolute items-center"
                style={{
                  top: '32px',
                  left: `calc(${(i + 1) * 25}% - 12px)`,
                  color: '#4CAF50',
                  fontSize: '20px',
                  zIndex: 5,
                }}
              >
                →
              </div>
            ))}

            {[
              {
                step: '01',
                icon: '📤',
                title: 'Upload JPGs',
                desc: 'Drag & drop or click to upload one or multiple JPG images.',
                color: '#4CAF50',
              },
              {
                step: '02',
                icon: '📄',
                title: 'Build PDF',
                desc: 'We stitch all your images together into a single, clean PDF document.',
                color: '#8BC34A',
              },
              {
                step: '03',
                icon: '🗜️',
                title: 'Compress 60%',
                desc: 'The PDF is intelligently compressed to ~40% of its original size — high quality, lower weight.',
                color: '#FFD93D',
              },
              {
                step: '04',
                icon: '📥',
                title: 'Download!',
                desc: 'Click the mango to pluck your freshly compressed PDF!',
                color: '#FF6B35',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="feature-card p-6 text-center relative"
                style={{ background: 'rgba(255,255,255,0.85)' }}
              >
                <div
                  className="absolute -top-3 left-4 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ background: item.color }}
                >
                  {item.step}
                </div>
                <div className="text-4xl mb-3 mt-2">{item.icon}</div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#2E3A20' }}>{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
      ════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-16 text-center max-w-3xl mx-auto">
        <div
          className="rounded-3xl p-12"
          style={{
            background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
            boxShadow: '0 20px 60px rgba(46,125,50,0.35)',
          }}
        >
          <div
            className="text-6xl mb-4"
            style={{ animation: 'mangoPulse 2s ease-in-out infinite' }}
          >
            🥭
          </div>
          <h2
            className="font-fredoka mb-3 text-white"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Ready to Pluck Your First PDF?
          </h2>
          <p className="text-green-100 mb-8 font-medium text-lg">
            It's free, it's fast, and it's fresh. No sign-up. No email. Just pure mango magic. 🌿
          </p>
          <a
            href="#upload"
            className="inline-flex items-center gap-3 btn-mango text-lg"
            style={{ padding: '16px 40px', fontSize: '1.1rem' }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>🥭</span>
            <span>Convert JPG to PDF Free</span>
            <span>→</span>
          </a>
          <p className="text-green-300 text-sm mt-4">
            ✓ No file size limit &nbsp;·&nbsp; ✓ Multiple files &nbsp;·&nbsp; ✓ 60% compression, high quality
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer className="relative z-10 px-6 py-10 border-t" style={{ borderColor: 'rgba(76,175,80,0.15)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥭</span>
            <span
              className="font-fredoka text-xl"
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #FFD93D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your Mango PDF
            </span>
          </div>

          {/* Center text */}
          <div className="text-center text-sm font-medium" style={{ color: '#8D6E63' }}>
            <p>🌿 Convert JPG to PDF &nbsp;·&nbsp; Compress by 60% &nbsp;·&nbsp; High Quality & Private</p>
            <p className="mt-1 text-xs text-gray-400">
              All processing happens locally in your browser. We never store your files.
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 text-sm font-semibold" style={{ color: '#6D4C41' }}>
            <span
              className="px-3 py-1 rounded-full text-xs"
              style={{ background: 'rgba(76,175,80,0.1)', color: '#2E7D32' }}
            >
              🌱 Eco-Friendly Processing
            </span>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-400">
          Made with 🥭 and 💚 · Your Mango PDF © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
