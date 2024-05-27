import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';
import BookingDates from '../BookingDates';
import Rate from '../Rate';

export default function BookingPage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [booking, setBooking] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [rate, setRate] = useState(3);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then((response) => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                    setPlace(foundBooking.place);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    async function deleteBooking(ev) {
        ev.preventDefault();
        if (id) {
            await axios.delete(`/bookings/${id}`, {});
        }
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to={'/account/bookings'} />;
    }

    async function sendFeedback(ev) {
        ev.preventDefault();
        await axios.post('/feedback', {
            place: place._id,
            comment,
            rate,
        });
        alert('Feedback successful.');
        setRedirect(true);
    }

    return (
        <div className="my-4 lg:mx-80 mx-10">
            <h1 className="text-3xl text-primary font-semibold">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4 font-semibold text-primary">Thông tin đặt phòng:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Tổng giá tiền</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />

            <button
                onClick={deleteBooking}
                className=" mt-8 w-full bg-red-400 text-white mb-4 py-2 border rounded-xl text-xl font-semibold"
            >
                Huỷ đặt phòng
            </button>
            <div className="pt-5 border-t-2 mt-3">
                <label className="block mb-2 text-xl font-semibold">Nhận xét của bạn</label>
                <textarea
                    value={comment}
                    onChange={(ev) => setComment(ev.target.value)}
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="Hãy nhận xét ở đây..."
                ></textarea>
                <h1 className="font-semibold text-xl py-3">Bạn đánh giá khách sạn như thế nào?</h1>
                <Rate rating={rate} onRating={(rate) => setRate(rate)} />
                <button
                    onClick={sendFeedback}
                    className=" mt-5 w-full bg-primary hover:bg-blue-500 text-white mb-4 py-2 border rounded-xl text-xl font-semibold"
                >
                    Gửi đánh giá
                </button>
            </div>
        </div>
    );
}
