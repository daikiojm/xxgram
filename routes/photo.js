const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const mime = require('mime-types');
const router = express.Router();

/**
 * multerの設定
 */
const storage = multer.diskStorage({
  // ファイルの保存先を指定
  destination: (req, file, cb) => {
    cb(null, 'public/images/userdata');
  },
  // ファイル名を指定(UUID + mimeから取得した拡張子)
  filename: (req, file, cb) => {
    const filename = uuidv4();
    const ext = mime.extension(file.mimetype);
    cb(null, `${filename}.${ext}`);
  }
});

const upload = multer({ storage: storage });

/**
 * 写真アップロード
 */
router.post('/upload', upload.single('photo'), (req, res, next) => {
  const fileTypes = req.file.filename.split('.');
  const name = fileTypes[0];
  const ext = fileTypes[1];

  // UUIDと拡張子を分割して返す
  res.status(200).json({
    id: name,
    ext: ext
  });
});

module.exports = router;
