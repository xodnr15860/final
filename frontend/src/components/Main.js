import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <main>
            <Link to ={"/board"}>Go to Board</Link>
        </main>
    );
};

export default Main;