import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // expire after 7 days
});

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);
