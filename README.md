# Collection Manager

# About
Collection manager will assist with storing and managing collections of items for both individuals and businesses. It will help keep track of information and allows for easy organization, decreasing retrieval time. Stored items can be sorted in different ways as well as assigned names, descriptions, images, and tags to help with searching.
This intuitive, reliable, and secure collection manager will cause you to never worry about losing data and memories ever again.


# Team
- Adam Keeling 
- Julian Buchholz 
- Connor Papas 
- Mohammad Reza 
- Samrudh Suryanarayan

# Routes    

**User authentication routes**  
/api/auth/registerUser  
/api/auth/login
  
**Developer routes**  
/api/dev/removeUser  
/api/dev/getListOfUsers
  
**Collection routes**  
/api/collection/createCollection  
/api/collection/getCollectionById  
/api/collection/getCollectionsByUserId  
/api/collection/editCollection  
/api/collection/removeCollection

**Item routes**  
/api/item/getItemById  
/api/item/getAllItemsByCollectionId  
/api/item/createItem  
/api/item/editItem  

# How to make requests to the web service
Note: json web token must be sent with all requests except for registration and login. 

**Create a new collection**  
/api/collection/createCollection  
Request format:   
{  
&emsp;“collection_name” : “example”,  
&emsp;“collection_description” : “example”,  
&emsp;“collection_user_id”: “example”  
}  
Note: the ability to upload images isn’t available yet.  

**Get a Collection object by providing that collection’s Id**  
/api/collection/getCollectionById  
Request format:  provide the Id of the collection to be retrieved  
{  
&emsp;“collection_id”: “example”  
}  

**Get an array of Collection objects by providing the User’s Id**  
/api/collection/getCollectionsByUserId  
Request format: none, just send json web token  

**Edit a Collection object’s fields**  
/api/collection/editCollection  
Request format: the request format must include the collection’s ID as the first field in the object. Every field after that can be a field you want to modify along with the string which will replace that field’s original value.  
Example:  
{  
&emsp;"collection_id": "61f9ac5aa4eeda0e3763cbd7",  
&emsp;"collection_name": "testing name change",  
&emsp;"collection_description": "testing change of description"  
}    

**Delete a collection from the database**  
/api/collection/removeCollection  
Request format: provide the Id of the collection to be removed  
{  
&emsp;"collection_id": "example"  
}  

**Storage**  
To send storage ids use: storage_object_id  
To send item ids use: item_id    

/api/storage/getItemsInStorageByCode/:id  
Add the storage id to the request url to return a list of items in that storage location    

/api/storage/getStorageDetails/:id  
Add the storage id to the request url to return that storage location's details    

/api/storage/editStorageDetails  
Send a put request with at body that contains the storage id along with any fields that need to be modified.  
E.g.,  
{  
&emsp;"storage_object_id": "13ijh23i5bj23",  
&emsp;"storage_name": "Testing name change"  
}    

/api/storage/addItemToStorage  
Send a post request with a body that contains the storage location's id and the item's id  
E.g.,  
{  
&emsp;"storage_object_id": "13ijh23i5bj23",  
&emsp;"item_id": "a23ui2bu325iub"  
}    

/api/storage/removeItemFromStorage/:id  
Add the item id to the request url to remove that item from its storage location    

/api/storage/transferItemToADifferentStorage  
Send a put request with a body that contains the new storage location's id and the item's id  
E.g.,  
{  
&emsp;"storage_object_id": "13ijh23i5bj23",  
&emsp;"item_id": "a23ui2bu325iub"  
}    

/api/storage/removeStorageLocation  
Add the storage id to the request url to remove that storage location    


# Updates    

**February 3, 2022**  
Server routes to work with collections are completed and available. -AK

**January 31, 2022**  
Login is working and correctly stores the token in local storage. Password verification is working but could be improved. -AK

**January 31, 2022**  
The application has been updated to include an auth service. The registration component has also been updated to connect it to the database, so new accounts can be created. We need password verification done before this component is ready to be pushed to main. -AK

**January 30, 2022**    
Added login/register components, added user/registeruser classes, added logo images, updated package.json dependencies to support material/cards, updated modules to support new login/register component routing    
-Connor    

**January 27, 2022**    
New permissions and routes added. Accounts with "administrator" or "developer" permissions can delete accounts and retrieve a list of all accounts in the system. Permissions are checked when doing so, and administrator or developer accounts cannot by deleted by this method. Routes are /api/dev/removeUser and /api/dev/getListOfUsers. For remove user, use a post request with the email in the body.   
-AK    

**January 26, 2021:**   
Login and Registration features are done. You can run the server locally and try it for yourself. Send a post request to /api/auth/registerUser with a request body containing a username, password, and email. You will receive a token in return. All new users are assigned the "user" role. Next step here is to add higher level permissions for administrators. -AK  

