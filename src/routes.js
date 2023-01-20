const Router = require('@koa/router');
const router = new Router();
const multer = require('@koa/multer');
const path = require('path');
const upload = multer({
    dest: path.resolve(__dirname, '../', 'storage')
});

const { myLogging } = require('./middleware/logging');
const { verify } = require('./middleware/auth');

const webController = require('./web/controller');
const apiUserController = require('./api/user/controller');
const apiFeedController = require('./api/feed/controller');

router.use(myLogging)

/**
 * 잘못된 코드지만 알아둘 것
 * `upload` -> `:id`
 * `/file`로 들어오면 upload 먼저 수행하고, id에 파라미터로 받음
 */
router.post('/file/upload', upload.single('file'), require('./api/file/controller').upload);
router.get('/file/:id', require('./api/file/controller').download);

router.get('/', webController.home);
router.get('/page/:page', webController.page);

router.post('/api/user/register', apiUserController.register);
router.post('/api/user/login', apiUserController.login);

// router.use(verify);
router.get('/user/:id', apiUserController.info);

router.get('/api/feed', apiFeedController.index);
router.post('/api/feed', apiFeedController.store);
router.get('/api/feed/:id', apiFeedController.show);
router.put('/api/feed', apiFeedController.update);
router.delete('/api/feed/:id', apiFeedController.delete);

module.exports = router;