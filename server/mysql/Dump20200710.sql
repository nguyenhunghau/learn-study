CREATE DATABASE  IF NOT EXISTS `learn_study` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `learn_study`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: learn_study
-- ------------------------------------------------------
-- Server version	5.7.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(250) DEFAULT NULL,
  `PASSWORD` varchar(250) DEFAULT NULL,
  `NAME` varchar(250) DEFAULT NULL,
  `EMAIL` varchar(250) DEFAULT NULL,
  `PHONE` varchar(20) DEFAULT NULL,
  `BIRTHDAY` date DEFAULT NULL,
  `PHOTO` varchar(100) DEFAULT NULL,
  `ADDRESS_ID` int(11) DEFAULT NULL,
  `DESCRIPTION` text,
  `SCHOOL` varchar(250) DEFAULT NULL,
  `ROLE_ID` int(11) unsigned DEFAULT NULL,
  `GENDER` enum('NAM','NU') DEFAULT NULL,
  `CERTIFICATE` varchar(100) DEFAULT NULL,
  `PERSONAL_ID` varchar(45) DEFAULT NULL,
  `MAJOR` varchar(250) DEFAULT NULL,
  `CREATED` datetime DEFAULT NULL,
  `UPDATED` datetime DEFAULT NULL,
  `CODE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (4,'hunghau','$2a$10$cjtrr3BWxfVwCiWQFzcxY.D6iIlsCymDvie88AN.1URp3nV6KB8Uq','Nguyen Hung Hau','nguyenhunghau.us@gmail.com','34353454','2020-07-18','abc/avatar/logo.jpg',149,'I\'m a senior developer','KHTN',NULL,'NAM','abc/certificate/chart.png','23453535','CNTT',NULL,NULL,'abc'),(5,'sdsad','$2a$10$XKkcAJ2F4OsM7H/clu6V4..IyZ4MziZOzMa7opNBKjnWJuZlc4HEG','hungah','nguyenhunghau.us@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'hunghau1','$2a$10$cjtrr3BWxfVwCiWQFzcxY.D6iIlsCymDvie88AN.1URp3nV6KB8Uq','Nguyen Hung Hau','nguyenhunghau.us@gmail.com','34353454','2020-07-18','abc/avatar/logo.jpg',149,'I\'m a senior developer','KHTN',NULL,'NAM','abc/certificate/chart.png','23453535','CNTT',NULL,NULL,'123');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `level` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(250) DEFAULT NULL,
  `IS_ACTIVE` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (3,'Lớp 1',_binary ''),(4,'Lớp 2',_binary '');
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `role` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(2,'USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `subject` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(250) DEFAULT NULL,
  `IS_ACTIVE` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'Toán',_binary ''),(2,'Tiếng Anh',_binary ''),(3,'Tin',_binary '');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teaching_class`
--

DROP TABLE IF EXISTS `teaching_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teaching_class` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(60) DEFAULT NULL,
  `SUBJECT_ID` int(10) unsigned DEFAULT NULL,
  `LEVEL_IDS` varchar(100) DEFAULT NULL,
  `TIMETABLE` text,
  `COST` int(10) unsigned DEFAULT NULL,
  `UNIT_ID` int(10) unsigned DEFAULT NULL,
  `NUM_PERIOD` int(10) DEFAULT NULL,
  `DESCRIPTION` longtext,
  `TYPE_TEACHING` varchar(100) DEFAULT NULL,
  `ADDRESS_ID` int(10) DEFAULT NULL,
  `ACCOUNT_ID` int(10) unsigned DEFAULT NULL,
  `DATE_START` date DEFAULT NULL,
  `CREATED` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teaching_class`
--

LOCK TABLES `teaching_class` WRITE;
/*!40000 ALTER TABLE `teaching_class` DISABLE KEYS */;
INSERT INTO `teaching_class` VALUES (1,'defdsfsf',NULL,NULL,'15:30 - 17:30',2324324,NULL,2,'vfdgdgf',NULL,NULL,NULL,NULL,NULL),(2,'Lớp mới',NULL,NULL,'15:30 - 17:30',300000,NULL,3,'Toi la giao vien',NULL,NULL,NULL,NULL,NULL),(3,'dgfdsfsfds',NULL,NULL,'15:30 - 17:30',343535,NULL,3,'vgfh',NULL,NULL,NULL,NULL,NULL),(4,'lop moi',1,'4','15:30 - 17:30, 15:00',2132342,NULL,3,'tyujtjghj',NULL,NULL,NULL,NULL,NULL),(5,'Mo lop',1,'3','12:30- 14:30',342424,1,4,'dsfsfdtg',NULL,NULL,4,NULL,NULL);
/*!40000 ALTER TABLE `teaching_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `unit` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(250) DEFAULT NULL,
  `IS_ACTIVE` bit(1) DEFAULT b'1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,'buổi',_binary ''),(2,'tháng',_binary '');
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-10 17:55:53
