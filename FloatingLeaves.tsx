import { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  x: number;
  emoji: string;
  duration: number;
  delay: number;
  size: number;
}

const LEAF_EMOJIS = ['🍃', '🌿', '🍂', '🌱', '🌾'];

const FloatingLeaves: React.FC<{ active?: boolean }> = ({ active = false }) => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    if (!active) {
      setLeaves([]);
      return;
    }

    const newLeaves: Leaf[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      emoji: LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)],
      duration: 2.5 + Math.random() * 2.5,
      delay: Math.random() * 2,
      size: 14 + Math.random() * 12,
    }));

    setLeaves(newLeaves);
  }, [active]);

  if (!active || leaves.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 50 }}
    >
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          style={{
            position: 'absolute',
            left: `${leaf.x}%`,
            top: '-40px',
            fontSize: `${leaf.size}px`,
            animation: `leafDrift ${leaf.duration}s ${leaf.delay}s ease-in forwards`,
          }}
        >
          {leaf.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingLeaves;
