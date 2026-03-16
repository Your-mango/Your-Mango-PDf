import React from 'react';

interface MangoTreeSVGProps {
  phase?: 'idle' | 'uploading' | 'converting' | 'compressing' | 'done';
  size?: number;
}

const MangoTreeSVG: React.FC<MangoTreeSVGProps> = ({ phase = 'idle', size = 300 }) => {
  const showMangos = phase === 'converting' || phase === 'compressing' || phase === 'done';
  const showGlow = phase === 'done';
  const isGrowing = phase === 'uploading' || phase === 'converting' || phase === 'compressing';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="tree-svg"
      style={{ overflow: 'visible' }}
    >
      {/* Glow effect for done state */}
      {showGlow && (
        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD93D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFD93D" stopOpacity="0" />
          </radialGradient>
        </defs>
      )}
      {showGlow && (
        <ellipse cx="150" cy="160" rx="140" ry="130" fill="url(#glowGrad)" />
      )}

      {/* Shadow */}
      <ellipse cx="150" cy="308" rx="55" ry="10" fill="rgba(0,0,0,0.12)" />

      {/* Trunk */}
      <g style={{
        transformOrigin: '150px 300px',
        animation: isGrowing ? 'treeGrow 0.6s ease-out forwards' : undefined
      }}>
        {/* Main trunk */}
        <path
          d="M138 300 L142 220 Q145 195 150 185 Q155 195 158 220 L162 300 Z"
          fill="#6D4C41"
        />
        {/* Trunk details */}
        <path d="M143 260 Q146 250 143 240" stroke="#5D4037" strokeWidth="1.5" fill="none" />
        <path d="M157 270 Q154 258 157 248" stroke="#5D4037" strokeWidth="1.5" fill="none" />
        {/* Roots */}
        <path d="M138 298 Q128 295 122 300" stroke="#6D4C41" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M162 298 Q172 295 178 300" stroke="#6D4C41" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M145 300 Q140 297 135 302" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M155 300 Q160 297 165 302" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>

      {/* Main branches */}
      <g style={{
        transformOrigin: '150px 185px',
        animation: isGrowing ? 'branchSpread 0.5s 0.3s ease-out both' : undefined
      }}>
        {/* Left branch */}
        <path d="M148 185 Q120 170 90 155" stroke="#5D4037" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M130 175 Q110 160 88 145" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Right branch */}
        <path d="M152 185 Q180 170 210 155" stroke="#5D4037" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M170 175 Q190 160 212 145" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Top branch */}
        <path d="M150 183 Q150 160 148 135" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Sub branches */}
        <path d="M88 145 Q75 130 65 118" stroke="#795548" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M88 145 Q80 125 85 108" stroke="#795548" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M212 145 Q225 130 235 118" stroke="#795548" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M212 145 Q220 125 215 108" stroke="#795548" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M148 135 Q135 118 128 100" stroke="#795548" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M148 135 Q162 118 170 100" stroke="#795548" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      {/* Foliage clusters */}
      <g style={{
        transformOrigin: '150px 140px',
        animation: isGrowing ? 'leafBurst 0.7s 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both' : undefined
      }}>
        {/* Back layer leaves - darker */}
        <ellipse cx="150" cy="120" rx="72" ry="58" fill="#388E3C" />
        <ellipse cx="80" cy="125" rx="52" ry="42" fill="#388E3C" />
        <ellipse cx="220" cy="125" rx="52" ry="42" fill="#388E3C" />
        <ellipse cx="115" cy="95" rx="45" ry="38" fill="#388E3C" />
        <ellipse cx="185" cy="95" rx="45" ry="38" fill="#388E3C" />

        {/* Mid layer */}
        <ellipse cx="150" cy="105" rx="65" ry="52" fill="#4CAF50" />
        <ellipse cx="85" cy="115" rx="48" ry="38" fill="#4CAF50" />
        <ellipse cx="215" cy="115" rx="48" ry="38" fill="#4CAF50" />
        <ellipse cx="115" cy="85" rx="42" ry="35" fill="#4CAF50" />
        <ellipse cx="185" cy="85" rx="42" ry="35" fill="#4CAF50" />

        {/* Top bright layer */}
        <ellipse cx="150" cy="90" rx="58" ry="46" fill="#66BB6A" />
        <ellipse cx="95" cy="100" rx="42" ry="34" fill="#66BB6A" />
        <ellipse cx="205" cy="100" rx="42" ry="34" fill="#66BB6A" />
        <ellipse cx="120" cy="72" rx="38" ry="30" fill="#66BB6A" />
        <ellipse cx="180" cy="72" rx="38" ry="30" fill="#66BB6A" />

        {/* Highlight spots */}
        <ellipse cx="135" cy="75" rx="25" ry="20" fill="#81C784" opacity="0.6" />
        <ellipse cx="165" cy="80" rx="22" ry="18" fill="#81C784" opacity="0.5" />
        <ellipse cx="100" cy="90" rx="20" ry="16" fill="#81C784" opacity="0.5" />
        <ellipse cx="200" cy="90" rx="20" ry="16" fill="#81C784" opacity="0.5" />

        {/* Leaf details - small leaf shapes */}
        <path d="M95 80 Q105 68 118 72 Q108 82 95 80Z" fill="#A5D6A7" opacity="0.7" />
        <path d="M182 68 Q194 58 205 64 Q195 74 182 68Z" fill="#A5D6A7" opacity="0.7" />
        <path d="M138 58 Q148 46 160 52 Q150 62 138 58Z" fill="#A5D6A7" opacity="0.7" />
      </g>

      {/* Mangos - only show in later phases */}
      {showMangos && (
        <g>
          {/* Mango 1 - left */}
          <g style={{ animation: 'mangoGrow 0.5s 0.1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both', transformOrigin: '88px 138px' }}>
            <path d="M88 128 Q96 115 104 120 Q110 128 104 140 Q96 150 85 145 Q76 138 88 128Z" fill="#FFB300" />
            <path d="M88 128 Q93 120 98 122 Q102 128 98 136 Q93 142 87 140 Q82 136 88 128Z" fill="#FFD93D" opacity="0.7" />
            <path d="M92 115 Q94 108 90 113" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="93" cy="118" rx="6" ry="4" fill="#4CAF50" transform="rotate(-20 93 118)" />
          </g>

          {/* Mango 2 - right */}
          <g style={{ animation: 'mangoGrow 0.5s 0.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) both', transformOrigin: '212px 138px' }}>
            <path d="M212 128 Q220 115 228 120 Q234 128 228 140 Q220 150 209 145 Q200 138 212 128Z" fill="#FF8F00" />
            <path d="M212 128 Q217 120 222 122 Q226 128 222 136 Q217 142 211 140 Q206 136 212 128Z" fill="#FFB300" opacity="0.7" />
            <path d="M216 115 Q218 108 214 113" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="217" cy="118" rx="6" ry="4" fill="#4CAF50" transform="rotate(-20 217 118)" />
          </g>

          {/* Mango 3 - top center */}
          <g style={{ animation: 'mangoGrow 0.5s 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both', transformOrigin: '152px 88px' }}>
            <path d="M152 78 Q160 65 168 70 Q174 78 168 90 Q160 100 149 95 Q140 88 152 78Z" fill="#FF6B35" />
            <path d="M152 78 Q157 70 162 72 Q166 78 162 86 Q157 92 151 90 Q146 86 152 78Z" fill="#FFB300" opacity="0.7" />
            <path d="M156 65 Q158 58 154 63" stroke="#388E3C" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="157" cy="68" rx="6" ry="4" fill="#388E3C" transform="rotate(-20 157 68)" />
          </g>

          {/* Small mango 4 */}
          <g style={{ animation: 'mangoGrow 0.5s 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both', transformOrigin: '118px 105px' }}>
            <path d="M118 98 Q124 88 130 92 Q134 98 130 107 Q124 114 115 110 Q110 104 118 98Z" fill="#FFB300" />
            <path d="M118 98 Q122 92 126 94 Q129 98 126 105 Q122 109 117 107 Q113 104 118 98Z" fill="#FFD93D" opacity="0.6" />
            <path d="M121 88 Q123 83 120 87" stroke="#4CAF50" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>

          {/* Small mango 5 */}
          <g style={{ animation: 'mangoGrow 0.5s 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both', transformOrigin: '183px 108px' }}>
            <path d="M183 101 Q189 91 195 95 Q199 101 195 110 Q189 117 180 113 Q175 107 183 101Z" fill="#FF8F00" />
            <path d="M183 101 Q187 95 191 97 Q194 101 191 108 Q187 112 182 110 Q178 107 183 101Z" fill="#FFB300" opacity="0.6" />
            <path d="M186 91 Q188 86 185 90" stroke="#388E3C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </g>
        </g>
      )}

      {/* Done state sparkles */}
      {showGlow && (
        <g>
          <g style={{ animation: 'sparkle 1.2s 0s ease-in-out infinite' }}>
            <path d="M50 80 L53 73 L56 80 L63 83 L56 86 L53 93 L50 86 L43 83 Z" fill="#FFD93D" />
          </g>
          <g style={{ animation: 'sparkle 1.2s 0.4s ease-in-out infinite' }}>
            <path d="M245 70 L248 63 L251 70 L258 73 L251 76 L248 83 L245 76 L238 73 Z" fill="#FF6B35" />
          </g>
          <g style={{ animation: 'sparkle 1.2s 0.8s ease-in-out infinite' }}>
            <path d="M150 30 L153 23 L156 30 L163 33 L156 36 L153 43 L150 36 L143 33 Z" fill="#4CAF50" />
          </g>
        </g>
      )}
    </svg>
  );
};

export default MangoTreeSVG;
