import React from 'react';
import '../styles.css';
import PropTypes from 'prop-types';
import {useState} from "react";

export default function Searchbar({onSubmit}){
const [searchImage, setSearchImage] = useState("");

 const handleChangeImage = e => {
  setSearchImage(e.currentTarget.value.toLowerCase());
};
const handleSubmit = e => {
  e.preventDefault();

  if (searchImage.trim() === '') {
    alert('Введіть назву зображення');
    return;
  }
  onSubmit(searchImage);
  
};
return (
  <header className="Searchbar">
    <form className="SearchForm" onSubmit={handleSubmit}>
      <button type="submit" className="SearchForm-button">
        <span className="SearchForm-button-label">Search</span>
      </button>

      <input
        className="SearchForm-input"
        type="text"
        value={searchImage}
        placeholder="Search images and photos"
        onChange={handleChangeImage}
      />
    </form>
  </header>
);
}





Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
