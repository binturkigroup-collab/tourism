-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2025 at 04:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `first_name`, `last_name`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Admin', 'Administrator', '2025-08-14 11:06:52', '2025-08-14 11:06:52');

-- --------------------------------------------------------

--
-- Stand-in structure for view `admins_view`
-- (See below for the actual view)
--
CREATE TABLE `admins_view` (
`user_id` bigint(20) unsigned
,`admin_id` bigint(20) unsigned
,`first_name` varchar(255)
,`last_name` varchar(255)
,`role` varchar(255)
,`email` varchar(255)
,`avatar` varchar(255)
,`is_active` tinyint(1)
,`created_at` timestamp
);

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 1,
  `is_active` varchar(255) NOT NULL DEFAULT '1',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`id`, `category_id`, `parent_id`, `category`, `image`, `url`, `file`, `order`, `is_active`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'about-us', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 07:54:41', '2025-08-17 07:54:41'),
(4, NULL, NULL, 'technology', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 08:24:12', '2025-08-17 08:24:12'),
(5, NULL, NULL, 'technology', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 08:42:34', '2025-08-17 08:42:34'),
(6, NULL, NULL, 'technology', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 08:43:08', '2025-08-17 08:43:08'),
(7, NULL, NULL, 'technology', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 08:43:24', '2025-08-17 08:43:24'),
(10, NULL, 4, 'skills', NULL, NULL, NULL, 0, '1', NULL, NULL, '2025-08-17 10:00:51', '2025-08-19 11:58:36'),
(11, NULL, 4, 'skills', NULL, NULL, NULL, 2, '1', NULL, NULL, '2025-08-17 10:10:54', '2025-08-19 11:58:39'),
(12, NULL, 4, 'skills', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 10:11:11', '2025-08-19 11:58:39'),
(13, NULL, 4, 'skills', NULL, NULL, NULL, 3, '1', NULL, NULL, '2025-08-17 10:11:22', '2025-08-19 11:58:28'),
(14, NULL, 5, 'skills', NULL, NULL, NULL, 4, '1', NULL, NULL, '2025-08-17 10:12:14', '2025-08-19 11:58:28'),
(15, NULL, 5, 'skills', NULL, NULL, NULL, 5, '1', NULL, NULL, '2025-08-17 10:12:28', '2025-08-19 11:58:28'),
(16, NULL, 5, 'skills', NULL, NULL, NULL, 6, '1', NULL, NULL, '2025-08-17 10:12:44', '2025-08-19 11:58:28'),
(17, NULL, 5, 'skills', NULL, NULL, NULL, 7, '1', NULL, NULL, '2025-08-17 10:12:59', '2025-08-19 11:58:28'),
(18, NULL, 5, 'skills', NULL, NULL, NULL, 8, '1', NULL, NULL, '2025-08-17 10:13:16', '2025-08-19 11:58:28'),
(19, NULL, 6, 'skills', NULL, NULL, NULL, 9, '1', NULL, NULL, '2025-08-17 10:14:32', '2025-08-19 11:58:28'),
(20, NULL, 6, 'skills', NULL, NULL, NULL, 10, '1', NULL, NULL, '2025-08-17 10:14:48', '2025-08-19 11:58:28'),
(21, NULL, 6, 'skills', NULL, NULL, NULL, 11, '1', NULL, NULL, '2025-08-17 10:14:59', '2025-08-19 11:58:28'),
(22, NULL, 6, 'skills', NULL, NULL, NULL, 12, '1', NULL, NULL, '2025-08-17 10:15:12', '2025-08-19 11:58:28'),
(23, NULL, 6, 'skills', NULL, NULL, NULL, 13, '1', NULL, NULL, '2025-08-17 10:15:20', '2025-08-19 11:58:28'),
(24, NULL, 7, 'skills', NULL, NULL, NULL, 14, '1', NULL, NULL, '2025-08-17 10:15:47', '2025-08-19 11:58:28'),
(25, NULL, 7, 'skills', NULL, NULL, NULL, 15, '1', NULL, NULL, '2025-08-17 10:16:11', '2025-08-19 11:58:28'),
(26, NULL, 7, 'skills', NULL, NULL, NULL, 16, '1', NULL, NULL, '2025-08-17 10:16:24', '2025-08-19 11:58:28'),
(27, NULL, 7, 'skills', NULL, NULL, NULL, 17, '1', NULL, NULL, '2025-08-17 10:16:44', '2025-08-19 11:58:28'),
(28, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 10:27:17', '2025-08-17 10:27:17'),
(29, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 10:27:53', '2025-08-17 10:27:53'),
(30, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 10:28:14', '2025-08-17 10:28:14'),
(31, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 10:28:32', '2025-08-17 10:28:32'),
(32, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-17 10:29:08', '2025-08-17 10:29:08'),
(33, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-18 09:19:17', '2025-08-18 09:19:17'),
(34, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-18 09:19:26', '2025-08-18 09:19:26'),
(35, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-18 09:19:38', '2025-08-18 09:19:38'),
(36, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-18 09:20:16', '2025-08-18 09:20:16'),
(37, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-18 09:20:46', '2025-08-18 09:20:46'),
(38, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-18 09:20:59', '2025-08-18 09:20:59'),
(39, NULL, NULL, 'libraries', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-18 09:21:07', '2025-08-18 09:21:07'),
(53, NULL, NULL, 'projects', NULL, NULL, NULL, 1, '1', NULL, NULL, '2025-08-18 16:02:06', '2025-08-18 16:02:25');

-- --------------------------------------------------------

--
-- Stand-in structure for view `blocks_view`
-- (See below for the actual view)
--
CREATE TABLE `blocks_view` (
`block_id` bigint(20) unsigned
,`parent_id` bigint(20) unsigned
,`translation_id` bigint(20) unsigned
,`file_id` bigint(20) unsigned
,`category` varchar(255)
,`order` int(11)
,`is_active` varchar(255)
,`start_date` datetime
,`end_date` datetime
,`name` varchar(255)
,`parent_name` varchar(255)
,`description` longblob
,`slug` varchar(255)
,`language` varchar(255)
,`url` varchar(255)
,`file_name` varchar(255)
,`file_description` longblob
,`is_image` tinyint(1)
,`is_cover` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `block_translations`
--

CREATE TABLE `block_translations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `block_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `description` longblob DEFAULT NULL,
  `brief` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `block_translations`
--

INSERT INTO `block_translations` (`id`, `block_id`, `name`, `slug`, `language`, `is_active`, `created_at`, `updated_at`, `description`, `brief`) VALUES
(1, 1, 'About Me', 'about-me', 'en', 1, '2025-08-17 07:54:42', '2025-08-19 14:53:52', 0x3c703e0a202020202020202020202020202041732061203c7370616e20636c6173736e616d653d22746578742d616363656e7420666f6e742d6d656469756d22207374796c653d22636f6c6f723a2068736c283139392c203935252c2037342529223e66756c6c2d737461636b20646576656c6f7065723c2f7370616e3e2c2049206272696e6720746f6765746865720a202020202020202020202020202066726f6e74656e64206372656174697669747920616e64206261636b656e64206c6f67696320746f2063726561746520636f6d70726568656e736976652077656220736f6c7574696f6e732e204d79206a6f75726e6579207370616e730a20202020202020202020202020206d756c7469706c6520746563686e6f6c6f6769657320616e64206672616d65776f726b732c20616c6c6f77696e67206d6520746f2063686f6f73652074686520726967687420746f6f6c20666f7220656163682070726f6a6563742e0a2020202020202020202020203c2f703e3c703e0a20202020202020202020202020205769746820657874656e7369766520657870657269656e636520696e203c7370616e20636c6173736e616d653d22746578742d7072696d61727920666f6e742d6d656469756d22207374796c653d22636f6c6f723a68736c283236322c203833252c2035382529223e4c61726176656c20616e64204e6f64652e6a733c2f7370616e3e0a20202020202020202020202020206f6e20746865206261636b656e642c20636f6d62696e65642077697468203c7370616e20636c6173736e616d653d22746578742d7072696d61727920666f6e742d6d656469756d22207374796c653d22636f6c6f723a68736c283236322c203833252c2035382529223e526561637420616e6420416e67756c61723c2f7370616e3e0a2020202020202020202020202020657870657274697365206f6e207468652066726f6e74656e642c204920637265617465206170706c69636174696f6e7320746861742061726520626f746820706f77657266756c20616e6420757365722d667269656e646c792e0a2020202020202020202020203c2f703e3c703e0a202020202020202020202020202049276d2070617373696f6e6174652061626f7574203c7370616e20636c6173736e616d653d22746578742d616363656e7420666f6e742d6d656469756d22207374796c653d22636f6c6f723a2068736c283139392c203935252c2037342529223e6d6f6465726e20646576656c6f706d656e74207072616374696365733c2f7370616e3e2c0a2020202020202020202020202020696e636c7564696e672043492f434420706970656c696e65732c2076657273696f6e20636f6e74726f6c2077697468204769744875622c20616e64206167696c652070726f6a656374206d616e6167656d656e74207573696e67204a4952412e0a20202020202020202020202020205468697320656e737572657320746861742065766572792070726f6a6563742069732064656c69766572656420656666696369656e746c7920616e64206d61696e7461696e73206869676820636f6465207175616c6974792e0a2020202020202020202020203c2f703e3c64697620636c6173736e616d653d2270742d3620626f726465722d7420626f726465722d626f72646572223e0a20202020202020202020202020203c683320636c6173736e616d653d22746578742d786c20666f6e742d73656d69626f6c64206d622d3420746578742d666f726567726f756e6422207374796c653d22636f6c6f723a2068736c28302c2030252c20393825293b206d617267696e2d626f74746f6d3a3172656d3b20666f6e742d73697a653a312e323572656d3b206c696e652d6865696768743a20312e373572656d3b20666f6e742d7765696768743a20363030223e5768617420647269766573206d653a3c2f68333e0a20202020202020202020202020203c756c20636c6173736e616d653d2273706163652d792d32223e0a202020202020202020202020202020203c6c6920636c6173736e616d653d22666c6578206974656d732d63656e746572223e0a2020202020202020202020202020202020203c7370616e20636c6173736e616d653d22746578742d616363656e74206d722d3322207374796c653d22636f6c6f723a2068736c283139392c203935252c20373425293b206d617267696e2d72696768743a20302e373572656d3b223ee296b83c2f7370616e3e0a202020202020202020202020202020202020436c65616e2c206d61696e7461696e61626c6520636f6465206172636869746563747572650a202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020203c6c6920636c6173736e616d653d22666c6578206974656d732d63656e74657222207374796c653d226d617267696e3a20302e3572656d2030223e0a2020202020202020202020202020202020203c7370616e20636c6173736e616d653d22746578742d616363656e74206d722d3322207374796c653d22636f6c6f723a2068736c283139392c203935252c20373425293b206d617267696e2d72696768743a20302e373572656d3b223ee296b83c2f7370616e3e0a2020202020202020202020202020202020205365616d6c657373207573657220657870657269656e6365730a202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020203c6c6920636c6173736e616d653d22666c6578206974656d732d63656e74657222207374796c653d226d617267696e3a20302e3572656d2030223e0a2020202020202020202020202020202020203c7370616e20636c6173736e616d653d22746578742d616363656e74206d722d3322207374796c653d22636f6c6f723a2068736c283139392c203935252c20373425293b206d617267696e2d72696768743a20302e373572656d3b223ee296b83c2f7370616e3e0a202020202020202020202020202020202020436f6e74696e756f7573206c6561726e696e6720616e6420746563686e6f6c6f67792061646f7074696f6e0a202020202020202020202020202020203c2f6c693e0a202020202020202020202020202020203c6c6920636c6173736e616d653d22666c6578206974656d732d63656e74657222207374796c653d226d617267696e3a20302e3572656d2030223e0a2020202020202020202020202020202020203c7370616e20636c6173736e616d653d22746578742d616363656e74206d722d3322207374796c653d22636f6c6f723a2068736c283139392c203935252c20373425293b206d617267696e2d72696768743a20302e373572656d3b223ee296b83c2f7370616e3e0a202020202020202020202020202020202020436f6c6c61626f726174697665207465616d20646576656c6f706d656e740a202020202020202020202020202020203c2f6c693e0a20202020202020202020202020203c2f756c3e0a2020202020202020202020203c2f6469763e, 0x3c703e3c7370616e207374796c653d22666f6e742d66616d696c793a2075692d73616e732d73657269662c2073797374656d2d75692c2073616e732d73657269662c202671756f743b4170706c6520436f6c6f7220456d6f6a692671756f743b2c202671756f743b5365676f6520554920456d6f6a692671756f743b2c202671756f743b5365676f652055492053796d626f6c2671756f743b2c202671756f743b4e6f746f20436f6c6f7220456d6f6a692671756f743b3b20666f6e742d73697a653a20323070783b20746578742d616c69676e3a2063656e7465723b206261636b67726f756e642d636f6c6f723a207472616e73706172656e743b20746578742d6465636f726174696f6e3a20696e68657269743b223e50617373696f6e6174652061626f7574206275696c64696e6720657863657074696f6e616c206469676974616c20657870657269656e6365733c2f7370616e3e3c2f703e),
(4, 4, 'Backend', 'backend', 'en', 1, '2025-08-17 08:24:12', '2025-08-17 08:24:12', '', ''),
(5, 5, 'Frontend', 'frontend', 'en', 1, '2025-08-17 08:42:34', '2025-08-17 08:42:34', '', ''),
(6, 6, 'DevOps & Tools', 'devops-tools', 'en', 1, '2025-08-17 08:43:08', '2025-08-17 08:43:08', '', ''),
(7, 7, 'Database', 'database', 'en', 1, '2025-08-17 08:43:24', '2025-08-17 08:43:24', '', ''),
(10, 10, 'Laravel', 'laravel', 'en', 1, '2025-08-17 10:00:51', '2025-08-17 16:40:22', '', ''),
(11, 11, 'Node.js', 'node-js', 'en', 1, '2025-08-17 10:10:54', '2025-08-17 10:10:54', '', ''),
(12, 12, 'PHP', 'php', 'en', 1, '2025-08-17 10:11:11', '2025-08-17 10:11:11', '', ''),
(13, 13, 'Javascript', 'javascript', 'en', 1, '2025-08-17 10:11:22', '2025-08-17 10:11:22', '', ''),
(14, 14, 'React', 'react', 'en', 1, '2025-08-17 10:12:14', '2025-08-17 10:12:14', '', ''),
(15, 15, 'Angular', 'angular', 'en', 1, '2025-08-17 10:12:28', '2025-08-17 10:12:28', '', ''),
(16, 16, 'Typescript', 'typescript', 'en', 1, '2025-08-17 10:12:44', '2025-08-17 10:12:44', '', ''),
(17, 17, 'Tailwind CSS', 'tailwind-css', 'en', 1, '2025-08-17 10:13:00', '2025-08-17 10:13:00', '', ''),
(18, 18, 'HTML5', 'html5', 'en', 1, '2025-08-17 10:13:16', '2025-08-17 10:13:16', '', ''),
(19, 19, 'CI/CD', 'ci-cd', 'en', 1, '2025-08-17 10:14:32', '2025-08-17 10:14:32', '', ''),
(20, 20, 'GitHub', 'github', 'en', 1, '2025-08-17 10:14:48', '2025-08-17 10:14:48', '', ''),
(21, 21, 'JIRA', 'jira', 'en', 1, '2025-08-17 10:14:59', '2025-08-17 10:14:59', '', ''),
(22, 22, 'Docker', 'docker', 'en', 1, '2025-08-17 10:15:12', '2025-08-17 10:15:12', '', ''),
(23, 23, 'Linux', 'linux', 'en', 1, '2025-08-17 10:15:20', '2025-08-17 10:15:20', '', ''),
(24, 24, 'MySQL', 'mysql', 'en', 1, '2025-08-17 10:15:47', '2025-08-17 10:15:47', '', ''),
(25, 25, 'PostgreSQL', 'postgresql', 'en', 1, '2025-08-17 10:16:11', '2025-08-17 10:16:11', '', ''),
(26, 26, 'MongoDB', 'mongodb', 'en', 1, '2025-08-17 10:16:24', '2025-08-17 10:16:24', '', ''),
(27, 27, 'Redis', 'redis', 'en', 1, '2025-08-17 10:16:44', '2025-08-17 10:16:44', '', ''),
(28, 28, 'Stripe', 'stripe', 'en', 1, '2025-08-17 10:27:17', '2025-08-17 10:27:17', '', ''),
(29, 29, 'Pusher', 'pusher', 'en', 1, '2025-08-17 10:27:53', '2025-08-17 10:27:53', '', ''),
(30, 30, 'Material UI', 'material-ui', 'en', 1, '2025-08-17 10:28:14', '2025-08-17 10:28:14', '', ''),
(31, 31, 'Angular Material', 'angular-material', 'en', 1, '2025-08-17 10:28:32', '2025-08-17 10:28:32', '', ''),
(32, 32, 'Chart.js', 'chart-js', 'en', 1, '2025-08-17 10:29:08', '2025-08-17 10:29:08', '', ''),
(33, 33, 'Zod', 'zod', 'en', 1, '2025-08-18 09:19:17', '2025-08-18 09:19:17', '', ''),
(34, 34, 'React-Hook-Forms', 'react-hook-forms', 'en', 1, '2025-08-18 09:19:26', '2025-08-18 09:24:05', '', ''),
(35, 35, 'Axios', 'axios', 'en', 1, '2025-08-18 09:19:38', '2025-08-18 09:19:38', '', ''),
(36, 36, 'Typedi (Dependency Injection)', 'typedi-dependency-injection', 'en', 1, '2025-08-18 09:20:16', '2025-08-18 09:20:16', '', ''),
(37, 37, ' Template-Driven Forms', 'template-driven-forms', 'en', 1, '2025-08-18 09:20:46', '2025-08-18 09:20:46', '', ''),
(38, 38, 'Reactive Form', 'reactive-form', 'en', 1, '2025-08-18 09:20:59', '2025-08-18 09:20:59', '', ''),
(39, 39, 'HttpClient', 'httpclient', 'en', 1, '2025-08-18 09:21:07', '2025-08-18 09:21:07', '', ''),
(53, 53, 'DSH International Contstruction', 'dsh-international-contstruction', 'en', 1, '2025-08-18 16:02:06', '2025-08-18 16:02:25', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `customers_view`
-- (See below for the actual view)
--
CREATE TABLE `customers_view` (
`user_id` bigint(20) unsigned
,`customer_id` bigint(20) unsigned
,`name` varchar(255)
,`email` varchar(255)
,`avatar` varchar(255)
,`is_active` tinyint(1)
,`created_at` timestamp
);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `reference_id` bigint(20) UNSIGNED NOT NULL,
  `reference_type` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_image` tinyint(1) NOT NULL DEFAULT 1,
  `is_cover` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `description` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `url`, `reference_id`, `reference_type`, `order`, `is_active`, `is_image`, `is_cover`, `created_at`, `updated_at`, `description`) VALUES
(1, '', 'block-68a4cf4e91372.svg', 4, 'App\\Models\\Block', 0, 1, 1, 1, '2025-08-17 08:24:12', '2025-08-19 15:23:58', ''),
(2, '', 'block-68a4cf5941ac9.svg', 5, 'App\\Models\\Block', 0, 1, 1, 1, '2025-08-17 08:42:34', '2025-08-19 15:24:09', ''),
(3, '', 'block-68a4cf66030da.svg', 6, 'App\\Models\\Block', 0, 1, 1, 1, '2025-08-17 08:43:08', '2025-08-19 15:24:22', ''),
(4, '', 'block-68a4cf70509b4.svg', 7, 'App\\Models\\Block', 0, 1, 1, 1, '2025-08-17 08:43:24', '2025-08-19 15:24:32', ''),
(18, '', 'block-68a386beccd8f.jpg', 53, 'App\\Models\\Block', 0, 1, 1, 1, '2025-08-18 16:02:06', '2025-08-18 16:02:06', '');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `flag_code` varchar(255) DEFAULT NULL,
  `level_order` int(11) DEFAULT NULL,
  `direction` enum('ltr','rtl') NOT NULL DEFAULT 'ltr',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `code`, `flag_code`, `level_order`, `direction`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Arabic', 'ar', 'ae', 1, 'rtl', 0, '2025-08-14 11:09:56', '2025-08-14 11:09:56'),
(2, 'English', 'en', 'gb', 2, 'ltr', 1, '2025-08-14 11:09:56', '2025-08-14 11:09:56');

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `github_url` varchar(255) NOT NULL,
  `preview_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `project_id`, `github_url`, `preview_url`, `created_at`, `updated_at`) VALUES
(11, 53, 'https://github.com/feras1984/dsh', 'https://dshintl.ferasmasoud.com/', '2025-08-18 16:02:06', '2025-08-18 16:02:06');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `level_order` int(11) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `target` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `block_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `parent_id`, `category_id`, `category`, `name`, `level_order`, `url`, `target`, `type`, `file`, `image`, `is_active`, `block_type`, `created_at`, `updated_at`) VALUES
(3, NULL, NULL, 'social-menu', 'social-menu-menu', 1, 'https://github.com/feras1984', '_blank', 'Social', NULL, 'github', 1, NULL, '2025-08-21 14:32:11', '2025-08-21 15:25:35'),
(4, NULL, NULL, 'social-menu', 'social-menu-menu', 1, 'https://www.linkedin.com/in/feras-masoud-25a28791/', '_blank', 'Social', NULL, 'linkedin', 1, NULL, '2025-08-21 14:32:50', '2025-08-21 14:32:50'),
(5, NULL, NULL, 'contact-menu', 'contact-menu-menu', 1, 'mailto:masoudferas@gmail.com', '_self', 'Contact', NULL, 'mail', 1, NULL, '2025-08-21 14:36:28', '2025-08-21 15:24:45'),
(6, NULL, NULL, 'contact-menu', 'contact-menu-menu', 1, 'tel:00971505067196', '_self', 'Contact', NULL, 'local-phone', 1, NULL, '2025-08-21 14:36:49', '2025-08-21 15:25:04');

-- --------------------------------------------------------

--
-- Table structure for table `menu_translations`
--

CREATE TABLE `menu_translations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `html_text` varchar(255) DEFAULT NULL,
  `language` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu_translations`
--

INSERT INTO `menu_translations` (`id`, `menu_id`, `name`, `slug`, `html_text`, `language`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 3, 'Github', 'github', NULL, 'en', 1, '2025-08-21 14:32:11', '2025-08-21 15:25:35'),
(4, 4, 'LinkedIn', 'linkedin', NULL, 'en', 1, '2025-08-21 14:32:50', '2025-08-21 14:32:50'),
(5, 5, 'Email', 'email', NULL, 'en', 1, '2025-08-21 14:36:28', '2025-08-21 15:24:45'),
(6, 6, 'Mobile', 'mobile', NULL, 'en', 1, '2025-08-21 14:36:49', '2025-08-21 15:25:04');

-- --------------------------------------------------------

--
-- Stand-in structure for view `menu_view`
-- (See below for the actual view)
--
CREATE TABLE `menu_view` (
`menu_id` bigint(20) unsigned
,`parent_id` bigint(20) unsigned
,`parent_name` varchar(255)
,`category` varchar(255)
,`menu_name` varchar(255)
,`name` varchar(255)
,`slug` varchar(255)
,`html_text` varchar(255)
,`language` varchar(255)
,`menu_order` int(11)
,`menu_url` varchar(255)
,`target` varchar(255)
,`type` varchar(255)
,`file` varchar(255)
,`image` varchar(255)
,`is_active` tinyint(1)
,`block_type` varchar(255)
,`url` varchar(255)
,`file_name` varchar(255)
,`file_description` longblob
,`is_image` tinyint(1)
,`is_cover` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_10_20_223552_create_languages_table', 1),
(6, '2023_10_20_233818_create_files_table', 1),
(7, '2023_12_23_225308_create_blocks_table', 1),
(8, '2023_12_23_225309_create_block_translations_table', 1),
(9, '2023_12_23_225830_create_menus_table', 1),
(10, '2023_12_23_225831_create_menu_translations_table', 1),
(11, '2024_01_06_015235_create_customers_table', 1),
(12, '2024_01_06_015406_create_admins_table', 1),
(13, '2024_02_09_023236_create_block_views_table', 1),
(14, '2024_02_09_023300_create_menu_views_table', 1),
(15, '2024_04_29_134957_create_customer_views_table', 1),
(16, '2024_04_29_135009_create_admin_views_table', 1),
(17, '2025_08_18_130040_create_project_skills_table', 2),
(18, '2025_08_18_130051_create_project_libraries_table', 2),
(19, '2025_08_18_130112_create_links_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_libraries`
--

CREATE TABLE `project_libraries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `library_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_libraries`
--

INSERT INTO `project_libraries` (`id`, `project_id`, `library_id`, `created_at`, `updated_at`) VALUES
(54, 53, 30, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(55, 53, 33, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(56, 53, 34, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(57, 53, 35, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(58, 53, 36, '2025-08-18 16:02:06', '2025-08-18 16:02:06');

-- --------------------------------------------------------

--
-- Table structure for table `project_skills`
--

CREATE TABLE `project_skills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `skill_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_skills`
--

INSERT INTO `project_skills` (`id`, `project_id`, `skill_id`, `created_at`, `updated_at`) VALUES
(114, 53, 10, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(115, 53, 12, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(116, 53, 13, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(117, 53, 14, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(118, 53, 16, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(119, 53, 17, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(120, 53, 18, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(121, 53, 19, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(122, 53, 20, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(123, 53, 23, '2025-08-18 16:02:06', '2025-08-18 16:02:06'),
(124, 53, 24, '2025-08-18 16:02:06', '2025-08-18 16:02:06');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('e9ZDJrmKks0XkXQZj0ILhDb43LdBML5BLJT6Wscp', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiV2dCcDdnek9QbkcxNWRvelpKdXBjTVJUSExIdGRDT2hSM1RKWnF1VCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjU3OiJodHRwOi8vbG9jYWxob3N0OjgwMDAvZmlsZS9ibG9ja3MvYmxvY2stNjhhMzg2YmVjY2Q4Zi5qcGciO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1755825650),
('ol2URPhHj4TaIUjhj4XjGQiVVKTs2qGtTfGFFaOw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaThxajBFZDZvelFLdk5NR1NOUXFGa3UyYmlwcDh2blltaXA3Q3dqQSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9maWxlL2Jsb2Nrcy9ibG9jay02OGEzODZiZWNjZDhmLmpwZyI7fX0=', 1755827086);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reference_id` int(10) UNSIGNED NOT NULL,
  `reference_type` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `reference_id`, `reference_type`, `email`, `email_verified_at`, `password`, `avatar`, `is_active`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 1, 'App\\Models\\Admin', 'feras@email.com', NULL, '$2y$12$a41swGs19PfC3BdPNQFgIejQAaJU6PU.VZu90HZqKWc5KCcCbLZOK', NULL, 1, NULL, '2025-08-14 11:09:11', '2025-08-14 11:09:11');

-- --------------------------------------------------------

--
-- Structure for view `admins_view`
--
DROP TABLE IF EXISTS `admins_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `admins_view`  AS SELECT `users`.`id` AS `user_id`, `admins`.`id` AS `admin_id`, `admins`.`first_name` AS `first_name`, `admins`.`last_name` AS `last_name`, `admins`.`role` AS `role`, `users`.`email` AS `email`, `users`.`avatar` AS `avatar`, `users`.`is_active` AS `is_active`, `users`.`created_at` AS `created_at` FROM (`users` join `admins`) WHERE `users`.`reference_type` = 'Modules\\User\\Entities\\Admin' AND `users`.`reference_id` = `admins`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `blocks_view`
--
DROP TABLE IF EXISTS `blocks_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `blocks_view`  AS SELECT `block_info`.`block_id` AS `block_id`, `block_info`.`parent_id` AS `parent_id`, `block_info`.`translation_id` AS `translation_id`, `block_info`.`file_id` AS `file_id`, `block_info`.`category` AS `category`, `block_info`.`order` AS `order`, `block_info`.`is_active` AS `is_active`, `block_info`.`start_date` AS `start_date`, `block_info`.`end_date` AS `end_date`, `block_info`.`name` AS `name`, `parent_trans`.`name` AS `parent_name`, `block_info`.`description` AS `description`, `block_info`.`slug` AS `slug`, `block_info`.`language` AS `language`, `block_info`.`url` AS `url`, `block_info`.`file_name` AS `file_name`, `block_info`.`file_description` AS `file_description`, `block_info`.`is_image` AS `is_image`, `block_info`.`is_cover` AS `is_cover` FROM ((select `blocks`.`id` AS `block_id`,`blocks`.`parent_id` AS `parent_id`,`trans`.`id` AS `translation_id`,`fl`.`id` AS `file_id`,`blocks`.`category` AS `category`,`blocks`.`order` AS `order`,`blocks`.`is_active` AS `is_active`,`blocks`.`start_date` AS `start_date`,`blocks`.`end_date` AS `end_date`,`trans`.`name` AS `name`,`trans`.`description` AS `description`,`trans`.`slug` AS `slug`,`trans`.`language` AS `language`,`fl`.`url` AS `url`,`fl`.`name` AS `file_name`,`fl`.`description` AS `file_description`,`fl`.`is_image` AS `is_image`,`fl`.`is_cover` AS `is_cover` from ((`blocks` left join `files` `fl` on(`fl`.`reference_type` = 'Modules\\Website\\Entities\\Block' and `fl`.`reference_id` = `blocks`.`id`)) join `block_translations` `trans`) where `blocks`.`id` = `trans`.`block_id`) `block_info` left join `block_translations` `parent_trans` on(`block_info`.`parent_id` = `parent_trans`.`block_id` and `block_info`.`language` = `parent_trans`.`language`)) ORDER BY `block_info`.`order` ASC, `block_info`.`category` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `customers_view`
--
DROP TABLE IF EXISTS `customers_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `customers_view`  AS SELECT `users`.`id` AS `user_id`, `customers`.`id` AS `customer_id`, `customers`.`name` AS `name`, `users`.`email` AS `email`, `users`.`avatar` AS `avatar`, `users`.`is_active` AS `is_active`, `users`.`created_at` AS `created_at` FROM (`users` join `customers`) WHERE `users`.`reference_type` = 'Modules\\User\\Entities\\Customer' AND `users`.`reference_id` = `customers`.`id` ;

-- --------------------------------------------------------

--
-- Structure for view `menu_view`
--
DROP TABLE IF EXISTS `menu_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `menu_view`  AS SELECT `menu_info`.`menu_id` AS `menu_id`, `menu_info`.`parent_id` AS `parent_id`, `parent_trans`.`name` AS `parent_name`, `menu_info`.`category` AS `category`, `menu_info`.`menu_name` AS `menu_name`, `menu_info`.`name` AS `name`, `menu_info`.`slug` AS `slug`, `menu_info`.`html_text` AS `html_text`, `menu_info`.`language` AS `language`, `menu_info`.`menu_order` AS `menu_order`, `menu_info`.`menu_url` AS `menu_url`, `menu_info`.`target` AS `target`, `menu_info`.`type` AS `type`, `menu_info`.`file` AS `file`, `menu_info`.`image` AS `image`, `menu_info`.`is_active` AS `is_active`, `menu_info`.`block_type` AS `block_type`, `menu_info`.`url` AS `url`, `menu_info`.`file_name` AS `file_name`, `menu_info`.`file_description` AS `file_description`, `menu_info`.`is_image` AS `is_image`, `menu_info`.`is_cover` AS `is_cover` FROM ((select `menus`.`id` AS `menu_id`,`menus`.`category` AS `category`,`menus`.`parent_id` AS `parent_id`,`menus`.`name` AS `menu_name`,`trans`.`name` AS `name`,`trans`.`slug` AS `slug`,`trans`.`html_text` AS `html_text`,`trans`.`language` AS `language`,`menus`.`level_order` AS `menu_order`,`menus`.`url` AS `menu_url`,`menus`.`target` AS `target`,`menus`.`type` AS `type`,`menus`.`file` AS `file`,`menus`.`image` AS `image`,`menus`.`is_active` AS `is_active`,`menus`.`block_type` AS `block_type`,`fl`.`url` AS `url`,`fl`.`name` AS `file_name`,`fl`.`description` AS `file_description`,`fl`.`is_image` AS `is_image`,`fl`.`is_cover` AS `is_cover` from ((`menus` left join `files` `fl` on(`fl`.`reference_type` = 'Modules\\Website\\Entities\\Menu' and `fl`.`reference_id` = `menus`.`id`)) join `menu_translations` `trans`) where `menus`.`id` = `trans`.`menu_id`) `menu_info` left join `menu_translations` `parent_trans` on(`menu_info`.`parent_id` = `parent_trans`.`menu_id` and `menu_info`.`language` = `parent_trans`.`language`)) ORDER BY `menu_info`.`menu_order` ASC, `menu_info`.`category` ASC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blocks_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `block_translations`
--
ALTER TABLE `block_translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `block_translations_block_id_foreign` (`block_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reference` (`reference_id`,`reference_type`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `links_project_id_foreign` (`project_id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menus_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `menu_translations`
--
ALTER TABLE `menu_translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_translations_menu_id_foreign` (`menu_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `project_libraries`
--
ALTER TABLE `project_libraries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_libraries_project_id_foreign` (`project_id`),
  ADD KEY `project_libraries_library_id_foreign` (`library_id`);

--
-- Indexes for table `project_skills`
--
ALTER TABLE `project_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_skills_project_id_foreign` (`project_id`),
  ADD KEY `project_skills_skill_id_foreign` (`skill_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `reference` (`reference_id`,`reference_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `block_translations`
--
ALTER TABLE `block_translations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `menu_translations`
--
ALTER TABLE `menu_translations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_libraries`
--
ALTER TABLE `project_libraries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `project_skills`
--
ALTER TABLE `project_skills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocks_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `block_translations`
--
ALTER TABLE `block_translations`
  ADD CONSTRAINT `block_translations_block_id_foreign` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `menu_translations`
--
ALTER TABLE `menu_translations`
  ADD CONSTRAINT `menu_translations_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_libraries`
--
ALTER TABLE `project_libraries`
  ADD CONSTRAINT `project_libraries_library_id_foreign` FOREIGN KEY (`library_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_libraries_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_skills`
--
ALTER TABLE `project_skills`
  ADD CONSTRAINT `project_skills_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_skills_skill_id_foreign` FOREIGN KEY (`skill_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
