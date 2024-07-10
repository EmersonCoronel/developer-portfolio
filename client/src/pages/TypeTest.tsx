import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Header from '../components/Header';
import axios from 'axios';

const TypeTest: React.FC = () => {
    const [testText, setTestText] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');

    // Function to handle input change
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    // Function to handle click on the text block to refocus the hidden input
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const handleTextBlockClick = () => {
        hiddenInputRef.current?.focus();
    };

    useEffect(() => {
        // Function to fetch random words
        const fetchRandomWords = async () => {
            try {
                const response = await axios.get('https://developer-portfolio-emerson-coronels-projects.vercel.app/api/words');
                const words = response.data.join(' ');
                setTestText(words);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchRandomWords();
    }, []); // Empty dependency array means this effect runs once on mount

    // Function to render the test text with styling based on user input
    const renderTestText = () => {
        const inputChars = userInput.split('');
        return (
            <div id="type-text-block">
                {testText.split('').map((char, index) => {
                    let style: React.CSSProperties = {
                        color: 'gray',
                    };
                    if (index < inputChars.length) {
                        // User has typed this character
                        style.color = char === inputChars[index] ? 'white' : 'red';
                    }
                    // Highlight the next character to type
                    if (index === inputChars.length) {
                        style.textDecoration = 'underline';
                    }
                    return <span key={index} style={style}>{char}</span>;
                })}
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className="text-center centered-container">
                <input
                    ref={hiddenInputRef}
                    type="text"
                    onChange={handleInputChange}
                    style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                />
                <button id="type-text-block" onClick={handleTextBlockClick}>
                    {renderTestText()}
                </button>
            </div>
        </div>
    );
};

export default TypeTest;
