const Post = require('../model/post');
const User = require('../model/user');



module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        // populate the user for each comment
        .populate({
            path: 'comments',
            populate: {
                path: 'user likes'
            }
        }).populate('likes');
    
        let users = await User.find({});

        return res.render('home', {
            title: "Connect-Us | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
