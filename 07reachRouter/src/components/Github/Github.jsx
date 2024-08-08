
import { useLoaderData } from 'react-router-dom';
function Github() {
    const data =useLoaderData();
/*
    useEffect(() => {
        fetch('https://api.github.com/users/subhaghanta60')
        .then(response => response.json())
        .then(data => {
            setData(data)

        })
      
    }, [])
    */
  return (
    <div className='text-center m-4 bg-gray-500 text-white text-3xl'>Github Followers: {data.followers} 
        <img  src={data.avatar_url} alt="Git Picture" width={300}/>
    </div>

  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/subhaghanta60')

    return response.json();
}