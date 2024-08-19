-- CreateTable
CREATE TABLE `resumes_table` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `created_cvs` JSON NULL,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
