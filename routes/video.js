const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const videoController = require('../controllers/video');
const { authenticateJWT } = require('../middlewares/authenticator');

router.post('/', authenticateJWT, upload.single('video'), videoController.create);
router.get('/currentUser', authenticateJWT, videoController.readCurrentUserVideo);
router.get('/watch-video/:videoId', authenticateJWT, videoController.watchVideo)
router.get('/:id', videoController.readSingle)
router.post('/filter', authenticateJWT, videoController.filterVideos);
router.post('/block-tag', authenticateJWT, videoController.blockTag);
router.get('/recent-tags', authenticateJWT, videoController.recentlyWatchedTags);
module.exports = router;