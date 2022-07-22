import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Audio } from 'react-loader-spinner';
import '../styles.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function ImageGallery({ searchImage }) {
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setPage(1);
    setHits([]);
    setTotal(0);
  }, [searchImage]);

  useEffect(() => {
    if (searchImage === '') {
      return;
    }
    setStatus('pending');
    fetch(
      `https://pixabay.com/api/?key=26992012-e6a459b4fdd9a0e95b25f973a&q=${searchImage}&per_page=12&page=${page}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error());
      })
      .then(image => {
        setTotal(image.totalHits);
        setHits(prevState => [...prevState, ...image.hits]);
        setStatus('resolved');
      })
      .catch(error => {console.log(error)
        setStatus('rejected');
      });
  }, [page, searchImage]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = imageID => {
    hits.forEach(e => {
      if (e.id === imageID) {
        setLargeImageURL(e.largeImageURL);
      }
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {hits.length !== 0 && (
        <div>
          <ul className="ImageGallery">
            {hits.map(e => (
              <ImageGalleryItem
                key={e.id}
                src={e.webformatURL}
                onClick={() => openModal(e.id)}
              ></ImageGalleryItem>
            ))}
          </ul>
          {total !== page * hits.length && <Button onClick={loadMore}></Button>}
          {showModal && (
            <Modal src={largeImageURL} onClose={closeModal}></Modal>
          )}{' '}
        </div>
      )}
      {status === 'pending' && <Audio></Audio>}
      {status === 'idle' && <div>Введіть назву зображення</div>}
      {hits.length === 0 && status !== 'idle' && (
        <div>немає зображень з такою назвою</div>
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  searchImage: PropTypes.string.isRequired,
};
