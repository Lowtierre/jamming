import React from "react";
import './search_bar.css';

function SearchBar({ string, writeString, fetchSongs }) {

    const handleChangeText = (e) => {
        writeString(e.target.value)
    }

    const handleSubmitSong = (e) => {
        e.preventDefault()
        fetchSongs(string)
    }

    return (
        <form className="search-bar" onSubmit={handleSubmitSong}>
            <input type="text" placeholder="Write song..." value={string} onChange={handleChangeText} />
            <input type="submit" value="Search" />
        </form>
    )
}

export default SearchBar;