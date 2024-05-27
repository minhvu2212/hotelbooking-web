import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Perk from '../Perk';
import axios from 'axios';
import AccountNav from '../AccountNav';

export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then((response) => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text) {
        return <h2 className="text-2xl mt-4 text-primary font-semibold">{text}</h2>;
    }
    function inputDescription(text) {
        return <p className=" text-sm">{text}</p>;
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        if (photoLink) {
            setAddedPhotos((prev) => {
                return [...prev, photoLink];
            });
            setPhotoLink('');
        }
    }

    async function removePhoto(filename) {
        setAddedPhotos(addedPhotos.filter((photo) => photo !== filename));
    }

    async function deletePlace(ev) {
        ev.preventDefault();
        if (id) {
            const res = await axios.delete(`/places/${id}`, {});
            if (res.status === 200) {
                alert('Delete success !');
            }
        }
        setRedirect(true);
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };
        if (id) {
            await axios.put('/places', {
                id,
                ...placeData,
            });
        } else {
            await axios.post('/places', placeData);
        }
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />;
    }

    return (
        <div className="sm:w-4/5 mx-auto px-10">
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Tên khách sạn', 'Đặt tên cho khách sạn của bạn')}
                <input
                    className="w-full text-primary border border-primary mr-1 mt-2 py-1 px-4 rounded-xl"
                    type="text"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                    placeholder="tên, ví dụ: Khách sạn Mường Thanh"
                />
                {preInput('Địa chỉ', 'Địa chỉ của khách sạn')}
                <input
                    className="w-full border border-primary mr-1 mt-2 py-1 px-4 rounded-xl"
                    type="text"
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                    placeholder="Địa chỉ"
                />
                {preInput('Ảnh', 'Nhiều ảnh')}
                <div className="flex gap-2 py-2">
                    <input
                        className="w-full border border-primary mr-1 py-1 px-4 rounded-xl"
                        type="text"
                        value={photoLink}
                        onChange={(ev) => setPhotoLink(ev.target.value)}
                        placeholder="link ảnh"
                    />
                    <button onClick={addPhotoByLink} className=" bg-primary text-white px-4 rounded-xl font-semibold">
                        +
                    </button>
                </div>
                <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length > 0 &&
                        addedPhotos.map((link) => (
                            <div className="flex h-52 relative" key={link}>
                                <img className="rounded-xl" src={link} />
                                <div className="absolute top-2 left-2">
                                    <button
                                        onClick={() => removePhoto(link)}
                                        className="text-white p-1 material-symbols-outlined bg-gray-950 rounded-xl bg-opacity-30"
                                    >
                                        xoá
                                    </button>
                                </div>
                            </div>
                        ))}
                    <label className="h-52 border border-primary cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            // onChange={uploadPhoto}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 text-primary"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                        </svg>
                        <span className="text-primary font-semibold">Tải ảnh</span>
                    </label>
                </div>
                {preInput('Mô tả', 'Giới thiệu về khách sạn này')}
                <textarea
                    className="border border-primary"
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                />
                {preInput('Dịch vụ', 'Lựa chọn những dịch vụ mà khách sạn bạn có')}
                <div className="grid  mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perk selected={perks} onChange={setPerks} />
                </div>
                {preInput('Thông tin thêm', 'Quán ăn xung quanh, địa điểm du lịch gần đó,...')}
                <textarea
                    className="border border-primary"
                    value={extraInfo}
                    onChange={(ev) => setExtraInfo(ev.target.value)}
                />
                {preInput('Thời gian vào ra', 'Thêm thời gian khách hàng có thể thuê')}
                <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Thời gian vào</h3>
                        <input
                            className="w-full border border-primary my-2 py-2 px-4 rounded-xl"
                            type="text"
                            value={checkIn}
                            onChange={(ev) => setCheckIn(ev.target.value)}
                            placeholder="14:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Thời gian ra</h3>
                        <input
                            className="w-full border border-primary my-2 py-2 px-4 rounded-xl"
                            type="text"
                            value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                            placeholder="11:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Số lượng khách tối đa</h3>
                        <input
                            className="w-full border border-primary my-2 py-2 px-4 rounded-xl"
                            type="number"
                            value={maxGuests}
                            onChange={(ev) => setMaxGuests(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Giá một đêm</h3>
                        <input
                            className="w-full border border-primary my-2 py-2 px-4 rounded-xl"
                            type="number"
                            value={price}
                            onChange={(ev) => setPrice(ev.target.value)}
                        />
                    </div>
                </div>
                <button className="w-full bg-primary text-white my-4 py-2 border rounded-xl text-xl font-semibold">
                    Lưu
                </button>
            </form>
            {id && (
                <button
                    onClick={deletePlace}
                    className="w-full bg-red-400 text-white mb-4 py-2 border rounded-xl text-xl font-semibold"
                >
                    Xoá khách sạn
                </button>
            )}
        </div>
    );
}
