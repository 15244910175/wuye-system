/*
SQLyog v10.2 
MySQL - 5.5.53 : Database - xiaoquwuye
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`xiaoquwuye` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `xiaoquwuye1`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AdminType` int(11) DEFAULT NULL,
  `AdminName` varchar(12) CHARACTER SET utf8 DEFAULT NULL,
  `LoginName` varchar(12) CHARACTER SET utf8 DEFAULT NULL,
  `LoginPwd` varchar(12) CHARACTER SET utf8 DEFAULT NULL,
  `persionNo` varchar(20) DEFAULT NULL,
  `post` varchar(12) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `begDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=gbk;

/*Data for the table `admin` */

insert  into `admin`(`ID`,`AdminType`,`AdminName`,`LoginName`,`LoginPwd`,`persionNo`,`post`,`sex`,`begDate`) values (1,1,'admin','admin','admin','13128438403443','总管','男','2013-03-07'),(2,2,'admin2','管理员','admin2','23840283048','管理者','男','2013-03-20'),(3,2,'admin3','管理员3','admin3','3333333333333','管理者','男','2018-06-11');

/*Table structure for table `ba` */

DROP TABLE IF EXISTS `ba`;

CREATE TABLE `ba` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `persionNo` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `post` varchar(12) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `begDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk;

/*Data for the table `ba` */

insert  into `ba`(`ID`,`persionNo`,`name`,`post`,`sex`,`begDate`) values (3,'11111111111','保安1','保安','男','2018-06-11'),(4,'222222222222222','保安2','保安','男','2018-06-11'),(5,'333333333333','保安3','保安','男','2018-06-11');

/*Table structure for table `carnum` */

DROP TABLE IF EXISTS `carnum`;

CREATE TABLE `carnum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk;

/*Data for the table `carnum` */

insert  into `carnum`(`id`,`num`) values (1,'888'),(3,'11'),(4,'22');

/*Table structure for table `carorder` */

DROP TABLE IF EXISTS `carorder`;

CREATE TABLE `carorder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `persionNo` varchar(20) DEFAULT NULL,
  `carAddress` varchar(20) DEFAULT NULL,
  `userid` varchar(20) DEFAULT NULL,
  `changedate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=gbk;

/*Data for the table `carorder` */

insert  into `carorder`(`id`,`state`,`address`,`telephone`,`persionNo`,`carAddress`,`userid`,`changedate`) values (2,'T','1单元101','1521111111111','111111111111','苏A-000001','resident1','2018-06-11 20:58:58'),(3,'F','2单元202','1522222222','22222222222','苏A-000002','resident1','2018-06-11 20:59:35');

/*Table structure for table `cg` */

DROP TABLE IF EXISTS `cg`;

CREATE TABLE `cg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `cg` */

/*Table structure for table `chanel` */

DROP TABLE IF EXISTS `chanel`;

CREATE TABLE `chanel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `mark` varchar(255) DEFAULT NULL,
  `inName` varchar(25) DEFAULT NULL,
  `model` varchar(25) DEFAULT NULL,
  `num` varchar(25) DEFAULT NULL,
  `beDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=gbk;

/*Data for the table `chanel` */

insert  into `chanel`(`id`,`name`,`mark`,`inName`,`model`,`num`,`beDate`) values (1,'电梯','电梯电梯电梯电梯电梯电梯电梯电梯','admin','N8099','2','2013-03-05'),(2,'水池','用于绿化小区','admin','Water001','2','2018-06-12');

/*Table structure for table `cn` */

DROP TABLE IF EXISTS `cn`;

CREATE TABLE `cn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `cn` */

/*Table structure for table `equip` */

DROP TABLE IF EXISTS `equip`;

CREATE TABLE `equip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `mark` varchar(255) DEFAULT NULL,
  `inName` varchar(25) DEFAULT NULL,
  `recode` varchar(25) DEFAULT NULL,
  `tel` varchar(25) DEFAULT NULL,
  `revalue` varchar(25) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `beDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=gbk;

/*Data for the table `equip` */

insert  into `equip`(`id`,`name`,`mark`,`inName`,`recode`,`tel`,`revalue`,`address`,`beDate`) values (3,'电梯损坏','无法停靠202','resident1','admin','152222222','未修','2单元202','2018-06-12'),(4,'水断了','','resident1','admin','152111111','未修','1单元101','2018-06-11'),(5,'煤没了','','resident1','住户1','152111111111','未修','1单元101','2018-06-11'),(6,'漏雨','','resident1','住户1','','未修','','');

/*Table structure for table `pb` */

DROP TABLE IF EXISTS `pb`;

CREATE TABLE `pb` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `startTime` varchar(12) DEFAULT NULL,
  `endTime` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk;

/*Data for the table `pb` */

insert  into `pb`(`ID`,`name`,`startTime`,`endTime`) values (2,'保安1','2018-07-11','2018-07-12'),(3,'保安2','2018-07-12','2018-07-13'),(4,'保安3','2018-07-13','2018-07-14');

/*Table structure for table `resident` */

DROP TABLE IF EXISTS `resident`;

CREATE TABLE `resident` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `persionNo` varchar(50) DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL,
  `jig` varchar(2) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=gbk;

/*Data for the table `resident` */

insert  into `resident`(`id`,`username`,`password`,`persionNo`,`sex`,`jig`,`telephone`,`address`,`type`,`date`) values (5,'resident1','666','111111111111','男',NULL,'15211111111','1单元101',NULL,'2018-06-11 20:37:23'),(6,'resident2','666','22222222222','男',NULL,'152222222222','2单元202',NULL,'2018-06-11 20:39:45'),(7,'住户3','666','333333333333','女',NULL,'1523333333333','3单元303',NULL,'2018-06-11 20:40:30'),(8,'住户4','666','4444444444444','男',NULL,'1524444444','4单元404',NULL,'2018-06-11 20:41:26'),(9,'住户5','666','5555555555','男',NULL,'15255555555','5单元505',NULL,'2018-06-11 20:41:56'),(10,'住户6','666','666666666666','男',NULL,'152666666666','6单元606',NULL,'2018-06-11 20:42:19'),(11,'住户7','666','777777777777','男',NULL,'1527777777','7单元707',NULL,'2018-06-11 20:42:46'),(12,'住户8','666','8888888888888','男',NULL,'15288888888','8单元808',NULL,'2018-06-11 20:43:54');

/*Table structure for table `rs` */

DROP TABLE IF EXISTS `rs`;

CREATE TABLE `rs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AdminType` int(11) DEFAULT NULL,
  `AdminName` varchar(12) DEFAULT NULL,
  `LoginName` varchar(12) DEFAULT NULL,
  `LoginPwd` varchar(12) DEFAULT NULL,
  `persionNo` varchar(20) DEFAULT NULL,
  `post` varchar(12) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `begDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gbk;

/*Data for the table `rs` */

insert  into `rs`(`ID`,`AdminType`,`AdminName`,`LoginName`,`LoginPwd`,`persionNo`,`post`,`sex`,`begDate`) values (3,NULL,'物业人员1','物业人员1','物业人员1','111111111','物业人员','男','2018-06-11'),(4,NULL,'物业人员2','物业人员2','物业人员2','22222222222222','物业人员','男','2018-06-12');

/*Table structure for table `t_change` */

DROP TABLE IF EXISTS `t_change`;

CREATE TABLE `t_change` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dNo` varchar(20) DEFAULT NULL,
  `zName` varchar(20) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `changeName` varchar(20) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `waterCase` varchar(20) DEFAULT NULL,
  `eCase` varchar(20) DEFAULT NULL,
  `gascase` varchar(20) DEFAULT NULL,
  `stopCase` varchar(20) DEFAULT NULL,
  `mandCase` varchar(20) DEFAULT NULL,
  `cases` varchar(20) DEFAULT NULL,
  `userid` varchar(20) DEFAULT NULL,
  `changedate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=gbk;

/*Data for the table `t_change` */

insert  into `t_change`(`id`,`dNo`,`zName`,`type`,`changeName`,`remark`,`waterCase`,`eCase`,`gascase`,`stopCase`,`mandCase`,`cases`,`userid`,`changedate`) values (2,'JD001','住户1','在线缴费','物业人员1','','10','20','30','30','10','100',NULL,'2018-06-11 20:51:34');

/*Table structure for table `t_cnuan` */

DROP TABLE IF EXISTS `t_cnuan`;

CREATE TABLE `t_cnuan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `cases` varchar(20) DEFAULT NULL,
  `userid` varchar(20) DEFAULT NULL,
  `changedate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `t_cnuan` */

/*Table structure for table `t_leaverword` */

DROP TABLE IF EXISTS `t_leaverword`;

CREATE TABLE `t_leaverword` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mark` varchar(200) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `leaverName` varchar(20) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `answerContent` varchar(255) DEFAULT NULL,
  `reDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=gbk;

/*Data for the table `t_leaverword` */

insert  into `t_leaverword`(`id`,`mark`,`type`,`leaverName`,`userId`,`title`,`time`,`answerContent`,`reDate`) values (1,'希望管理好社区希望管理好社区希望管理好社区希望管理好社区','2','lisan',2,'希望管理好社区','2013-03-16 00:51:32','',NULL),(2,'投诉经理投诉经理投诉经理','1','lisan',2,'投诉经理','2013-03-16 00:51:44','',NULL);

/*Table structure for table `t_user` */

DROP TABLE IF EXISTS `t_user`;

CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=gbk;

/*Data for the table `t_user` */

insert  into `t_user`(`id`,`username`,`password`) values (1,'admin','admin');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
