const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    // deleteFriend
} = require("../../controllers/usersControllers");

router.route('/')
.get(getUsers)
.post(createUser)

router.route('/:usersID')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser)

router.route('/:usersID/friends')
.post(addFriend)

// router.route('/usersID/friends/:friendsID')
// .delete(deleteFriend)

module.exports = router;