import React, { useState } from 'react';
import { Home, MessageCircle, Video, UserPlus, Users, FileText, Bell, Settings, LogOut, Sparkles } from 'lucide-react';
import assets from '../assets/assets';
import { useCurrentUser } from '../Components/CurrentUserContext';
import { useNavigate } from 'react-router-dom';

const SchoolDashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currentUser, logout } = useCurrentUser();
  const navigate = useNavigate();

  const addTeacher = (schoolId) => navigate(`/addTeacher/${schoolId}`);
  const addStudent = (schoolId) => navigate(`/addStudent/${schoolId}`);

  const dashboardItems = [
    {
      id: 'varta',
      title: 'VARTA',
      description: 'Chat with other school authority',
      icon: <MessageCircle className="w-8 h-8" />,
      gradient: 'from-sky-300/80 to-blue-400/80',
      hoverGradient: 'group-hover:from-sky-400/90 group-hover:to-blue-500/90',
      delay: 'delay-100',
      image: assets.s6,
    },
    {
      id: 'golive',
      title: 'Go Live',
      description: 'Want to hold meetings or communicate with your students',
      icon: <Video className="w-8 h-8" />,
      gradient: 'from-blue-300/80 to-indigo-400/80',
      hoverGradient: 'group-hover:from-blue-400/90 group-hover:to-indigo-500/90',
      delay: 'delay-200',
      image: assets.s6,
    },
    {
      id: 'addteachers',
      title: 'Add Teachers',
      description: 'Add teachers of your school',
      icon: <UserPlus className="w-8 h-8" />,
      gradient: 'from-sky-400/80 to-cyan-400/80',
      hoverGradient: 'group-hover:from-sky-500/90 group-hover:to-cyan-500/90',
      delay: 'delay-300',
      image: assets.s6,
    },
    {
      id: 'addstudents',
      title: 'Add Students',
      description: 'Add Students of your school',
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-cyan-300/80 to-sky-400/80',
      hoverGradient: 'group-hover:from-cyan-400/90 group-hover:to-sky-500/90',
      delay: 'delay-400',
      image: assets.s6,
    },
    {
      id: 'post',
      title: 'Post',
      description: 'Post about your school and let everyone know about your school features',
      icon: <FileText className="w-8 h-8" />,
      gradient: 'from-blue-400/80 to-sky-500/80',
      hoverGradient: 'group-hover:from-blue-500/90 group-hover:to-sky-600/90',
      delay: 'delay-500',
      image: assets.s6,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-sky-200 via-blue-100 to-cyan-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-300/20 via-transparent to-blue-300/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Background Image Overlay */}
      <div
        className="fixed inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.s5})` }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Top Navigation */}
        <nav className="mb-8 animate-fadeIn">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/20 backdrop-blur-xl border border-sky-200/30 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                {/* Centered Welcome */}
                <div className="flex flex-1 justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-400/90 to-blue-500/90 rounded-2xl flex items-center justify-center shadow-xl">
                      <Sparkles className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-700 to-blue-600 bg-clip-text text-transparent font-serif text-center">
                        {currentUser ? currentUser.name : 'Guest'}
                      </h2>
                      <p className="text-sky-600/80 font-medium text-lg mt-1 text-center">
                        {currentUser ? `${currentUser.board} Board` : 'No board info'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-4">
                  <button className="p-3 bg-sky-100/60 hover:bg-sky-200/60 rounded-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                    <Bell className="w-6 h-6 text-sky-600" />
                  </button>
                  <button className="p-3 bg-sky-100/60 hover:bg-sky-200/60 rounded-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm">
                    <Settings className="w-6 h-6 text-sky-600" />
                  </button>
                  <button
                    onClick={() => logout()}
                    className="p-3 bg-red-100/60 hover:bg-red-200/60 rounded-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                  >
                    <LogOut className="w-6 h-6 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Home Button */}
        <div className="max-w-7xl mx-auto mb-8">
          <button
            onClick={() => navigate('/')}
            className="group bg-gradient-to-r from-sky-400/80 to-blue-500/80 hover:from-sky-500/90 hover:to-blue-600/90 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl backdrop-blur-sm border border-sky-300/30 animate-slideInLeft flex items-center space-x-3"
          >
            <Home className="w-6 h-6 group-hover:animate-bounce" />
            <span>Home</span>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dashboardItems.map((item) => (
              <div
                key={item.id}
                className={`group relative animate-fadeInUp ${item.delay}`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  if (item.id === 'addteachers') addTeacher(currentUser._id);
                  else if (item.id === 'addstudents') addStudent(currentUser._id);
                }}
              >
                <div
                  className={`relative bg-white/20 backdrop-blur-xl border border-sky-200/40 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-xl cursor-pointer ${item.hoverGradient} hover:border-sky-300/60`}
                >
                  {/* Top Half - Image */}
                  <div className="h-40 w-full">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>

                  {/* Bottom Half - Info */}
                  <div className="p-6 relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}
                    >
                      {item.icon}
                    </div>

                    <h2 className="text-2xl font-bold text-sky-800/90 group-hover:text-sky-900/90 mb-2 font-serif transition-colors duration-300">
                      {item.title}
                    </h2>

                    <p className="text-sky-600/80 leading-relaxed font-medium group-hover:text-sky-700/90 transition-colors duration-300">
                      {item.description}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-6 flex justify-end">
                      <div className="w-10 h-10 rounded-full bg-sky-200/60 group-hover:bg-gradient-to-r group-hover:from-sky-400/90 group-hover:to-blue-500/90 flex items-center justify-center transition-all duration-300 shadow-sm">
                        <svg
                          className="w-5 h-5 text-sky-500/80 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
          .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
        `}
      </style>
    </div>
  );
};

export default SchoolDashboard;
