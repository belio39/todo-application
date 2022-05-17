USE todo;
GO

-- Drop the table if it already exists
IF OBJECT_ID('dbo.TaskTable', 'U') IS NOT NULL
DROP TABLE dbo.TaskTable
GO

CREATE TABLE TaskTable(
    id INT IDENTITY PRIMARY KEY,
    names VARCHAR(50),
    email VARCHAR(150) UNIQUE NOT NULL,
    task VARCHAR (50),
    issent VARCHAR (10)
    
)
Go