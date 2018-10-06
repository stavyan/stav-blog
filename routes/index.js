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

/**
 *@des giibook 路由
 *@author stav stavyan@qq.com
 *@date 2018/10/06 17:16:14
 */
router.get('/stavblog', (req, res, next) => {
    res.render('stavblog/index');
});

module.exports = router;
