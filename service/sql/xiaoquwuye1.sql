/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 50540
 Source Host           : localhost:3306
 Source Schema         : xiaoquwuye1

 Target Server Type    : MySQL
 Target Server Version : 50540
 File Encoding         : 65001

 Date: 27/01/2022 11:35:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `AdminType` int(11) NULL DEFAULT NULL,
  `AdminName` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `persionNo` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `post` varchar(12) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `begDate` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, NULL, '张三', NULL, NULL, '510923199604214128', '管理员1', '女', '2022-01-25');
INSERT INTO `admin` VALUES (2, NULL, '李斯', NULL, NULL, '11111111111111111z', '保安负责人', '女', '2022-01-25');
INSERT INTO `admin` VALUES (3, NULL, '智欧平', NULL, NULL, '222222222222222222', '保洁负责人', '女', '2022-01-25');
INSERT INTO `admin` VALUES (4, NULL, '四平', NULL, NULL, '510923199604214128', '人事负责人', '女', '2022-01-25');
INSERT INTO `admin` VALUES (5, NULL, '飒飒', NULL, NULL, '510923199604214128', '财务负责人', '女', '2022-01-25');
INSERT INTO `admin` VALUES (6, NULL, '筛孔', NULL, NULL, '510923199604214128', '消防负责人', '女', '2022-01-25');

-- ----------------------------
-- Table structure for ba
-- ----------------------------
DROP TABLE IF EXISTS `ba`;
CREATE TABLE `ba`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `persionNo` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `name` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `post` varchar(12) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `begDate` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of ba
-- ----------------------------
INSERT INTO `ba` VALUES (1, '510923199604214128', '季候', '保安1', '女', '2022-01-25');

-- ----------------------------
-- Table structure for carnum
-- ----------------------------
DROP TABLE IF EXISTS `carnum`;
CREATE TABLE `carnum`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `date` year(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of carnum
-- ----------------------------
INSERT INTO `carnum` VALUES (1, '222', 2020);
INSERT INTO `carnum` VALUES (2, '333', 2021);

-- ----------------------------
-- Table structure for carorder
-- ----------------------------
DROP TABLE IF EXISTS `carorder`;
CREATE TABLE `carorder`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `state` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `pass` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `address` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `telephone` varchar(11) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `persionNo` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `carAddress` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `userid` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `changedate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of carorder
-- ----------------------------
INSERT INTO `carorder` VALUES (1, '未审核', NULL, 'A-0001', '15244910175', '510923199604214128', '01', '张三', '2022-01-26 15:31:56');

-- ----------------------------
-- Table structure for cg
-- ----------------------------
DROP TABLE IF EXISTS `cg`;
CREATE TABLE `cg`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for chanel
-- ----------------------------
DROP TABLE IF EXISTS `chanel`;
CREATE TABLE `chanel`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `mark` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `inName` varchar(25) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `model` varchar(25) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `num` varchar(25) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `beDate` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of chanel
-- ----------------------------
INSERT INTO `chanel` VALUES (1, '电视', '飒飒', '撒阿萨1', 'n00001', '2', '2022-01-22');
INSERT INTO `chanel` VALUES (2, '燃气灶', '飒飒ad', '飒飒', 'n0002', '1', '2022-01-25');

-- ----------------------------
-- Table structure for cn
-- ----------------------------
DROP TABLE IF EXISTS `cn`;
CREATE TABLE `cn`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for col_pass
-- ----------------------------
DROP TABLE IF EXISTS `col_pass`;
CREATE TABLE `col_pass`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `isreceive` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `alreadyDate` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of col_pass
-- ----------------------------
INSERT INTO `col_pass` VALUES (1, '圆通快递', '张三', '15244910175', '四川省成都市双流区锦江帆影1栋负1楼', '2022-01-17', '已领取', '2022-01-19');
INSERT INTO `col_pass` VALUES (2, '申通快递', '李四', '15244910175', '四川省成都市双流区锦江帆影', '2022-01-17', '已领取', '2022-01-19');
INSERT INTO `col_pass` VALUES (4, '邮政', '李斯', '15244910175', '四川省成都市双流区锦江帆影', '2022-01-16', '已领取', '2022-01-17');

-- ----------------------------
-- Table structure for equip
-- ----------------------------
DROP TABLE IF EXISTS `equip`;
CREATE TABLE `equip`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `mark` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `img` binary(255) NULL DEFAULT NULL,
  `inName` varchar(25) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `recode` varchar(25) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `tel` varchar(25) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `revalue` varchar(25) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `beDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of equip
-- ----------------------------
INSERT INTO `equip` VALUES (1, '灯泡坏了', '飒飒飒飒', NULL, '里欧', NULL, '15244910175', '未修', 'A-0001', '2022-01-25 16:00:00');
INSERT INTO `equip` VALUES (2, '燃气灶坏了', '实事求是', NULL, NULL, NULL, '15244910175', '未修', 'A-0002', '2022-01-26 15:30:11');

-- ----------------------------
-- Table structure for h_change
-- ----------------------------
DROP TABLE IF EXISTS `h_change`;
CREATE TABLE `h_change`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rNo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  `oldOwner` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nowOwner` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `changedate` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of h_change
-- ----------------------------
INSERT INTO `h_change` VALUES (1, 'A-0001', '张三', '李四', '2022-01-03');
INSERT INTO `h_change` VALUES (4, 'A-0002', '朱艳林', '杨荣华', '2022-01-12');
INSERT INTO `h_change` VALUES (5, 'A-0003', 'xxx', 'yyyy', '2022-01-26');
INSERT INTO `h_change` VALUES (6, 'A-0004', 'yyyy', 'xxxx', '2022-01-16');
INSERT INTO `h_change` VALUES (7, 'A-0005', '实施', '运营1', '2022-01-23');

-- ----------------------------
-- Table structure for house_mag
-- ----------------------------
DROP TABLE IF EXISTS `house_mag`;
CREATE TABLE `house_mag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rNo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `buildArea` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ableArea` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sale_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `own_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of house_mag
-- ----------------------------
INSERT INTO `house_mag` VALUES (1, 'A-101', '136.8', '116.3', '三室一厅', '已售', '正常');
INSERT INTO `house_mag` VALUES (2, 'A-102', '200.8', '188.8', '四室两厅', '已售', '正常');
INSERT INTO `house_mag` VALUES (3, 'A-103', '120.88', '100', '两室一厅', '出租', '无');
INSERT INTO `house_mag` VALUES (5, 'A-104', '130', '100', '两室一厅', '出售', '正常');
INSERT INTO `house_mag` VALUES (6, 'A-105', '200', '190', '四室两厅', '出售', '正常');

-- ----------------------------
-- Table structure for leasehold
-- ----------------------------
DROP TABLE IF EXISTS `leasehold`;
CREATE TABLE `leasehold`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `rNo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `persionNo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `reTime` date NULL DEFAULT NULL,
  `dateDue` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of leasehold
-- ----------------------------
INSERT INTO `leasehold` VALUES (1, '张三', 'A-0001', '111111111111111112', '2022-01-10', '2022-01-26');
INSERT INTO `leasehold` VALUES (3, '张三', 'A-0002', '510923199604214128', '2022-01-25', '2022-01-27');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, '关于停水通知1', '尊敬的业主，您好，小区将于明日上午12点停水，请大家提前做好停水的准备', '2022-01-18 02:56:16', '管理处');
INSERT INTO `notice` VALUES (2, '关于停电的通知', '尊敬的住户，你好，小区将于明日下午6:00开始停电，为期1天，请大家提前做好准备', '2022-01-18 11:47:59', '管理处');
INSERT INTO `notice` VALUES (3, '关于假期管理通知', '尊敬的各位住户，即将到假期，温馨提示各位：在来返途中注意防控疫情，注意保护好自己', '2022-01-18 16:22:33', '管理处');
INSERT INTO `notice` VALUES (4, '关于喂养宠物的通知', '尊敬的各位住户，由于小区应该保护好房间内各种物品，因此禁止各位住户喂养宠物。请大家多多配合！！！', '2022-01-18 04:36:18', '管理处');
INSERT INTO `notice` VALUES (5, '关于喂养宠物的通知', '尊敬的各位住户，由于小区应该保护好房间内各种物品，因此禁止各位住户喂养宠物。请大家多多配合！！！', '2022-01-18 04:39:58', '管理处');
INSERT INTO `notice` VALUES (6, '关于喂养宠物的通知', '尊敬的各位住户，由于小区应该保护好房间内各种物品，因此禁止各位住户喂养宠物。请大家多多配合！！！', '0000-00-00 00:00:00', '管理处');
INSERT INTO `notice` VALUES (7, '关于喂养宠物的通知', '尊敬的各位住户，由于小区应该保护好房间内各种物品，因此禁止各位住户喂养宠物。请大家多多配合！！！', '2022-01-18 00:00:00', '管理处');
INSERT INTO `notice` VALUES (8, '关于喂养宠物的通知', '尊敬的各位住户，由于小区应该保护好房间内各种物品，因此禁止各位住户喂养宠物。请大家多多配合！！！', '2022-01-18 00:00:00', '管理处');
INSERT INTO `notice` VALUES (9, '关于喂养宠物通知', '尊敬的各位住户，由于小区应该保护好房间内各种物品，因此禁止各位住户喂养宠物。请大家多多配合！！！', '2022-01-18 16:49:52', '管理处');
INSERT INTO `notice` VALUES (10, '关于喂养宠物的通知', '尊敬的各位住户，由于小区应该保护好房间内各种物品，因此禁止各位住户喂养宠物。请大家多多配合！！！', '2022-01-18 16:52:17', '管理处');
INSERT INTO `notice` VALUES (11, '关于喂养宠物的通知', '尊敬的各位住户，由于小区应该保护好房间内各种物品，因此禁止各位住户喂养宠物。请大家多多配合！！！', '2022-01-18 16:55:06', '管理处');
INSERT INTO `notice` VALUES (12, '关于宠物问题', '为了保持住户环境优美，禁止喂养宠物', '2022-01-19 10:53:49', '管理处');

-- ----------------------------
-- Table structure for pass_mag
-- ----------------------------
DROP TABLE IF EXISTS `pass_mag`;
CREATE TABLE `pass_mag`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pass_mag
-- ----------------------------
INSERT INTO `pass_mag` VALUES (0, '圆通快递', '李四1', '15244910175', '唯美饰品店');
INSERT INTO `pass_mag` VALUES (1, '申通快递', '张三', '15244910175', '唯品饰品店');
INSERT INTO `pass_mag` VALUES (2, '中通快递', '李斯', '15244910175', '江阴学院校园照相馆');

-- ----------------------------
-- Table structure for pb
-- ----------------------------
DROP TABLE IF EXISTS `pb`;
CREATE TABLE `pb`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `startTime` datetime NULL DEFAULT NULL,
  `endTime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pb
-- ----------------------------
INSERT INTO `pb` VALUES (1, '栀子', '2022-01-25 23:25:56', '2022-01-26 07:26:05');

-- ----------------------------
-- Table structure for resident
-- ----------------------------
DROP TABLE IF EXISTS `resident`;
CREATE TABLE `resident`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rNo` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `persionNo` varchar(50) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `sex` varchar(2) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `telephone` varchar(50) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of resident
-- ----------------------------
INSERT INTO `resident` VALUES (1, 'A-0001', '张三', '510923199604214128', '女', '15244910175', '2022-01-26');
INSERT INTO `resident` VALUES (2, 'A-0002', '李四', '111111111111111111', '男', '15266666666', '2022-01-25');
INSERT INTO `resident` VALUES (3, 'A-0003', '李斯', '222222222222222222', '女', '11111111111', '2022-01-25');
INSERT INTO `resident` VALUES (4, 'A-0004', '张数', '232122342211111111', '男', '12233333333', '2022-01-25');
INSERT INTO `resident` VALUES (5, 'A-0005', '李思', '333333333333333333', '女', '12345678910', '2022-01-25');
INSERT INTO `resident` VALUES (6, 'A-0006', '张时', '111111111111111111', '女', '11111111111', '2022-01-26');

-- ----------------------------
-- Table structure for rs
-- ----------------------------
DROP TABLE IF EXISTS `rs`;
CREATE TABLE `rs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `AdminType` int(11) NULL DEFAULT NULL,
  `AdminName` varchar(12) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `LoginName` varchar(12) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `LoginPwd` varchar(12) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `persionNo` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `post` varchar(12) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `begDate` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of rs
-- ----------------------------
INSERT INTO `rs` VALUES (1, NULL, '简欧', NULL, NULL, '510923199604214128', '物业', '女', '2022-01-25');

-- ----------------------------
-- Table structure for t_change
-- ----------------------------
DROP TABLE IF EXISTS `t_change`;
CREATE TABLE `t_change`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dNo` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `zName` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `type` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `changeName` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `remark` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `waterCase` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `eCase` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `gascase` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `stopCase` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `mandCase` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `cases` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `payabledate` date NULL DEFAULT NULL,
  `changedate` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_change
-- ----------------------------
INSERT INTO `t_change` VALUES (1, 'd0001', '李家鸥', '线上缴费', '飒飒', '三十多岁多', '20', '20', NULL, '20', '20', '100', '未缴费', '2022-01-25', NULL);

-- ----------------------------
-- Table structure for t_cnuan
-- ----------------------------
DROP TABLE IF EXISTS `t_cnuan`;
CREATE TABLE `t_cnuan`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `telephone` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `cases` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `userid` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `changedate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for t_leaverword
-- ----------------------------
DROP TABLE IF EXISTS `t_leaverword`;
CREATE TABLE `t_leaverword`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` varchar(200) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `type` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `leaverName` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `userId` int(11) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  `answerContent` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL,
  `reDate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of t_leaverword
-- ----------------------------
INSERT INTO `t_leaverword` VALUES (1, '少时诵诗书', '投诉', NULL, NULL, '投诉投诉', '2022-01-26 15:32:37', NULL, NULL);
INSERT INTO `t_leaverword` VALUES (2, '啊飒飒', '留言', NULL, NULL, '留言留言', '2022-01-26 15:32:51', '好的', '2022-01-26 16:40:24');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `username`(`username`) USING BTREE,
  INDEX `username_2`(`username`, `id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (5, '杨荣华', '3168393993@qq.com', '199805', '管理员');
INSERT INTO `user` VALUES (6, '杨荣华1', '3168393993@qq.com', '199805', '业主');
INSERT INTO `user` VALUES (8, '杨荣华2', '3168393993@qq.com', '199805', '业主');

SET FOREIGN_KEY_CHECKS = 1;
