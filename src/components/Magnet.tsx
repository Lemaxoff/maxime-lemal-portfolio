import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type MagnetProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> & {
  children: ReactNode;
  disabled?: boolean;
  padding?: number;
  strength?: number;
  activeClass?: string;
  className?: string;
  style?: CSSProperties;
};

const Magnet = ({
  children,
  disabled = false,
  padding = 100,
  strength = 2,
  activeClass = '',
  className = '',
  style,
  ...props
}: MagnetProps) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
      return undefined;
    }

    const safeStrength = Math.max(Math.abs(strength), 0.01);
    const handleMouseMove = (event: MouseEvent) => {
      const element = magnetRef.current;
      if (!element) return;

      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = Math.abs(centerX - event.clientX);
      const distanceY = Math.abs(centerY - event.clientY);

      if (distanceX < width / 2 + padding && distanceY < height / 2 + padding) {
        setIsActive(true);
        setPosition({
          x: (event.clientX - centerX) / safeStrength,
          y: (event.clientY - centerY) / safeStrength,
        });
      } else {
        setIsActive(false);
        setPosition((current) => current.x === 0 && current.y === 0 ? current : { x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength, disabled]);

  return (
    <div
      {...props}
      ref={magnetRef}
      className={`${className} ${isActive ? activeClass : ''}`.trim()}
      style={{
        ...style,
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        transition: isActive ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
