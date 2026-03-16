import { useCallback, useRef, useState } from 'react';

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFilesSelected, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files).filter(
      f => f.type === 'image/jpeg' || f.type === 'image/jpg' || f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg')
    );
    if (files.length > 0) onFilesSelected(files);
  }, [disabled, onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      f => f.type === 'image/jpeg' || f.type === 'image/jpg' || f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg')
    );
    if (files.length > 0) onFilesSelected(files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [onFilesSelected]);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Tree-shaped upload zone using clip-path + decorative shape */}
      <div
        className={`upload-zone relative cursor-pointer select-none ${isDragging ? 'drag-over' : ''}`}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
      >
        {/* Tree canopy shape */}
        <div
          className="relative flex flex-col items-center justify-center"
          style={{
            width: '340px',
          }}
        >
          {/* Canopy - triangle-based tree shape */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: '300px',
              height: '220px',
              background: isDragging
                ? 'linear-gradient(160deg, rgba(76,175,80,0.18) 0%, rgba(255,107,53,0.12) 100%)'
                : hovered
                  ? 'linear-gradient(160deg, rgba(76,175,80,0.12) 0%, rgba(255,217,61,0.1) 100%)'
                  : 'linear-gradient(160deg, rgba(76,175,80,0.07) 0%, rgba(255,217,61,0.07) 100%)',
              borderRadius: '50% 50% 40% 40% / 35% 35% 65% 65%',
              border: isDragging
                ? '3px dashed #FF6B35'
                : '2.5px dashed #4CAF50',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Inner content */}
            <div className="flex flex-col items-center gap-3 text-center px-6">
              {/* Mango icon */}
              <div
                className={`text-5xl transition-transform duration-300 ${isDragging ? 'scale-125' : hovered ? 'scale-110' : 'animate-float'}`}
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' }}
              >
                🥭
              </div>

              {isDragging ? (
                <div className="animate-bounce-in">
                  <p className="font-fredoka text-xl" style={{ color: '#FF6B35' }}>
                    Drop your JPG here!
                  </p>
                  <p className="text-sm font-semibold" style={{ color: '#FF8F00' }}>
                    Release to upload 🌿
                  </p>
                </div>
              ) : (
                <>
                  <p className="font-bold text-lg leading-tight" style={{ color: '#2E7D32' }}>
                    Drop your JPG files here
                  </p>
                  <p className="text-sm font-medium" style={{ color: '#6D4C41' }}>
                    or click to browse
                  </p>
                  <div
                    className="mt-1 px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(76,175,80,0.12)', color: '#388E3C' }}
                  >
                    JPG / JPEG only
                  </div>
                </>
              )}
            </div>

            {/* Floating leaf decorations */}
            <div
              className="absolute -top-3 -left-3 text-lg"
              style={{ animation: 'floatSlow 3s ease-in-out infinite', animationDelay: '0s' }}
            >🍃</div>
            <div
              className="absolute -top-2 -right-4 text-base"
              style={{ animation: 'floatSlow 3.5s ease-in-out infinite', animationDelay: '0.5s' }}
            >🌿</div>
            <div
              className="absolute -bottom-2 -left-5 text-sm"
              style={{ animation: 'floatSlow 4s ease-in-out infinite', animationDelay: '1s' }}
            >🍂</div>
            <div
              className="absolute -bottom-1 -right-3 text-base"
              style={{ animation: 'floatSlow 3.2s ease-in-out infinite', animationDelay: '1.5s' }}
            >🍃</div>
          </div>

          {/* Trunk */}
          <div
            style={{
              width: '24px',
              height: '48px',
              background: 'linear-gradient(180deg, #795548, #6D4C41)',
              borderRadius: '4px 4px 6px 6px',
              marginTop: '-4px',
              boxShadow: '2px 0 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
            }}
          />

          {/* Roots */}
          <div className="flex gap-2" style={{ marginTop: '-2px' }}>
            <div style={{
              width: '36px', height: '10px',
              background: 'linear-gradient(90deg, transparent, #795548)',
              borderRadius: '50%',
              transform: 'rotate(-10deg) translateY(-2px)',
              opacity: 0.7
            }} />
            <div style={{
              width: '40px', height: '10px',
              background: 'linear-gradient(180deg, #795548, transparent)',
              borderRadius: '50%',
              transform: 'translateY(2px)',
              opacity: 0.7
            }} />
            <div style={{
              width: '36px', height: '10px',
              background: 'linear-gradient(270deg, transparent, #795548)',
              borderRadius: '50%',
              transform: 'rotate(10deg) translateY(-2px)',
              opacity: 0.7
            }} />
          </div>
        </div>

        {/* Drag overlay sparkles */}
        {isDragging && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute pointer-events-none text-lg"
                style={{
                  top: `${15 + (i % 3) * 30}%`,
                  left: `${10 + (i % 2) * 75}%`,
                  animation: `sparkle 0.8s ${i * 0.15}s ease-in-out infinite`,
                  opacity: 0,
                }}
              >
                {['✨', '🌟', '⭐'][i % 3]}
              </div>
            ))}
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,image/jpeg"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />

      {/* Helper text */}
      <p className="mt-4 text-sm font-medium text-center" style={{ color: '#8D6E63' }}>
        Supports multiple JPG files • All processed securely in your browser
      </p>
    </div>
  );
};

export default UploadZone;
