import React, { useState } from 'react';
import { MessageCircle, Video, UserPlus, Users, FileText } from 'lucide-react';
import assets from '../assets/assets';
import { useCurrentUser } from '../Components/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import InfoCard from '../Components/InfoCard';

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
      image: assets.s6,
    },
    {
      id: 'golive',
      title: 'Go Live',
      description: 'Want to hold meetings or communicate with your students',
      icon: <Video className="w-8 h-8" />,
      image: assets.s6,
    },
    {
      id: 'addteachers',
      title: 'Add Teachers',
      description: 'Add teachers of your school',
      icon: <UserPlus className="w-8 h-8" />,
      image: assets.s6,
      onClick: () => addTeacher(currentUser?._id),
    },
    {
      id: 'addstudents',
      title: 'Add Students',
      description: 'Add Students of your school',
      icon: <Users className="w-8 h-8" />,
      image: assets.s6,
      onClick: () => addStudent(currentUser?._id),
    },
    {
      id: 'post',
      title: 'Post',
      description:
        'Post about your school and let everyone know about your school features',
      icon: <FileText className="w-8 h-8" />,
      image: assets.s6,
    },
  ];

  return (
   <div
  className="relative min-h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${assets.s1})` }}
>
  {/* Transparent overlay */}
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col">
    {/* Navbar */}
    <div className="w-full">
      <Navbar
        logo={assets.slogo}
        title={currentUser?.name}
        onButtonClick={() => logout()}
        buttonName="Logout"
      />
    </div>

    {/* Cards Section */}
    <div className="mt-32 px-4 sm:px-6 lg:px-8 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {dashboardItems.map((item) => (
          <InfoCard
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default SchoolDashboard;