import { FaGithub } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

function Search({ getDataUser}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);

  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('Welcome to GitHub Finder');

  const API_URL = 'https://api.github.com/users';
  const token = process.env.REACT_APP_GITHUB_TOKEN;
          
  const fetchData = useCallback(async () => {
    const options = { headers: { Authorization: `Bearer ${token}` } };
    try {
      
      const response = await axios.get(`${API_URL}/${userName}`, options);
    
      if (response.data.login || response.data.id) {
        getDataUser(response.data);
        setMessage('');
        navigate(`user/${userName}`);
        setUserName('');
      }

    } catch (error) {
      setMessage('User not found. Try again!');
      getDataUser(null);
    }
  }, [userName, getDataUser, navigate, token]);

  const onSubmit = (event) => {
    event.preventDefault(); 
    if (userName.length !== 0){
      
      setQuery(userName);
      fetchData();
    }
    else {
      setMessage('User not found. Try again!');
    }
  };

  useEffect(() => {
    if (query !== initialQuery) {
      setSearchParams({ query: query || '' }, { replace: true });
    }

    if (query.length === 0) {
      setSearchParams({}, { replace: true });
    }

  }, [query, initialQuery, setSearchParams]);


  return (
    <section className='container flex'>
    <div className='container-find-user'>
      <div className='container-logo'>
        <FaGithub className='github-icon' />
      </div>
     
        <div className='container-form'>
        <form onSubmit={onSubmit}>
                <div className='container-gradient'>
                  <input
                    type='text'
                    value={userName}
                    onChange={(event)=> setUserName(event.target.value.trim())}
                    aria-label='Search users'
                    placeholder='User name'
                  />
                </div>
            </form>
            <div className='message-div'>
              <p className='error-message'>{message}</p>
            </div>
        </div>

    </div>
    </section>
  );
}

export default Search;