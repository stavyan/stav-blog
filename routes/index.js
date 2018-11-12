const express = require('express');
const router = express.Router();
const path = require('path');
const async = require('async');
const category = require('../proxy/category');
const tool = require('../utility/tool');

router.get('/', (req, res, next) => {
    async.parallel([
        // 获取配置
        function (cb) {
            tool.getConfig(path.join(__dirname, '../config/settings.json'), (err, settings) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, settings);
                }
            });
        },

        // 获取分类
        function (cb) {
            category.getAll((err, categories) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, categories);
                }
            });
        }
    ], (err, results) => {
        let settings,
            categories;
        if (err) {
            next(err);
        } else {
            settings = results[0];
            categories = results[1];
            res.render('blog/index', {
                cateData: categories,
                settings,
                title: settings.SiteName,
                currentCate: '',
                isRoot: true
            });
        }
    });
});

// /* Stav-Blog. */
// router.get('/stavblog', function(req, res, next) {
//     res.render('stavblog/index', { title: '斯塔夫部落格' });
// });

/* Resume. */
router.get('/resume201810', function(req, res, next) {
    res.render('resume201810/index', { title: '个人简历201810' });
});

/* Front-End-Standards. */
router.get('/frontstandards', function(req, res, next) {
    res.render('frontendstandards/index', { title: 'Web前端规范' });
});

module.exports = router;
