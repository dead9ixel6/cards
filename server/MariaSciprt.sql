CREATE DATABASE IF NOT EXISTS `ez-assi`;
USE `ez-assi`;

CREATE TABLE IF NOT EXISTS `cards` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `imagePath` VARCHAR(255) NOT NULL,
  `assignees` VARCHAR(255) NOT NULL,
  `ideaSummary` TEXT NOT NULL
);

INSERT INTO `cards` (`imagePath`, `assignees`, `ideaSummary`) VALUES
('assets/no_image_uploaded.JPG', 'Assignees 1', 'Idea Summary 1'),
('assets/no_image_uploaded.JPG', 'Assignees 2', 'Idea Summary 2');
