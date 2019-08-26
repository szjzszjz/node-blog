/*
Navicat MySQL Data Transfer

Source Server         : localhost-3306
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : node-blog

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2019-08-26 19:30:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `createtime` bigint(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  `categories` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('17', 'Vue.js刷新当前页面', 'Vue.js的路由跳转很强大，类似ajax的局部刷新，路由跳转时候页面是不刷新的，刷新当前页面的功能不建议用，但是有的时候确实需要刷新当前页面来实现某些需求，这个时候，我们有三 种方法可以实现。\n\n \n\n第一种就是传统的的方法\n\nwindow.location.reload();\n \n\n第二种是通过vue.js的路由来实现\n\nthis.$router.go(0)', '1566810202268', '石中君子', 'Vue.js');
INSERT INTO `blog` VALUES ('18', '人类正常能活140岁，是什么吞噬了我们的生命？000', '自封建时代开始，人类就开始探索如何延年益寿，资源最丰富者莫过于皇帝，他们享有无限的江山美女，巴望着长生不老、永葆青春，于是，皇帝特喜欢招贤纳士、炼制丹药，尤其是明朝的一些皇帝，更是以“炼制丹药”为主业。遗憾的是，据史料记载，古代的皇帝大都不长命，甚至很少有人超过70岁，一方面，皇帝炼制丹药且长期服用，实在是一种慢性自杀；另一方面，皇帝治理江山要花费大量的精力，如最勤政的皇帝雍正，每天只睡4小时，一个人顶五个人干活，仅仅在位13年，而他老子康熙虽然比较注重保养，却也仅仅活到69岁而已，当千古一帝垂垂老矣之时，仰天长叹：向天再借500年。', '1566810266526', '阿里', 'Vue.js,Rect');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `realname` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '111', 'lisi');
