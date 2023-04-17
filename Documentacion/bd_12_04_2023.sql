/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 8.0.30 : Database - sena
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sena` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sena`;

/*Table structure for table `actividades` */

DROP TABLE IF EXISTS `actividades`;

CREATE TABLE `actividades` (
  `id_actividad` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) DEFAULT NULL,
  `seguimiento` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `evidencia` varchar(100) DEFAULT NULL,
  `instructor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_actividad`),
  KEY `actividad_seguimiento` (`seguimiento`),
  CONSTRAINT `actividad_seguimiento` FOREIGN KEY (`seguimiento`) REFERENCES `seguimientos` (`id_seguimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `actividades` */

/*Table structure for table `ambientes` */

DROP TABLE IF EXISTS `ambientes`;

CREATE TABLE `ambientes` (
  `id_ambiente` int NOT NULL AUTO_INCREMENT,
  `nombre_amb` varchar(80) DEFAULT NULL,
  `municipio` int DEFAULT NULL,
  `sede` enum('centro','yamboro') DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL,
  PRIMARY KEY (`id_ambiente`),
  KEY `municipio_ambiente` (`municipio`),
  CONSTRAINT `municipio_ambiente` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`id_municipio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `ambientes` */

/*Table structure for table `areas` */

DROP TABLE IF EXISTS `areas`;

CREATE TABLE `areas` (
  `id_area` int NOT NULL AUTO_INCREMENT,
  `nombre_area` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_area`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `areas` */

insert  into `areas`(`id_area`,`nombre_area`) values (1,'Tic');

/*Table structure for table `asignaciones` */

DROP TABLE IF EXISTS `asignaciones`;

CREATE TABLE `asignaciones` (
  `id_asignacion` int NOT NULL AUTO_INCREMENT,
  `fecha_fin` date DEFAULT NULL,
  `productiva` int DEFAULT NULL,
  `instructor` int DEFAULT NULL,
  `estado` enum('Activo','Inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_asignacion`),
  KEY `asignacion_vinculacacion` (`instructor`),
  KEY `asignacion_practica` (`productiva`),
  CONSTRAINT `asignacion_practica` FOREIGN KEY (`productiva`) REFERENCES `productiva` (`id_productiva`),
  CONSTRAINT `asignacion_vinculacacion` FOREIGN KEY (`instructor`) REFERENCES `vinculcion` (`id_vinculacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `asignaciones` */

/*Table structure for table `bitacoras` */

DROP TABLE IF EXISTS `bitacoras`;

CREATE TABLE `bitacoras` (
  `id_bitacora` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `bitacora` varchar(100) DEFAULT NULL,
  `seguimiento` int DEFAULT NULL,
  `estado` enum('solicitud','aprobado','no aprobado') DEFAULT NULL,
  `instructor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_bitacora`),
  KEY `seguimiento_bitacora` (`seguimiento`),
  CONSTRAINT `seguimiento_bitacora` FOREIGN KEY (`seguimiento`) REFERENCES `seguimientos` (`id_seguimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `bitacoras` */

/*Table structure for table `empresa` */

DROP TABLE IF EXISTS `empresa`;

CREATE TABLE `empresa` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(80) DEFAULT NULL,
  `direccion` varchar(80) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(80) DEFAULT NULL,
  `municipio` int DEFAULT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `empresa_minicipio` (`municipio`),
  CONSTRAINT `empresa_minicipio` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`id_municipio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `empresa` */

/*Table structure for table `fichas` */

DROP TABLE IF EXISTS `fichas`;

CREATE TABLE `fichas` (
  `codigo` int NOT NULL,
  `inicio_ficha` date DEFAULT NULL,
  `fin_lectiva` date DEFAULT NULL,
  `fin_ficha` datetime DEFAULT NULL,
  `programa` int DEFAULT NULL,
  `sede` enum('centro','yamboro') DEFAULT NULL,
  `estado` enum('activa','inactiva') DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `ficha_programa` (`programa`),
  CONSTRAINT `ficha_programa` FOREIGN KEY (`programa`) REFERENCES `programas` (`id_programa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `fichas` */

insert  into `fichas`(`codigo`,`inicio_ficha`,`fin_lectiva`,`fin_ficha`,`programa`,`sede`,`estado`) values (2692929,'2023-02-01','2024-06-03',NULL,1,'yamboro','activa');

/*Table structure for table `horarios` */

DROP TABLE IF EXISTS `horarios`;

CREATE TABLE `horarios` (
  `id_horario` int NOT NULL AUTO_INCREMENT,
  `fecha_inicio` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `dia` enum('lunes','martes','miercoles','jueves','viernes','sabados','domingo') DEFAULT NULL,
  `cantidad_horas` int DEFAULT NULL,
  `instructor` int DEFAULT NULL,
  `ficha` int DEFAULT NULL,
  `ambiente` int DEFAULT NULL,
  `estado` enum('solicitud','aprobado','no aprobado') DEFAULT NULL,
  PRIMARY KEY (`id_horario`),
  KEY `hoario_ambiente` (`ambiente`),
  KEY `horario_ficha` (`ficha`),
  KEY `vinculacion_horario` (`instructor`),
  CONSTRAINT `hoario_ambiente` FOREIGN KEY (`ambiente`) REFERENCES `ambientes` (`id_ambiente`),
  CONSTRAINT `horario_ficha` FOREIGN KEY (`ficha`) REFERENCES `fichas` (`codigo`),
  CONSTRAINT `vinculacion_horario` FOREIGN KEY (`instructor`) REFERENCES `vinculcion` (`id_vinculacion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `horarios` */

/*Table structure for table `matriculas` */

DROP TABLE IF EXISTS `matriculas`;

CREATE TABLE `matriculas` (
  `id_matricula` int NOT NULL AUTO_INCREMENT,
  `ficha` int DEFAULT NULL,
  `aprendiz` int DEFAULT NULL,
  `estado` enum('Induccion','Formacion','Etapa Practica','Retiro Voluntario','Certificado','Condicionado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pendiente_tecnicos` int DEFAULT NULL,
  `pendiente_transversales` int DEFAULT NULL,
  `pendiente_ingles` int DEFAULT NULL,
  PRIMARY KEY (`id_matricula`),
  KEY `matriculas_personas` (`aprendiz`),
  KEY `matricula_ficha` (`ficha`),
  CONSTRAINT `matricula_ficha` FOREIGN KEY (`ficha`) REFERENCES `fichas` (`codigo`),
  CONSTRAINT `matriculas_personas` FOREIGN KEY (`aprendiz`) REFERENCES `personas` (`id_persona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `matriculas` */

/*Table structure for table `municipios` */

DROP TABLE IF EXISTS `municipios`;

CREATE TABLE `municipios` (
  `id_municipio` int NOT NULL AUTO_INCREMENT,
  `nombre_mpio` varchar(80) DEFAULT NULL,
  `departamento` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_municipio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `municipios` */

/*Table structure for table `personas` */

DROP TABLE IF EXISTS `personas`;

CREATE TABLE `personas` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `identificacion` bigint DEFAULT NULL,
  `nombres` varchar(80) DEFAULT NULL,
  `correo` varchar(80) DEFAULT NULL,
  `telefono` varchar(40) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `rol` enum('Instructor','Coordinador','Lider','Seguimiento') DEFAULT NULL,
  `cargo` enum('Instructor','Aprendiz','Coordinador','Administrativo') DEFAULT NULL,
  `municipio` int DEFAULT NULL,
  PRIMARY KEY (`id_persona`),
  UNIQUE KEY `identificacion_unique` (`identificacion`),
  KEY `persona_municipio` (`municipio`),
  CONSTRAINT `persona_municipio` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`id_municipio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `personas` */

/*Table structure for table `productiva` */

DROP TABLE IF EXISTS `productiva`;

CREATE TABLE `productiva` (
  `id_productiva` int NOT NULL AUTO_INCREMENT,
  `aprendiz` int DEFAULT NULL,
  `empesa` int DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `alternativa` enum('Contrato de Aprendizaje','Proyecto Productivo','Pasantias','Monitoria') DEFAULT NULL,
  `estado` enum('Inicio','Renuncia') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `acuerdo` varchar(100) DEFAULT NULL,
  `arl` varchar(100) DEFAULT NULL,
  `certificado` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_productiva`),
  KEY `aprendiz_matricula` (`aprendiz`),
  KEY `empresa_matricula` (`empesa`),
  CONSTRAINT `empresa_matricula` FOREIGN KEY (`empesa`) REFERENCES `empresa` (`id_empresa`),
  CONSTRAINT `practica_aprendiz` FOREIGN KEY (`aprendiz`) REFERENCES `matriculas` (`id_matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `productiva` */

/*Table structure for table `programas` */

DROP TABLE IF EXISTS `programas`;

CREATE TABLE `programas` (
  `id_programa` int NOT NULL AUTO_INCREMENT,
  `nombre_programa` varchar(80) DEFAULT NULL,
  `sigla` varchar(20) DEFAULT NULL,
  `nivel` enum('Tecnico','Tecnólogo') DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT NULL,
  PRIMARY KEY (`id_programa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `programas` */

insert  into `programas`(`id_programa`,`nombre_programa`,`sigla`,`nivel`,`estado`) values (1,'Tecnologo en Analisis y Desarrollo de Software','ADSO',NULL,'activo');

/*Table structure for table `seguimientos` */

DROP TABLE IF EXISTS `seguimientos`;

CREATE TABLE `seguimientos` (
  `id_seguimiento` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `seguimiento` varchar(100) DEFAULT NULL,
  `productiva` int DEFAULT NULL,
  `estado` enum('solicitud','aprobado','no aprobado') DEFAULT NULL,
  `instructor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_seguimiento`),
  KEY `matricula_aprenidiz` (`productiva`),
  CONSTRAINT `matricula_aprenidiz` FOREIGN KEY (`productiva`) REFERENCES `productiva` (`id_productiva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `seguimientos` */

/*Table structure for table `vinculcion` */

DROP TABLE IF EXISTS `vinculcion`;

CREATE TABLE `vinculcion` (
  `id_vinculacion` int NOT NULL AUTO_INCREMENT,
  `instructor` int DEFAULT NULL,
  `tipo` enum('contratisca','planta') DEFAULT NULL,
  `sede` enum('centro','yamboro') DEFAULT NULL,
  `area` int DEFAULT NULL,
  PRIMARY KEY (`id_vinculacion`),
  KEY `vinculacion_horario` (`instructor`),
  KEY `vinculacion_area` (`area`),
  CONSTRAINT `vinculacion_area` FOREIGN KEY (`area`) REFERENCES `areas` (`id_area`),
  CONSTRAINT `vinculacion_instructor` FOREIGN KEY (`instructor`) REFERENCES `personas` (`id_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `vinculcion` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
