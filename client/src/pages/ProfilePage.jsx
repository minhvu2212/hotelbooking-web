import { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import AccountNav from '../AccountNav';

export default function ProfilePage() {
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    const [userDoc, setUserDoc] = useState(null);

    const { pathname } = useLocation();
    let subpage = pathname.split('/')?.[3];
    if (subpage === undefined) {
        subpage = 'profile';
    }

    function linkClasses(type = null) {
        let classes = 'flex items-center gap-2 pr-3 py-1.5 my-3';
        if (type === subpage) {
            classes += ' bg-primary text-white rounded-full  pl-3';
        }
        return classes;
    }

    useEffect(() => {
        axios.get('/user').then((response) => {
            setUserDoc(response.data);
        });
    }, []);

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }
    return (
        <div>
            <AccountNav />
            {userDoc && (
                <div className="flex justify-center pt-10 px-10">
                    <div className="border-r-2 px-10">
                        <h1 className="font-semibold lg:text-2xl lg:pb-6 md:pb-2 md:text-xl text-primary">
                            Cài đặt tài khoản
                        </h1>
                        <Link className={linkClasses('profile')} to={'/account/profile'}>
                            <span className="material-symbols-outlined">person</span>
                            <h1 className="font-semibold ">Thông tin chi tiết</h1>
                        </Link>
                        <Link className={linkClasses('payment')} to={'/account/profile/payment'}>
                            <span className="material-symbols-outlined">account_balance_wallet</span>{' '}
                            <h1 className="font-semibold ">Thanh toán</h1>
                        </Link>
                        <Link className={linkClasses('safety')} to={'/account/profile/safety'}>
                            <span className="material-symbols-outlined">encrypted</span>
                            <h1 className="font-semibold ">Bảo mật</h1>
                        </Link>
                        <Link className={linkClasses('preference')} to={'/account/profile/preference'}>
                            <span className="material-symbols-outlined">settings</span>
                            <h1 className="font-semibold ">Cài đặt</h1>
                        </Link>
                        <Link className={linkClasses('notification')} to={'/account/profile/notification'}>
                            <span className="material-symbols-outlined">notifications</span>
                            <h1 className="font-semibold ">Thông báo</h1>
                        </Link>
                    </div>
                    <div className="lg:w-2/5 w-2/3">
                        {subpage === 'profile' && (
                            <div className="px-10 md:px-32">
                                <h1 className="text-3xl font-semibold text-primary">Thông tin cá nhân</h1>
                                <h2 className="text-slate-500 pt-1">Sửa thông tin cá nhân của bạn</h2>
                                <img
                                    className="h-32 border-2 border border-primary rounded-full my-8"
                                    src="https://i.pinimg.com/originals/39/a4/71/39a47159059f38a954d77e5dcae6f0db.jpg"
                                    alt="avatar"
                                />
                                <table className="table-auto">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold">Họ và tên đệm: </td>
                                            <td className="capitalize pl-10 md:pl-20 text-slate-500">
                                                {userDoc[0].firstName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold ">Tên: </td>
                                            <td className="capitalize pl-10 md:pl-20 text-slate-500">
                                                {userDoc[0].lastName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Email: </td>
                                            <td className="pl-10 md:pl-20 text-slate-500">{userDoc[0].email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {subpage === 'payment' && (
                            <div className="px-10 md:px-32">
                                <h1 className="text-3xl font-semibold text-primary">Thông tin thanh toán</h1>
                            </div>
                        )}
                        {subpage === 'safety' && (
                            <div className="px-10 md:px-32">
                                <h1 className="text-3xl font-semibold text-primary">Bảo mật</h1>
                            </div>
                        )}
                        {subpage === 'preference' && (
                            <div className="px-10 md:px-32">
                                <h1 className="text-3xl font-semibold text-primary">Cài đặt</h1>
                            </div>
                        )}
                        {subpage === 'notification' && (
                            <div className="px-10 md:px-32">
                                <h1 className="text-3xl font-semibold text-primary">Thông báo</h1>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="flex place-content-center mt-20">
                <button
                    className="flex items-center float-right my-2 cursor-pointer border p-2 rounded-xl  border-primary hover:border-2   transition-colors duration-300 "
                    onClick={logout}
                >
                    <span className="material-symbols-outlined text-primary">logout</span>
                    <h1 className="font-semibold text-primary ">Đăng xuất</h1>
                </button>
            </div>
        </div>
    );
}
