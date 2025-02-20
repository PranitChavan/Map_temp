import { StrictMode, useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const App = () => {
  const [zoom, setZoom] = useState(3);

  const handleWheel = useCallback((e: any) => {
    // Only handle zoom when Ctrl is pressed
    e.preventDefault();
    const zoomFactor = 0.07;

    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(20, prev + zoomFactor));
    } else {
      setZoom((prev) => Math.max(1, prev - zoomFactor));
    }
  }, []);

  return (
    <APIProvider apiKey={'AIzaSyBY-GyMiDZuR7sAi2Ip6-isDotl5KqvtrY'}>
      <div onWheel={handleWheel} style={{ width: '100vw', height: '100vh' }}>
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          zoom={zoom}
          gestureHandling={'cooperative'}
          disableDefaultUI={false}
          options={{
            scrollwheel: true, // Re-enable default scroll
            zoomControl: true,
            minZoom: 1,
            maxZoom: 20,
          }}
        />
      </div>
    </APIProvider>
  );
};

export default App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
