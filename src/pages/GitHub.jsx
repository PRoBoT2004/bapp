import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GitHub = () => {
  const [profile, setProfile] = useState(null);
  const [followersCount, setFollowersCount] = useState(null);
  const [repositories, setRepositories] = useState([]);

  // Replace 'YOUR_ACCESS_TOKEN_HERE' with your actual GitHub personal access token.
  const accessToken = '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';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch authenticated user's profile information.
        const userResponse = await axios.get('https://api.github.com/user', {
          headers: { Authorization: `token ${accessToken}` },
        });
        setProfile(userResponse.data);

        // Fetch the authenticated user's followers count.
        const followersResponse = await axios.get(userResponse.data.followers_url, {
          headers: { Authorization: `token ${accessToken}` },
        });
        setFollowersCount(followersResponse.data.length);

        // Fetch the authenticated user's repositories.
        const reposResponse = await axios.get(userResponse.data.repos_url, {
          headers: { Authorization: `token ${accessToken}` },
        });
        setRepositories(reposResponse.data);
      } catch (error) {
        console.error('Error fetching data from GitHub API', error);
      }
    };

    fetchData();
  }, [accessToken]);

  if (!profile || followersCount === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img src={profile.avatar_url} alt="Profile" className="w-24 h-24 rounded-full" />
          <div>
            <h1 className="text-4xl font-bold">{profile.login}</h1>
            <p className="text-xl">Followers: {followersCount}</p>
            <p className="text-xl">Public Repositories: {profile.public_repos}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Repositories:</h2>
          <ul className="mt-4 space-y-4">
            {repositories.map((repo) => (
              <li key={repo.id} className="border-b pb-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {repo.name}
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">{repo.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GitHub;
