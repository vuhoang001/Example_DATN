const multer = require("multer");

const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const allowedVideoTypes = [
  "video/mp4",
  "video/avi",
  "video/mov",
  "video/mkv",
  "video/webm",
];

// Tạo cấu hình multer để lưu các tệp video và hình ảnh
const uploadDisk = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/uploads"); // Địa chỉ lưu tệp
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`); // Tên tệp theo timestamp để tránh trùng
    },
  }),
  // Kiểm tra loại tệp (hình ảnh hoặc video)
  fileFilter: function (req, file, cb) {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true); // Cho phép tệp hình ảnh
    } else if (allowedVideoTypes.includes(file.mimetype)) {
      cb(null, true); // Cho phép tệp video
    } else {
      cb(new Error("Only image and video files are allowed!"), false); // Lỗi nếu không phải hình ảnh hoặc video
    }
  },
  // Giới hạn kích thước tệp, ví dụ giới hạn 100MB
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

module.exports = {
  uploadDisk,
};
