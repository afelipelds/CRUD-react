import React, { useState, useEffect } from 'react'
import SongArtist from './SongArtist';
import SongLyrics from './SongLyrics';

const SongDetails = ({ search, lyrics, artistBio }) => {
  return (
    <div>
      <h2 className="">Song Details</h2>
      <SongArtist />
      <SongLyrics />
    </div>
  )
}

export default SongDetails;
