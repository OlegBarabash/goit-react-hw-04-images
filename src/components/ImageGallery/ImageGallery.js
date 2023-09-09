import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal }) => {
  if (!images.length) {
    return;
  }
  return (
    <GalleryList>
      <ImageGalleryItem imagesItems={images} handelModal={openModal} />
    </GalleryList>
  );
};
