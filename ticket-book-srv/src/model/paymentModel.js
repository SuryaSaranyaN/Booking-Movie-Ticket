import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  booking_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;