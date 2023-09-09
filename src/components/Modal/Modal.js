import ReactModal from 'react-modal';

export const Modal = ({ picture, onCloseModal, isOpen }) => {
  const { largeImageURL, tags } = picture;

  const customStyles = {
    overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: '1200',
    },
    content: {
      overflow: 'hidden',
      position: 'revert',
      display: 'flex',
      alignItems: 'center',
      background: 'transparent',
      border: 'none',
      maxWidth: 'calc(100vw - 48px)',
      maxHeight: 'calc(100vh - 24px)',
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      preventScroll={true}
      ariaHideApp={false}
    >
      <img src={largeImageURL} alt={tags} />
    </ReactModal>
  );
};
