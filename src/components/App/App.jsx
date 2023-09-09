import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppSection } from './App,styled';
import { fetchPictures } from '../../services/request';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPics, setTotalPics] = useState(0);
  const [loading, setLoading] = useState(false);
  const [largeImageData, setlargeImageData] = useState({
    largeImageURL: '',
    tags: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const getQuery = () => {
      return query
        .split('')
        .slice(query.indexOf('/') + 1)
        .join('');
    };

    if (getQuery().trim() === '') {
      return;
    }

    async function getPictures() {
      try {
        setLoading(true);

        const resp = await fetchPictures(getQuery(), page);
        setTotalPics(resp.data.totalHits);

        const { hits } = resp.data;
        if (!hits.length) {
          toast.error('Nothing was found!');
        }
        setImages(prevState => [...prevState, ...hits]);
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setLoading(false);
      }
    }
    getPictures();
  }, [query, page]);

  const handleSubmit = evt => {
    evt.preventDefault();

    setQuery(`${Date.now()}/${evt.target.elements[1].value}`);
    setImages([]);
    setPage(1);
    setTotalPics(0);
    setLoading(false);
    setlargeImageData({
      largeImageURL: '',
      tags: '',
    });
    setModalIsOpen(false);
  };

  const handleOpenModal = largeImage => {
    setlargeImageData(largeImage);
    setModalIsOpen(true);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleCloseModal = () => {
    setlargeImageData({
      largeImageURL: '',
      tags: '',
    });
    setModalIsOpen(false);
  };

  return (
    <AppSection id="modal">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={handleOpenModal} />
      {loading && <Loader />}
      {totalPics / 12 > page && <Button nextPage={handleLoadMore} />}
      {modalIsOpen && (
        <Modal
          picture={largeImageData}
          onCloseModal={handleCloseModal}
          isOpen={modalIsOpen}
        />
      )}
      <Toaster />
    </AppSection>
  );
};
