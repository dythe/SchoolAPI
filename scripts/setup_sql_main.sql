-- Create database
CREATE DATABASE `school` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- Set default schema
USE `school`;

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
  PRIMARY KEY (`teacher_email`, `student_email`),
  FOREIGN KEY (`teacher_email`) REFERENCES `school_information` (`email`),
  FOREIGN KEY (`student_email`) REFERENCES `school_information` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studenthon@gmail.com','Hon Liu',0,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studentjon@gmail.com','Jon Goh',0,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studentamy@gmail.com','Amy Quek',0,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studentagnes@gmail.com','Agnes Lee',0,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studentbob@gmail.com','Bob Poon',0,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studentmiche@gmail.com','Miche Tay',0,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studentshawn@gmail.com','Shawn Tan',0,1);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studentlami@gmail.com','Lami Li',0,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('studentmas@gmail.com','Mas Ho',0,0);

INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('teacherken@gmail.com','Ken Lim',1,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('teacherpeter@gmail.com','Peter Tan',1,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('teacherpauline@gmail.com','Pauline Heng',1,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('teacherannie@gmail.com','Annie Teo',1,0);
INSERT INTO `school_information` (`email`,`name`,`user_type`,`user_status`) VALUES ('teacherjoe@gmail.com','Joe De',1,0);