-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- Dump data of "Answers" ----------------------------------
INSERT INTO `Answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '1', '1', '1', '1', '1', '2016-09-24 23:08:35', '2016-09-24 23:08:35', '1' );
INSERT INTO `Answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '2', '2', '2', '2', '2', '2016-09-24 23:08:35', '2016-09-24 23:08:35', '2' );
INSERT INTO `Answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '3', '3', '3', '3', '3', '2016-09-24 23:08:35', '2016-09-24 23:08:35', '3' );
INSERT INTO `Answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '4', '4', '4', '4', '4', '2016-09-24 23:08:35', '2016-09-24 23:08:35', '4' );
INSERT INTO `Answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '5', '5', '5', '5', '5', '2016-09-24 23:08:35', '2016-09-24 23:08:35', '5' );
INSERT INTO `Answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '6', NULL, NULL, NULL, NULL, '2016-10-21 02:14:09', '2016-10-21 02:14:09', '6' );
-- ---------------------------------------------------------


-- Dump data of "Matcheds" ---------------------------------
INSERT INTO `Matcheds`(`id`,`chat`,`user1`,`user1Vote`,`user2`,`user2Vote`,`yes`,`no`,`search`,`answered`,`avg`,`createdAt`,`updatedAt`,`MessageId`) VALUES ( '1', '1', '2', '1', '4', '1', '1', '1', 'none', '0', '50', '2016-09-27 04:35:04', '2016-10-15 00:44:21', '79' );
INSERT INTO `Matcheds`(`id`,`chat`,`user1`,`user1Vote`,`user2`,`user2Vote`,`yes`,`no`,`search`,`answered`,`avg`,`createdAt`,`updatedAt`,`MessageId`) VALUES ( '2', '1', '1', '1', '5', '1', '2', '0', 'none', '0', '100', '2016-10-14 14:12:34', '2016-10-14 14:18:15', '2' );
INSERT INTO `Matcheds`(`id`,`chat`,`user1`,`user1Vote`,`user2`,`user2Vote`,`yes`,`no`,`search`,`answered`,`avg`,`createdAt`,`updatedAt`,`MessageId`) VALUES ( '3', '0', '1', NULL, '4', '1', '1', '0', 'OK', '0', '0', '2016-10-14 14:12:53', '2016-10-14 14:12:53', NULL );
INSERT INTO `Matcheds`(`id`,`chat`,`user1`,`user1Vote`,`user2`,`user2Vote`,`yes`,`no`,`search`,`answered`,`avg`,`createdAt`,`updatedAt`,`MessageId`) VALUES ( '4', '0', '2', NULL, '5', NULL, '1', '0', 'OK', '0', '0', '2016-10-14 14:12:53', '2016-10-14 14:12:53', NULL );
-- ---------------------------------------------------------


-- Dump data of "Messages" ---------------------------------
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '1', '<NULL>', '1', '1', '0', '2016-10-14 13:49:02', '2016-10-14 13:49:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '2', 'hello', '0', NULL, '2', '2016-10-14 14:18:15', '2016-10-14 14:18:15', '1' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '3', 'do we still work', '1', NULL, '1', '2016-10-14 14:22:11', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '4', 'herro', '1', NULL, '1', '2016-10-14 14:43:18', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '5', 'this is four', '1', NULL, '1', '2016-10-14 14:44:30', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '6', 'this is 2', '1', NULL, '1', '2016-10-14 14:44:36', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '7', 'this is radio clash', '1', NULL, '1', '2016-10-14 14:49:48', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '8', 'on pirate sat', '1', NULL, '1', '2016-10-14 14:50:22', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '9', 'i\'d like to be', '1', '4', '1', '2016-10-14 14:56:45', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '10', 'under the sea', '1', '2', '1', '2016-10-14 14:56:50', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '11', 'in an octopuss garden', '1', '2', '1', '2016-10-14 15:01:03', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '12', 'i said a boom chicka boom', '1', '4', '1', '2016-10-14 15:01:57', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '13', 'this is the newest one', '1', '4', '1', '2016-10-14 18:52:09', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '14', 'link, listen!', '1', '4', '1', '2016-10-14 18:52:35', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '15', 'what is it nav?', '1', '4', '1', '2016-10-14 18:56:19', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '16', 'huh?', '1', '4', '1', '2016-10-14 18:56:21', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '17', 'what do you want?', '1', '4', '1', '2016-10-14 18:56:23', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '18', 'moo mooo', '1', '4', '1', '2016-10-14 18:56:55', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '19', 'what', '1', '4', '1', '2016-10-14 18:57:12', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '20', 'no', '1', '4', '1', '2016-10-14 18:57:14', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '21', 'fuck', '1', '4', '1', '2016-10-14 18:57:19', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '22', 'test', '1', '2', '1', '2016-10-14 18:57:44', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '23', 'welcome to plasma', '1', '2', '1', '2016-10-14 18:58:14', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '24', 'can\'t we all just get along', '0', NULL, NULL, '2016-10-14 18:58:40', '2016-10-14 18:58:40', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '25', 'test', '0', NULL, NULL, '2016-10-14 18:58:54', '2016-10-14 18:58:54', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '26', 'hello', '1', '4', '1', '2016-10-14 18:59:09', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '27', 'c\'mon brain', '1', '4', '1', '2016-10-14 18:59:22', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '28', 'do it', '1', '4', '1', '2016-10-14 18:59:24', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '29', 'oh no it\'s saving it to me', '1', '4', '1', '2016-10-14 18:59:31', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '30', 'hello', '1', '4', '1', '2016-10-14 19:02:34', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '31', 'hello', '1', '2', '1', '2016-10-14 19:04:48', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '32', 'was it all a bug', '1', '2', '1', '2016-10-14 19:04:57', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '33', 'we\'re just ', '1', '2', '1', '2016-10-14 19:05:03', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '34', 'two lost souls', '1', '2', '1', '2016-10-14 19:05:05', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '35', 'alright', '1', '4', '1', '2016-10-14 19:06:05', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '36', 'nobody is out there', '0', NULL, NULL, '2016-10-14 19:06:38', '2016-10-14 19:06:38', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '37', 'it\'s a rough time', '1', '4', '1', '2016-10-14 20:42:37', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '38', 'yeah thats the theory', '1', '4', '1', '2016-10-14 20:42:43', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '39', 'okay', '1', '2', '1', '2016-10-14 20:43:05', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '40', 'can you see me', '1', '4', '1', '2016-10-14 20:43:23', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '41', 'why is this bug happening', '1', '4', '1', '2016-10-14 20:43:33', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '42', '2', '1', '2', '1', '2016-10-14 20:44:50', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '43', 'i\'m mr 2', '1', '2', '1', '2016-10-14 20:44:54', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '44', 'helllo mr 2', '1', '2', '1', '2016-10-14 20:45:06', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '45', 'this is mr 4', '1', '2', '1', '2016-10-14 20:45:29', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '46', 'this is mr. 2', '1', '4', '1', '2016-10-14 20:45:40', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '47', 'this is mr 4', '1', '4', '1', '2016-10-14 20:45:50', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '48', 'hello', '1', '2', '1', '2016-10-14 20:47:38', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '49', 'i\'m mr 4', '1', '2', '1', '2016-10-14 20:47:40', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '50', 'you are not here', '1', '4', '1', '2016-10-14 20:54:01', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '51', 'you are not here', '1', '2', '1', '2016-10-14 20:54:24', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '52', 'once', '1', '2', '1', '2016-10-14 20:55:05', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '53', 'back to normal', '1', '4', '1', '2016-10-14 20:57:37', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '54', 'isn\'t it', '1', '2', '1', '2016-10-14 20:58:09', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '55', 'this is still a thing', '1', '2', '1', '2016-10-14 20:58:46', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '56', 'everythign is groovy', '1', '2', '1', '2016-10-14 21:00:06', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '57', 'yup', '1', '4', '1', '2016-10-14 21:00:12', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '58', 'wild thing', '1', '4', '1', '2016-10-14 21:00:23', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '59', 'you make my heart sing', '1', '4', '1', '2016-10-14 21:00:29', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '60', 'you make everything', '1', '4', '1', '2016-10-14 21:00:36', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '61', 'groovy', '1', '4', '1', '2016-10-14 21:00:38', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '62', 'okay', '1', '4', '1', '2016-10-14 21:00:40', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '63', 'time to save it in the connection', '1', '4', '1', '2016-10-14 21:00:49', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '64', 'this is okay', '1', '4', '1', '2016-10-14 21:21:02', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '65', 'and this is okay', '1', '2', '1', '2016-10-14 21:21:32', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '66', 'but this', '1', '2', '1', '2016-10-14 21:21:50', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '67', 'why', '1', '4', '1', '2016-10-14 21:22:39', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '68', 'fire engine', '1', '4', '1', '2016-10-15 00:26:15', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '69', 'fire engine slow', '1', '2', '1', '2016-10-15 00:29:54', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '70', 'sippin on lemon juice', '1', '4', '1', '2016-10-15 00:34:23', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '71', 'well my name is grump', '1', '2', '1', '2016-10-15 00:38:37', '2016-10-15 00:44:02', '4' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '72', 'I\'m not so grump', '1', '4', '1', '2016-10-15 00:39:10', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '73', 'and we\'re the goul grumps', '1', '4', '1', '2016-10-15 00:41:04', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '74', 'last night ', '1', '4', '1', '2016-10-15 00:43:39', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '75', 'i was reading', '1', '4', '1', '2016-10-15 00:43:47', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '76', 'they say', '1', '4', '1', '2016-10-15 00:43:57', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '77', 'mouse', '1', '4', '1', '2016-10-15 00:44:01', '2016-10-15 00:44:02', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '78', 'you leaving', '0', '4', '1', '2016-10-15 00:44:16', '2016-10-15 00:44:16', '2' );
INSERT INTO `Messages`(`id`,`message`,`checked`,`reciveId`,`MatchedId`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '79', 'walk into the garden of eden', '0', '4', '1', '2016-10-15 00:44:21', '2016-10-15 00:44:21', '2' );
-- ---------------------------------------------------------


-- Dump data of "NotifyConnects" ---------------------------
INSERT INTO `NotifyConnects`(`id`,`createdAt`,`updatedAt`,`UserId`,`MatchedId`) VALUES ( '3', '2016-10-14 14:14:39', '2016-10-14 14:14:39', '5', '2' );
INSERT INTO `NotifyConnects`(`id`,`createdAt`,`updatedAt`,`UserId`,`MatchedId`) VALUES ( '5', '2016-10-14 14:17:22', '2016-10-14 14:17:22', '5', '2' );
-- ---------------------------------------------------------


-- Dump data of "Onlines" ----------------------------------
INSERT INTO `Onlines`(`id`,`user`,`online`,`createdAt`,`updatedAt`) VALUES ( '1', '61a8db2b-db18-444b-a60a-b97f769cb318

getUUID', '0', '2016-10-21 02:14:09', '2016-10-21 02:14:09' );
INSERT INTO `Onlines`(`id`,`user`,`online`,`createdAt`,`updatedAt`) VALUES ( '2', 'a23a8f86-9533-4e95-9c21-bfaa326b171a

getUUID', '0', '2016-10-21 02:14:09', '2016-10-21 02:14:09' );
INSERT INTO `Onlines`(`id`,`user`,`online`,`createdAt`,`updatedAt`) VALUES ( '3', '37f70bbf-0515-4fce-b240-3278c1b78b25

getUUID', '0', '2016-10-21 02:14:09', '2016-10-21 02:14:09' );
INSERT INTO `Onlines`(`id`,`user`,`online`,`createdAt`,`updatedAt`) VALUES ( '4', '6c89cd7e-d7c2-4e84-84d7-6a70e1e6909f

getUUID', '0', '2016-10-21 02:14:09', '2016-10-21 02:14:09' );
INSERT INTO `Onlines`(`id`,`user`,`online`,`createdAt`,`updatedAt`) VALUES ( '5', 'c7306ddf-5751-4459-926a-e212a4c2b725

getUUID', '0', '2016-10-21 02:14:09', '2016-10-21 02:14:09' );
INSERT INTO `Onlines`(`id`,`user`,`online`,`createdAt`,`updatedAt`) VALUES ( '6', '18194ef8-91c2-4c75-b618-9ec6e170f780', '0', '2016-10-21 02:14:09', '2016-10-21 02:14:09' );
-- ---------------------------------------------------------


-- Dump data of "Users" ------------------------------------
INSERT INTO `Users`(`id`,`email`,`uuid`,`password`,`firstname`,`lastname`,`greeting`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`lastMatch`,`dailyMatch`,`dailyMatchCount`,`score`,`createdAt`,`updatedAt`) VALUES ( '1', '1', '61a8db2b-db18-444b-a60a-b97f769cb318

getUUID', '$2a$10$VzHzSwBvgfDmPDZbDSMzJeqI7zP1Ktz9KwZZRvpxhqb7e5JfAcU6K', '1', '1', '1', '1', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-10-14 14:17:16', '0', '0', '5', '2016-09-24 23:08:35', '2016-10-14 14:17:22' );
INSERT INTO `Users`(`id`,`email`,`uuid`,`password`,`firstname`,`lastname`,`greeting`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`lastMatch`,`dailyMatch`,`dailyMatchCount`,`score`,`createdAt`,`updatedAt`) VALUES ( '2', '2', 'a23a8f86-9533-4e95-9c21-bfaa326b171a

getUUID', '$2a$10$XEot/PoEX/w.wWS3d6zQDeqz2LwpPLXOXyeOMZGGcmHT.knUWKqSG', '2', '2', '1', '1', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-10-14 13:48:56', '0', '0', '10', '2016-09-24 23:08:35', '2016-10-14 14:17:22' );
INSERT INTO `Users`(`id`,`email`,`uuid`,`password`,`firstname`,`lastname`,`greeting`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`lastMatch`,`dailyMatch`,`dailyMatchCount`,`score`,`createdAt`,`updatedAt`) VALUES ( '3', '3', '37f70bbf-0515-4fce-b240-3278c1b78b25

getUUID', '$2a$10$AUWPkehEk8RrCxvzz/ZJ7ebawLXTd5mIwJY77aMotjKTnEmqRxota', '1', '1', '1', '1', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-10-14 13:48:02', NULL, '0', '9', '2016-09-24 23:08:35', '2016-10-14 14:17:22' );
INSERT INTO `Users`(`id`,`email`,`uuid`,`password`,`firstname`,`lastname`,`greeting`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`lastMatch`,`dailyMatch`,`dailyMatchCount`,`score`,`createdAt`,`updatedAt`) VALUES ( '4', '4', '6c89cd7e-d7c2-4e84-84d7-6a70e1e6909f

getUUID', '$2a$10$GlAdHmjLbDVf1EonTDZxheCPVkVjEIhqjlm2vNpHcHUjYUpCwmQgC', '4', '4', '1', '1', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-10-14 13:48:02', NULL, '0', '0', '2016-09-24 23:08:35', '2016-10-14 14:39:17' );
INSERT INTO `Users`(`id`,`email`,`uuid`,`password`,`firstname`,`lastname`,`greeting`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`lastMatch`,`dailyMatch`,`dailyMatchCount`,`score`,`createdAt`,`updatedAt`) VALUES ( '5', '5', 'c7306ddf-5751-4459-926a-e212a4c2b725

getUUID', '$2a$10$F.z39S.yi0UhrZO2Sj3gceROs40zxd/S//Ae3gdYnePazZ/OkSTDC', '1', '1', '0', '1', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-10-14 13:48:02', NULL, '0', '0', '2016-09-24 23:08:35', '2016-09-24 23:08:35' );
INSERT INTO `Users`(`id`,`email`,`uuid`,`password`,`firstname`,`lastname`,`greeting`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`lastMatch`,`dailyMatch`,`dailyMatchCount`,`score`,`createdAt`,`updatedAt`) VALUES ( '6', 'q', '18194ef8-91c2-4c75-b618-9ec6e170f780', '$2a$10$YnA6mPTZdo3tfr55kJJMFuLLe8g.1cGU8MHIwGjfUsjZFGjDpkbp.', 'q', 'q', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-10-21 02:14:09', NULL, '0', '0', '2016-10-21 02:14:09', '2016-10-21 02:14:09' );
-- ---------------------------------------------------------


-- Dump data of "Votes" ------------------------------------
INSERT INTO `Votes`(`id`,`vote`,`createdAt`,`updatedAt`,`UserId`,`MatchedId`) VALUES ( '1', '1', '2016-09-27 04:35:04', '2016-09-27 04:35:04', '1', '1' );
INSERT INTO `Votes`(`id`,`vote`,`createdAt`,`updatedAt`,`UserId`,`MatchedId`) VALUES ( '2', '0', '2016-09-27 04:35:04', '2016-09-27 04:35:04', '3', '1' );
INSERT INTO `Votes`(`id`,`vote`,`createdAt`,`updatedAt`,`UserId`,`MatchedId`) VALUES ( '3', '1', '2016-10-14 14:12:34', '2016-10-14 14:12:34', '2', '2' );
INSERT INTO `Votes`(`id`,`vote`,`createdAt`,`updatedAt`,`UserId`,`MatchedId`) VALUES ( '4', '1', '2016-10-14 14:12:53', '2016-10-14 14:12:53', '3', '3' );
INSERT INTO `Votes`(`id`,`vote`,`createdAt`,`updatedAt`,`UserId`,`MatchedId`) VALUES ( '5', '1', '2016-10-14 14:12:54', '2016-10-14 14:12:54', '3', '2' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


