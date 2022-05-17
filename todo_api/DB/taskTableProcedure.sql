USE todo;
GO

INSERT INTO TaskTable(names, email, task)
VALUES(@names, @email, @task)