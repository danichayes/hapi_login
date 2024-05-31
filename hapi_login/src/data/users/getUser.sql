// TODO, change query to fit your sql table and project

SELECT  [user_id]
       , [user_name]
       , [user_password]
       , [email]
FROM    [login_proj_db].[users]
WHERE   [user_id] = @userid
