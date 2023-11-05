import BlogPost from "../models/BlogPostModel.js";
import Comments from "../models/CommentsModel.js";
import Users from "../models/UserModel.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comments.findAll({
      attributes: ["id", "comment"],
      include: [
        {
          model: BlogPost,
          attributes: ["id", "title", "body"],
          include: [
            {
              model: Users,
              attributes: ["id", "username", "email"],
            },
          ],
        },
      ],
    });
    res.json(comments);
  } catch (error) {
    console.log(error.message);
  }
};

export const getByBlogPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comment = await Comments.findAll({
      where: {
        postId: postId,
      },
      attributes: ["id", "comment"],
      include: [
        {
          model: BlogPost,
          attributes: ["id", "title", "body"],
          include: [
            {
              model: Users,
              attributes: ["id", "username", "email"],
            },
          ],
        },
      ],
    });

    return res.json(comment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const createComment = async (req, res) => {
  const { postId, userId, comment } = req.body;
  try {
    await Comments.create({
      postId: postId,
      userId: userId,
      comment: comment,
    });
    res.status(200).json({ msg: "Comment Created Success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const UpdateComment = async (req, res) => {
  const { postId, userId, comment } = req.body;
  try {
    await Comments.update(
      {
        postId: postId,
        userId: userId,
        comment: comment,
      },
      { returning: true, where: { id: req.params.id } }
    );
    res.status(200).json({ msg: "Commment Update Success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const DeleteComment = async (req, res) => {
  try {
    await Comments.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Comment Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};
