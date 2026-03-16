import React from 'react';

export type ProcessPhase = 'idle' | 'uploading' | 'converting' | 'compressing' | 'done' | 'error';

interface Step {
  id: ProcessPhase;
  label: string;
  emoji: string;
  desc: string;
}

const STEPS: Step[] = [
  { id: 'uploading', label: 'Uploading', emoji: '📤', desc: 'Reading your JPG files...' },
  { id: 'converting', label: 'Converting', emoji: '🔄', desc: 'Building your PDF document...' },
  { id: 'compressing', label: 'Compressing', emoji: '🗜️', desc: 'Optimising quality, squeezing by 60%...' },
  { id: 'done', label: 'Ready!', emoji: '✅', desc: 'Your PDF is fresh off the tree!' },
];

const phaseIndex = (phase: ProcessPhase) => STEPS.findIndex(s => s.id === phase);

interface ProgressDisplayProps {
  phase: ProcessPhase;
  progress: number;
  fileCount?: number;
  originalSize?: number;
  compressedSize?: number;
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  phase,
  progress,
  fileCount = 0,
  originalSize,
  compressedSize,
}) => {
  const currentIdx = phaseIndex(phase);

  const formatSize = (bytes?: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const saved = originalSize && compressedSize
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : null;

  return (
    <div className="w-full max-w-xl mx-auto animate-slide-up">
      {/* Steps */}
      <div className="flex items-center justify-between mb-6 relative">
        {/* Connector line */}
        <div
          className="absolute top-6 left-6 right-6 h-1 rounded-full"
          style={{ background: 'rgba(76,175,80,0.15)', zIndex: 0 }}
        />
        <div
          className="absolute top-6 left-6 h-1 rounded-full transition-all duration-700"
          style={{
            background: 'linear-gradient(90deg, #4CAF50, #FFD93D, #FF6B35)',
            width: currentIdx >= 0 ? `${(currentIdx / (STEPS.length - 1)) * (100 - 12)}%` : '0%',
            right: 'auto',
            zIndex: 1,
          }}
        />

        {STEPS.map((step, i) => {
          const isActive = step.id === phase;
          // isDone kept for potential future use
          const isPast = currentIdx > i;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center gap-1.5 relative"
              style={{ zIndex: 2 }}
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl
                  transition-all duration-500 font-bold
                  ${isActive
                    ? 'scale-125 shadow-lg animate-pulse-soft'
                    : isPast
                      ? 'scale-110 shadow-md'
                      : 'scale-100 opacity-40'
                  }
                `}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #FF6B35, #FFD93D)'
                    : isPast
                      ? 'linear-gradient(135deg, #4CAF50, #8BC34A)'
                      : 'rgba(200,200,200,0.4)',
                  border: isActive ? '3px solid rgba(255,107,53,0.3)' : 'none',
                  boxShadow: isActive ? '0 0 20px rgba(255,107,53,0.4)' : undefined,
                }}
              >
                {step.emoji}
              </div>
              <span
                className={`text-xs font-bold tracking-wide transition-all duration-300 ${isActive ? 'text-orange-500' : isPast ? 'text-green-600' : 'text-gray-400'}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Current status message */}
      {phase !== 'done' && phase !== 'error' && (
        <div
          className="rounded-2xl p-4 mb-4 text-center"
          style={{ background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#FF6B35' }}
            />
            <p className="font-bold text-sm" style={{ color: '#2E7D32' }}>
              {STEPS.find(s => s.id === phase)?.desc || 'Processing...'}
            </p>
          </div>
          {fileCount > 0 && (
            <p className="text-xs text-gray-500">
              {fileCount} file{fileCount > 1 ? 's' : ''} • Stay fresh, almost done! 🥭
            </p>
          )}
        </div>
      )}

      {/* Progress bar */}
      {phase !== 'done' && phase !== 'error' && (
        <div className="mb-4">
          <div className="flex justify-between text-xs font-semibold mb-1.5" style={{ color: '#6D4C41' }}>
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: '10px', background: 'rgba(76,175,80,0.15)' }}
          >
            <div
              className="h-full rounded-full progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Done state */}
      {phase === 'done' && (
        <div
          className="rounded-2xl p-5 text-center animate-bounce-in"
          style={{
            background: 'linear-gradient(135deg, rgba(76,175,80,0.1), rgba(255,217,61,0.1))',
            border: '2px solid rgba(76,175,80,0.3)',
          }}
        >
          <div className="text-4xl mb-2" style={{ animation: 'mangoPulse 2s ease-in-out infinite' }}>🥭</div>
          <p className="font-fredoka text-xl mb-1" style={{ color: '#2E7D32' }}>
            PDF is ready to pluck!
          </p>

          {originalSize && compressedSize && (
            <div className="mt-3 flex justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold" style={{ color: '#FF6B35' }}>{formatSize(originalSize)}</div>
                <div className="text-xs text-gray-500">Original</div>
              </div>
              <div className="text-center text-2xl" style={{ color: '#4CAF50' }}>→</div>
              <div className="text-center">
                <div className="font-bold" style={{ color: '#4CAF50' }}>{formatSize(compressedSize)}</div>
                <div className="text-xs text-gray-500">Compressed</div>
              </div>
              {saved !== null && (
                <>
                  <div className="text-center text-2xl" style={{ color: '#4CAF50' }}>🎉</div>
                  <div className="text-center">
                    <div className="font-bold" style={{ color: '#388E3C' }}>{saved}% saved</div>
                    <div className="text-xs text-gray-500">Compression</div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {phase === 'error' && (
        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: 'rgba(244,67,54,0.08)', border: '1px solid rgba(244,67,54,0.2)' }}
        >
          <p className="text-2xl mb-1">😔</p>
          <p className="font-bold" style={{ color: '#C62828' }}>Something went wrong!</p>
          <p className="text-sm text-gray-500">Please try again with a valid JPG file</p>
        </div>
      )}
    </div>
  );
};

export default ProgressDisplay;
