import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import BlogPost from "./BlogPostModel.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "blog_posts",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

Comments.belongsTo(BlogPost, { foreignKey: "postId" });
Comments.belongsTo(Users, { foreignKey: "userId" });

export default Comments;
