import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
export default function Login(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setError(null);
        setLoading(true);
        try{
            const data = await login(email, password);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('userId', data.user.id);
            navigate('/');
        } catch (err){
            console.log("full error:", err);
            console.log("response:", err.response);
            console.log("response data:", err.response?.data);
            setError(err.response?.data?.message || 'Login failed');
        } finally{
            setLoading(false);
        }
    }
    
    return(
        <>
        <div 
        className='pond-home w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className={`bg-white w-100 md:w-120 border border-[var(--pond-deep)] shadow-md p-10`}>
                <form onSubmit={handleSubmit}  className="relative z-10 bg-white">
                    <Link to="/" className={`text-sm text-[var(--pond-mid)] transition duration-300 hover:text-[var(--pond-deep)]`}>&#8592; Back</Link>
                    <img src="" alt="logo" className="bg-blue-100 my-3 w-full h-40"/>

                    {error && (
                        <p className="text-red-500 text-sm mb-3">{error}</p>
                    )}
                    
                    <label
                     htmlFor="email"
                     className="form-label">
                        Email
                    </label>
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                    className="block mb-3 form-input w-full px-2 py-1 border border-[var(--pond-surface)] focus:outline-none"/>

                    <label
                     htmlFor="password"
                     className="form-label">
                        Password
                    </label>
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder="Enter password"
                    className="block mb-3 form-input w-full px-2 py-1 border border-[var(--pond-surface)] focus:outline-none"/>

                    <button 
                    disabled={loading}            
                    type="submit" 
                    className={`mb-4 text-white py-1 bg-[var(--pond-mid)]  hover:bg-[var(--pond-deep)] block w-full transition duration-300 `}>
                        {loading? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center">Don't have an account? <Link to="/register" className={`underline text-[var(--pond-mid)] hover:text-[var(--pond-deep)] transition duration-300`}>Register here</Link>
                </p>
            </div>
        </div>
        </>
    )
}