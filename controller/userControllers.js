const Post = require('./blogController');

const index = async (req, res) => {

  const post = await Post.getAllPost(req,res)

  console.log(post);
  res.render('index', {
    postData: post.postData,
    current: parseInt(post.page),
    pages: Math.ceil(post.postCount / post.postPerPage),
    pageTitle: "Home Page"
  });
}

const contact = (req, res) => {
  res.render('contact');
};

module.exports = {
  contact,
  index
}