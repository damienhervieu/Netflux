-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 04 juil. 2018 à 15:01
-- Version du serveur :  5.7.21
-- Version de PHP :  5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `d_netflux`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_category`
--

DROP TABLE IF EXISTS `t_category`;
CREATE TABLE IF NOT EXISTS `t_category` (
  `id_category` int(10) NOT NULL,
  `category` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `t_category`
--

INSERT INTO `t_category` (`id_category`, `category`) VALUES
(1, 'action'),
(2, 'aventure'),
(3, 'animation'),
(4, 'jeunesse'),
(5, 'comédie'),
(6, 'polar'),
(7, 'documentaire'),
(8, 'drame'),
(9, 'fantaisie'),
(10, 'film-noir'),
(11, 'horreur'),
(12, 'comédie musicale'),
(13, 'mystère'),
(14, 'romance'),
(15, 'science-fictoin'),
(16, 'thriller'),
(17, 'guerre'),
(18, 'western');

-- --------------------------------------------------------

--
-- Structure de la table `t_media`
--

DROP TABLE IF EXISTS `t_media`;
CREATE TABLE IF NOT EXISTS `t_media` (
  `id_media` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `category` int(10) NOT NULL,
  `thumbnail` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `video` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `author` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_media`),
  KEY `FK_MediaCategory` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `t_media`
--

INSERT INTO `t_media` (`id_media`, `title`, `category`, `thumbnail`, `video`, `author`) VALUES
(20, 'Roblox death sound', 8, 'C:\\Users\\gabri\\Documents\\Netflux\\server\\ressources\\thumbnail\\Roblox_1530715248055.jpg', 'C:\\Users\\gabri\\Documents\\Netflux\\server\\ressources\\video\\Roblox Death Sound (Oof)_1530715248056.mp4', 'Root');

-- --------------------------------------------------------

--
-- Structure de la table `t_permissions`
--

DROP TABLE IF EXISTS `t_permissions`;
CREATE TABLE IF NOT EXISTS `t_permissions` (
  `id_permission` tinyint(2) NOT NULL AUTO_INCREMENT,
  `permission` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_permission`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `t_permissions`
--

INSERT INTO `t_permissions` (`id_permission`, `permission`) VALUES
(1, 'member'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `t_users`
--

DROP TABLE IF EXISTS `t_users`;
CREATE TABLE IF NOT EXISTS `t_users` (
  `id_user` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `permission` tinyint(2) NOT NULL,
  `created_at` date NOT NULL,
  `changed_at` date NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_permission` (`permission`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `t_users`
--

INSERT INTO `t_users` (`id_user`, `first_name`, `last_name`, `email`, `password`, `permission`, `created_at`, `changed_at`) VALUES
(6, 'root', 'root', 'root@root.com', '$2b$10$jvo5fEYm0Ymg6I2lkzd6Wu3EPuwqxOH3TS1K7C/wL1aAwjrZppCEO', 2, '2018-07-04', '2018-07-04');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `t_media`
--
ALTER TABLE `t_media`
  ADD CONSTRAINT `FK_MediaCategory` FOREIGN KEY (`category`) REFERENCES `t_category` (`id_category`);

--
-- Contraintes pour la table `t_users`
--
ALTER TABLE `t_users`
  ADD CONSTRAINT `fk_permission` FOREIGN KEY (`permission`) REFERENCES `t_permissions` (`id_permission`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
