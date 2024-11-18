import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../component/Spinner.tsx';

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('jwt');
        navigate('/dang-nhap');
    }, [navigate]);

    return <div className="flex justify-center gap-5 items-center min-h-screen">
        <Spinner className="w-55 h-55" />
        <span className="text-gray-500 text-xl">Đang đăng xuất...</span>
    </div>;
};

export default LogoutPage;