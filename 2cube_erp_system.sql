-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2023 at 06:46 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2cube_erp_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `_in` datetime DEFAULT NULL,
  `_out` datetime DEFAULT NULL,
  `status` varchar(11) DEFAULT NULL,
  `updated_by` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `employee_id`, `_in`, `_out`, `status`, `updated_by`) VALUES
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-07-25 10:12:00', '2023-07-25 19:45:44', 'CHECK_OUT', 'Admin'),
(2, 'a02e3a13-e3ff-4c04-9c1b-792f226c2676', '2023-07-25 10:02:00', '2023-07-25 20:35:26', 'CHECK_OUT', 'Admin'),
(3, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-07-25 07:56:00', '2023-07-25 20:54:47', 'CHECK_OUT', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `break_in_out`
--

CREATE TABLE `break_in_out` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `_in` datetime DEFAULT NULL,
  `_out` datetime DEFAULT NULL,
  `status` varchar(11) DEFAULT NULL,
  `updated_by` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `break_in_out`
--

INSERT INTO `break_in_out` (`id`, `employee_id`, `_in`, `_out`, `status`, `updated_by`) VALUES
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-07-25 13:30:00', '2023-07-25 14:33:00', 'BREAK_OUT', 'Admin'),
(2, 'a02e3a13-e3ff-4c04-9c1b-792f226c2676', '2023-07-25 13:30:00', '2023-07-25 14:39:00', 'BREAK_OUT', 'Admin'),
(3, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-07-25 13:00:00', '2023-07-25 14:00:00', 'BREAK_OUT', 'Admin'),
(4, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-07-25 17:10:00', '2023-07-25 18:19:00', 'BREAK_OUT', 'Admin'),
(5, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-07-25 20:54:42', '2023-07-25 20:54:44', 'BREAK_OUT', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `status` enum('Active','Inactive','Deleted') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `profile`, `birth_date`, `status`, `created_at`, `updated_at`) VALUES
('201b3960-90aa-4aaf-81df-1e82f65609ad', 'test', 'demo', 'test@gmail.com', '$2b$12$lKY2oxL/ULn9I3IRG.yVQuxzA97UlTLNPEQP55eoNSeKAe7ShkOSa', 'Employee', NULL, NULL, 'Active', '2023-07-03 07:14:27', NULL),
('33780845-2110-4a3e-a037-b5f5e52ddf46', 'Mr.', 'Admin', 'admin@gmail.com', '$2b$12$qzap/h4RFne3ogpDjIqXaey6fYUFt6BdLENmizZFOsU5rZ1hVZIQW', 'Admin', '1690190125029-team-4.jpg', '0000-00-00', 'Active', '2023-06-24 12:25:17', '2023-07-24 09:15:25'),
('8192f06b-9e76-4abb-8183-e24c682aa0e5', 'Hr', 'John', 'hr@gmail.com', '$2b$12$MYzIcQnTEOEny/j89Wp8cObwbo1PweMimvFP7hSKyovwvDf6K6aJq', 'HR', NULL, NULL, 'Active', '2023-06-24 12:26:40', NULL),
('a02e3a13-e3ff-4c04-9c1b-792f226c2676', '2cube', 'Studio', '2cube@gmail.com', '$2b$12$mBFsKlybA4RYD2nprv9FR.stWYD5et0gIoENkLTp2VEJUBuwqudUq', 'Admin', '1690281315885-2cube-studio.jpeg', '0000-00-00', 'Active', '2023-07-21 07:01:15', '2023-07-25 10:35:15'),
('c39bf89d-9613-44bc-baab-9878ca4bc56b', 'Vikram', 'Ahir', 'vikram@gmail.com', '$2b$12$g2Fb2zc22Z/6fy.s60iv0uz3U7pd0yIujCPRUYvBgqrbueThdAnq.', 'Employee', '1690282779855-vikram ahir.jpeg', '2010-10-09', 'Active', '2023-06-24 12:26:00', '2023-07-25 10:59:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `break_in_out`
--
ALTER TABLE `break_in_out`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `break_in_out`
--
ALTER TABLE `break_in_out`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
