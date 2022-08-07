Test application.

This readme is a short documentation of work done and some extra information I thougth to mention.


### Project structure 
```
-- config (project wide configurations)
-- tests (all tests are here)
-- src
---- controllers ( web controllers - they decide what happens with api requests )
---- services ( core logic )
---- repository ( Data access layer (or sort of). Used typeorm's custom repositories )
---- migrations ( database migrations )

```

 
### API endpoints available

#### Users
`POST` /api/users/ - Create a user
**Request body params**

name| type|required
-------|-------|-----------
firstName | string | yes
lastName | string | yes
email| string | yes
password | string | yes


**Sample response**

```
{
"message": "Successfully created user",
"status": "success",
"data": {
"user": {
"firstName": "Samuel",
"lastName": "Omilo",
"email": "omilo.samuel@gmail.com",
"id": "714c85eb-8716-4df2-ad42-76f0a7b3e755",
"dateJoined": "2022-08-07T08:49:37.000Z"
}
}
}
```


`GET` /api/users - Get all users

**Request body**
None

**Sample response**

```
{
"message": "All users",
"status": "success",
"data": {
"users": [
{
"id": "7db5004f-101a-47aa-b58d-2a1920dd42eb",
"firstName": "Samuel",
"lastName": "Omilo",
"email": "omilosamuel@gmail.com",
"dateJoined": "2022-08-06T14:31:26.000Z"
},
{
"id": "714c85eb-8716-4df2-ad42-76f0a7b3e755",
"firstName": "Samuel",
"lastName": "Omilo",
"email": "omilo.samuel@gmail.com",
"dateJoined": "2022-08-07T08:49:37.000Z"
}
]
}
}
```


#### Bookings 

`POST` /api/bookings/ - Create a booking

**Request body params**
name| type|required
-------|-------|-----------
description | string | yes
start | iso format datetime | yes
end| iso format datetime | yes
users | array[string(uuid)] | no

> Users param can be an array of any number of uuids which are the ids of the user(s) for the booking

**Sample response**
```
"message": "Created booking",
"status": "success",
"data": {
"booking": {
"orderId": "BC3JUEaWEQxe",
"description": "A new booking",
"start": "2022-08-07T11:44:46.000Z",
"end": "2022-08-08T11:44:46.000Z",
"amount": 5000,
"users": [
{
"id": "7db5004f-101a-47aa-b58d-2a1920dd42eb",
"firstName": "Samuel",
"lastName": "Omilo",
"email": "omilosamuel@gmail.com",
"dateJoined": "2022-08-06T14:31:26.000Z"
}
]
}
}
}

```

`GET` /api/bookings - Get all bookings

**Request body**
None

**Sample request**
```
{
"message": "All bookings",
"status": "success",
"data": {
"bookings": [
{
"orderId": "BC3JUEaWEQxe",
"description": "A new booking",
"start": "2022-08-07T11:44:46.000Z",
"end": "2022-08-08T11:44:46.000Z",
"amount": 5000
}
]
}
}
```


`GET` /api/bookings/:orderId/total_amount - total amount spent on a booking 

**Request body**
None

**Sample request**
```
{
"message": "Booking total amount",
"status": "success",
"data": {
"total_amount": 5000
}
}
```