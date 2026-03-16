import { useState } from 'react';

interface DownloadSectionProps {
  pdfBlob: Blob | null;
  onReset: () => void;
  originalSize?: number;
  compressedSize?: number;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
  pdfBlob,
  onReset,
  originalSize,
  compressedSize,
}) => {
  const [isPlucking, setIsPlucking] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const formatSize = (bytes?: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compressionPct = originalSize && compressedSize
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 60;

  const handleDownload = () => {
    if (!pdfBlob || isPlucking) return;
    setIsPlucking(true);

    setTimeout(() => {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mango-pdf-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setIsPlucking(false);
    }, 1200);
  };

  return (
    <div
      className="w-full max-w-xl mx-auto rounded-3xl p-8 text-center animate-bounce-in"
      style={{
        background: 'linear-gradient(135deg, rgba(76,175,80,0.08) 0%, rgba(255,217,61,0.1) 50%, rgba(255,107,53,0.08) 100%)',
        border: '2px solid rgba(76,175,80,0.25)',
        boxShadow: '0 16px 48px rgba(76,175,80,0.12)',
      }}
    >
      {/* Mango pluck animation area */}
      <div className="relative h-32 flex items-center justify-center mb-4">
        {/* Tree branch */}
        <div
          className="absolute"
          style={{
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '18px',
            background: 'linear-gradient(90deg, #795548, #8D6E63)',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />

        {/* Hanging string */}
        {!isPlucking && (
          <div
            style={{
              position: 'absolute',
              top: '22px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '28px',
              background: '#795548',
              borderRadius: '2px',
            }}
          />
        )}

        {/* Mango fruit */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: isPlucking ? undefined : '42px',
            animation: isPlucking ? 'mangoDrop 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards' : 'mangoPulse 2s ease-in-out infinite',
            fontSize: '56px',
            filter: 'drop-shadow(0 8px 16px rgba(255,107,53,0.35))',
            cursor: 'pointer',
          }}
          onClick={handleDownload}
        >
          🥭
        </div>

        {/* Sparkles around mango */}
        {!isPlucking && !downloaded && (
          <>
            {[0, 1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="absolute text-sm pointer-events-none"
                style={{
                  top: `${30 + Math.sin(i * 72 * Math.PI / 180) * 35}px`,
                  left: `calc(50% + ${Math.cos(i * 72 * Math.PI / 180) * 45}px)`,
                  animation: `sparkle 1.5s ${i * 0.3}s ease-in-out infinite`,
                  opacity: 0,
                }}
              >
                {['✨', '⭐', '🌟', '💫', '✨'][i]}
              </div>
            ))}
          </>
        )}

        {/* Plucking effect particles */}
        {isPlucking && (
          <>
            {['🍃', '🌿', '🍂', '✨', '🌟'].map((emoji, i) => (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  top: '50%',
                  left: '50%',
                  fontSize: '18px',
                  animation: `leafDrift 1s ${i * 0.1}s ease-out forwards`,
                  transform: `translate(${(i - 2) * 30}px, -20px)`,
                }}
              >
                {emoji}
              </div>
            ))}
          </>
        )}
      </div>

      {/* Text content */}
      {downloaded ? (
        <div className="animate-bounce-in">
          <p className="font-fredoka text-2xl mb-1" style={{ color: '#2E7D32' }}>
            Enjoy your fresh PDF! 🎉
          </p>
          <p className="text-sm text-gray-500 mb-5">
            The mango has been plucked! Check your downloads.
          </p>
        </div>
      ) : (
        <>
          <p className="font-fredoka text-2xl mb-1" style={{ color: '#2E7D32' }}>
            {isPlucking ? 'Plucking your PDF...' : 'Your PDF is ready to pluck!'}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            {isPlucking ? '🥭 Harvesting from the tree...' : 'Click the mango or the button below to download'}
          </p>
        </>
      )}

      {/* Stats row */}
      {originalSize && compressedSize && (
        <div
          className="flex justify-center gap-4 mb-5 p-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.6)' }}
        >
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-0.5">Original</div>
            <div className="font-bold text-sm" style={{ color: '#FF6B35' }}>{formatSize(originalSize)}</div>
          </div>
          <div className="flex items-center" style={{ color: '#4CAF50', fontSize: '18px' }}>→</div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-0.5">Compressed</div>
            <div className="font-bold text-sm" style={{ color: '#4CAF50' }}>{formatSize(compressedSize)}</div>
          </div>
          <div className="flex items-center">
            <div
              className="px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: 'rgba(76,175,80,0.15)', color: '#2E7D32' }}
            >
              -{compressionPct}%
            </div>
          </div>
        </div>
      )}

      {/* Download button */}
      <button
        className="btn-mango w-full mb-3 flex items-center justify-center gap-2 animate-glow-pulse"
        onClick={handleDownload}
        disabled={isPlucking || !pdfBlob}
      >
        <span className="text-xl">{isPlucking ? '🥭' : '📥'}</span>
        <span>{isPlucking ? 'Plucking PDF...' : downloaded ? 'Download Again' : 'Download PDF'}</span>
      </button>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="w-full py-3 px-6 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
        style={{
          background: 'rgba(76,175,80,0.1)',
          color: '#2E7D32',
          border: '1.5px solid rgba(76,175,80,0.3)',
        }}
      >
        🌱 Convert Another File
      </button>
    </div>
  );
};

export default DownloadSection;
