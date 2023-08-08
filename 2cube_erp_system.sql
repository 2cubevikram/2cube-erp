-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 08, 2023 at 08:53 AM
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
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-07-31 10:13:00', '2023-07-31 20:08:09', 'CHECK_OUT', 'Admin'),
(2, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-07-31 10:36:00', '2023-07-31 16:37:00', 'CHECK_OUT', 'HR'),
(3, '8192f06b-9e76-4abb-8183-e24c682aa0e5', '2023-07-31 11:37:00', '2023-07-31 20:08:21', 'CHECK_OUT', 'HR'),
(4, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-08-01 09:57:00', '0000-00-00 00:00:00', 'CHECK_IN', 'Admin'),
(5, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-01 09:48:13', '2023-08-01 20:12:46', 'CHECK_OUT', NULL),
(6, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-02 09:43:32', '2023-08-02 20:41:33', 'CHECK_OUT', NULL),
(7, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-08-02 15:18:00', '2023-08-02 20:42:14', 'CHECK_OUT', 'Admin'),
(8, '8192f06b-9e76-4abb-8183-e24c682aa0e5', '2023-08-02 17:59:11', '2023-08-02 19:26:42', 'CHECK_OUT', NULL),
(10, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-04 09:52:05', '2023-08-04 20:11:13', 'CHECK_OUT', NULL),
(11, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-07 09:57:00', '2023-08-07 19:35:38', 'CHECK_OUT', 'Admin'),
(12, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-08 10:10:18', NULL, 'CHECK_IN', NULL);

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
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-07-31 11:16:00', '2023-07-31 11:26:00', 'BREAK_OUT', 'HR'),
(2, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-07-31 13:17:00', '2023-07-31 14:22:00', 'BREAK_OUT', 'Admin'),
(3, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-07-31 18:53:28', '2023-07-31 18:53:31', 'BREAK_OUT', NULL),
(4, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-07-31 18:53:43', '2023-07-31 20:08:07', 'BREAK_OUT', NULL),
(5, '8192f06b-9e76-4abb-8183-e24c682aa0e5', '2023-07-31 18:56:07', '2023-07-31 20:08:20', 'BREAK_OUT', NULL),
(6, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-01 13:07:46', '2023-08-01 14:02:39', 'BREAK_OUT', NULL),
(7, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-01 14:46:14', '2023-08-01 15:04:33', 'BREAK_OUT', NULL),
(8, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-08-02 15:18:00', '2023-08-02 15:24:00', 'BREAK_OUT', 'Admin'),
(9, '33780845-2110-4a3e-a037-b5f5e52ddf46', '2023-08-02 15:18:00', '2023-08-02 16:24:00', 'BREAK_OUT', 'Admin'),
(10, '8192f06b-9e76-4abb-8183-e24c682aa0e5', '2023-08-02 17:10:00', '2023-08-02 17:59:00', 'BREAK_OUT', 'HR'),
(11, '8192f06b-9e76-4abb-8183-e24c682aa0e5', '2023-08-02 17:59:00', '2023-08-02 17:59:00', 'BREAK_OUT', 'HR'),
(12, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-02 13:03:00', '2023-08-02 13:58:00', 'BREAK_OUT', 'HR'),
(13, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-02 19:10:00', '2023-08-02 19:22:00', 'BREAK_OUT', 'Admin'),
(14, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-04 13:08:04', '2023-08-04 14:02:05', 'BREAK_OUT', NULL),
(15, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-07 13:03:59', '2023-08-07 14:01:00', 'BREAK_OUT', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leave_application`
--

CREATE TABLE `leave_application` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(36) NOT NULL,
  `app_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `leave_type` varchar(15) NOT NULL,
  `reason` longtext NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `updated_by` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leave_application`
--

INSERT INTO `leave_application` (`id`, `employee_id`, `app_date`, `start_date`, `end_date`, `leave_type`, `reason`, `status`, `updated_by`) VALUES
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-08 05:43:44', '2023-08-08', '2023-08-09', 'CL', 'test 1', 'Applied', NULL),
(2, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-08 06:00:22', '2023-08-14', '2023-08-15', 'PL', 'asfdgjg agffg', 'Applied', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(36) NOT NULL,
  `type` varchar(50) NOT NULL,
  `message` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `employee_id`, `type`, `message`, `date`, `status`) VALUES
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-08 06:00:22', NULL);

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
('201b3960-90aa-4aaf-81df-1e82f65609ad', 'test', 'demo', 'test@gmail.com', '$2b$12$lKY2oxL/ULn9I3IRG.yVQuxzA97UlTLNPEQP55eoNSeKAe7ShkOSa', 'Employee', '1690794088273-team-4.jpg', '2010-09-07', 'Active', '2023-07-03 07:14:27', '2023-07-31 09:01:28'),
('33780845-2110-4a3e-a037-b5f5e52ddf46', 'Mr.', 'Admin', 'admin@gmail.com', '$2b$12$qzap/h4RFne3ogpDjIqXaey6fYUFt6BdLENmizZFOsU5rZ1hVZIQW', 'Admin', '1690794018050-2cube-studio.jpeg', '2020-08-21', 'Active', '2023-06-24 12:25:17', '2023-07-31 09:00:18'),
('8192f06b-9e76-4abb-8183-e24c682aa0e5', 'Hr', 'John', 'hr@gmail.com', '$2b$12$MYzIcQnTEOEny/j89Wp8cObwbo1PweMimvFP7hSKyovwvDf6K6aJq', 'HR', '1690793945673-about-1.png', '2008-08-22', 'Active', '2023-06-24 12:26:40', '2023-07-31 08:59:05'),
('a02e3a13-e3ff-4c04-9c1b-792f226c2676', '2cube', 'Studio', '2cube@gmail.com', '$2b$12$mBFsKlybA4RYD2nprv9FR.stWYD5et0gIoENkLTp2VEJUBuwqudUq', 'Admin', '1690794120784-2cube-studio.jpeg', '2023-08-08', 'Active', '2023-07-21 07:01:15', '2023-07-31 09:02:00'),
('c39bf89d-9613-44bc-baab-9878ca4bc56b', 'Vikram', 'Ahir', 'vikram@gmail.com', '$2b$12$g2Fb2zc22Z/6fy.s60iv0uz3U7pd0yIujCPRUYvBgqrbueThdAnq.', 'Employee', '1690786119143-DSC00373.JPG', '2011-06-07', 'Active', '2023-06-24 12:26:00', '2023-07-31 06:48:39');

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
-- Indexes for table `leave_application`
--
ALTER TABLE `leave_application`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `break_in_out`
--
ALTER TABLE `break_in_out`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `leave_application`
--
ALTER TABLE `leave_application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
