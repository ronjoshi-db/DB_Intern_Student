import React from 'react';
import warning from '../images/exclamation-image.webp';

export default function NoPosts() {
  return (
    <div className="danger">
      <p>There are no posts that match your search.</p>
      <p>Please try again</p>
      <img src={warning} className="App-small" alt="Warning icon" />
    </div>
  );
}
