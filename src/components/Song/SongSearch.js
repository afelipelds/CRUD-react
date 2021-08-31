import React, { useState, useEffect } from 'react';
import { helpHTTP } from '../../helpers/helpHttp';
import SongArtist from './SongArtist';
import SongLyrics from './SongLyrics';
import SongForm from './SongForm';
import SongDetails from './SongDetails';
import Loader from '../Loader/Loader';

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyrics, setLyrics] = useState(null);
  const [artistBio, setArtistBio] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (data) => {
    console.log(`data searched: `, data);
    setSearch(data);
  }

  useEffect(
    () => {
      if (search === null) return;
      const fetchData = async () => {
        const { artist, song } = search;
        
        const artistUrl = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
        // TODO: lyrics.ovh is not working. Find another API
        const songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;
        
        setLoading(true);

        const [artistResponse, songResponse] = await Promise.all([
          helpHTTP().get(artistUrl),
          helpHTTP().get(songUrl),
        ]);

        console.log(`object`, artistResponse, songResponse);
        setArtistBio(artistResponse);
        setLyrics(songResponse);

        setLoading(false);
      }

      fetchData();
    },
    [search]
  );

  return (
    <div>
      <h2 className="">Song Search</h2>
      {loading && <Loader />}
      <SongForm handleSearch={handleSearch}/>
      <SongDetails 
        search={search}
        lyrics={lyrics}
        artistBio={artistBio}
      />
      
    </div>
  )
};

export default SongSearch;
