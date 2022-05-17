USE todo;
GO

-- Drop the table if it already exists
IF OBJECT_ID('dbo.Todos', 'U') IS NOT NULL
DROP TABLE dbo.Todos
GO

CREATE TABLE Todos(
    id varchar(50) PRIMARY KEY,
    title varchar(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    description varchar(250),
    date varchar(50),
    start varchar(10) DEFAULT 'start'
)
Go
