/*
SQLyog Community v13.0.0 (64 bit)
MySQL - 8.0.34 : Database - laalabs
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`laalabs` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `laalabs`;

/*Table structure for table `clients` */

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `projectName` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `fromDate` date DEFAULT NULL,
  `toDate` date DEFAULT NULL,
  `status` enum('A','I') DEFAULT 'A',
  `createdOn` datetime DEFAULT CURRENT_TIMESTAMP,
  `modifiedOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

/*Data for the table `clients` */

insert  into `clients`(`id`,`name`,`projectName`,`email`,`mobile`,`fromDate`,`toDate`,`status`,`createdOn`,`modifiedOn`) values 
(1,'Hamood','fanadaq.com',NULL,NULL,'2022-03-01',NULL,'A','2024-03-13 21:22:04','2024-03-14 10:22:18'),
(2,'Peraiah','laa.schools.com',NULL,NULL,'2024-04-01',NULL,'A','2024-03-13 21:22:04','2024-03-14 11:30:42'),
(3,'Sireesha','laa.hospitals.com','sireesha@laalabs.com','7676776766','2024-06-01',NULL,'A','2024-03-13 21:22:04','2024-03-20 16:28:57');

/*Table structure for table `countries` */

DROP TABLE IF EXISTS `countries`;

CREATE TABLE `countries` (
  `id` int DEFAULT NULL,
  `name` varchar(600) DEFAULT NULL,
  `nameA` varchar(450) DEFAULT NULL,
  `nicename` varchar(240) DEFAULT NULL,
  `phonecode` varchar(600) DEFAULT NULL,
  `iso` char(6) DEFAULT NULL,
  `iso3` char(9) DEFAULT NULL,
  `numcode` smallint DEFAULT NULL,
  `status` char(3) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

/*Data for the table `countries` */

insert  into `countries`(`id`,`name`,`nameA`,`nicename`,`phonecode`,`iso`,`iso3`,`numcode`,`status`) values 
(1,'India','India','india','91','IN','IND',NULL,'A'),
(2,'Oman','Oman','oman','968','OM','OMN',NULL,'A');

/*Table structure for table `empleaves` */

DROP TABLE IF EXISTS `empleaves`;

CREATE TABLE `empleaves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empId` int DEFAULT NULL,
  `leaveTypeId` int DEFAULT NULL,
  `fromDate` date DEFAULT NULL,
  `todate` date DEFAULT NULL,
  `noOfDays` int DEFAULT '0',
  `comments` text,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('A','D','I') DEFAULT 'I',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;

/*Data for the table `empleaves` */

insert  into `empleaves`(`id`,`empId`,`leaveTypeId`,`fromDate`,`todate`,`noOfDays`,`comments`,`createdOn`,`modifiedOn`,`status`) values 
(28,2,1,'2024-03-29','2024-03-29',1,'village festival.','2024-03-28 15:18:08','2024-03-28 15:18:34','A'),
(29,2,1,'2024-03-28','2024-03-31',3,'Stomach pain.','2024-03-28 15:25:35','2024-03-28 15:25:44','D'),
(30,2,2,'2024-04-01','2024-04-30',29,'fun','2024-04-01 09:57:31','2024-04-01 09:57:55','D'),
(31,3,1,'2024-04-30','2024-04-30',1,'emergency','2024-04-02 09:46:50','2024-04-02 09:47:24','A'),
(32,3,2,'2024-04-17','2024-04-17',1,'one day','2024-04-03 07:20:48','2024-04-03 07:55:51','A'),
(33,3,4,'2024-04-10','2024-04-10',1,'dfgst','2024-04-03 10:40:30','2024-04-03 10:47:15','D'),
(34,3,5,'2024-04-04','2024-04-04',1,'special day','2024-04-03 11:01:14','2024-04-04 14:38:05','D'),
(35,3,5,'2024-04-03','2024-04-03',1,'fev','2024-04-03 11:03:13','2024-04-04 14:38:01','D');

/*Table structure for table `emploginhistory` */

DROP TABLE IF EXISTS `emploginhistory`;

CREATE TABLE `emploginhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empId` int DEFAULT NULL,
  `createdOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `emploginhistory` */

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empId` varchar(20) DEFAULT NULL,
  `clientId` int DEFAULT '0',
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `fatherName` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `personaEmail` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `aadhar` varchar(50) DEFAULT NULL,
  `pan` varchar(50) DEFAULT NULL,
  `uan` varchar(50) DEFAULT NULL,
  `logo` varchar(50) DEFAULT NULL,
  `doj` date DEFAULT NULL,
  `lwd` date DEFAULT NULL,
  `roleId` int DEFAULT '0',
  `countryId` int DEFAULT '1',
  `address` text,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('I','A','D','S') DEFAULT 'A',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

/*Data for the table `employee` */

insert  into `employee`(`id`,`empId`,`clientId`,`firstName`,`lastName`,`fatherName`,`email`,`personaEmail`,`phone`,`aadhar`,`pan`,`uan`,`logo`,`doj`,`lwd`,`roleId`,`countryId`,`address`,`createdOn`,`modifiedOn`,`status`) values 
(1,'LLEMP101',2,'Guduri','Peraiah','Kotaiah','info@laalabs.com','v','9908654788',NULL,NULL,'0',NULL,'2023-09-04',NULL,1,1,'8-3,Seetharamapuram,Kunkalagunta,Nakarikallu,Palnadu,Andhra Pradesh,India,522615','2024-01-14 11:25:00','2024-01-14 11:25:00','A'),
(2,'LLEMP102',2,'Chennam','Sireesha','Sundararao','info@laalabs.com','','9743012744','123456789','125478963','0',NULL,'2023-09-04',NULL,1,1,'Kunkalagunta','2024-01-14 11:16:56','2024-03-17 12:10:55','A'),
(3,'LLEMP103',1,'Gandra','Srikanth','Mallikharjunarao','srikanthg@laalabs.com','srikanthgandra6@gmail.com','9703982155','463616549053','CTZPG7728P','121212121212','','2023-09-04',NULL,2,1,'4-68/A,Kunkalagunta,Nakarikallu,Palnadu,Andhra Pradesh,India,522615','2024-01-14 11:20:45','2024-04-04 15:35:51','A'),
(4,'LLEMP104',1,'Chennam','Sri Manikanta','Sundararao','srimanich@laalabs.com','srimanikanta123143@gmail.com','8555005489','296932084651','CDFPC7981L','0',NULL,'2023-09-04',NULL,3,1,'3-14,Ranga Center,Kunkalagunta,Nakarikallu,Palnadu,Andhra Pradesh,India,522615','2024-01-14 11:21:42','2024-03-20 16:30:26','A'),
(5,'LLEMP105',2,'Malapati','Venkata Manikanta','Srinivasarao','vmanikantam@laalabs.com','','9951887170','905575521354','FNJPM2308L','0',NULL,'2024-01-04',NULL,4,1,'8-30,Seetharamapuram,Kunkalagunta,Nakarikallu,Palnadu,Andhra Pradesh,India,522615','2024-01-14 11:30:09','2024-03-20 16:09:55','A'),
(6,'LLEMP106',1,'Kollapudi','Venkata Ravi Teja','Manikyarao','vrtejak@laalabs.com','','8985553542','916397524542','LRIPK6269H','0',NULL,'2024-01-04',NULL,4,1,'3-56,Ranga Center,Kunkalagunta,Nakarikallu,Palnadu,Andhra Pradesh,India,522615','2024-01-14 11:36:04','2024-03-20 16:09:37','A'),
(7,'LLEMP107',2,'Duddukunta','Srinivasa Reddy','Venkata Reddy','srinivasareddyd@laalabs.com','srinivasa1029@gmail.c0m','7569592231','281455423079','HCBPD8891L','0',NULL,'2024-01-04',NULL,5,1,'7-89,Reddypalem,Rompicherla,Palanadu,Andhra Pradesh,India - 522615','2024-01-14 11:40:41','2024-03-20 16:10:29','A'),
(8,'LLEMP108',2,'Guduri','Brahmaiah','Peraiah','brahmaji.guduri@gmail.com','bhram@gmail.com','9743012744','122222222222','BLMPB1280K','0',NULL,'2024-01-04',NULL,6,1,'8-30,Seetharamapuram,Kunkalagunta,Nakarikallu,Palnadu,Andhra Pradesh,India,522615','2024-02-23 06:33:10','2024-03-14 19:39:18','A'),
(14,'LLEMP114',3,'Ramesh','Rusum','Srinivasa rao','rr@gmail.com','rrr@gmail.com','9390451420','923011275951','FNYPR4616B','222222222222',NULL,'2024-03-10',NULL,3,1,'kunkalagunta','2024-03-10 17:13:03','2024-03-26 14:24:35','A');

/*Table structure for table `empsalary` */

DROP TABLE IF EXISTS `empsalary`;

CREATE TABLE `empsalary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empId` int DEFAULT NULL,
  `ctc` decimal(14,6) DEFAULT '0.000000',
  `monthly` decimal(14,6) DEFAULT '0.000000',
  `date` date DEFAULT NULL,
  `createdOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

/*Data for the table `empsalary` */

insert  into `empsalary`(`id`,`empId`,`ctc`,`monthly`,`date`,`createdOn`) values 
(1,4,295200.000000,24600.000000,'2023-09-30','2024-01-14 11:58:40'),
(2,3,225600.000000,18800.000000,'2023-09-30','2024-01-14 11:58:43'),
(3,4,295200.000000,24600.000000,'2023-10-31','2024-01-14 12:00:13'),
(4,3,225600.000000,18800.000000,'2023-10-31','2024-01-14 12:00:31'),
(5,4,295200.000000,24600.000000,'2023-11-30','2024-01-14 12:00:55'),
(6,3,225600.000000,18800.000000,'2023-11-30','2024-01-14 12:01:11'),
(7,4,295200.000000,24600.000000,'2023-12-31','2024-01-14 12:01:25'),
(8,3,225600.000000,18800.000000,'2023-12-31','2024-01-14 12:01:39');

/*Table structure for table `holidaycalender` */

DROP TABLE IF EXISTS `holidaycalender`;

CREATE TABLE `holidaycalender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `effectDate` date DEFAULT NULL,
  `comments` text,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('A','I','D') DEFAULT 'A',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

/*Data for the table `holidaycalender` */

insert  into `holidaycalender`(`id`,`name`,`effectDate`,`comments`,`createdOn`,`modifiedOn`,`status`) values 
(1,'New Year','2024-01-01','New Year','2024-01-14 12:03:06','2024-01-14 12:03:06','A'),
(2,'Sankranthi','2024-01-15','Pongal','2024-01-14 12:03:26','2024-01-14 12:03:26','A'),
(3,'Ugadi','2024-04-09','Telugu New Year','2024-01-14 12:05:52','2024-01-14 12:05:52','A'),
(4,'Ramjan','2024-04-11','Ramjan','2024-01-14 12:06:26','2024-01-14 12:06:26','A'),
(5,'Ram Navami','2024-04-17','Ram Navami','2024-01-14 12:07:21','2024-01-14 12:07:21','A'),
(6,'May Day','2024-05-01','May Day','2024-01-14 12:07:58','2024-01-14 12:07:58','A'),
(7,'Bacrid','2024-06-17','Bacrid','2024-01-14 12:08:43','2024-01-14 12:08:43','A'),
(8,'Independance Day','2024-08-15','Independance Day','2024-01-14 12:10:08','2024-01-14 12:10:08','A'),
(9,'Gandhi Jayanthi','2024-10-02','Gandhi Jayanthi','2024-01-14 12:11:30','2024-01-14 12:11:30','A'),
(10,'Diwali','2024-10-31','Diwali','2024-01-14 12:12:04','2024-01-14 12:12:04','A'),
(11,'Crimas','2024-12-25','Crimas','2024-01-14 12:12:46','2024-01-14 12:12:46','A');

/*Table structure for table `leavetypes` */

DROP TABLE IF EXISTS `leavetypes`;

CREATE TABLE `leavetypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `status` enum('A','I','D') DEFAULT 'A',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb3;

/*Data for the table `leavetypes` */

insert  into `leavetypes`(`id`,`name`,`status`) values 
(1,'Sick Leave','A'),
(2,'Personal Leave','A'),
(3,'Comp Off','A'),
(4,'Loss Of Pay','A'),
(5,'Special Day','A'),
(6,'Paternity Leave','A'),
(7,'Maternity Leave','A'),
(8,'Emergency Leave','A');

/*Table structure for table `loginaccounts` */

DROP TABLE IF EXISTS `loginaccounts`;

CREATE TABLE `loginaccounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empId` int DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  `type` enum('EMPLOYEE','ADMIN','OTHER') DEFAULT NULL,
  `userName` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `createdOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedOn` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('A','I','D','S') DEFAULT 'A',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `loginaccounts` */

insert  into `loginaccounts`(`id`,`empId`,`clientId`,`type`,`userName`,`password`,`email`,`createdOn`,`modifiedOn`,`status`) values 
(1,8,2,'ADMIN','Brahma','827ccb0eea8a706c4c34a16891f84e7b','info@laalabs.com','2024-02-23 06:34:26','2024-02-23 06:34:26','A'),
(2,3,2,'EMPLOYEE','Srikanth','c8837b23ff8aaa8a2dde915473ce0991','info@laalabs.com','2024-03-27 08:50:31','2024-04-03 10:57:59','A');

/*Table structure for table `pdfhistory` */

DROP TABLE IF EXISTS `pdfhistory`;

CREATE TABLE `pdfhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empId` int NOT NULL,
  `type` enum('INC','PROMOTION','RELIEVE','EXPERIENCE','JOIN','OFFER') DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  `effectDate` date DEFAULT NULL,
  `createdOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `pdfhistory` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`) values 
(1,'Director'),
(2,'Associate UI Developer'),
(3,'Associate Software Developer'),
(4,'Testing - Trainee'),
(5,'UI Developer - Trainee'),
(6,'CEO');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
