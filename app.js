const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const fs = require("fs");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.get("/api/v1/users", (req, res) => {
  const dataUsers = JSON.parse(
    fs.readFileSync("./dev-data/users.json", "utf8")
  );
  res.status(200).send(dataUsers);
});
app.get("/api/v1/users/:id", (req, res) => {
  const dataUsers = JSON.parse(
    fs.readFileSync("./dev-data/users.json", "utf8")
  );
  const id = req.params.id;
  const userId = dataUsers.find((user) => user.id == id);
  if (userId) {
    res.status(200).send(userId);
  } else {
    res.status(404).send("User not found");
  }
});
app.post("/api/v1/users/", (req, res) => {
  const dataInput = req.body;
  const id = req.params.id;
  const dataUsers = JSON.parse(
    fs.readFileSync("./dev-data/users.json", "utf8")
  );
  const userIsExist = dataUsers.find((user) => user.id == id);
  if (userIsExist) {
    res.status(409).send("user already exists");
  } else {
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      ...dataInput,
    };
    dataUsers.push(newUser);
    fs.writeFileSync("./dev-data/users.json", JSON.stringify(dataUsers));
    res.status(200).send("Success");
  }
});
app.put("/api/v1/users/:id", (req, res) => {
  const dataInput = req.body;
  const id = req.params.id;
  const dataUsers = JSON.parse(
    fs.readFileSync("./dev-data/users.json", "utf8")
  );
  const userUpdate = dataUsers.find((user) => user.id == id);
  if (userUpdate) {
    const newDataUsers = dataUsers.map((user) => {
      if (user.id == id) {
        return {
          ...user,
          ...dataInput,
        };
      }
      return user;
    });
    fs.writeFileSync("./dev-data/users.json", JSON.stringify(newDataUsers));
    res.status(200).send("updated ");
  } else {
    res.status(200).send("user not found");
  }
});
app.delete("/api/v1/users/:id", (req, res) => {
  const id = req.params.id;
  const dataUsers = JSON.parse(
    fs.readFileSync("./dev-data/users.json", "utf8")
  );
  const newDataUsers = dataUsers.filter((user) => user.id != id);
  fs.writeFileSync("./dev-data/users.json", JSON.stringify(newDataUsers));
  res.status(200).send("deleted successfully");
});
app.get("/api/v1/posts", (req, res) => {
  const dataPosts = JSON.parse(
    fs.readFileSync("./dev-data/posts.json", "utf8")
  );
  res.status(200).send(dataPosts);
});
app.get("/api/v1/posts/:id", (req, res) => {
  const dataPosts = JSON.parse(
    fs.readFileSync("./dev-data/posts.json", "utf8")
  );
  const id = req.params.id;
  const postId = dataPosts.find((post) => post.id == id);
  if (postId) {
    res.status(200).send(postId);
  } else {
    res.status(404).send("Post not found");
  }
});
app.post("/api/v1/posts/", (req, res) => {
  const dataInput = req.body;
  const id = req.params.id;
  const dataPosts = JSON.parse(
    fs.readFileSync("./dev-data/posts.json", "utf8")
  );
  const postIsExist = dataPosts.find((post) => post.id == id);
  if (postIsExist) {
    res.status(409).send("post already exists");
  } else {
    const newPost = {
      id: Number(Math.floor(Math.random() * 1000)),
      ...dataInput,
    };
    console.log("newPost", newPost);
    dataPosts.push(newPost);
    fs.writeFileSync("./dev-data/posts.json", JSON.stringify(dataPosts));
    res.status(200).send("Success");
  }
});
app.put("/api/v1/posts/:id", (req, res) => {
  const dataInput = req.body;
  const id = req.params.id;
  const dataPosts = JSON.parse(
    fs.readFileSync("./dev-data/posts.json", "utf8")
  );
  const postUpdate = dataPosts.find((post) => post.id == id);
  if (postUpdate) {
    const newDataPosts = dataPosts.map((post) => {
      if (post.id == id) {
        return {
          ...post,
          ...dataInput,
        };
      }
      return post;
    });
    fs.writeFileSync("./dev-data/posts.json", JSON.stringify(newDataPosts));
    res.status(200).send("updated ");
  } else {
    res.status(200).send("post not found");
  }
});
app.delete("/api/v1/posts/:id", (req, res) => {
  const id = req.params.id;
  const dataPosts = JSON.parse(
    fs.readFileSync("./dev-data/posts.json", "utf8")
  );

  const newDataPosts = dataPosts.filter((post) => post.id != id);
  fs.writeFileSync("./dev-data/posts.json", JSON.stringify(newDataPosts));
  res.status(200).send("deleted successfully");
});
app.get("/api/v1/users/:id/posts", (req, res) => {
  const userId = req.params.id;
  const arr = [];
  const dataPosts = JSON.parse(
    fs.readFileSync("./dev-data/posts.json", "utf8")
  );
  const postOfUser = dataPosts.map((post) => {
    if (post.userId == userId) {
      arr.push(post);
      return arr;
    }
    return post;
  });
  res.status(200).send(arr);
});
app.listen(port, () => {
  console.log("http://localhost:3500");
});
