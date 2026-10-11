import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import ShapeWavesCanvasFallback from './ShapeWavesCanvasFallback';
import type { ShapeWavesProps } from './ShapeWavesWebGPU';

export type { ShapeWavesProps } from './ShapeWavesWebGPU';

const ShapeWavesWebGPU = lazy(() => import('./ShapeWavesWebGPU'));

type NavigatorWithGPU = Navigator & {
  gpu?: { requestAdapter: () => Promise<unknown> };
};

export default function ShapeWaves(props: ShapeWavesProps) {
  const { onError, className } = props;
  const [gpuAvailable, setGpuAvailable] = useState(false);
  const [gpuFailed, setGpuFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const gpu = (navigator as NavigatorWithGPU).gpu;
    if (!gpu) return () => { active = false; };

    // The Canvas 2D layer is already animating while the optional adapter probe runs.
    void gpu.requestAdapter()
      .then(adapter => {
        if (active && adapter) setGpuAvailable(true);
      })
      .catch(() => {
        if (active) setGpuFailed(true);
      });

    return () => { active = false; };
  }, []);

  const handleGpuError = useCallback((error: Error) => {
    setGpuFailed(true);
    onError?.(error);
  }, [onError]);

  return (
    <div className="shape-waves-stack" aria-hidden="true">
      <ShapeWavesCanvasFallback {...props} className={`shape-waves--canvas ${className ?? ''}`} />
      {gpuAvailable && !gpuFailed && (
        <Suspense fallback={null}>
          <ShapeWavesWebGPU
            {...props}
            className={`shape-waves--webgpu ${className ?? ''}`}
            onError={handleGpuError}
          />
        </Suspense>
      )}
    </div>
  );
}
