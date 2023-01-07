DROP TABLE IF EXISTS Sheets;
DROP TABLE IF EXISTS NumReads;

CREATE TABLE Sheets (
    CustomerID INT,
    CompanyName TEXT,
    ContactName TEXT,
    PRIMARY KEY (CustomerID)
);
