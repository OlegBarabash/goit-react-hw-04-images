import { ImageItem, StyledImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imagesItems, handelModal }) => {
  return imagesItems.map(({ id, webformatURL, largeImageURL, tags }) => (
    <ImageItem key={id} onClick={() => handelModal({ largeImageURL, tags })}>
      <StyledImage src={webformatURL} alt={tags} />
    </ImageItem>
  ));
};
