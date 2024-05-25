const Video = require("../models/Video");
const User = require("../models/User");


exports.create = async (req, res) => {
  try{
    const { _id } = req.user;
    console.log(_id)
    // Create a new video record
    const video = new Video({
      userId: _id,
      age: req.body.age,
      tag: req.body.tag,
      url: req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename
    });

    // Save the video record
    await video.save();
    console.log(video._id)
    // Update the user's videos array with the new video ID
    await User.findByIdAndUpdate(_id, { $push: { video: video._id } });

    res.json({ message: 'Video uploaded successfully' });
  } catch (error) {
    console.error('Error uploading video', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.readSingle = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let Video = await Video.findOne({ _id: id });
    console.log(Video);
    res.status(200).json(Video);
  } catch (error) {
    console.log(error);
  }
};

exports.readCurrentUserVideo = async (req, res) => {
  try {
    const {_id} = req.user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.populate('videos').execPopulate();

    const userVideos = user.videos.map((video) => ({
      age: video.age,
      tag: video.tag,
      url: video.url,
      createdAt: video.createdAt,
    }));

    res.json({ videos: userVideos });
  } catch (error) {
    console.error('Error fetching user videos', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.filterVideos = async (req, res) => {
  const { ageMin, ageMax, tags } = req.body;
  
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).exec();
    if (user && user.age < ageMax) {
      return res.status(403).json({ error: 'You are not old enough to access these videos' });
    }

    // Exclude blocked tags from the search
    const blockedTags = user.blockedTags || [];
    const query = {
      age: { $gte: ageMin, $lte: ageMax },
      tag: { $in: tags.map(tag => tag.toLowerCase()).filter(tag => !blockedTags.includes(tag)) }
    };

    const videos = await Video.find(query).exec();
    
    console.log('Filtered videos:', videos); 

    if (videos.length === 0) {
      return res.status(404).json({ error: 'No videos found' });
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error('Error filtering videos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.watchVideo = async (req, res) => {
  const { _id } = req.user; 

  try {
    // Get the video details
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found/deleted' });
    }

    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update tag count in user's topWatch array
    video.tag.forEach(tag => {
      const existingTag = user.topWatch.find(item => item.tag === tag);
      if (existingTag) {
        existingTag.count++;
      } else {
        user.topWatch.push({ tag, count: 1 });
      }
    });

    // Sort topWatch array based on count in ascending order
    user.topWatch.sort((a, b) => a.count - b.count);

    // Save the updated user document
    await user.save();

    res.json({ message: 'Tag count updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.blockTag = async (req, res) => {
  try {
    const { _id } = req.user;
    const { tag } = req.body;

    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the tag to the blockedTags array if it doesn't already exist
    if (!user.blockedTags.includes(tag.toLowerCase())) {
      user.blockedTags.push(tag.toLowerCase());
      await user.save();
    }

    res.json({ message: 'Tag blocked successfully' });
  } catch (error) {
    console.error('Error blocking tag:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.recentlyWatchedTags = async (req, res) => {
  try {
    const { _id } = req.user;

    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the five most recently watched tags
    const recentTags = user.topWatch
      .sort((a, b) => b.updatedAt - a.updatedAt) // Adjust sorting based on your actual data
      .slice(0, 5);

    res.json({ recentTags });
  } catch (error) {
    console.error('Error fetching recent tags:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.readAll = async (req, res) => {
  try {
    let Videos = await Video.find({});
    res.status(200).json(Videos);
  } catch (error) {
    console.log(error);
  }
};