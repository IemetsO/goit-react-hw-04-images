import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useState } from 'react';

export default function App() {
  const [searchImage, setSearchImage] = useState('');

  const handleFormSubmit = searchImage => {
    setSearchImage(searchImage);
  };
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit}></Searchbar>
      <ImageGallery searchImage={searchImage}></ImageGallery>
    </div>
  );
}
