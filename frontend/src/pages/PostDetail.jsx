
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { api } from "../api/axios";
import { getPostById } from "../api/posts.api";

export default function PostDetail(){
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]= useState(null)
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId ? parseInt(storedUserId) : null);
    }, []);

    useEffect(() => {
        const fetchpost = async () => {
            try{
                setLoading(true)
                const data = await getPostById(id);
                setPost(data);
            } catch(err){
                setError(err.message)
            } finally {
                setLoading(false)
            }
        };
        fetchpost();
    }, [id]);

    if(loading) {
        return(
            <div className={`bg-[var(--bg-light)] justify-center items-center w-full h-[100vh]`}>
            <div className="pond-loading">
                <div className="loading-dot" />
                <div className="loading-dot" />
                <div className="loading-dot" />
            </div>
            </div>
        )
    }

    if(error){
        return(
            <div className="min-h-screen flex items-center justify-center">
                {error}
            </div>
        )
    }

    const editPost = () => {

    }

    const isOwner = userId === post.user.id;

    return(
        <>
        
        <article
        className={`p-10 min-h-[100vh] bg-[#cae5e3] `}>
            <div
            className="bg-white border p-6 mt-6 max-w-[80vh] max-h-[80vh] mx-auto overflow-scroll">
                <div className="flex justify-between items-center">
                    <Link to="/">&#8592; Back</Link>
                    {isOwner &&
                    <button onClick={editPost}
                    className="border border-[var(--pond-deep)] px-2 py-1 text-sm text-[var(--pond-deep)] hover:bg-[var(--pond-deep)] transition duration-300 hover:text-white">
                        Edit post
                    </button>
                    }
                 </div>

                <h1
                className="font-bold text-2xl my-3">
                    {post.title}
                </h1>

                <p className="text-sm text-gray-500 my-2">
                    {new Date(post.createdAt).toLocaleDateString()} |
                </p>
                <div className="prose">
                {post.content}
            </div>
            </div>
        </article>
        </>
    )
}