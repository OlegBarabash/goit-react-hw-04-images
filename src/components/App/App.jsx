import { Searchbar } from 'components/Searchbar/Searchbar';
import { AppSection } from './App,styled';
import { fetchPictures } from '../../services/request';
import toast, { Toaster } from 'react-hot-toast';
import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalPics: 0,
    loading: false,
    largeImageData: {
      largeImageURL: '',
      tags: '',
    },
    modalIsOpen: false,
  };

  getQuery = () => {
    const { query } = this.state;
    return query
      .split('')
      .slice(query.indexOf('/') + 1)
      .join('');
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.target.elements[1].value}`,
      images: [],
      page: 1,
      totalPics: 0,
      loading: false,
      largeImageData: {
        largeImageURL: '',
        tags: '',
      },
      modalIsOpen: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = largeImage => {
    this.setState({ largeImageData: largeImage, modalIsOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ largeImage: '', modalIsOpen: false });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (this.getQuery().trim() === '') {
      return;
    }
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true });

        const resp = await fetchPictures(this.getQuery(), page);
        this.setState({ totalPics: resp.data.totalHits });

        const { hits } = resp.data;
        if (!hits.length) {
          toast.error('Nothing was found!');
        }
        hits.unshift(...this.state.images);
        this.setState({ images: hits });
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { images, loading, modalIsOpen, largeImageData, totalPics, page } =
      this.state;

    return (
      <AppSection id="modal">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} openModal={this.handleOpenModal} />
        {loading && <Loader />}
        {totalPics / 12 > page && <Button nextPage={this.handleLoadMore} />}
        {modalIsOpen && (
          <Modal
            picture={largeImageData}
            onCloseModal={this.handleCloseModal}
            isOpen={modalIsOpen}
          />
        )}
        <Toaster />
      </AppSection>
    );
  }
}
