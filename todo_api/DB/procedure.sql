USE todo;
GO

CREATE OR ALTER PROCEDURE insertTodo(
    @id VARCHAR(50), 
    @title VARCHAR(50),
    @email VARCHAR(150),
    @description VARCHAR(100), 
    @date VARCHAR(50),
    @start VARCHAR(10)
    )
AS
BEGIN

INSERT INTO Todos(id,title,email,description,date,start)
VALUES(@id,@title,@email,@description,@date, @start)

END
GO

CREATE OR ALTER PROCEDURE getTodos
AS
BEGIN

SELECT * FROM Todos
END
GO

CREATE OR ALTER PROCEDURE getTodo(@id VARCHAR(50))
AS
BEGIN

SELECT * FROM Todos WHERE id=@id
END
GO

CREATE OR ALTER PROCEDURE updateTodo(@id VARCHAR(50), @title VARCHAR(50), @email VARCHAR(150), @description VARCHAR(100), @date VARCHAR(50), @start VARCHAR(10))
AS
BEGIN
UPDATE Todos SET title = @title, email=@email, description = @description, date = @date, start = @start WHERE id=@id
END
GO

CREATE OR ALTER PROCEDURE updateCOMPLETE(@id VARCHAR(50), @start VARCHAR(10))
AS
BEGIN
UPDATE Todos SET start = @start WHERE id=@id
END
GO

CREATE OR ALTER PROCEDURE deleteTodo(@id VARCHAR(50))
AS
BEGIN
DELETE FROM Todos WHERE id = @id
END
GO
