import React, { useState } from 'react';
import { User, GraduationCap, Users, School, X, HelpCircle, icons,  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import assets from '../assets/assets'

const HomeNavbar = () => {
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
      onClick: studentLoginPage
    },
    {
      title: 'Login as Teacher',
      icon: <User className="w-6 h-6" />,
      description: 'Manage your classes and students',
      gradient: 'from-blue-400 to-indigo-500',
      onClick: teacherLoginPage
    },
    {
      title: 'Login as School',
      icon: <School className="w-6 h-6" />,
      description: 'Administrative access',
      gradient: 'from-sky-500 to-cyan-500',
      onClick: schoolLoginPage
    },
    {
      title: 'Login as Admin',
      icon: <Users className="w-6 h-6" />,
      description: "Monitor your child's progress",
      gradient: 'from-blue-500 to-sky-600',
    },
  ];

  return (
    <>
     <Navbar logo={assets.slogo} title="Study" onButtonClick={() => setSidebarOpen(!sidebarOpen)} buttonName={'Login'}/>
       <div className="flex flex-1">
        {/* Sidebar (toggleable) */}
        {sidebarOpen && (
          <Sidebar
            logo={assets.slogo}
            title="Choose Login Option"
            cards={loginOptions.map((opt) => ({
              title: opt.title,
              info: opt.description,
              icon: opt.icon,
              onClick: opt.onClick
            
            }))}
          />
        )}
        </div>
    </>
  );
};

export default HomeNavbar;
