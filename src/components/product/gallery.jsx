import { forwardRef } from 'react';
import ImageGallery from 'react-image-gallery';
import clsx from 'clsx';

import 'react-image-gallery/styles/css/image-gallery.css';

const isFullscreen = () => typeof window !== 'undefined' && !window.screenTop && !window.screenY;

function Item(item) {
  const {
    original: src,
    originalAlt: alt,
    originalHeight,
    originalWidth,
    sizes,
  } = item;
  const fullScreen = isFullscreen();

  return (
    <div
      className={clsx(
        'w-full h-full relative flex justify-center',
        { 'max-h-screen': fullScreen }
      )}
    >
      <img
        className={clsx(
          'relative object-contain',
          fullScreen ? 'max-h-[90vh]' : 'max-h-80',
          fullScreen ? 'max-w-full' : 'max-w-xs',
          fullScreen ? 'w-full' : 'w-80',
          fullScreen ? 'h-auto' : 'h-80'
        )}
        src={src}
        alt={alt}
        sizes={sizes}
        width={`${originalWidth}`}
        height={`${originalHeight}`}
        layout="fill"
      />
    </div>
  );
}

const Gallery = forwardRef((props, ref) => {
  const {
    main,
    images = [],
  } = props;
  const gallery = [main, ...images].map((image) => ({
    original: image.sourceUrl,
    thumbnail: image.thumbnailUrl,
    originalWidth: image.mediaDetails?.width,
    originalHeight: image.mediaDetails?.height,
    originalAlt: image.altText,
    thumbnailAlt: image.altText,
    srcSet: image.srcSet,
    sizes: image.sizes,
  }));

  const startIndex = gallery.findIndex(({ original }) => original === main.sourceUrl);

  return (
    <div className="w-full min-h-[6rem]">
      <ImageGallery
        ref={ref}
        renderItem={Item}
        items={gallery}
        startIndex={startIndex}
        showBullets
        showNav={false}
        showPlayButton={false}
      />
    </div>
  );
});

export default Gallery;
