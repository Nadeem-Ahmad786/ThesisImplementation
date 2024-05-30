const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const videoController = require('../controllers/video');
const { authenticateJWT } = require('../middlewares/authenticator');

router.post('/upload', authenticateJWT, upload.single('video'), videoController.create);
router.get('/currentUser', authenticateJWT, videoController.readCurrentUserVideo);
router.get('/watch/:videoId', authenticateJWT, videoController.watchVideo)
router.get('/singleRead/:id', authenticateJWT, videoController.readSingle)
router.post('/filter', authenticateJWT, videoController.filterVideos);
router.post('/block-tag', authenticateJWT, videoController.blockTag);
router.post('/unblock-tag', authenticateJWT, videoController.unblockTag);
router.get('/view-blocked-tags', authenticateJWT, videoController.viewBlockedTags);
router.get('/recent-tags', authenticateJWT, videoController.recentlyWatchedTags);
router.get('/top-watch', authenticateJWT, videoController.topWatch)

module.exports = router;