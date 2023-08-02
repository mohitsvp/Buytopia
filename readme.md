`Define Project Scope and Objectives`

1. Building an online marketplace like flipkart or amazon
2. Features
    - Product listing
    - User authentication and authorization
    - Admin panel
    - Cart 
    - Payment gateway
    - pagination
    - Filtering product
    - wishlist
    - Product search
    - Sorting products
    - order tracking
    - Changing order status by admin from orders to delivered
    - real time order tracking
    - sales report
    - Super Admin can only add other admin
    - Loadbalancing
    - Optimisation
    - Payment receipt download
    - Admin can add products, update or delete products

3. Tools
    - MongoDB
    - React
    - Express
    - Redux
    - NodeJs
    - Chakra UI

4. Clean and elegant looking UI with great UX design

`Identify Target Audience and Needs`

Target Audience is all online shoppers, customers from any age

` Determine Timeline`

Timeline is one week



## Relationship

1. User - Order Relationship:
    - One user can have multiple orders (one-to-many relationship).
    - One order belongs to only one user.

2. User - Wishlist Relationship:
    - One user can have multiple wishlist entries (one-to-many relationship).
    - One wishlist entry belongs to only one user.

3. Product - Category Relationship:

    - One product belongs to one category (one-to-one relationship).
    - One category can have multiple products (one-to-many relationship).

4. User - Admin Relationship:

    - One user can have an admin role (one-to-one relationship).
    - One admin user is a regular user with elevated privileges.

5. User - Product Relationship (for tracking views and activities):

    - One user can view multiple products (one-to-many relationship).
    - One product can be viewed by multiple users (one-to-many relationship).

6. User - Product Relationship (for tracking purchases):

    - One user can purchase multiple products (one-to-many relationship).
    - One product can be purchased by multiple users (one-to-many relationship).

7. User - Product Relationship (for tracking wishlist):

    - One user can add multiple products to their wishlist (one-to-many relationship).
    - One product can be added to the wishlist of multiple users (one-to-many relationship).

8. User - Product Relationship (for tracking reviews and ratings):
    - One user can leave multiple reviews/ratings for different products (one-to-many relationship).
    - One product can have multiple reviews/ratings from different users (one-to-many relationship).
