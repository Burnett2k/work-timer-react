import mongoose from 'mongoose';

// connect to mongo
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: 3000,
});

var db = mongoose.connection;

db.on('connected', () => {
  console.log('connected!');
});
db.on('disconnected', () => {
  console.log('connected!');
});
db.on('error', (error) => {
  console.log(`error occurrect: ${error}`);
});
