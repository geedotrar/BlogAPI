import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const BlogPost = db.define(
  "blog_posts",
  {
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);
BlogPost.belongsTo(Users, { foreignKey: "userId" });

export default BlogPost;
