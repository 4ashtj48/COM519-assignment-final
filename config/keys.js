dbPassword = 'mongodb+srv://admin:'+ encodeURIComponent('admin123') + '@cluster0.mfs0d.mongodb.net/<dbname>?retryWrites=true&w=majority';

module.exports = {
    mongoURI: dbPassword
};


// module.exports = {
//     MongoURI: 'mongodb+srv://admin:<admin123>@cluster0.mfs0d.mongodb.net/<dbname>?retryWrites=true&w=majority'
// }
