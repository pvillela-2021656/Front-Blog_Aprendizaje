// src/pages/home/homePage.jsx
import { NavigationBar } from '../../components/navigationBar/navigationBar';
import { Profile } from '../../components/profile/profile';
import { Publications } from '../../components/publications/publications';
import './homePage.css';

export const HomePage = () => {
    return (
        <div className="bg-white min-h-screen">
            <NavigationBar />
            <Profile />
            <Publications />
        </div>
    );
};
