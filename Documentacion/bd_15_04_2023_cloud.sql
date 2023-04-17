/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 8.0.22-13 : Database - bsmwpxrcyzptfha22nhe
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bsmwpxrcyzptfha22nhe` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `bsmwpxrcyzptfha22nhe`;

/*Table structure for table `actividades` */

DROP TABLE IF EXISTS `actividades`;

CREATE TABLE `actividades` (
  `id_actividad` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `evidencia` varchar(100) DEFAULT NULL,
  `instructor` varchar(50) DEFAULT NULL,
  `productiva` int DEFAULT NULL,
  PRIMARY KEY (`id_actividad`),
  KEY `actividad_seguimiento` (`productiva`),
  CONSTRAINT `productiva_seguridad` FOREIGN KEY (`productiva`) REFERENCES `productiva` (`id_productiva`)
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
  CONSTRAINT `municipi_ambiente` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`codigo_mpio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `ambientes` */

insert  into `ambientes`(`id_ambiente`,`nombre_amb`,`municipio`,`sede`,`estado`) values (1,'Y14',NULL,'yamboro','activo');

/*Table structure for table `areas` */

DROP TABLE IF EXISTS `areas`;

CREATE TABLE `areas` (
  `id_area` int NOT NULL AUTO_INCREMENT,
  `nombre_area` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id_area`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `areas` */

insert  into `areas`(`id_area`,`nombre_area`) values (2,'Tic');

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
  CONSTRAINT `asignacion_vinculacacion` FOREIGN KEY (`instructor`) REFERENCES `vinculacion` (`id_vinculacion`)
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
  CONSTRAINT `muncipio_empresa` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`codigo_mpio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `empresa` */

insert  into `empresa`(`id_empresa`,`razon_social`,`direccion`,`telefono`,`correo`,`municipio`) values (1,'Personal',NULL,NULL,NULL,NULL);

/*Table structure for table `fichas` */

DROP TABLE IF EXISTS `fichas`;

CREATE TABLE `fichas` (
  `codigo` int NOT NULL,
  `inicio_ficha` date DEFAULT NULL,
  `fin_lectiva` date DEFAULT NULL,
  `fin_ficha` date DEFAULT NULL,
  `programa` int DEFAULT NULL,
  `sede` enum('centro','yamboro') DEFAULT NULL,
  `estado` enum('activa','inactiva') DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `ficha_programa` (`programa`),
  CONSTRAINT `ficha_programa` FOREIGN KEY (`programa`) REFERENCES `programas` (`id_programa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `fichas` */

insert  into `fichas`(`codigo`,`inicio_ficha`,`fin_lectiva`,`fin_ficha`,`programa`,`sede`,`estado`) values (2186843,'2020-10-01','2020-06-30','2022-12-31',2,'yamboro','activa'),(2692929,'2023-02-01','2024-04-24','2025-03-27',4,'yamboro','activa');

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
  CONSTRAINT `vinculacion_horario` FOREIGN KEY (`instructor`) REFERENCES `vinculacion` (`id_vinculacion`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `horarios` */

insert  into `horarios`(`id_horario`,`fecha_inicio`,`hora_inicio`,`fecha_fin`,`hora_fin`,`dia`,`cantidad_horas`,`instructor`,`ficha`,`ambiente`,`estado`) values (1,'2023-04-03','07:00:00','2023-07-01','12:00:00','jueves',5,2,2692929,1,'aprobado');

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

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values (2,'2023_04_15_030630_create_personal_access_tokens_table',2),(3,'2019_12_14_000001_create_personal_access_tokens_table',3);

/*Table structure for table `municipios` */

DROP TABLE IF EXISTS `municipios`;

CREATE TABLE `municipios` (
  `codigo_mpio` int NOT NULL,
  `nombre_mpio` varchar(80) DEFAULT NULL,
  `departamento` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`codigo_mpio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `municipios` */

insert  into `municipios`(`codigo_mpio`,`nombre_mpio`,`departamento`) values (1,'Pitalito','Huila');

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `personal_access_tokens` */

/*Table structure for table `personas` */

DROP TABLE IF EXISTS `personas`;

CREATE TABLE `personas` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `identificacion` bigint DEFAULT NULL,
  `tipo_documento` enum('CC','TI','CE') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nombres` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `correo` varchar(80) DEFAULT NULL,
  `telefono` varchar(40) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `rol` enum('Instructor','Coordinador','Lider','Seguimiento') DEFAULT NULL,
  `cargo` enum('Instructor','Aprendiz','Coordinador','Administrativo') DEFAULT NULL,
  `municipio` int DEFAULT NULL,
  PRIMARY KEY (`id_persona`),
  UNIQUE KEY `identificacion_unique` (`identificacion`),
  KEY `persona_municipio` (`municipio`),
  CONSTRAINT `municipio_persona` FOREIGN KEY (`municipio`) REFERENCES `municipios` (`codigo_mpio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `personas` */

insert  into `personas`(`id_persona`,`identificacion`,`tipo_documento`,`nombres`,`correo`,`telefono`,`password`,`rol`,`cargo`,`municipio`) values (2,96361787,NULL,'Wilson Martinez Saldarriaga',NULL,NULL,'123','Instructor','Instructor',NULL),(3,123456789,NULL,'Admin System',NULL,NULL,'adminpass','Instructor','Instructor',NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `programas` */

insert  into `programas`(`id_programa`,`nombre_programa`,`sigla`,`nivel`,`estado`) values (2,'Analsis y Desarrollo de Software','ADSO','Tecnólogo','activo'),(3,'Sistema','SISTEMAS','Tecnico','activo'),(4,'Redes de datos','Redes','Tecnólogo','activo');

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

/*Table structure for table `vinculacion` */

DROP TABLE IF EXISTS `vinculacion`;

CREATE TABLE `vinculacion` (
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `vinculacion` */

insert  into `vinculacion`(`id_vinculacion`,`instructor`,`tipo`,`sede`,`area`) values (2,2,'contratisca','yamboro',2);

/*Table structure for table `horarios_instructores` */

DROP TABLE IF EXISTS `horarios_instructores`;

/*!50001 DROP VIEW IF EXISTS `horarios_instructores` */;
/*!50001 DROP TABLE IF EXISTS `horarios_instructores` */;

/*!50001 CREATE TABLE  `horarios_instructores`(
 `identificacion` bigint ,
 `nombres` varchar(80) ,
 `Lunes` text ,
 `Martes` text ,
 `Miercoles` text ,
 `Jueves` text ,
 `Viernes` text 
)*/;

/*View structure for view horarios_instructores */

/*!50001 DROP TABLE IF EXISTS `horarios_instructores` */;
/*!50001 DROP VIEW IF EXISTS `horarios_instructores` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`uxbb2m9uqgkcgbys`@`%` SQL SECURITY DEFINER VIEW `horarios_instructores` AS select `per`.`identificacion` AS `identificacion`,`per`.`nombres` AS `nombres`,(select group_concat(concat('(',`hor`.`hora_inicio`,'-',`hor`.`hora_fin`,')',`fi`.`codigo`,'=>',`pro`.`sigla`) separator ',') from ((`horarios` `hor` join `fichas` `fi` on((`fi`.`codigo` = `hor`.`ficha`))) join `programas` `pro` on((`pro`.`id_programa` = `fi`.`programa`))) where ((`hor`.`instructor` = `per`.`id_persona`) and (`hor`.`dia` = 'Lunes'))) AS `Lunes`,(select group_concat(concat('(',`hor`.`hora_inicio`,'-',`hor`.`hora_fin`,')',`fi`.`codigo`,'=>',`pro`.`sigla`) separator ',') from ((`horarios` `hor` join `fichas` `fi` on((`fi`.`codigo` = `hor`.`ficha`))) join `programas` `pro` on((`pro`.`id_programa` = `fi`.`programa`))) where ((`hor`.`instructor` = `per`.`id_persona`) and (`hor`.`dia` = 'Martes'))) AS `Martes`,(select group_concat(concat('(',`hor`.`hora_inicio`,'-',`hor`.`hora_fin`,')',`fi`.`codigo`,'=>',`pro`.`sigla`) separator ',') from ((`horarios` `hor` join `fichas` `fi` on((`fi`.`codigo` = `hor`.`ficha`))) join `programas` `pro` on((`pro`.`id_programa` = `fi`.`programa`))) where ((`hor`.`instructor` = `per`.`id_persona`) and (`hor`.`dia` = 'Miercoles'))) AS `Miercoles`,(select group_concat(concat('(',`hor`.`hora_inicio`,'-',`hor`.`hora_fin`,')',`fi`.`codigo`,'=>',`pro`.`sigla`) separator ',') from ((`horarios` `hor` join `fichas` `fi` on((`fi`.`codigo` = `hor`.`ficha`))) join `programas` `pro` on((`pro`.`id_programa` = `fi`.`programa`))) where ((`hor`.`instructor` = `per`.`id_persona`) and (`hor`.`dia` = 'Jueves'))) AS `Jueves`,(select group_concat(concat('(',`hor`.`hora_inicio`,'-',`hor`.`hora_fin`,')',`fi`.`codigo`,'=>',`pro`.`sigla`) separator ',') from ((`horarios` `hor` join `fichas` `fi` on((`fi`.`codigo` = `hor`.`ficha`))) join `programas` `pro` on((`pro`.`id_programa` = `fi`.`programa`))) where ((`hor`.`instructor` = `per`.`id_persona`) and (`hor`.`dia` = 'Viernes'))) AS `Viernes` from (`personas` `per` join `vinculacion` `vin` on((`vin`.`instructor` = `per`.`id_persona`))) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
