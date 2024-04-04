-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2024 at 01:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-11 10:05:00', '0000-00-00 00:00:00', 'CHECK_IN', 'HR'),
(2, '8192f06b-9e76-4abb-8183-e24c682aa0e5', '2023-08-11 10:49:00', '0000-00-00 00:00:00', 'CHECK_IN', 'Admin'),
(3, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-12 10:27:13', '2023-08-11 09:27:27', 'CHECK_OUT', NULL),
(4, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2024-04-04 10:00:00', NULL, 'CHECK_IN', NULL);

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
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-11 13:09:00', '2023-08-11 14:01:00', 'BREAK_OUT', 'HR'),
(2, '8192f06b-9e76-4abb-8183-e24c682aa0e5', '2023-08-11 10:50:00', '2023-08-11 10:53:00', 'BREAK_OUT', 'Admin'),
(3, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2024-04-04 13:00:00', '2024-04-04 13:05:00', 'BREAK_OUT', NULL),
(5, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2024-04-04 14:00:00', '2024-04-04 14:50:00', 'BREAK_OUT', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `label` varchar(30) NOT NULL,
  `post_by` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `date`, `label`, `post_by`, `created_at`) VALUES
(1, '2023-08-09', 'holiday', 'Admin', '2023-08-09 06:02:09'),
(2, '2023-08-09', 'holiday', 'Admin', '2023-08-09 06:02:45'),
(3, '2023-08-10', 'asdad', 'Admin', '2023-08-09 11:05:33'),
(6, '2023-08-31', 'asdasd', 'Admin', '2023-08-09 11:08:00'),
(7, '2023-08-24', 'gsdfgdsgds', 'Admin', '2023-08-09 11:10:39'),
(8, '2023-08-25', '654afa', 'Admin', '2023-08-09 11:37:51');

-- --------------------------------------------------------

--
-- Table structure for table `increment`
--

CREATE TABLE `increment` (
  `id` int(15) NOT NULL,
  `employee_id` varchar(36) NOT NULL,
  `increment_date` date NOT NULL,
  `amount` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  `updated_by` varchar(20) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-10 08:53:45', '2023-08-10', '2023-08-11', 'PL', 'asdasd', 'Applied', NULL),
(2, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-10 08:54:49', '2023-08-16', '2023-08-17', 'CL', 'asdasasd', 'Applied', NULL),
(3, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-10 08:58:06', '2023-08-22', '2023-08-09', 'CL', 'xczcxczc', 'Approved for Less Days', 'Admin'),
(4, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-10 08:59:06', '2023-08-23', '2023-08-18', 'SL', 'sdfdsfsf', 'Applied', NULL),
(5, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-10 08:59:55', '2023-08-29', '2023-08-30', 'PL', 'sdfsdfsdf', 'Applied', NULL),
(6, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-10 09:00:47', '2023-09-01', '2023-08-17', 'PL', 'asdad', 'Applied', NULL),
(7, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-10 09:01:38', '2023-08-31', '2023-09-01', 'PL', 'dfsfsdf', 'Applied', NULL),
(8, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-10 09:04:59', '2023-08-30', '2023-08-19', 'PL', 'assdsad', 'Applied', NULL),
(9, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-11 05:28:07', '2023-08-16', '2023-08-17', 'SL', '789dsf', 'In Review', 'HR'),
(10, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-11 06:32:43', '0000-00-00', '0000-00-00', '', '', 'Applied', NULL),
(11, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', '2023-08-11 06:33:23', '2023-08-11', '2023-09-06', 'CL', 'test   fsdff sdfdsfsd', 'Leave Approved', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `application_id` int(10) NOT NULL,
  `employee_id` varchar(36) NOT NULL,
  `type` varchar(50) NOT NULL,
  `message` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `application_id`, `employee_id`, `type`, `message`, `date`, `status`) VALUES
(1, 3, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:20:40', 'null'),
(2, 4, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:21:43', 'null'),
(3, 5, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:22:35', 'null'),
(4, 1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:23:22', 'null'),
(5, 2, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:24:16', 'null'),
(6, 3, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:24:38', 'null'),
(7, 4, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:26:12', 'null'),
(8, 5, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:30:39', 'null'),
(9, 6, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:36:03', 'null'),
(10, 7, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:37:01', 'null'),
(11, 8, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-09 13:37:36', 'null'),
(12, 9, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 04:39:08', 'null'),
(13, 10, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 04:46:10', 'null'),
(14, 1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 04:49:48', 'null'),
(15, 2, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 05:09:43', 'null'),
(16, 3, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 05:10:12', 'null'),
(17, 4, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 08:48:05', 'null'),
(18, 5, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 08:50:06', 'null'),
(19, 6, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 08:51:42', 'null'),
(20, 1, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 08:53:45', 'null'),
(21, 2, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 08:54:49', 'null'),
(22, 3, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 08:58:06', 'null'),
(23, 4, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 08:59:06', 'null'),
(24, 5, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 08:59:55', 'null'),
(25, 6, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 09:00:47', 'null'),
(26, 7, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 09:01:38', 'null'),
(27, 8, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-10 09:04:59', 'null'),
(28, 9, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-11 05:28:07', 'null'),
(29, 10, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-11 06:32:43', 'null'),
(30, 11, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 'leave', 'Leave Application from Vikram Ahir', '2023-08-11 06:33:23', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(36) NOT NULL,
  `amount` int(20) NOT NULL,
  `salary_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `employee_id`, `amount`, `salary_date`, `status`) VALUES
(1, '201b3960-90aa-4aaf-81df-1e82f65609ad', 30000, '2023-08-11 12:39:59', 'CREDIT'),
(4, '33780845-2110-4a3e-a037-b5f5e52ddf46', 28000, '2023-08-11 12:42:41', 'CREDIT'),
(5, '8192f06b-9e76-4abb-8183-e24c682aa0e5', 25000, '2023-08-11 12:42:57', 'CREDIT'),
(6, 'a02e3a13-e3ff-4c04-9c1b-792f226c2676', 23000, '2023-08-11 12:43:12', 'CREDIT'),
(7, 'c39bf89d-9613-44bc-baab-9878ca4bc56b', 20000, '2023-08-11 12:43:27', 'CREDIT');

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
  `join_date` date DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `status` enum('Active','Inactive','Deleted') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `join_date`, `profile`, `birth_date`, `status`, `created_at`, `updated_at`) VALUES
('201b3960-90aa-4aaf-81df-1e82f65609ad', 'test', 'demo', 'test@gmail.com', '$2b$12$lKY2oxL/ULn9I3IRG.yVQuxzA97UlTLNPEQP55eoNSeKAe7ShkOSa', 'Employee', '2020-01-01', '1690794088273-team-4.jpg', '2010-09-07', 'Active', '2023-07-03 07:14:27', '2023-07-31 09:01:28'),
('33780845-2110-4a3e-a037-b5f5e52ddf46', 'Mr.', 'Admin', 'admin@gmail.com', '$2b$12$qzap/h4RFne3ogpDjIqXaey6fYUFt6BdLENmizZFOsU5rZ1hVZIQW', 'Admin', '2021-02-02', '1690794018050-2cube-studio.jpeg', '2020-08-21', 'Active', '2023-06-24 12:25:17', '2023-07-31 09:00:18'),
('8192f06b-9e76-4abb-8183-e24c682aa0e5', 'Hr', 'John', 'hr@gmail.com', '$2b$12$MYzIcQnTEOEny/j89Wp8cObwbo1PweMimvFP7hSKyovwvDf6K6aJq', 'HR', '2022-03-03', '1690793945673-about-1.png', '2008-08-22', 'Active', '2023-06-24 12:26:40', '2023-07-31 08:59:05'),
('a02e3a13-e3ff-4c04-9c1b-792f226c2676', '2cube', 'Studio', '2cube@gmail.com', '$2b$12$mBFsKlybA4RYD2nprv9FR.stWYD5et0gIoENkLTp2VEJUBuwqudUq', 'Admin', '2023-04-04', '1690794120784-2cube-studio.jpeg', '2023-08-08', 'Active', '2023-07-21 07:01:15', '2023-07-31 09:02:00'),
('c39bf89d-9613-44bc-baab-9878ca4bc56b', 'Vikram', 'Ahir', 'vikram@gmail.com', '$2b$12$g2Fb2zc22Z/6fy.s60iv0uz3U7pd0yIujCPRUYvBgqrbueThdAnq.', 'Employee', '2023-05-05', '1690786119143-DSC00373.JPG', '2011-06-07', 'Active', '2023-06-24 12:26:00', '2023-07-31 06:48:39');

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
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `increment`
--
ALTER TABLE `increment`
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
-- Indexes for table `salary`
--
ALTER TABLE `salary`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `break_in_out`
--
ALTER TABLE `break_in_out`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `increment`
--
ALTER TABLE `increment`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leave_application`
--
ALTER TABLE `leave_application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
