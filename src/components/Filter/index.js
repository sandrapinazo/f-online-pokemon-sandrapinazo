import React from 'react';

function Filter (props) {
    const {handler, value} = props;
    return (
        <form>
             <label htmlFor='filter'>Search pokemon:</label>
            <input className='Filter__input' name='filter' id='filter' type='text' onChange={handler} value={value} placeholder="Bulbasaur" />
        </form>
    );
}

export default Filter;