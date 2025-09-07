import React, { useState } from 'react';
import { User, GraduationCap, Users, School, X, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const schoolLoginPage = () => navigate('/schoolLogin');
  const teacherLoginPage = () => navigate('/teacherLogin');
  const studentLoginPage = () => navigate('/studentLogin');

  const loginOptions = [
    {
      title: 'Login as Student',
      icon: <GraduationCap className="w-6 h-6" />,
      description: 'Access your student dashboard',
      gradient: 'from-sky-400 to-blue-500',
    },
    {
      title: 'Login as Teacher',
      icon: <User className="w-6 h-6" />,
      description: 'Manage your classes and students',
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      title: 'Login as School',
      icon: <School className="w-6 h-6" />,
      description: 'Administrative access',
      gradient: 'from-sky-500 to-cyan-500',
    },
    // {
    //   title: 'Login as Parent',
    //   icon: <Users className="w-6 h-6" />,
    //   description: "Monitor your child's progress",
    //   gradient: 'from-blue-500 to-sky-600',
    // },
  ];

  return (
    <>
      {/* Top Margin */}
      <div className="h-6"></div>

      {/* Navbar with reduced width and more rounded edges */}
     <nav className="mx-auto w-[65%] bg-sky-100/30 backdrop-blur-md border border-sky-200/40 shadow-lg rounded-[3rem] relative z-50">
  <div className="px-8 sm:px-10 lg:px-12">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-gradient-to-br from-sky-400/90 to-blue-500/90 rounded-[1.5rem] flex items-center justify-center shadow-lg backdrop-blur-sm">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-serif font-bold bg-gradient-to-r from-sky-700/90 to-blue-600/90 bg-clip-text text-transparent">
            EduPortal
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-sky-600/90 hover:text-sky-800/90 font-medium transition-all duration-300 cursor-pointer hover:scale-105 font-serif text-lg">
          <HelpCircle className="w-6 h-6" />
          <span>Help</span>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-gradient-to-r from-sky-400/80 to-blue-500/80 hover:from-sky-500/90 hover:to-blue-600/90 text-white px-6 py-2 rounded-[2rem] font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg font-serif text-lg flex items-center space-x-2 backdrop-blur-sm border border-sky-300/30"
        >
          <User className="w-5 h-5" />
          <span>Login</span>
        </button>
      </div>
    </div>
  </div>
</nav>


      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-sky-50/70 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-sky-200/50 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif font-bold text-sky-800/90">
              Choose Login Type
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-sky-100/60 rounded-full transition-colors duration-200 backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-sky-600/80" />
            </button>
          </div>

          {/* Login Options */}
          <div className="space-y-6 flex-1">
            {loginOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  if (option.title === 'Login as School') {
                    schoolLoginPage();
                  } else if (option.title === 'Login as Student') {
                    studentLoginPage();
                  } else if (option.title === 'Login as Teacher') {
                    teacherLoginPage();
                  }
                  setSidebarOpen(false);
                }}
                className={`group cursor-pointer p-8 border border-sky-200/60 rounded-[2rem] hover:border-sky-300/70 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-sky-100/40 to-blue-50/40 backdrop-blur-sm`}
              >
                <div className="flex items-start space-x-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${option.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm`}
                  >
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-xl text-sky-800/90 group-hover:text-sky-900/90 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sky-600/80 text-sm font-medium leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="mt-6 flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-sky-200/60 group-hover:bg-gradient-to-r group-hover:from-sky-400/90 group-hover:to-blue-500/90 flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-sm">
                    <svg
                      className="w-5 h-5 text-sky-500/80 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-sky-200/50">
            <div className="text-center">
              <p className="text-sm text-sky-600/80 font-medium mb-2">
                Need help? Contact our support team
              </p>
              <div className="flex justify-center space-x-4">
                <span className="text-xs text-sky-500/70 bg-sky-100/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  24/7 Support
                </span>
                <span className="text-xs text-sky-500/70 bg-sky-100/40 px-3 py-1 rounded-full backdrop-blur-sm">
                  Quick Setup
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
