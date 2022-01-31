# CollectionManager

Team Members: 
- Adam Keeling 
- Julian Buchholz 
- Connor Papas 
- Mohammad Reza 
- Samrudh Suryanarayan

# Routes    

/api/auth/registerUser  

/api/auth/login

/api/dev/removeUser

/api/dev/getListOfUsers


# Updates    

**January 31, 2022**
The application has been updated to include an auth service. The registration component has also been updated to connect it to the database, so new accounts can be created. -AK

**January 30, 2022**    
Added login/register components, added user/registeruser classes, added logo images, updated package.json dependencies to support material/cards, updated modules to support new login/register component routing    
-Connor    

**January 27, 2022**    
New permissions and routes added. Accounts with "administrator" or "developer" permissions can delete accounts and retrieve a list of all accounts in the system. Permissions are checked when doing so, and administrator or developer accounts cannot by deleted by this method. Routes are /api/dev/removeUser and /api/dev/getListOfUsers. For remove user, use a post request with the email in the body.   
-AK    

**January 26, 2021:**   
Login and Registration features are done. You can run the server locally and try it for yourself. Send a post request to /api/auth/registerUser with a request body containing a username, password, and email. You will receive a token in return. All new users are assigned the "user" role. Next step here is to add higher level permissions for administrators. -AK
