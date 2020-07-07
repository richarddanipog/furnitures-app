CREATE DATABASE  IF NOT EXISTS `furnitures` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `furnitures`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: furnitures
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(250) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'richard','danipog','+972 502003928','rich@gmail.com','$2b$10$RSJ1CPWKOqQHJVbON42eBeKkEyII8xAVYT6evqy0L4eJYTOBBX8le','Igal alon 90',1),(2,'ricky','dani','+972 401105678','ricky@gmail.com','$2b$10$RSJ1CPWKOqQHJVbON42eBeKkEyII8xAVYT6evqy0L4eJYTOBBX8le','Igal alon 50 b',2),(3,'Round','Two','+922 801105008','roundtwo@gmail.com','$2b$10$RSJ1CPWKOqQHJVbON42eBeKkEyII8xAVYT6evqy0L4eJYTOBBX8le','tel aviv 88',2),(4,'ofek','moshe','0523456789','ofek@gmail.com','$2b$10$jb2ro3Ldk4XjJcYNO3fj3uWObIl1G98HRjak4/IK0xDuINfeq1G1m','igal alon 1',2),(5,'eylon','koenig','0521235668','EylonKoenig@gmail.com','$2b$10$urWNL3m1aG6Umg5TD9LzT.sEwG1v.ctr6ViYG/VH5yu4oBpbhPEjm','Igal alon 90',2),(6,'saveliy','shiryaev','+972 123456789','sava@gmail.com','$2b$10$TtKaSMP0R9axeIEoYpGqzeh0ZR50Q2R5xyL3rIR8vUxyDuY6y8vle','igal alon 99',2),(7,'maya','bridgwater','+972 123456788','maya@gmail.com','$2b$10$s8QeAbSGiNkSZ81pryaTCe7ph9e/z6SPuvykdZv4n4r7BnP525mue','igal alon 4',2),(8,'ziv','abramovich','0502009855','ziv@gmail.com','$2b$10$WXA6Ck6HMYHG36KLdVS1U.lpxgVg.Ig9UZ5muhrPpIXS2aoX5sIU6','Igal alon 5',2),(9,'Shay','Ben shimol','0542009999','shay@gmail.com','$2b$10$gJ8NwxDfIEfwMhOyc/aIQeXUru/NXZNdRhY8SnR4IvfXISH48xM5S','igal alon 22 tel aviv',2),(10,'orii','gilady','0523669874','ori@gmail.com','$2b$10$2OzABdKszzoKjfxNjFJ0D.9LICfvmRYztx2Vp2fBJsGDkgxjVZn3S','2903 Jim Rosa Lane',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-03 19:50:09
