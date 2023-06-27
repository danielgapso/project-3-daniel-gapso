-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `UserCode` int NOT NULL,
  `VacationCode` int NOT NULL,
  KEY `UserCode` (`UserCode`),
  KEY `VacationCode` (`VacationCode`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`UserCode`) REFERENCES `users` (`UserCode`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`VacationCode`) REFERENCES `vacations` (`VacationCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2,7),(57,10),(57,2),(57,8),(2,2),(2,8);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserCode` int NOT NULL AUTO_INCREMENT,
  `UserFirstName` varchar(45) NOT NULL,
  `UserLastName` varchar(45) NOT NULL,
  `UserPassword` varchar(45) NOT NULL,
  `UserEmail` varchar(255) NOT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `likedVacations` json DEFAULT NULL,
  PRIMARY KEY (`UserCode`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','1111','ddd@gmail.com',1,'null'),(2,'first','user','1111','test@mail.com',0,'[7, 2, 8]'),(57,'test2','test2','1111','a@qqq.c',0,'[10, 2, 8]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `VacationCode` int NOT NULL AUTO_INCREMENT,
  `Destination` varchar(45) NOT NULL,
  `Description` varchar(128) NOT NULL,
  `StartDate` varchar(45) NOT NULL,
  `EndDate` varchar(45) NOT NULL,
  `Price` varchar(45) NOT NULL,
  `Img` varchar(256) NOT NULL,
  `likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`VacationCode`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'EGYPT ','cairo','2023-06-27','2023-06-29','200','egypt.jpg',0),(2,'USA','NYC','2023-06-21','2023-06-22','200','nyc.jpg',2),(3,'USA','HAWAI','2023-06-20','2023-06-22','500','hawai.jpg',0),(4,'germany','berlin','2023-06-27','2023-06-29','500','berlin.jpeg',0),(5,'germany','munich','2023-06-29','2023-07-01','400','munich.webp',0),(6,'russia','moscow','2023-06-21','2023-06-23','300','moscow.jpg',0),(7,'romania','bucharest','2023-06-20','2023-06-22','150','bucharest.jpg',1),(8,'england','london','2023-06-20','2023-06-22','550','london.jpg',2),(9,'japan','tokyo','2023-06-27','2023-06-28','250','tokyo.jpg',0),(10,'italy','rome','2023-06-18','2023-06-27','500','rome.jpg',1),(11,'france','paris','2023-06-28','2023-06-30','400','paris.jpg',0),(12,'china','beijing','2023-06-29','2023-07-01','550','beijing.webp',0);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-27 13:03:22
