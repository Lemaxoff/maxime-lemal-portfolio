import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, Key, ReactNode } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

type LogoNodeItem = {
  node: ReactNode;
  title?: string;
  ariaLabel?: string;
  href?: string;
};

type LogoImageItem = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
};

export type LogoItem = LogoNodeItem | LogoImageItem;
export type LogoLoopDirection = 'left' | 'right' | 'up' | 'down';

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: LogoLoopDirection;
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

type ElementRef<T extends HTMLElement> = { current: T | null };

const toCssLength = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value ?? undefined;

const useAnimationLoop = (
  trackRef: ElementRef<HTMLDivElement>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const seqSize = isVertical ? seqHeight : seqWidth;
    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate: FrameRequestCallback = (timestamp) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

const LogoLoop = memo(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}: LogoLoopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';
  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? direction === 'up' ? 1 : -1
      : direction === 'left' ? 1 : -1;
    return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const sequenceRect = seqRef.current?.getBoundingClientRect();
    if (!container || !sequenceRect) return;

    const sequenceWidth = sequenceRect.width;
    const sequenceHeight = sequenceRect.height;
    if (isVertical) {
      const parentHeight = container.parentElement?.clientHeight ?? 0;
      if (parentHeight > 0 && container.style.height !== `${Math.ceil(parentHeight)}px`) {
        container.style.height = `${Math.ceil(parentHeight)}px`;
      }
      if (sequenceHeight > 0) {
        setSeqHeight((current) => current === Math.ceil(sequenceHeight) ? current : Math.ceil(sequenceHeight));
        const viewport = container.clientHeight || parentHeight || sequenceHeight;
        const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount((current) => current === Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded)
          ? current
          : Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    } else if (sequenceWidth > 0) {
      setSeqWidth((current) => current === Math.ceil(sequenceWidth) ? current : Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(container.clientWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount((current) => current === Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded)
        ? current
        : Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, [isVertical]);

  useEffect(() => {
    const container = containerRef.current;
    const sequence = seqRef.current;
    if (!container || !sequence) return undefined;

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateDimensions)
      : null;
    resizeObserver?.observe(container);
    resizeObserver?.observe(sequence);
    if (!resizeObserver) window.addEventListener('resize', updateDimensions);
    updateDimensions();

    const images = Array.from(sequence.querySelectorAll('img'));
    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages <= 0) updateDimensions();
    };
    images.forEach((image) => {
      if (image.complete) handleImageLoad();
      else {
        image.addEventListener('load', handleImageLoad, { once: true });
        image.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', updateDimensions);
      images.forEach((image) => {
        image.removeEventListener('load', handleImageLoad);
        image.removeEventListener('error', handleImageLoad);
      });
    };
  }, [logos, gap, logoHeight, isVertical, updateDimensions]);

  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const cssVariables = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
  }) as CSSProperties, [gap, logoHeight, fadeOutColor]);

  const rootClassName = useMemo(() => [
    'logoloop',
    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
    fadeOut && 'logoloop--fade',
    scaleOnHover && 'logoloop--scale-hover',
    className,
  ].filter(Boolean).join(' '), [isVertical, fadeOut, scaleOnHover, className]);

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);
  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const renderLogoItem = useCallback((item: LogoItem, key: Key) => {
    if (renderItem) {
      return (
        <li className="logoloop__item" key={key} role="listitem">
          {renderItem(item, key)}
        </li>
      );
    }

    const isNodeItem = 'node' in item;
    const content = isNodeItem ? (
      <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
        {item.node}
      </span>
    ) : (
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        width={item.width}
        height={item.height}
        alt={item.alt ?? ''}
        title={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
    const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
    const itemContent = item.href ? (
      <a
        className="logoloop__link"
        href={item.href}
        aria-label={itemAriaLabel || 'logo link'}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    ) : content;

    return (
      <li className="logoloop__item" key={key} role="listitem">
        {itemContent}
      </li>
    );
  }, [renderItem]);

  const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => (
    <ul
      className="logoloop__list"
      key={`copy-${copyIndex}`}
      role="list"
      aria-hidden={copyIndex > 0}
      ref={copyIndex === 0 ? seqRef : undefined}
    >
      {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
    </ul>
  )), [copyCount, logos, renderLogoItem]);

  const containerStyle = useMemo<CSSProperties>(() => ({
    width: isVertical
      ? toCssLength(width) === '100%' ? undefined : toCssLength(width)
      : toCssLength(width) ?? '100%',
    ...cssVariables,
    ...style,
  }), [width, cssVariables, style, isVertical]);

  return (
    <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
      <div className="logoloop__track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
