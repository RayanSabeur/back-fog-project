
import mongoose from 'mongoose';
mongoose
.connect(
    "mongodb+srv://" + 'RSabeur:Thelastofus2' + "@backfog.swbzr6h.mongodb.net/BackFog",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));