/*
Navicat MySQL Data Transfer

Source Server         : 789
Source Server Version : 50090
Source Host           : 127.0.0.1:3306
Source Database       : msd

Target Server Type    : MYSQL
Target Server Version : 50090
File Encoding         : 65001

Date: 2017-12-26 15:59:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `aid` int(11) NOT NULL auto_increment COMMENT '文章id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `title` varchar(255) default NULL COMMENT '文章标题',
  `summary` varchar(255) default NULL COMMENT '文章简介',
  `time` varchar(20) default NULL COMMENT '发布时间',
  `useful` int(11) default '0' COMMENT '点赞数量',
  `useless` int(11) default '0' COMMENT '踩压数量',
  `reported` int(11) default '0' COMMENT '被举报数量',
  `passed` int(2) default '0' COMMENT '是否通过审核',
  `views` int(11) default '0' COMMENT '浏览数量',
  `payamount` int(11) default '0' COMMENT '付款数量',
  `free` int(2) default '1' COMMENT '是否免费',
  `hasdelete` int(2) default '0' COMMENT '是否删除',
  `type` int(2) default NULL COMMENT '文章类型 ',
  `cover` varchar(255) default NULL COMMENT '文章封面',
  `content` text COMMENT '文章内容',
  `price` int(10) default '0' COMMENT '文章价格',
  `favorite` int(11) default '0' COMMENT '文章收藏数量',
  PRIMARY KEY  (`aid`,`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=119 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('108', '7', '威威威威', 'asda是', '2017-12-22 10:21:18', '0', '0', '0', '1', '0', '0', '1', '0', '1', '4de0c140-c855-11e7-ae58-374d9b2e9ca3.jpg', '阿萨洒洒水 &lt;a href=\'javasript:alert(\"sss\");\'&gt;asdhasha&lt;/a&gt;市场开始调查可是当你', '2', '2');
INSERT INTO `article` VALUES ('103', '7', '我就是我', '啊是个大事价格', '2017-12-22 10:21:27', '0', '0', '0', '1', '0', '0', '1', '0', '1', '1061f2d0-c846-11e7-80de-0fcd811c175a.png', null, '12', '1');
INSERT INTO `article` VALUES ('105', '7', '心有猛虎', '心有猛虎', '2017-12-22 10:21:24', '0', '0', '0', '1', '0', '0', '1', '0', '1', '', null, '22', '1');
INSERT INTO `article` VALUES ('106', '7', 's啊沙发沙发', '额服务', '2017-12-22 10:21:22', '0', '0', '0', '1', '0', '0', '1', '0', '1', 'f7d89c40-c84b-11e7-924b-05a17d1c225e.jpg', null, '2', '1');
INSERT INTO `article` VALUES ('107', '7', '哈哈', 'asda', '2017-12-22 10:21:19', '0', '0', '0', '1', '0', '0', '1', '0', '1', '70413c90-c84d-11e7-ae58-374d9b2e9ca3.jpg', '萨达阿四<img src=\"http://localhost:7001/public/plugins/layui/images/face/59.gif\" alt=\"[草泥马]\"><img src=\"http://localhost:7001/public/plugins/layui/images/face/10.gif\" alt=\"[鄙视]\">', '2', '2');
INSERT INTO `article` VALUES ('112', '9', '达到擦的vav', '22', '2017-12-22 10:21:14', '0', '0', '0', '1', '0', '0', '1', '0', '2', '', '我就是我，哈哈哈哈哈2323ssssss', '2', '2');
INSERT INTO `article` VALUES ('114', '9', 'zxc', 'www', '2017-12-14 09:34:55', '0', '0', '0', '1', '0', '0', '1', '0', '1', '', '<p><code>&lt;img src=\"javascrip&amp;#116&amp;#58alert(/xss/)\"&gt;</code></p><p><code><br></code></p><p><code>ascasdjaksfj但是当时是啊沙发沙发上</code></p>', '2', '1');
INSERT INTO `article` VALUES ('116', '7', '才能深刻地方', '阿萨是否', '2017-12-06 09:25:13', '0', '0', '0', '1', '0', '0', '1', '0', '1', '', '受到收到个', '12', '1');
INSERT INTO `article` VALUES ('117', '9', '阿斯顿焕发肌肤婚纱是否', 'asd', '2017-12-22 10:21:04', '0', '0', '0', '1', '0', '0', '1', '0', '1', '', 'sdfsd', '12', '1');
INSERT INTO `article` VALUES ('118', '10', 'as', 'asd', '2017-12-22 10:21:10', '0', '0', '0', '1', '0', '0', '1', '0', '1', '', 'asdasda', '2', '1');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(125) NOT NULL auto_increment,
  `from_id` int(125) default NULL COMMENT '发表评论的用户ID',
  `to_id` int(125) default NULL COMMENT '被回复用户ID',
  `content` text COMMENT '评论内容',
  `c_time` varchar(25) default NULL,
  `likeCount` int(4) default '0' COMMENT '点赞次数',
  `article_id` int(125) default NULL COMMENT '评论的文章id',
  `parent_type` char(4) default NULL COMMENT '评论目标类型，1为文章评论，2为回复',
  `disLikeCount` int(4) default '0' COMMENT '踩压数量',
  `parent_id` int(125) default NULL COMMENT '评论表的id',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '7', null, '华丽的封装', '2017-12-15 17:15', '30', '114', '1', '0', null);
INSERT INTO `comment` VALUES ('2', '9', null, '缺少一丝朴实', '2017-12-15 17:19', '0', '114', '1', '0', null);
INSERT INTO `comment` VALUES ('3', '9', '7', '毛线的华丽', '2017-12-15 17:25', '25', '114', '2', '0', '1');
INSERT INTO `comment` VALUES ('4', '7', '9', '华丽得一比，不懂别BB', '2017-12-18 17:29', '0', '114', '3', '0', '1');
INSERT INTO `comment` VALUES ('5', '10', '7', '真是不要脸。。。', '2017-12-20 15:29', '5', '114', '3', '0', '1');
INSERT INTO `comment` VALUES ('6', '9', null, '首发式地方海事局都会发生', '2017-12-20 16:31:55', '0', '117', '1', '0', null);
INSERT INTO `comment` VALUES ('7', '9', null, '首发式地方海事局都会发生', '2017-12-20 16:32:12', '0', '117', '1', '0', null);
INSERT INTO `comment` VALUES ('8', '9', null, '杀杀杀杀杀杀', '2017-12-20 16:33:32', '0', '117', '1', '0', null);
INSERT INTO `comment` VALUES ('9', '9', null, '杀杀杀杀杀杀', '2017-12-20 16:34:17', '10', '117', '1', '0', null);
INSERT INTO `comment` VALUES ('11', '10', '9', '杀人犯啊你', '2017-12-20 17:28:10', '0', '117', '2', '0', '8');
INSERT INTO `comment` VALUES ('12', '9', '10', '你才是杀人犯', '2017-12-20 17:28:12', '0', '117', '3', '0', '8');
INSERT INTO `comment` VALUES ('13', '10', '9', '钻石牙', '2017-12-20 17:28:20', '0', '117', '3', '0', '8');
INSERT INTO `comment` VALUES ('14', '7', '9', '大傻逼一个', '2017-12-21 14:33:12', '0', '117', '2', '0', '9');
INSERT INTO `comment` VALUES ('18', '9', '7', '关你啥事。。。', '2017-12-21 15:52:27', '0', '117', '3', '0', '9');
INSERT INTO `comment` VALUES ('16', '7', '10', '英雄所见略同啊', '2017-12-21 14:33:60', '0', '117', '3', '0', '8');
INSERT INTO `comment` VALUES ('19', '9', null, '一级回复。。。', '2017-12-21 15:59:14', '0', '117', '1', '0', null);
INSERT INTO `comment` VALUES ('20', '7', '9', '对的对的。。。', '2017-12-22 09:15:44', '0', '114', '2', '0', '2');

-- ----------------------------
-- Table structure for favorite
-- ----------------------------
DROP TABLE IF EXISTS `favorite`;
CREATE TABLE `favorite` (
  `id` int(11) NOT NULL auto_increment,
  `fv_aid` int(11) default NULL COMMENT '文章id',
  `fv_module` int(11) default NULL COMMENT '收藏模块',
  `fv_time` varchar(255) default NULL COMMENT '时间',
  `fv_uid` int(11) default NULL COMMENT '用户id',
  PRIMARY KEY  USING BTREE (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of favorite
-- ----------------------------
INSERT INTO `favorite` VALUES ('1', '112', '1', '2017-11-22 10:55:12', '7');
INSERT INTO `favorite` VALUES ('6', '108', '1', '2017-11-22 17:10:57', '7');
INSERT INTO `favorite` VALUES ('7', '107', '1', '2017-11-22 17:13:30', '7');
INSERT INTO `favorite` VALUES ('8', '106', '1', '2017-11-22 17:21:05', '7');
INSERT INTO `favorite` VALUES ('9', '105', '1', '2017-11-22 17:22:05', '7');
INSERT INTO `favorite` VALUES ('10', '112', '1', '2017-11-23 09:16:41', '9');
INSERT INTO `favorite` VALUES ('11', '107', '1', '2017-11-23 09:48:52', '9');
INSERT INTO `favorite` VALUES ('12', '108', '1', '2017-11-23 09:48:53', '9');
INSERT INTO `favorite` VALUES ('13', '103', '1', '2017-11-23 10:18:34', '9');
INSERT INTO `favorite` VALUES ('14', '114', '1', '2017-11-30 09:09:17', '9');
INSERT INTO `favorite` VALUES ('15', '0', '1', '2017-11-30 09:12:43', '9');
INSERT INTO `favorite` VALUES ('16', '0', '1', '2017-11-30 09:14:35', '7');
INSERT INTO `favorite` VALUES ('17', '114', '1', '2017-11-30 10:44:30', '7');
INSERT INTO `favorite` VALUES ('18', '115', '1', '2017-11-30 10:52:32', '7');
INSERT INTO `favorite` VALUES ('19', '116', '1', '2017-12-02 13:58:30', '9');
INSERT INTO `favorite` VALUES ('20', '117', '1', '2017-12-02 16:55:12', '9');
INSERT INTO `favorite` VALUES ('21', '118', '1', '2017-12-11 13:45:33', '9');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL auto_increment,
  `uid` int(11) default NULL COMMENT '用户id',
  `goodsName` varchar(255) default NULL COMMENT '商品名称',
  `status` tinyint(2) default NULL COMMENT '支付状态',
  `goodsPrice` varchar(50) default NULL COMMENT '商品价格',
  `time` varchar(50) default NULL COMMENT '支付时间',
  `aid` int(11) default NULL COMMENT '商品id',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) default NULL COMMENT '真实姓名',
  `sex` varchar(5) default NULL COMMENT '性别',
  `cname` varchar(50) default NULL COMMENT '昵称',
  `tel` varchar(11) default NULL COMMENT '电话',
  `adr` varchar(120) default NULL COMMENT '地址',
  `openid` varchar(100) default '' COMMENT '微信openid',
  `level` int(2) default '0' COMMENT '权限级别',
  `psw` varchar(50) default NULL COMMENT '密码',
  `avatar` varchar(255) default NULL COMMENT '头像',
  `time` varchar(50) default NULL COMMENT '注册时间',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('7', 'wty', '1', 'yaotaiye', '18689598229', '海南省万宁市兴隆镇', '', '0', '7c4a8d09ca3762af61e59520943dc26494f8941b', null, null);
INSERT INTO `users` VALUES ('9', 'wty', '1', 'wty', '18689598229', '海南万宁兴隆', '', '0', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', '5b6d20a0-c5f4-11e7-b9e0-ffd18cb0bcc4.jpg', null);
INSERT INTO `users` VALUES ('10', 'admin', '1', 'admin', '18689598229', '万宁', '', '6', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', null, null);
