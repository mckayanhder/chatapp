import { useState } from 'react';
import axios from 'axios';
import Popup from '../components/Popup';

const projectID = '9791d30a-63f2-40da-8488-0ed5e12cfc9a';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('hmmm, doesnt ring a bell');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">chatter</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>start chatting</span>
            </button>
          </div>
          <div>
    <input
      type="button"
      value="Just Visiting?"
      onClick={togglePopup}
      className="popupbtn"
    />
    {isOpen && <Popup
      content={<>
        <b>First Time Here?</b>
        <p>Join as a guest using these credentials! -- Username: Guest -- Password: 123123 --</p>
      </>}
      handleClose={togglePopup}
    />}
  </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;
