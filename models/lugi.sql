-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE TABLE "answers" ----------------------------------
CREATE TABLE `answers` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`a091201` VarChar( 255 ) NULL,
	`a091202` VarChar( 255 ) NULL,
	`a091203` VarChar( 255 ) NULL,
	`a091204` VarChar( 255 ) NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	`UserId` Int( 11 ) NULL,
	PRIMARY KEY ( `id` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 6;
-- ---------------------------------------------------------


-- Dump data of "answers" ----------------------------------
INSERT INTO `answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '1', '1', '1', '1', '1', '2016-09-24 19:08:04', '2016-09-24 19:08:04', '5' );
INSERT INTO `answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '2', '2', '2', '2', '2', '2016-09-24 19:08:13', '2016-09-24 19:08:13', '1' );
INSERT INTO `answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '3', '3', '3', '3', '3', '2016-09-24 19:08:19', '2016-09-24 19:08:19', '2' );
INSERT INTO `answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '4', '4', '4', '4', '4', '2016-09-24 19:08:26', '2016-09-24 19:08:26', '3' );
INSERT INTO `answers`(`id`,`a091201`,`a091202`,`a091203`,`a091204`,`createdAt`,`updatedAt`,`UserId`) VALUES ( '5', '5', '5', '5', '5', '2016-09-24 19:08:35', '2016-09-24 19:08:35', '4' );
-- ---------------------------------------------------------


-- CREATE INDEX "UserId" -----------------------------------
CREATE INDEX `UserId` USING BTREE ON `answers`( `UserId` );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


-- CREATE TABLE "users" ------------------------------------
CREATE TABLE `users` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`email` VarChar( 255 ) NULL,
	`password` VarChar( 255 ) NULL,
	`firstname` VarChar( 255 ) NULL,
	`lastname` VarChar( 255 ) NULL,
	`match` TinyInt( 1 ) NULL DEFAULT '0',
	`age` Int( 11 ) NULL,
	`city` VarChar( 255 ) NULL,
	`upper` Int( 11 ) NULL,
	`lower` Int( 11 ) NULL,
	`seeking` VarChar( 255 ) NULL,
	`gender` VarChar( 255 ) NULL,
	`createdAt` DateTime NOT NULL,
	`updatedAt` DateTime NOT NULL,
	PRIMARY KEY ( `id` ),
	CONSTRAINT `email` UNIQUE( `email` ),
	CONSTRAINT `Users_email_unique` UNIQUE( `email` ) )
ENGINE = InnoDB
AUTO_INCREMENT = 6;
-- ---------------------------------------------------------


-- Dump data of "users" ------------------------------------
INSERT INTO `users`(`id`,`email`,`password`,`firstname`,`lastname`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`createdAt`,`updatedAt`) VALUES ( '1', '1', '$2a$10$VzHzSwBvgfDmPDZbDSMzJeqI7zP1Ktz9KwZZRvpxhqb7e5JfAcU6K', '1', '1', '0', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-09-24 19:08:13', '2016-09-24 19:08:13' );
INSERT INTO `users`(`id`,`email`,`password`,`firstname`,`lastname`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`createdAt`,`updatedAt`) VALUES ( '2', '2', '$2a$10$XEot/PoEX/w.wWS3d6zQDeqz2LwpPLXOXyeOMZGGcmHT.knUWKqSG', '2', '2', '0', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-09-24 19:08:19', '2016-09-24 19:08:19' );
INSERT INTO `users`(`id`,`email`,`password`,`firstname`,`lastname`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`createdAt`,`updatedAt`) VALUES ( '3', '3', '$2a$10$AUWPkehEk8RrCxvzz/ZJ7ebawLXTd5mIwJY77aMotjKTnEmqRxota', '3', '3', '0', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-09-24 19:08:26', '2016-09-24 19:08:26' );
INSERT INTO `users`(`id`,`email`,`password`,`firstname`,`lastname`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`createdAt`,`updatedAt`) VALUES ( '4', '4', '$2a$10$GlAdHmjLbDVf1EonTDZxheCPVkVjEIhqjlm2vNpHcHUjYUpCwmQgC', '4', '4', '0', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-09-24 19:08:35', '2016-09-24 19:08:35' );
INSERT INTO `users`(`id`,`email`,`password`,`firstname`,`lastname`,`match`,`age`,`city`,`upper`,`lower`,`seeking`,`gender`,`createdAt`,`updatedAt`) VALUES ( '5', '5', '$2a$10$F.z39S.yi0UhrZO2Sj3gceROs40zxd/S//Ae3gdYnePazZ/OkSTDC', '5', '5', '0', '22', 'Liberty City', '40', '20', 'M', 'M', '2016-09-24 19:08:04', '2016-09-24 19:08:04' );
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


