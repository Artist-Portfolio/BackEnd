# Back End for the Artist Portfolio

**API:** https://artist-portfolio-backend.herokuapp.com/

### Register

**[POST]**

**URL**: `/api/auth/register/`

**Payload:**

```js
{
    //example data sent
    "username": "newuser",
    "password": "lamepassword",
    "email": "newuser@email.com"
}
```

**Returns:** object with user's info.

Example:

```js
{
    "id": 1,
    "username": "newuser",
    "password": __"hashed_password"__(bad practice, do not do this!!!),
    "email": "newuser@email.com"
}
```

### Login

**[POST]**

**URL** `/api/auth/login`

**Payload**

```js
{
    "username": "newuser",
    "password": "lamepassword"
}
```

**Returns:** object with welcome message and token(JWT).

Example:

```js
{
    "message":"welcome newuser!",
    "token": __JWT_Token__
}
```

### Retrieving Artwork

**[GET]**
**URL** `/api/artist/:id`

**Returns:** an array with user's artwork.

Example:

```js
[
  {
    artist: __artist_name__,
    title: __artwork_title__,
    description: __artwork_desc__,
    imgUrl: __img_src_of_artwork__,
    likes: 0,
    user_id: __id_of_user__
  },
  {
    // more artwork
  }
];
```

### Adding Artwork

**[POST]**

**URL** `/api/artist/new`

**Returns:** object with message and artwork info entered.

Example:

```js
{
    "message": "added new work.",
    {
        "artist": __artist_name__,
        "title": __artwork_title__,
        "description": __artwork_desc__,
        "imgUrl": __img_src_of_artwork__,
        "likes": 0,
        "user_id": __id_of_user__
    }
}
```

### Updating Artwork

**[PUT]**

**URL** `/api/artist/artwork/:id`

**Payload:** same as adding artwork but with edited information.

**Returns**

Example:

```js
{
    "updated": 1
}
```

### Deleting Artwork

**[DELETE]**

**URL** `/api/artist/artwork/:id`

**Returns**

Example:

```js
{
    "removed": 1
}
```
