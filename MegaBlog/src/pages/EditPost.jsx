import {useState,useEffect} from 'react'
import { Container,PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [posts,setPosts] = useState(null)
    const {slug} =useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        if(slug){
            appwriteService.getPostByID(slug).then((post)=> {
                if(post){
                    setPosts(post)
                }
            })
        }
    },[slug,navigate])
  return posts ? (
    <div className='py-8'>
        <Container>
            <PostCard post={posts} />
        </Container>
    </div>
  ) :null
}

export default EditPost