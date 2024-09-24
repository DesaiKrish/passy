import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyButtonText, setCopyButtonText] = useState(<i className="fas fa-copy"></i>);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText(<i className="fas fa-copy"></i>), 2000);
    });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="app-container">
      <div className="password-box">
        <h1 className='title'>Password Generator</h1>
        <div className="input-container">
          <input
            type="text"
            value={password}
            className="password-input"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='copy-button'
          >
            {copyButtonText}
          </button>
        </div>
        <div className='settings'>
          <div className='setting'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='length-slider'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>Made with <span role="img" aria-label="love">❤️</span> by <a href="https://github.com/DesaiKrish/passy/tree/main" target="_blank" rel="noopener noreferrer">Krish Desai</a></p>
      </footer>
    </div>
  );
}

export default App;
