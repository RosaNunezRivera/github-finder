import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function User( {user} ) {
  const [repositories, setRepositories] = useState([]);
  const {username} = useParams();
  let userURL = `https://api.github.com/users/${username}/repos`;
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const getUserData = async () => {
      const options = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const repoList = await axios.get(userURL, options);
        setRepositories(repoList.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (username) getUserData();
  }, [username, userURL, token]);

  const formatDate = { month: 'short', day: 'numeric', year: 'numeric' };

  return (
    <section className='container-user'>
      {user ? (
        <div className='grid'>
          <div className='row'>
            <img src={user.avatar_url} alt={user.name} />
          </div>
          <div className='row'>
            <h2>{user.name}</h2>
          </div>

          <div className='row'>
            <div>
              <p className='green'>{user.public_repos}</p>
              <p className='label'>Repositories</p>
            </div>
            <div>
              <p className='green'>{user.followers}</p>
              <p className='label'>Followers</p>
            </div>
            <div>
              <p className='green'>{user.following}</p>
              <p className='label'>Following</p>
            </div>
          </div>
          <div className='row'>
            <input
              type="button"
              value="Go to GitHub"
              onClick={() => window.open(user.html_url, '_blank')}
            />
          </div>

          <div className='repositories'>
          <h3>My repositories</h3>
            <div className='grid-repo'>
                {repositories.length > 0 ? (
                  repositories.map((item) => (
                    <div key={item.id} className='repository-item'>
                        <div className='repo-name-date'>
                          <a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                          <p className='date'>Updated at {new Date(item.updated_at).toLocaleDateString('en-CA', formatDate)}</p>
                        </div>
                   
                      <div className='repo-description'>
                        {item.description ? <p>{item.description}</p> : ''}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No repositories found.</p>
                )}
            </div>
          </div>
        
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
);
}

export default User;