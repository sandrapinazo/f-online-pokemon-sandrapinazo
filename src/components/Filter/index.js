import React from 'react';

function Filter (props) {
    return (
        <form>
             <label htmlFor='filter'>Search pokemon:</label>
            <input className='Filter__input' name='filter' id='filter' type='text' onChange={props.handler} value={props.value} placeholder="Bulbasaur" />
        </form>
    );
}

export default Filter;