
import mongodb from 'mongoose'
mongoose
  .connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.gfadz.mongodb.net/mern-project",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));