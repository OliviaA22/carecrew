-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: carecrew-db.mysql.database.azure.com    Database: carecrew
-- ------------------------------------------------------
-- Server version	8.0.39-azure

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
-- Table structure for table `documentation`
--

DROP TABLE IF EXISTS `documentation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `nurse_id` int NOT NULL,
  `category` enum('observation','incident','care plan') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `nurse_id` (`nurse_id`),
  CONSTRAINT `documentation_ibfk_27` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `documentation_ibfk_28` FOREIGN KEY (`nurse_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentation`
--

LOCK TABLES `documentation` WRITE;
/*!40000 ALTER TABLE `documentation` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital`
--

LOCK TABLES `hospital` WRITE;
/*!40000 ALTER TABLE `hospital` DISABLE KEYS */;
INSERT INTO `hospital` VALUES (1,'Universitätsklinikum Berlin','Charitéplatz 1, 10117 Berlin','+49 30 450 50','info@charite-berlin.de'),(2,'Krankenhaus St. Marien','Bahnhofstraße 12, 80335 München','+49 89 555 1234','kontakt@stmarien-muenchen.de'),(3,'Klinikum Stuttgart','Kriegsbergstraße 60, 70174 Stuttgart','+49 711 278 01','info@klinikum-stuttgart.de'),(4,'Asklepios Klinik Hamburg','Rübenkamp 220, 22307 Hamburg','+49 40 1818 85','info@asklepios-hamburg.de'),(5,'Universitätsklinikum Heidelberg','Im Neuenheimer Feld 672, 69120 Heidelberg','+49 6221 56 0','contact@uni-heidelberg.de'),(6,'Klinikum Frankfurt Höchst','Gotenstraße 6-8, 65929 Frankfurt am Main','+49 69 31060','info@klinikum-frankfurt.de'),(7,'Krankenhaus Dortmund-Nord','Mallinckrodtstraße 219, 44145 Dortmund','+49 231 8603 0','kontakt@krankenhaus-dortmund.de'),(8,'Medizinisches Zentrum Leipzig','Liebigstraße 20, 04103 Leipzig','+49 341 97 0','service@medizinischeszentrum-leipzig.de'),(9,'Universitätsklinikum Köln','Kerpener Straße 62, 50937 Köln','+49 221 478 0','info@uk-koeln.de'),(10,'Schwarzwaldklinik Freiburg','Hauptstraße 1, 79098 Freiburg im Breisgau','+49 761 2711 0','kontakt@schwarzwaldklinik.de');
/*!40000 ALTER TABLE `hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `dosage_form` varchar(50) DEFAULT NULL,
  `strength` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
INSERT INTO `medication` VALUES (1,'Paracetamol','Used to treat mild to moderate pain and fever.','Tablet','500mg'),(2,'Ibuprofen','Non-steroidal anti-inflammatory drug for pain relief.','Tablet','200mg'),(3,'Amoxicillin','Antibiotic used to treat bacterial infections.','Capsule','250mg'),(4,'Metformin','Medication used to manage type 2 diabetes.','Tablet','500mg'),(5,'Omeprazole','Proton pump inhibitor used for acid reflux.','Capsule','20mg'),(6,'Atorvastatin','Lipid-lowering medication for cholesterol management.','Tablet','10mg'),(7,'Ciprofloxacin','Antibiotic used for bacterial infections.','Tablet','500mg'),(8,'Salbutamol','Bronchodilator used for asthma and COPD.','Inhaler','100mcg/dose'),(9,'Cetirizine','Antihistamine for allergies and hay fever.','Tablet','10mg'),(10,'Aspirin','Used to reduce pain, fever, and inflammation.','Tablet','81mg'),(11,'Insulin Glargine','Long-acting insulin for diabetes management.','Injection','100 units/mL'),(12,'Losartan','Used to treat high blood pressure and protect kidneys.','Tablet','50mg'),(13,'Furosemide','Diuretic used to reduce fluid retention.','Tablet','40mg'),(14,'Loratadine','Antihistamine for allergy relief.','Tablet','10mg'),(15,'Ranitidine','Used to reduce stomach acid and treat ulcers.','Tablet','150mg'),(16,'Clopidogrel','Antiplatelet agent for preventing blood clots.','Tablet','75mg'),(17,'Levothyroxine','Synthetic thyroid hormone for hypothyroidism.','Tablet','50mcg'),(18,'Hydrochlorothiazide','Diuretic for managing high blood pressure.','Tablet','25mg'),(19,'Azithromycin','Antibiotic for treating bacterial infections.','Tablet','500mg'),(20,'Metoprolol','Beta-blocker for high blood pressure and angina.','Tablet','50mg'),(21,'Fluoxetine','Antidepressant used for depression and anxiety.','Capsule','20mg'),(22,'Gabapentin','Used to treat nerve pain and seizures.','Capsule','300mg'),(23,'Prednisone','Corticosteroid for inflammation and autoimmune conditions.','Tablet','10mg'),(24,'Warfarin','Anticoagulant used to prevent blood clots.','Tablet','5mg'),(25,'Doxycycline','Antibiotic for bacterial infections.','Capsule','100mg'),(26,'Morphine','Opioid analgesic for severe pain relief.','Injection','10mg/mL'),(27,'Ketorolac','NSAID for short-term management of moderate pain.','Injection','30mg/mL'),(28,'Ondansetron','Antiemetic used to prevent nausea and vomiting.','Tablet','8mg'),(29,'Amlodipine','Calcium channel blocker for high blood pressure.','Tablet','5mg'),(30,'Simvastatin','Lipid-lowering medication for cholesterol management.','Tablet','20mg'),(31,'Zolpidem','Sedative for short-term treatment of insomnia.','Tablet','10mg'),(32,'Albuterol','Bronchodilator used for asthma and COPD.','Inhaler','90mcg/dose'),(33,'Nitroglycerin','Used to treat chest pain (angina).','Tablet','0.4mg'),(34,'Spironolactone','Potassium-sparing diuretic for heart failure.','Tablet','25mg'),(35,'Carbamazepine','Anticonvulsant for epilepsy and nerve pain.','Tablet','200mg');
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication_administration`
--

DROP TABLE IF EXISTS `medication_administration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication_administration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `status` enum('administered','skipped') NOT NULL,
  `notes` text,
  `time_administered` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `med_item_id` int NOT NULL,
  `administered_by` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `med_item_id` (`med_item_id`),
  KEY `administered_by` (`administered_by`),
  CONSTRAINT `medication_administration_ibfk_37` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `medication_administration_ibfk_38` FOREIGN KEY (`med_item_id`) REFERENCES `medication_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `medication_administration_ibfk_39` FOREIGN KEY (`administered_by`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication_administration`
--

LOCK TABLES `medication_administration` WRITE;
/*!40000 ALTER TABLE `medication_administration` DISABLE KEYS */;
INSERT INTO `medication_administration` VALUES (1,5,'administered','Patient tolerated medication well.','2025-01-31 19:28:36','2025-01-31 19:28:36','2025-01-31 19:28:36',40,3),(2,1,'administered','Patient tolerated medication well.','2025-01-31 21:03:48','2025-01-31 21:03:48','2025-01-31 21:03:48',24,3),(3,4,'administered','','2025-02-01 12:30:20','2025-02-01 12:30:19','2025-02-01 12:30:19',47,4),(4,4,'skipped','Operation','2025-02-01 12:33:12','2025-02-01 12:33:11','2025-02-01 12:33:11',49,4),(5,5,'administered','','2025-02-01 12:36:50','2025-02-01 12:36:49','2025-02-01 12:36:49',37,4),(6,5,'skipped','Operation','2025-02-01 12:37:22','2025-02-01 12:37:22','2025-02-01 12:37:22',37,4),(7,5,'skipped','Operation','2025-02-01 12:49:46','2025-02-01 12:49:45','2025-02-01 12:49:45',41,4),(8,5,'skipped','Operation','2025-02-01 12:51:39','2025-02-01 12:51:38','2025-02-01 12:51:38',41,4),(9,5,'skipped','Operation','2025-02-01 12:52:54','2025-02-01 12:52:53','2025-02-01 12:52:53',41,4),(10,5,'skipped','Refused','2025-02-01 12:56:44','2025-02-01 12:56:43','2025-02-01 12:56:43',41,4),(11,5,'skipped','Refused','2025-02-01 12:59:23','2025-02-01 12:59:22','2025-02-01 12:59:22',41,4),(12,5,'skipped','Operation','2025-02-01 13:05:45','2025-02-01 13:05:45','2025-02-01 13:05:45',41,4),(13,4,'skipped','Nausea','2025-02-02 14:09:27','2025-02-02 14:09:26','2025-02-02 14:09:26',51,1),(14,4,'skipped','Refused','2025-02-02 21:55:34','2025-02-02 21:55:32','2025-02-02 21:55:32',46,1),(15,4,'administered','','2025-02-02 21:55:42','2025-02-02 21:55:40','2025-02-02 21:55:40',50,1);
/*!40000 ALTER TABLE `medication_administration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication_item`
--

DROP TABLE IF EXISTS `medication_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `medication_id` int NOT NULL,
  `dose` varchar(50) NOT NULL,
  `frequency` varchar(50) NOT NULL,
  `route_of_administration` varchar(50) NOT NULL,
  `instructions` text,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('completed','due') DEFAULT 'due',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `scheduled_time` varchar(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plan_id` (`plan_id`),
  KEY `medication_id` (`medication_id`),
  CONSTRAINT `medication_item_ibfk_29` FOREIGN KEY (`plan_id`) REFERENCES `medication_plan` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `medication_item_ibfk_30` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication_item`
--

LOCK TABLES `medication_item` WRITE;
/*!40000 ALTER TABLE `medication_item` DISABLE KEYS */;
INSERT INTO `medication_item` VALUES (24,9,11,'500mg','3 times a day','Oral','Take with food.','2025-02-01','2025-05-01','completed','2025-01-31 17:54:55','2025-01-31 21:03:48','07:00'),(25,9,11,'500mg','3 times a day','Oral','Take with food.','2025-02-01','2025-05-01','due','2025-01-31 17:54:55','2025-01-31 17:54:55','15:00'),(26,9,11,'500mg','3 times a day','Oral','Take with food.','2025-02-01','2025-05-01','due','2025-01-31 17:54:55','2025-01-31 17:54:55','22:00'),(27,9,12,'10 units','Once a day','Injection','Inject subcutaneously in the morning before breakfast.','2025-02-01','2025-05-01','due','2025-01-31 17:54:55','2025-01-31 17:54:55','07:30'),(28,9,13,'1 tablet','Twice a day','Oral','Take after meals.','2025-02-01','2025-05-01','due','2025-01-31 17:54:55','2025-01-31 17:54:55','09:00'),(29,9,13,'1 tablet','Twice a day','Oral','Take after meals.','2025-02-01','2025-05-01','due','2025-01-31 17:54:55','2025-01-31 17:54:55','14:00'),(36,10,5,'5ml','Every 6 hours','Oral','Shake well before use.','2025-01-10','2025-03-10','due','2025-01-31 18:08:30','2025-01-31 18:08:30','07:00'),(37,10,5,'5ml','Every 6 hours','Oral','Shake well before use.','2025-01-10','2025-03-10','completed','2025-01-31 18:08:30','2025-02-01 12:36:49','14:00'),(38,10,5,'5ml','Every 6 hours','Oral','Shake well before use.','2025-01-10','2025-03-10','due','2025-01-31 18:08:30','2025-01-31 18:08:30','21:00'),(39,10,22,'10ml','Twice a day','Oral','Take in the morning and night.','2025-02-01','2025-03-10','due','2025-01-31 18:08:30','2025-01-31 18:08:30','10:00'),(40,10,22,'10ml','Twice a day','Oral','Take in the morning and night.','2025-02-01','2025-03-10','completed','2025-01-31 18:08:30','2025-01-31 19:28:36','20:00'),(41,10,26,'15ml','Once a day','Oral','Take before bedtime.','2025-02-05','2025-03-10','completed','2025-01-31 18:08:30','2025-02-01 12:49:46','14:30'),(42,11,20,'50mg','Once a day','Oral','Take in the morning.','2025-02-05','2025-05-05','due','2025-01-31 18:12:21','2025-01-31 18:12:21','08:30'),(43,11,22,'5mg','Twice a day','Oral','Take morning and night.','2025-02-05','2025-05-05','due','2025-01-31 18:12:21','2025-01-31 18:12:21','10:00'),(44,11,22,'5mg','Twice a day','Oral','Take morning and night.','2025-02-05','2025-05-05','due','2025-01-31 18:12:21','2025-01-31 18:12:21','19:30'),(45,11,29,'10mg','Once a day','Oral','Take with food.','2025-02-05','2025-05-05','due','2025-01-31 18:12:21','2025-01-31 18:12:21','18:00'),(46,12,30,'500mg','Every 6 hours','Oral','Take after meals.','2025-03-01','2025-04-15','completed','2025-01-31 18:16:57','2025-02-02 21:55:32','08:30'),(47,12,30,'500mg','Every 6 hours','Oral','Take after meals.','2025-02-01','2025-03-15','completed','2025-01-31 18:16:57','2025-02-01 12:30:19','14:00'),(48,12,20,'500mg','Every 6 hours','Oral','Take after meals.','2025-02-01','2025-03-15','due','2025-01-31 18:16:57','2025-01-31 18:16:57','22:00'),(49,12,32,'250mg','Once a day','Oral','Take before sleep.','2025-02-01','2025-03-15','completed','2025-01-31 18:16:57','2025-02-01 12:33:11','14:00'),(50,12,18,'50mg','Every 12 hours','Injection','Inject in the upper arm.','2025-02-01','2025-03-15','completed','2025-01-31 18:16:57','2025-02-02 21:55:40','08:00'),(51,12,18,'50mg','Every 12 hours','Injection','Inject in the upper arm.','2025-02-01','2025-03-15','completed','2025-01-31 18:16:57','2025-02-02 14:09:26','20:00'),(52,13,4,'10mg','Three times a day','Oral','Take with food.','2025-01-20','2025-05-20','due','2025-01-31 18:20:57','2025-01-31 18:20:57','8:00'),(53,13,4,'10mg','Three times a day','Oral','Take with food.','2025-01-20','2025-05-20','due','2025-01-31 18:20:57','2025-01-31 18:20:57','14:00'),(54,13,4,'10mg','Three times a day','Oral','Take with food.','2025-01-20','2025-05-20','due','2025-01-31 18:20:57','2025-01-31 18:20:57','22:00'),(55,13,12,'50mg','Once a day','Oral','Take before bed.','2025-01-20','2025-05-20','due','2025-01-31 18:20:57','2025-01-31 18:20:57','13:00'),(56,13,7,'25mg','Twice a day','Oral','Take with breakfast and dinner.','2025-01-20','2025-05-20','due','2025-01-31 18:20:57','2025-01-31 18:20:57','09:30'),(57,13,7,'25mg','Twice a day','Oral','Take with breakfast and dinner.','2025-01-20','2025-05-20','due','2025-01-31 18:20:57','2025-01-31 18:20:57','19:30');
/*!40000 ALTER TABLE `medication_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication_plan`
--

DROP TABLE IF EXISTS `medication_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication_plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `created_by` int NOT NULL,
  `valid_from` date NOT NULL,
  `valid_until` date DEFAULT NULL,
  `additional_notes` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `medication_plan_ibfk_48` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `medication_plan_ibfk_49` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication_plan`
--

LOCK TABLES `medication_plan` WRITE;
/*!40000 ALTER TABLE `medication_plan` DISABLE KEYS */;
INSERT INTO `medication_plan` VALUES (9,1,3,'2025-02-01','2025-05-01','Monitor blood sugar levels daily.','2025-01-31 17:43:50','2025-01-31 17:43:50','Diabetes Management Plan'),(10,5,3,'2025-02-10','2025-03-10','Monitor temperature every 6 hours.','2025-01-31 17:59:19','2025-01-31 17:59:19','Pediatric Fever Management Plan'),(11,3,3,'2025-02-05','2025-05-05','Monitor blood pressure daily.','2025-01-31 18:10:28','2025-01-31 18:10:28','Hypertension Control Plan'),(12,4,3,'2025-03-01','2025-04-15','Monitor pain levels and watch for infection signs.','2025-01-31 18:13:25','2025-01-31 18:13:25','Post-Surgery Recovery Plan'),(13,2,3,'2025-01-20','2025-05-20','Ensure proper hydration and monitor drowsiness.','2025-01-31 18:18:01','2025-01-31 18:18:01','Chronic Pain Management Plan');
/*!40000 ALTER TABLE `medication_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `notification_type` enum('task','reminder','alert') DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ward_id` int NOT NULL,
  `medication_item_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  KEY `ward_id` (`ward_id`),
  KEY `medication_item_id` (`medication_item_id`),
  CONSTRAINT `notification_ibfk_18` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_19` FOREIGN KEY (`ward_id`) REFERENCES `ward` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `notification_ibfk_20` FOREIGN KEY (`medication_item_id`) REFERENCES `medication_item` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (66,1,'reminder','Medication \"13\" is due for \"Lukas Schmidt\" at 09:00.',1,'2025-02-01 09:00:00','2025-02-02 17:13:38',3,28),(67,1,'alert','ALERT: Medication scheduled at 09:00 was missed for \"Lukas Schmidt\". Immediate action required!',0,'2025-02-01 09:00:00','2025-02-01 09:00:00',3,28),(68,2,'reminder','Medication \"7\" is due for \"Hannah Weber\" at 09:30.',0,'2025-02-01 09:00:00','2025-02-01 09:00:00',5,56),(69,3,'alert','ALERT: Medication scheduled at 08:30 was missed for \"Maya Schuler\". Immediate action required!',0,'2025-02-01 09:00:00','2025-02-01 09:00:00',2,42),(70,4,'alert','ALERT: Medication scheduled at 08:30 was missed for \"Mariam Schuler\". Immediate action required!',0,'2025-02-01 09:00:00','2025-02-01 09:00:00',7,46),(71,5,'reminder','Medication \"22\" is due for \"Joeseph Boehler\" at 10:00.',1,'2025-02-01 10:00:00','2025-02-02 17:14:43',7,39),(72,5,'alert','ALERT: Medication scheduled at 10:00 was missed for \"Joeseph Boehler\". Immediate action required!',1,'2025-02-01 10:00:00','2025-02-02 17:38:08',7,39),(73,3,'reminder','Medication \"22\" is due for \"Maya Schuler\" at 10:00.',0,'2025-02-01 10:00:00','2025-02-01 10:00:00',2,43),(74,3,'alert','ALERT: Medication scheduled at 10:00 was missed for \"Maya Schuler\". Immediate action required!',0,'2025-02-01 10:00:00','2025-02-01 10:00:00',2,43),(75,2,'alert','ALERT: Medication scheduled at 09:30 was missed for \"Hannah Weber\". Immediate action required!',0,'2025-02-01 10:00:00','2025-02-01 10:00:00',5,56),(76,2,'reminder','Medication \"12\" is due for \"Hannah Weber\" at 13:00.',0,'2025-02-01 12:40:00','2025-02-01 12:40:00',5,55),(77,2,'alert','ALERT: Medication scheduled at 13:00 was missed for \"Hannah Weber\". Immediate action required!',0,'2025-02-01 13:00:00','2025-02-01 13:00:00',5,55),(78,1,'reminder','Medication \"13\" is due for \"Lukas Schmidt\" at 14:00.',0,'2025-02-01 14:00:00','2025-02-01 14:00:00',3,29),(79,1,'alert','ALERT: Medication scheduled at 14:00 was missed for \"Lukas Schmidt\". Immediate action required!',0,'2025-02-01 14:00:00','2025-02-01 14:00:00',3,29),(80,2,'reminder','Medication \"4\" is due for \"Hannah Weber\" at 14:00.',0,'2025-02-01 14:00:00','2025-02-01 14:00:00',5,53),(81,2,'alert','ALERT: Medication scheduled at 14:00 was missed for \"Hannah Weber\". Immediate action required!',0,'2025-02-01 14:00:00','2025-02-01 14:00:00',5,53),(82,1,'reminder','Medication \"11\" is due for \"Lukas Schmidt\" at 15:00.',0,'2025-02-01 14:40:00','2025-02-01 14:40:00',3,25),(83,1,'alert','ALERT: Medication scheduled at 15:00 was missed for \"Lukas Schmidt\". Immediate action required!',0,'2025-02-01 15:00:00','2025-02-01 15:00:00',3,25),(84,3,'reminder','Medication \"29\" is due for \"Maya Schuler\" at 18:00.',0,'2025-02-01 17:40:00','2025-02-01 17:40:00',2,45),(85,3,'alert','ALERT: Medication scheduled at 18:00 was missed for \"Maya Schuler\". Immediate action required!',0,'2025-02-01 18:00:00','2025-02-01 18:00:00',2,45),(86,2,'alert','ALERT: Medication scheduled at 13:00 was missed for \"Hannah Weber\". Immediate action required!',0,'2025-02-02 13:20:01','2025-02-02 13:20:01',5,55),(87,1,'reminder','Medication \"13\" is due for \"Lukas Schmidt\" at 14:00.',0,'2025-02-02 13:40:01','2025-02-02 13:40:01',3,29),(88,2,'reminder','Medication \"4\" is due for \"Hannah Weber\" at 14:00.',0,'2025-02-02 13:40:01','2025-02-02 13:40:01',5,53),(89,1,'alert','ALERT: Medication scheduled at 14:00 was missed for \"Lukas Schmidt\". Immediate action required!',0,'2025-02-02 14:00:00','2025-02-02 14:00:00',3,29),(90,2,'alert','ALERT: Medication scheduled at 14:00 was missed for \"Hannah Weber\". Immediate action required!',0,'2025-02-02 14:00:01','2025-02-02 14:00:01',5,53),(91,1,'reminder','Medication \"11\" is due for \"Lukas Schmidt\" at 15:00.',0,'2025-02-02 14:40:00','2025-02-02 14:40:00',3,25),(92,1,'alert','ALERT: Medication scheduled at 15:00 was missed for \"Lukas Schmidt\". Immediate action required!',0,'2025-02-02 15:00:00','2025-02-02 15:00:00',3,25),(93,3,'reminder','REMINDER: Medication is due for \"Maya Schuler\" at 18:00.',1,'2025-02-02 17:40:01','2025-02-02 21:56:21',2,45),(94,3,'alert','ALERT: Medication scheduled at 18:00 was missed for \"Maya Schuler\". Immediate action required!',1,'2025-02-02 18:00:00','2025-02-02 21:54:48',2,45),(95,5,'reminder','REMINDER: Medication is due for \"Joeseph Boehler\" at 21:00.',0,'2025-02-02 20:40:00','2025-02-02 20:40:00',7,38),(96,5,'alert','ALERT: Medication scheduled at 21:00 was missed for \"Joeseph Boehler\". Immediate action required!',0,'2025-02-02 21:00:00','2025-02-02 21:00:00',7,38),(97,1,'reminder','REMINDER: Medication is due for \"Lukas Schmidt\" at 22:00.',0,'2025-02-02 21:40:00','2025-02-02 21:40:00',3,26),(98,4,'reminder','REMINDER: Medication is due for \"Mariam Schuler\" at 22:00.',0,'2025-02-02 21:40:01','2025-02-02 21:40:01',7,48),(99,2,'reminder','REMINDER: Medication is due for \"Hannah Weber\" at 22:00.',0,'2025-02-02 21:40:01','2025-02-02 21:40:01',5,54),(100,1,'alert','ALERT: Medication scheduled at 22:00 was missed for \"Lukas Schmidt\". Immediate action required!',0,'2025-02-02 22:00:00','2025-02-02 22:00:00',3,26),(101,4,'alert','ALERT: Medication scheduled at 22:00 was missed for \"Mariam Schuler\". Immediate action required!',0,'2025-02-02 22:00:00','2025-02-02 22:00:00',7,48),(102,2,'alert','ALERT: Medication scheduled at 22:00 was missed for \"Hannah Weber\". Immediate action required!',0,'2025-02-02 22:00:00','2025-02-02 22:00:00',5,54);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ward_id` int NOT NULL,
  `hospital_id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `medical_record_number` varchar(50) DEFAULT NULL,
  `admission_date` date NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `discharge_date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `room_no` int NOT NULL,
  `diagnosis` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `medical_record_number` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_2` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_3` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_4` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_5` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_6` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_7` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_8` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_9` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_10` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_11` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_12` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_13` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_14` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_15` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_16` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_17` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_18` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_19` (`medical_record_number`),
  UNIQUE KEY `medical_record_number_20` (`medical_record_number`),
  KEY `ward_id` (`ward_id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `patient_ibfk_39` FOREIGN KEY (`ward_id`) REFERENCES `ward` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `patient_ibfk_40` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,3,1,'Lukas','Schmidt','1990-07-15','MRN00123','2025-01-15',1,NULL,'2025-01-26 22:50:43','2025-01-26 22:50:43',101,'diabetes'),(2,5,2,'Hannah','Weber','1985-03-20','MRN00124','2025-01-12',1,NULL,'2025-01-27 01:38:44','2025-01-27 01:38:44',102,'osteoarthritis'),(3,2,3,'Maya','Schuler','1985-03-20','MRN00132','2025-01-22',1,NULL,'2025-01-29 01:07:09','2025-01-29 01:07:09',102,'hepatitis'),(4,7,1,'Mariam','Schuler','1985-03-20','MRN00112','2025-01-22',1,NULL,'2025-01-31 11:06:28','2025-01-31 11:06:28',101,'kidney failure'),(5,7,1,'Joeseph','Boehler','1989-09-20','MRN00125','2025-01-25',1,NULL,'2025-01-31 11:29:48','2025-01-31 11:29:48',103,'renal infection');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nurse_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` enum('in progress','completed') DEFAULT 'in progress',
  `notes` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nurse_id` (`nurse_id`),
  CONSTRAINT `shift_ibfk_1` FOREIGN KEY (`nurse_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (1,3,'2025-01-31 13:24:31','2025-01-31 13:25:17','completed',NULL,'2025-01-31 13:24:31','2025-01-31 13:25:17'),(2,3,'2025-02-02 20:54:29','2025-02-02 20:57:56','completed','all medications administered','2025-02-02 20:54:29','2025-02-02 20:57:56'),(3,3,'2025-02-02 21:03:14','2025-02-02 21:04:29','completed','','2025-02-02 21:03:14','2025-02-02 21:04:29'),(4,3,'2025-02-02 21:04:49','2025-02-02 21:05:09','completed','ghgug','2025-02-02 21:04:49','2025-02-02 21:05:09'),(5,3,'2025-02-02 21:08:34','2025-02-02 21:08:47','completed','','2025-02-02 21:08:34','2025-02-02 21:08:47'),(6,3,'2025-02-02 21:09:54','2025-02-02 21:25:56','completed','','2025-02-02 21:09:54','2025-02-02 21:25:56'),(7,3,'2025-02-02 21:53:11','2025-02-02 21:53:17','completed','','2025-02-02 21:53:11','2025-02-02 21:53:17'),(8,3,'2025-02-02 21:53:27','2025-02-02 21:53:58','completed','this was the best shift ','2025-02-02 21:53:27','2025-02-02 21:53:58'),(9,1,'2025-02-02 21:54:37','2025-02-02 21:56:37','completed','Shift ended due to logout','2025-02-02 21:54:37','2025-02-02 21:56:37'),(10,3,'2025-02-02 21:58:59','2025-02-02 21:59:19','completed','all medications administered','2025-02-02 21:58:59','2025-02-02 21:59:19'),(11,3,'2025-02-02 23:41:28',NULL,'in progress',NULL,'2025-02-02 23:41:28','2025-02-02 23:41:28');
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('nurse','admin') NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `phone_number` varchar(25) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `address` json NOT NULL,
  `hospital_id` int NOT NULL,
  `ward_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  KEY `hospital_id` (`hospital_id`),
  KEY `ward_id` (`ward_id`),
  CONSTRAINT `user_ibfk_39` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_40` FOREIGN KEY (`ward_id`) REFERENCES `ward` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Max','Schneider','max.schneider@example.com','$2a$10$2ZhEfqRJ25hxU5Kcr5D04uR60YtzqFk.malGB1bokROQPix2k/e0u','nurse','1985-08-20 00:00:00','+49 160 98765432','Male','{\"city\": \"Munich\", \"street\": \"Bahnhofstraße 45\", \"country\": \"Germany\", \"postalCode\": \"80335\"}',2,7,'2025-01-26 22:22:57','2025-01-26 22:22:57'),(3,'Olivia','Okoro','olivia.okoro@mail.com','$2a$10$1FGRTASkb9q6hppPY4DsTuFrLAW5usVJ5UQJAAyBvgMmCaccOV/1y','admin','1990-05-15 00:00:00','+49 176 12345678','Female','{\"city\": \"Berlin\", \"street\": \"Hauptstraße 12\", \"country\": \"Germany\", \"postalCode\": \"10117\"}',1,2,'2025-01-26 22:25:47','2025-01-26 22:25:47'),(4,'Michelle','Schmidt','schmidt@gmai.com','$2a$10$PCS/DCw9MLkeBO.Ebhjk9Ou0uwpJ8CkIlaKZ4PFnhtkuicTLt1RcC','nurse','2025-01-15 00:00:00','017671228226','Male','{\"city\": \"Muenchen\", \"state\": \"Bavaria\", \"street\": \"Echinger Str. 8c\", \"country\": \"Deutschland\", \"postcode\": \"80805\"}',3,7,'2025-01-31 20:59:11','2025-01-31 20:59:11');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ward`
--

DROP TABLE IF EXISTS `ward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ward` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `ward_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ward`
--

LOCK TABLES `ward` WRITE;
/*!40000 ALTER TABLE `ward` DISABLE KEYS */;
INSERT INTO `ward` VALUES (1,1,'Emergency Ward'),(2,1,'Pediatric Ward'),(3,1,'General Medicine Ward'),(4,1,'Cardiology Ward'),(5,2,'Intensive Care Unit'),(6,2,'Maternity Ward'),(7,2,'General Medicine Ward'),(8,2,'Oncology Ward'),(9,3,'Surgical Ward'),(10,3,'General Medicine Ward'),(11,3,'Neurology Ward'),(12,3,'Trauma Ward'),(13,4,'Oncology Ward'),(14,4,'Neurology Ward'),(15,4,'General Medicine Ward'),(16,4,'Burn Unit'),(17,5,'Orthopedic Ward'),(18,5,'Geriatric Ward'),(19,5,'General Medicine Ward'),(20,5,'Rehabilitation Ward'),(21,6,'Neonatal ICU'),(22,6,'Psychiatric Ward'),(23,6,'General Medicine Ward'),(24,6,'Pulmonology Ward'),(25,7,'Burn Unit'),(26,7,'Trauma Ward'),(27,7,'General Medicine Ward'),(28,7,'Surgical Ward'),(29,8,'Pulmonology Ward'),(30,8,'Gastroenterology Ward'),(31,8,'General Medicine Ward'),(32,8,'Orthopedic Ward'),(33,9,'Endocrinology Ward'),(34,9,'Dermatology Ward'),(35,9,'General Medicine Ward'),(36,9,'Maternity Ward'),(37,10,'Rehabilitation Ward'),(38,10,'General Medicine Ward'),(39,10,'Emergency Ward'),(40,10,'Pediatric Ward');
/*!40000 ALTER TABLE `ward` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-03  1:13:23
