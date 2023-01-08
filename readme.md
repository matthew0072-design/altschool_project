# Blogging App 
This is Blogging App API

## Requirements

1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state
12. The owner of the blog should be able to get a list of their blogs.
    - The endpoint should be paginated
    - It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated,
    - default it to 20 blogs per page.
    - It should also be searchable by author, title and tags.
    - It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.

## Test application
> Setup 

>Install NodeJS
 
> mongodb

> pull this repo

>update env with .env

>run pnpm dev


# MODELS
## User

field   data_type	    constraints

id	string	required

firstname	string	required

lastname	string	required

email	string	unique

password	string	required

tokens array

## Blog
field	data_type	constraints
id	string	required
description string
state	string	default:draft
title	string	required
tags	array	required
read_count number default:0
reading_time string
body string required
author string



## APIs

Signup User

Route: /signup

Method: POST

Body:

{
  "email": "matthew@yahoo.com",

  "password": "matthew0072",

  "first_name": "ayobami",

  "last_name": "matthew",
  
}

Responses

Success

{
    
    user: {
        "email": "matthew@yahoo.com",
        "first_name": "ayobami",
        "last_name": "matthew",
        "tokens": [{"token":"rjdj4389300ejej220202303kk000kko3k"}]
    }
}

## Login User

Route: /login

Method: POST

Body:

{
  "password": "matthew0072",
  "email": 'matthew@yahoo.com",
}

Responses

Success

{
    user:

    {
      "email": "matthew@yahoo.com",
      "password": "matthew0072"

    }

    token: 'sjlkafjkldsfjsd'
}
## Create Blogs

Route: /article

Method: POST

Header: Authorization: Bearer {token}

Body:

{

    "title": "The fear of God",
    "description": "how to fear God",
    "tags": ["God", "Fear"],
    "body": "Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
    
    
    
    
}

Responses

Success

{
   
    "title": "The fear of God",
    "description": "how to fear God",
    "state": draft,
    read_count: 0,
    reading_time: "2mins,
    "author": "e35249374902029383fhfhf",
    "tags": ["God", "Fear"],
    "body": "Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a"
    
    
}


## Get Specific Published Blog

Route: /blog/:id

Method: GET

Responses

Success

{

    "title": "The fear of God",
    "description": "how to fear God",
    "state": draft,
    read_count: 0,
    reading_time: "2mins,
    "author": "e35249374902029383fhfhf",
    "tags": ["God", "Fear"],
    "body": "Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a",
    
    
}


## Get All Published Blogs
Route: "/"

Method: GET

Query params:

page (default: 1)

per_page (default: 20)

order_by (timestamp: created_at), read_count, reading_time

order (options: asc | desc, default: desc)

title,

author,

tags

Responses: Success

{

    "title": "The fear of God",
    "description": "how to fear God",
    "state": draft,
    read_count: 0,
    reading_time: "2mins,
    "author": "e35249374902029383fhfhf",
    "tags": ["God", "Fear"],
    "body": "Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a",
    
    
}

# Update State by the Owner of the Blog

route: /blog/state/:id

method: PATCH

Header: Authorization: Bearer {token}

body: {

  "state": "published"

}

response: success


{
    "title": "The fear of God",

    "description": "how to fear God",

    "state": draft,

    read_count: 0,

    reading_time: "2mins,

    "author": "e35249374902029383fhfhf",

    "tags": ["God", "Fear"],

    "body": "Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a",
    
    
}

# Update the Contents of a Blog by the Owner

route: /blog/edit/:id 

method: PATCH

header: Authorization: Bearer {token}


body :
 {
  "description": "Except the Lord build the House",
  "tags" ["lord" "House"]
}

response: success

{
    "title": "The fear of God",
    "description": "Except the Lord build the house",
    "state": draft,
    read_count: 0,
    reading_time: "2mins,
    "author": "e35249374902029383fhfhf",
    "tags": ["lord", "House"],
    "body": "Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a",
    
    
}

# Deleting the Blog by the Owner
route: /blog/:id
method: DELETE
header: Authorization: Bearer {token}
route: 
