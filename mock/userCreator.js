let User = require('../models/userschema');
const userMock = require('../mock/mockUsers');

User.remove({}, function (err, user) {

    if (err) console.log('err');
    if(user)insertMockData();
});

function insertMockData() {
    console.log('userMock: ' + userMock[1]);

    User.collection.insert(userMock, function(err, user) {
        if (err) console.log(err);
        if (user) console.log('Mock users inserted: ' + user.insertedCount);
    });
}