const {Router}=require('express');
const controllers=require('../controllers/controllers');
const middlewares=require('../middlewares/middlewares');
const router=Router();


//router.get('/login',controllers.get_login);

//router.get('/signup',controllers.get_signup);

//to logout
router.get('/logout',controllers.get_logout);

//post login
router.post('/login',controllers.post_login);

//post signup
router.post('/signup',controllers.post_signup);



//post books (to get all books || books depends on category || single book)
router.post('/postBooks',controllers.postBooks);//3 apis in 1

//get search result
router.get('/search/:input',controllers.get_searchResult);
//post search result
router.post('/search',controllers.post_searchResult);

//get cart
router.get('/getcart',middlewares.checklogin,controllers.get_cart);

//delete from cart,send book id
router.get('/cart/:id',controllers.delete_from_cart);



module.exports = router;