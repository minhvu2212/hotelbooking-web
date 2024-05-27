import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function IndexPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/top-feedback').then((response) => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="mx-10 lg:mx-16 -mt-5">
            <div className="mt-5">
                <h1 className="text-3xl font-bold text-primary ">Khánh sạn được yêu thích</h1>
                <div className="mt-6 grid gap-x-4 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {places.length > 0 &&
                        places.map((doc) => (
                            <Link to={'/place/' + doc.place._id} key={doc.place._id}>
                                <div className="border p-4 rounded-xl shadow-lg border-primary ">
                                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                                        {doc.place.photos?.[0] && (
                                            <img
                                                className="rounded-2xl object-cover aspect-square w-full"
                                                src={doc.place.photos?.[0]}
                                                alt=""
                                            />
                                        )}
                                        {!doc.place.photos?.[0] && (
                                            <img
                                                className="rounded-2xl object-cover aspect-square"
                                                src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                                                alt=""
                                            />
                                        )}
                                    </div>
                                    <div className="h-28">
                                        <h2
                                            className="font-bold text-primary"
                                            style={{
                                                width: '200px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {doc.place.title}
                                        </h2>
                                        <br />

                                        <h3 className="text-sm flex justify-between">{doc.place.address}</h3>
                                    </div>

                                    <div className="mt-1 flex justify-between">
                                        <div>
                                            <span className="font-bold text-primary">${doc.place.price}</span>
                                            <span className="font-bold text-primary">/đêm</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="material-symbols-outlined text-lg font-bold text-secondary">
                                                star
                                            </span>
                                            <h1 className="font-bold text-secondary">{doc.rating.toPrecision(2)}</h1>
                                            <h1 className="font-bold text-secondary">/5</h1>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </Link>
                        ))}
                </div>

                <div
                    style={{
                        backgroundImage: `url("https://blog.japanwondertravel.com/wp-content/uploads/2020/03/shibuya-sky-1200x836.jpg")`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                    className="rounded-3xl shadow-lg text-center py-36 mt-5 px-3 "
                >
                    <h1 className="text-5xl font-bold text-white pb-2">Đặt phòng với TravelBooking </h1>
                    <h2 className="text-2xl  text-white opacity-90">
                        1.000.000 phòng trên khắp thế giới đang chờ bạn!
                    </h2>
                </div>
                <div className="mt-5">
                    <h1 className="text-3xl font-bold text-primary">Điểm đến phổ biến</h1>
                    <div className="grid md:grid-cols-4 grid-cols-2 mt-5 gap-6">
                        <Link
                            to={'/find/Ha noi'}
                            className="rounded-3xl shadow-lg border border-primary"
                            style={{
                                backgroundImage: `url("https://vcdn1-dulich.vnecdn.net/2022/05/11/hoan-kiem-lake-7673-1613972680-1508-1652253984.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=2wB1cBTUcNKuk68nrG6LMQ")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                        >
                            <div className="pt-3 flex pb-3 pl-3 ">
                                <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-100 text-primary font-bold border border-primary">
                                    Hà Nội
                                </h1>
                            </div>
                        </Link>
                        <div className="grid-rows-2 ">
                            <div
                                className="rounded-3xl shadow-lg border border-primary"
                                style={{
                                    backgroundImage: `url("https://statics.vinpearl.com/nha-trang-beaches-banner%20-%20Copy_1660569595.jpg")`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}
                            >
                                <Link to={'/find/Nha Trang'} className="pt-52 flex pb-3 pl-3 mb-4 ">
                                    <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-100 text-primary font-bold border border-primary ">
                                        Nha Trang
                                    </h1>
                                </Link>
                            </div>
                            <br />
                            <div
                                className="rounded-3xl shadow-lg border border-primary"
                                style={{
                                    backgroundImage: `url("https://cdnmedia.baotintuc.vn/Upload/c2tvplmdloSDblsn03qN2Q/files/2020/11/04/thanh-pho-thu-duc-tp-ho-chi-minh-41120.jpg")`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}
                            >
                                <Link to="/find/Ho Chi Minh" className="pt-28 flex pb-3 pl-3">
                                    <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-100 text-primary font-bold border border-primary">
                                        Thành phố Hồ Chí Minh
                                    </h1>
                                </Link>
                            </div>
                        </div>
                        <Link
                            to="/find/Da Nang"
                            className="rounded-3xl shadow-lg border border-primary"
                            style={{
                                backgroundImage: `url("https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/ur2mrg23d91mex03l4mw.jpg")`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                        >
                            <div className="pt-3 flex pb-3 pl-3">
                                <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-100 text-primary font-bold border border-primary">
                                    Đà Nẵng
                                </h1>
                            </div>
                        </Link>
                        <div className="grid-rows-2 grid-flow-row ">
                            <div
                                className="rounded-3xl shadow-lg border border-primary "
                                style={{
                                    backgroundImage: `url("https://vcdn1-dulich.vnecdn.net/2022/04/18/dulichSaPa-1650268886-1480-1650277620.png?w=0&h=0&q=100&dpr=2&fit=crop&s=JTUw8njZ_Glkqf1itzjObg")`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}
                            >
                                <Link to="/find/Sa Pa" className="pt-32 flex pb-3 pl-3 mb-4">
                                    <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-100 text-primary font-bold border border-primary">
                                        Sa Pa
                                    </h1>
                                </Link>
                            </div>
                            <br />
                            <div
                                className="rounded-3xl shadow-lg border border-primary"
                                style={{
                                    backgroundImage: `url("https://nld.mediacdn.vn/291774122806476800/2021/11/26/cap-treo-hon-thom-02-1637912751786500410806.jpg")`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    // border: '2px solid primary',
                                }}
                            >
                                <Link to="/find/Phu Quoc" className="pt-48 flex pb-3 pl-3">
                                    <h1 className="px-3 rounded-xl bg-gray-100 bg-opacity-100 text-primary font-bold border border-primary ">
                                        Phú Quốc
                                    </h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                <button className="flex items-center float-right my-2 cursor-pointer border p-2 rounded-xl  border-primary hover:border-2   transition-colors duration-300 ">
                    <Link to="/all" className="flex items-center">
                        <h1 className="pr-1 text-primary font-bold no-underline ">Xem tất cả khách sạn</h1>
                        <span className="material-symbols-outlined text-primary font-bold ">arrow_right_alt</span>
                    </Link>
                </button>
            </div>
        </div>
    );
}
