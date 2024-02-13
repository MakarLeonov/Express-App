const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
    try {
        // Деструктуризация ответа (обрезается buf, чтобы был только массив постов)
        const [posts, _] = await Post.findAll();

        res.status(200).json({count: posts.length, posts});
    } catch(error) {
        console.log(error);
        next(error)
    }
}

exports.getPostById = async (req, res, next) => {
    try {
        let postId = req.params.id;
        let [post, _] = await Post.findById(postId);

        res.status(200).json({post: post[0]});
    } catch(error) {
        console.log(error);
        next(error)
    }
}

exports.createNewPost = async (req, res, next) => {
    try {
        let { title, body } = req.body;
        let post = new Post(title, body);

        post = await post.save();
        
        res.status(201).json({ status: 201, message: "Пост успешно создан" });
    } catch(error) {
        console.log(error);
        next(error)
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        let postId = req.params.id;
        let result = await Post.delete(postId);
        console.log(result)
        res.send("Запись успешно удалена")
    } catch(error) {
        console.log(error);
        next(error)
    }
}