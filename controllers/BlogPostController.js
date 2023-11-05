import BlogPost from "../models/BlogPostModel.js";
import Users from "../models/UserModel.js";

export const getAllBlogPost = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      attributes: ["id", "title", "body"],
      include: [
        {
          model: Users,
          attributes: ["id", "username", "email"],
        },
      ],
    });
    res.json(blogPosts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const GetByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const blogPost = await BlogPost.findAll({
      where: {
        userId: userId,
      },
      attributes: ["id", "title", "body"],
      include: [
        {
          model: Users,
          attributes: ["id", "username", "email"],
        },
      ],
    });
    return res.json(blogPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const CreateBlogPost = async (req, res) => {
  const { title, body, userId } = req.body;
  try {
    await BlogPost.create({
      title: title,
      body: body,
      userId: userId,
    });
    res.status(200).json({ msg: "BlogPost Created Success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const UpdateBlogPost = async (req, res) => {
  const { title, body, userId } = req.body;
  try {
    await BlogPost.update(
      {
        title: title,
        body: body,
        userId: userId,
      },
      { returning: true, where: { id: req.params.id } }
    );
    res.status(200).json({ msg: "BlogPost Update Success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const DeleteBlogPost = async (req, res) => {
  try {
    await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "BlogPost Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};
