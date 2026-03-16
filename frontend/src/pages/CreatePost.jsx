import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/axios";
import { createPost } from "../api/posts.api";

export default function CreatePost(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError(null);
        setLoading(true);
        try{
            await createPost(title, content);
            navigate('/');     
        } catch (err){
            setError(Array.isArray(msg) ? msg[0] : msg || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
        <div className="pond-home">
            <div className=" relative z-10">

            
            <form onSubmit={handleSubmit} className="flex flex-col bg-white p-10">
                <Link to="/">&#8592; Back</Link>

                {error && 
                <p className="text-red-500 text-sm mb-3">
                    {error}
                </p>}

                <label htmlFor="title" className="form-label my-2">Title</label>
                <input type="text" name="title" value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="focus:outline-none border-[var(--pond-deep]) border py-1 px-2 mb-3"/>

                <label htmlFor="content" className="form-label my-2">Content</label>
                <textarea 
                name="content" 
                id="content" 
                rows="10" 
                cols="50"
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                className="resize-none focus:outline-none border-[var(--pond-deep)] border py-1 px-2 mb-3 overflow-scroll"
                required>
                </textarea>

                <button 
                className={`border border-[var(--pond-deep)] text-[var(--pond-deep)] hover:text-white hover:bg-[var(--pond-deep)] mt-3`} 
                type="submit">
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </form>
            </div>
        </div>
        </>
    )
}