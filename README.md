# Greetings!

This is the project made for the back-end test for Shaw and Partners.

The API is deployed at https://backend-challenge-7cjz.onrender.com with the following routes:

1.  GET - /api/users?since={number}
-> https://backend-challenge-7cjz.onrender.com/api/users?since=1

2.  GET - /api/users/:username/details
-> https://backend-challenge-7cjz.onrender.com/api/users/mikedpsm/details

3.  GET - /api/users/:username/repos
-> https://backend-challenge-7cjz.onrender.com/api/users/mikedpsm/repos


## Notes

Since I left my personal token as an environment variable, I recommend keeping my github username for the tests, since we don't know if the threshold of API calls is close to the limit or not.
The platform (Render.com) warns that since this is a free hosting tier, instance types will spin down with inactivity, so, as soon as the test starts, give it a couple seconds to initialize.
Have fun
