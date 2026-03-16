import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../pages/Login";

export default function NavBar(){
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState('false');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setOpen(false);
        Navigate('/');
    }

    return(
        <nav className="font-mono text-sm flex justify-between mb-10">
            <div className={`flex-1 hidden md:block`}>Raft</div>
            <div className={`hidden md:flex-1 md:flex justify-center`}>
                <ul className={`flex gap-4`}>
                    <li className="nav-list">Home</li>
                    <li className="nav-list">All Posts</li>
                    <li className="nav-list">My Posts</li>
                </ul>
            </div>
            {/* mobile */}
            <div className="md:hidden">
                <button 
                    onClick={() => setOpen(!open)} 
                    className=" flex flex-col gap-1  items-center justify-center cursor-pointer"
                    >
                        <span className={`w-[18px] h-[1px] bg-[var(--pond-deep)]`}/>
                        <span className={`w-[18px] h-[1px] bg-[var(--pond-deep)]`}/>
                        <span className={`w-[18px] h-[1px] bg-[var(--pond-deep)]`}/>
                </button>
            </div>
            
            {open && (
                <div className={`md:hidden p-10 fixed top-0 left-0 h-[100vh] w-[60%]  bg-white shadow-lg z-50`}>
                    <ul className="flex flex-col gap-4">
                        <button 
                            onClick={() => setOpen(!open)} 
                            className=" flex flex-col gap-1  cursor-pointer mb-4"
                            >
                                <span className={`w-[18px] h-[1px] bg-[var(--pond-deep)]`}/>
                                <span className={`w-[18px] h-[1px] bg-[var(--pond-deep)]`}/>
                                <span className={`w-[18px] h-[1px] bg-[var(--pond-deep)]`}/>
                        </button>
                        <li><Link onClick={() => setOpen(false)} className={`text-[var(--pond-deep)] border-b border-white hover:border-[var(--pond-deep)] w-full block transition duration-300`}>Home</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`text-[var(--pond-deep)] border-b border-white hover:border-[var(--pond-deep)] w-full block transition duration-300`}>All Posts</Link></li>
                        <li><Link onClick={() => setOpen(false)} className={`text-[var(--pond-deep)] border-b border-white hover:border-[var(--pond-deep)] w-full block transition duration-300`}>My Post</Link></li>
                        {isLoggedIn &&
                        <li>
                            <button onClick={handleLogout} className={`text-white bg-[var(--pond-mid)] hover:bg-[var(--pond-deep)] px-2 py-1 text-center`}>Logout</button>
                        </li>}
                        <li>
                            <Link to="/login" className={`text-white bg-[var(--pond-mid)] hover:bg-[var(--pond-deep)] px-2 py-1 text-center`}>Login</Link>
                        </li>
                    </ul>
                </div>
            )}

            <div className={`flex-1 flex justify-end`}>
                <Link
                to={isLoggedIn? "/posts/create" : "/login"}
                className={`px-2 py-1 bg-white border border-[var(--pond-deep)] hover:bg-[var(--pond-deep)] hover:text-white transition duration-300`}>
                    Start writing
                </Link>
            </div>
        </nav>
    )
}