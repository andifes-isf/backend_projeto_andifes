import app from "./app"
import './database'

// Listen on all network interfaces
app.listen(8800, "0.0.0.0", () => {
  console.log("Server is running on port 8800");
});
