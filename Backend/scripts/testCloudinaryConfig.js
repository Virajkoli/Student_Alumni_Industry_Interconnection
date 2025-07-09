// Test Cloudinary configuration
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function testCloudinaryConfig() {
  try {
    console.log("Testing Cloudinary configuration...");
    console.log("Cloud Name:", process.env.CLOUD_NAME);
    console.log("API Key:", process.env.API_KEY ? "Set" : "Not Set");
    console.log("API Secret:", process.env.API_SECRET ? "Set" : "Not Set");

    // Test connection by getting account info
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connection successful:", result);

    // Test upload with a simple text file
    const uploadResult = await cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "scaips/posts",
        public_id: "test-upload",
      },
      (error, result) => {
        if (error) {
          console.error("❌ Upload error:", error);
        } else {
          console.log("✅ Upload successful:", result.secure_url);
        }
      }
    );

    // Pass some test data to the upload stream
    uploadResult.end("This is a test file content for Cloudinary");
  } catch (error) {
    console.error("❌ Cloudinary test failed:", error);
  }
}

testCloudinaryConfig();
