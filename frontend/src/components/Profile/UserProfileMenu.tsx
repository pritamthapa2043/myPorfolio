import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const UserProfileMenu = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Sync username with localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null); // Update state immediately
  };

  return (
    <div className="absolute top-4 right-4 z-20">
      <button
        onClick={() => setShowProfile((prev) => !prev)}
        className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-900 flex items-center justify-center border border-white/20"
      >
        <FiUser className="text-2xl text-white" />
      </button>

      {showProfile && (
        <div className="absolute right-0 mt-2 w-48 rounded bg-gray-800 shadow-lg border border-white/10 p-3 text-sm">
          {username ? (
            <>
              <div className="mb-2 text-white text-center">
                <div className="font-semibold">{username}</div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-center"
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
