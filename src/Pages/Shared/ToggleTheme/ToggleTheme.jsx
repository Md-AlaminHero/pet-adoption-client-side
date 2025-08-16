import React from 'react';
import './toggleTheme.css';

const ToggleTheme = () => {

    const switchTheme = (e) => {
        if (e.target.checked) {
            document.querySelector('body').setAttribute('data-theme', 'dark')
        }
        else {
            document.querySelector('body').setAttribute('data-theme', 'light')
        }
    }

    return (
        <div>
            <label class="switch">
                <input type="checkbox" onChange={switchTheme} />
                <span class="slider round"></span>
            </label>
        </div>
    );
};

export default ToggleTheme;