-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 06 fév. 2018 à 10:19
-- Version du serveur :  5.7.19
-- Version de PHP :  5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `fitbase`
--

-- --------------------------------------------------------

--
-- Structure de la table `difficulte`
--

DROP TABLE IF EXISTS `difficulte`;
CREATE TABLE IF NOT EXISTS `difficulte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `duree_min` int(11) NOT NULL,
  `duree_max` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `link_user_reward`
--

DROP TABLE IF EXISTS `link_user_reward`;
CREATE TABLE IF NOT EXISTS `link_user_reward` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_reward` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `link_user_sport`
--

DROP TABLE IF EXISTS `link_user_sport`;
CREATE TABLE IF NOT EXISTS `link_user_sport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sport_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `objectif_calorie`
--

DROP TABLE IF EXISTS `objectif_calorie`;
CREATE TABLE IF NOT EXISTS `objectif_calorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nb_calorie` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `objectif_sport`
--

DROP TABLE IF EXISTS `objectif_sport`;
CREATE TABLE IF NOT EXISTS `objectif_sport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reward`
--

DROP TABLE IF EXISTS `reward`;
CREATE TABLE IF NOT EXISTS `reward` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `picto_path` varchar(255) NOT NULL,
  `obtention` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `sport`
--

DROP TABLE IF EXISTS `sport`;
CREATE TABLE IF NOT EXISTS `sport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `picto_path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `suivi_base`
--

DROP TABLE IF EXISTS `suivi_base`;
CREATE TABLE IF NOT EXISTS `suivi_base` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `poid` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `suivi_calorie`
--

DROP TABLE IF EXISTS `suivi_calorie`;
CREATE TABLE IF NOT EXISTS `suivi_calorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nb_calorie` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date_time` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `suivi_dietetique`
--

DROP TABLE IF EXISTS `suivi_dietetique`;
CREATE TABLE IF NOT EXISTS `suivi_dietetique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `suivi_training`
--

DROP TABLE IF EXISTS `suivi_training`;
CREATE TABLE IF NOT EXISTS `suivi_training` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_calorie` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `duree` time NOT NULL,
  `difficulte` int(11) NOT NULL,
  `id_sport` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `height` int(11) NOT NULL,
  `poid` int(11) NOT NULL,
  `fréquences` int(11) NOT NULL,
  `objectif` int(11) NOT NULL,
  `photo_profil` varchar(255) NOT NULL,
  `notification` tinyint(1) NOT NULL,
  `géolocalisation` tinyint(1) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `lastname`, `firstname`, `birthday`, `email`, `password`, `height`, `poid`, `fréquences`, `objectif`, `photo_profil`, `notification`, `géolocalisation`, `created_at`, `updated_at`) VALUES
(1, 'truc', 'toto', '2018-02-05', 'toto@truc.com', '$2a$10$O6Y0IBboYpnP/AE9z.hAaeGhtdu953LS1mp3hCv2SzI/C7fOyFsj2', 178, 78, 1, 5, 'path_to_img', 1, 1, '2018-02-05', '2018-02-05');

-- --------------------------------------------------------

--
-- Structure de la table `water_drink`
--

DROP TABLE IF EXISTS `water_drink`;
CREATE TABLE IF NOT EXISTS `water_drink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nb_glass` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
