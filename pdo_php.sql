-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pdo_php
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pdo_php
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pdo_php` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `pdo_php` ;

-- -----------------------------------------------------
-- Table `pdo_php`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pdo_php`.`product` (
  `id_pro` INT NOT NULL AUTO_INCREMENT,
  `name_pro` VARCHAR(100) NOT NULL,
  `value_pro` DECIMAL(10,2) NOT NULL,
  `date_pro` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_pro`),
  UNIQUE INDEX `id_pro` (`id_pro` ASC) VISIBLE)
ENGINE = MyISAM
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
