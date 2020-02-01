-- Create database
CREATE DATABASE `mock_school` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- Set default schema
USE `mock_school`;

-- Create school information table
CREATE TABLE `school_information` (
  `email` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `user_type` int(11) DEFAULT 0,
  `user_status` int(11) DEFAULT 0,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Student to Teacher registration
CREATE TABLE `student_to_teacher_registration` (
  `teacher_email` varchar(50) NOT NULL,
  `student_email` varchar(50) NOT NULL,
  PRIMARY KEY (`teacher_email`,`student_email`),
  KEY `student_email` (`student_email`),
  CONSTRAINT `student_to_teacher_registration_ibfk_1` FOREIGN KEY (`teacher_email`) REFERENCES `school_information` (`email`),
  CONSTRAINT `student_to_teacher_registration_ibfk_2` FOREIGN KEY (`student_email`) REFERENCES `school_information` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;