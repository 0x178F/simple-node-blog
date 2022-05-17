const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    post_image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

postSchema.statics.getAll = async function () {
    return await this.find({}).sort({
        $natural: -1
    })
}


// PostSchema.pre('save', async ()=>{
//     await console.log("pre çalıştı");
// })

// PostSchema.pre('save', function(next) {
//     next();
//   });

// schema.pre('save', async function() {
//     await doStuff();
//     await doMoreStuff();
//   });

module.exports = mongoose.model('Post', postSchema)